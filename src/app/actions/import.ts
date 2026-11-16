"use server";

import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeQuery } from '@/lib/neo4j';
import { TreeRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export interface ImportMemberRow {
  name: string;
  gender: 'male' | 'female';
  generation: number;
  parentName?: string;
  spouseName?: string;
  birthDate?: string;
  deathDate?: string;
  alias_name?: string;
  title?: string;
  job?: string;
  resting_place?: string;
  bio?: string;
}

export interface ImportResult {
  success: boolean;
  importedCount?: number;
  createdRelationshipsCount?: number;
  errors?: string[];
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Batch import family members from CSV rows
 */
export async function importFamilyTreeData(
  treeId: string,
  rows: ImportMemberRow[]
): Promise<ImportResult> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Vui lòng đăng nhập.' },
    };
  }

  try {
    // Check permission: Only Admin or Editor can import
    const membership = await prisma.treeMembership.findUnique({
      where: {
        treeId_userId: {
          treeId,
          userId: user.id,
        },
      },
    });

    if (!membership || (membership.role !== TreeRole.ADMIN && membership.role !== TreeRole.EDITOR)) {
      return {
        success: false,
        error: { code: 'FORBIDDEN', message: 'Bạn không có quyền nhập dữ liệu vào cây này.' },
      };
    }

    if (!rows || rows.length === 0) {
      return {
        success: false,
        error: { code: 'EMPTY_DATA', message: 'Dữ liệu nhập vào trống.' },
      };
    }

    // Step 1: Normalize and create Person nodes in Neo4j
    const nameToIdMap = new Map<string, string>();
    const preparedMembers = rows.map((row) => {
      const id = uuidv4();
      nameToIdMap.set(row.name.trim().toLowerCase(), id);

      return {
        id,
        treeId,
        name: row.name.trim(),
        gender: row.gender || 'male',
        generation: Number(row.generation) || 1,
        birthDate: row.birthDate?.trim() || null,
        deathDate: row.deathDate?.trim() || null,
        alias_name: row.alias_name?.trim() || null,
        title: row.title?.trim() || null,
        job: row.job?.trim() || null,
        resting_place: row.resting_place?.trim() || null,
        bio: row.bio?.trim() || null,
        is_alive: !row.deathDate && !row.resting_place,
      };
    });

    // Batch create or update Person nodes
    await writeQuery(
      `
      UNWIND $batch AS member
      MERGE (p:Person { id: member.id, treeId: member.treeId })
      SET p.name = member.name,
          p.gender = member.gender,
          p.generation = member.generation,
          p.birthDate = member.birthDate,
          p.deathDate = member.deathDate,
          p.alias_name = member.alias_name,
          p.title = member.title,
          p.job = member.job,
          p.resting_place = member.resting_place,
          p.bio = member.bio,
          p.is_alive = member.is_alive
      `,
      { batch: preparedMembers }
    );

    // Step 2: Establish Parent-Child and Spouse relationships
    let relsCount = 0;
    for (const row of rows) {
      const currentId = nameToIdMap.get(row.name.trim().toLowerCase());
      if (!currentId) continue;

      // Parent relationship
      if (row.parentName && row.parentName.trim()) {
        const parentId = nameToIdMap.get(row.parentName.trim().toLowerCase());
        if (parentId && parentId !== currentId) {
          await writeQuery(
            `
            MATCH (parent:Person { id: $parentId, treeId: $treeId })
            MATCH (child:Person { id: $childId, treeId: $treeId })
            MERGE (parent)-[r:PARENT_OF { treeId: $treeId }]->(child)
            `,
            { parentId, childId: currentId, treeId }
          );
          relsCount++;
        }
      }

      // Spouse relationship
      if (row.spouseName && row.spouseName.trim()) {
        const spouseId = nameToIdMap.get(row.spouseName.trim().toLowerCase());
        if (spouseId && spouseId !== currentId) {
          await writeQuery(
            `
            MATCH (p1:Person { id: $p1Id, treeId: $treeId })
            MATCH (p2:Person { id: $p2Id, treeId: $treeId })
            MERGE (p1)-[r:SPOUSE_OF { treeId: $treeId }]->(p2)
            SET r.marriageOrder = 1
            `,
            { p1Id: currentId, p2Id: spouseId, treeId }
          );
          relsCount++;
        }
      }
    }

    // Step 3: Record Audit Log
    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'IMPORT_TREE_DATA',
        details: {
          importedCount: preparedMembers.length,
          relationshipsCount: relsCount,
        },
      },
    });

    revalidatePath(`/trees/${treeId}`);
    revalidatePath(`/trees/${treeId}/directory`);
    revalidatePath(`/trees/${treeId}/book`);

    return {
      success: true,
      importedCount: preparedMembers.length,
      createdRelationshipsCount: relsCount,
    };
  } catch (error: any) {
    console.error('Error importing family tree data:', error);
    return {
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Lỗi xảy ra trong quá trình nhập dữ liệu.' },
    };
  }
}
