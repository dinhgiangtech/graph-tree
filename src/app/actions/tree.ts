"use server";

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { readQuery, writeQuery } from '@/lib/neo4j';
import { TreeRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface TreeSummary {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  originPlace: string | null;
  role: TreeRole;
  memberCount: number;
  isPublic: boolean;
  passcode: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generate a URL-friendly slug from string (handles Vietnamese characters)
 */
function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Helper to assert that the current user has ADMIN role on the tree
 */
async function requireTreeAdmin(treeId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  const membership = await prisma.treeMembership.findUnique({
    where: {
      treeId_userId: {
        treeId,
        userId: user.id,
      },
    },
  });

  if (!membership || membership.role !== TreeRole.ADMIN) {
    throw new Error('FORBIDDEN');
  }

  return { user, membership };
}

/**
 * Creates a new Family Tree and assigns the creator as ADMIN
 */
export async function createFamilyTree(data: {
  name: string;
  description?: string;
  originPlace?: string;
  isPublic?: boolean;
  passcode?: string;
  initialBranchName?: string;
}): Promise<ActionResponse<{ treeId: string; slug: string }>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Vui lòng đăng nhập để tạo cây gia phả.' },
    };
  }

  const name = data.name.trim();
  if (!name) {
    return {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Tên dòng họ không được để trống.' },
    };
  }

  try {
    const baseSlug = slugify(name) || 'dong-ho';
    const uniqueSuffix = Math.random().toString(36).substring(2, 7);
    const slug = `${baseSlug}-${uniqueSuffix}`;

    const tree = await prisma.tree.create({
      data: {
        name,
        slug,
        description: data.description?.trim() || null,
        originPlace: data.originPlace?.trim() || null,
        isPublic: !!data.isPublic,
        passcode: data.passcode?.trim() || null,
        memberships: {
          create: {
            userId: user.id,
            role: TreeRole.ADMIN,
          },
        },
        branches: data.initialBranchName?.trim()
          ? {
              create: {
                name: data.initialBranchName.trim(),
                order: 1,
              },
            }
          : {
              create: {
                name: 'Chi Trưởng',
                order: 1,
              },
            },
        auditLogs: {
          create: {
            userId: user.id,
            action: 'CREATE_TREE',
            details: {
              name,
              originPlace: data.originPlace || null,
            },
          },
        },
      },
      include: {
        branches: true,
      },
    });

    revalidatePath('/dashboard');

    return {
      success: true,
      data: {
        treeId: tree.id,
        slug: tree.slug,
      },
    };
  } catch (error: any) {
    console.error('Error creating family tree:', error);
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Đã có lỗi xảy ra khi tạo cây gia phả. Vui lòng thử lại.',
      },
    };
  }
}

/**
 * Gets all family trees the current user is a member/admin of
 */
export async function getMyTrees(): Promise<ActionResponse<TreeSummary[]>> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Vui lòng đăng nhập.' },
    };
  }

  try {
    const memberships = await prisma.treeMembership.findMany({
      where: { userId: user.id },
      include: {
        tree: {
          include: {
            branches: true,
            _count: {
              select: { memberships: true },
            },
          },
        },
      },
      orderBy: {
        tree: {
          updatedAt: 'desc',
        },
      },
    });

    // Query Neo4j member counts for each treeId concurrently
    const treeSummaries: TreeSummary[] = await Promise.all(
      memberships.map(async (m) => {
        let neo4jCount = 0;
        try {
          const res = await readQuery<{ count: number }>(
            `MATCH (p:Person {treeId: $treeId}) RETURN count(p) as count`,
            { treeId: m.treeId }
          );
          if (res && res.length > 0 && typeof res[0].count === 'number') {
            neo4jCount = res[0].count;
          }
        } catch {
          neo4jCount = 0;
        }

        return {
          id: m.tree.id,
          name: m.tree.name,
          slug: m.tree.slug,
          description: m.tree.description,
          originPlace: m.tree.originPlace,
          role: m.role,
          memberCount: neo4jCount,
          isPublic: m.tree.isPublic,
          passcode: m.tree.passcode,
          createdAt: m.tree.createdAt,
          updatedAt: m.tree.updatedAt,
        };
      })
    );

    return {
      success: true,
      data: treeSummaries,
    };
  } catch (error: any) {
    console.error('Error fetching user trees:', error);
    return {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Không thể tải danh sách cây gia phả.',
      },
    };
  }
}

/**
 * Gets details of a specific tree and the user's role in it
 */
export async function getTreeDetails(treeId: string) {
  const user = await getCurrentUser();

  try {
    const tree = await prisma.tree.findUnique({
      where: { id: treeId },
      include: {
        branches: {
          orderBy: { order: 'asc' },
        },
        memberships: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
          orderBy: {
            joinedAt: 'asc',
          },
        },
      },
    });

    if (!tree) {
      return null;
    }

    const userMembership = user
      ? tree.memberships.find((m) => m.userId === user.id)
      : null;

    return {
      tree,
      currentUserRole: userMembership ? userMembership.role : null,
      isOwnerOrAdmin: userMembership?.role === TreeRole.ADMIN,
      canEdit:
        userMembership?.role === TreeRole.ADMIN ||
        userMembership?.role === TreeRole.EDITOR,
    };
  } catch (error) {
    console.error('Error getting tree details:', error);
    return null;
  }
}

/**
 * Update general tree settings and privacy (ADMIN only)
 */
export async function updateTreeSettings(
  treeId: string,
  data: {
    name?: string;
    description?: string | null;
    originPlace?: string | null;
    isPublic?: boolean;
    passcode?: string | null;
  }
): Promise<ActionResponse<void>> {
  try {
    const { user } = await requireTreeAdmin(treeId);

    const updatePayload: any = {};
    if (data.name !== undefined) {
      const trimmed = data.name.trim();
      if (!trimmed) {
        return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Tên cây không được để trống.' } };
      }
      updatePayload.name = trimmed;
    }
    if (data.description !== undefined) updatePayload.description = data.description?.trim() || null;
    if (data.originPlace !== undefined) updatePayload.originPlace = data.originPlace?.trim() || null;
    if (data.isPublic !== undefined) updatePayload.isPublic = !!data.isPublic;
    if (data.passcode !== undefined) updatePayload.passcode = data.passcode?.trim() || null;

    await prisma.tree.update({
      where: { id: treeId },
      data: updatePayload,
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'UPDATE_TREE_SETTINGS',
        details: updatePayload,
      },
    });

    revalidatePath(`/trees/${treeId}`);
    revalidatePath(`/trees/${treeId}/settings`);
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền quản trị cây gia phả này.' } };
    }
    console.error('Error updating tree settings:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể lưu cài đặt.' } };
  }
}

/**
 * Update a member's role in the tree (ADMIN only)
 */
export async function updateTreeMemberRole(
  treeId: string,
  targetUserId: string,
  newRole: TreeRole
): Promise<ActionResponse<void>> {
  try {
    const { user } = await requireTreeAdmin(treeId);

    // If changing the current user's role away from ADMIN, ensure at least one other ADMIN remains
    if (user.id === targetUserId && newRole !== TreeRole.ADMIN) {
      const adminCount = await prisma.treeMembership.count({
        where: {
          treeId,
          role: TreeRole.ADMIN,
        },
      });

      if (adminCount <= 1) {
        return {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Không thể hạ quyền vì bạn là Quản trị viên (Admin) duy nhất của cây này. Hãy chuyển quyền Admin cho người khác trước.',
          },
        };
      }
    }

    await prisma.treeMembership.update({
      where: {
        treeId_userId: {
          treeId,
          userId: targetUserId,
        },
      },
      data: {
        role: newRole,
      },
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'UPDATE_MEMBER_ROLE',
        details: { targetUserId, newRole },
      },
    });

    revalidatePath(`/trees/${treeId}/settings`);
    return { success: true };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền thực hiện thao tác này.' } };
    }
    console.error('Error updating member role:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể đổi vai trò thành viên.' } };
  }
}

/**
 * Add / Invite a registered user to the tree by email (ADMIN only)
 */
export async function inviteTreeMember(
  treeId: string,
  email: string,
  role: TreeRole = TreeRole.MEMBER
): Promise<ActionResponse<void>> {
  try {
    const { user } = await requireTreeAdmin(treeId);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Vui lòng nhập email.' } };
    }

    const targetUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!targetUser) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'Không tìm thấy tài khoản nào với email này. Người dùng cần đăng ký tài khoản trước khi được mời.',
        },
      };
    }

    // Check if already a member
    const existing = await prisma.treeMembership.findUnique({
      where: {
        treeId_userId: {
          treeId,
          userId: targetUser.id,
        },
      },
    });

    if (existing) {
      return {
        success: false,
        error: {
          code: 'ALREADY_MEMBER',
          message: 'Người dùng này đã là thành viên của cây gia phả.',
        },
      };
    }

    await prisma.treeMembership.create({
      data: {
        treeId,
        userId: targetUser.id,
        role,
      },
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'INVITE_MEMBER',
        details: { invitedUserId: targetUser.id, email: normalizedEmail, role },
      },
    });

    revalidatePath(`/trees/${treeId}/settings`);
    return { success: true };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền quản trị cây này.' } };
    }
    console.error('Error inviting member:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể mời thành viên.' } };
  }
}

/**
 * Remove a member from the tree (ADMIN only)
 */
export async function removeTreeMember(
  treeId: string,
  targetUserId: string
): Promise<ActionResponse<void>> {
  try {
    const { user } = await requireTreeAdmin(treeId);

    if (user.id === targetUserId) {
      return {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Bạn không thể tự xóa chính mình khỏi cây. Vui lòng chuyển quyền Admin trước hoặc xóa cây.',
        },
      };
    }

    await prisma.treeMembership.delete({
      where: {
        treeId_userId: {
          treeId,
          userId: targetUserId,
        },
      },
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'REMOVE_MEMBER',
        details: { removedUserId: targetUserId },
      },
    });

    revalidatePath(`/trees/${treeId}/settings`);
    return { success: true };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền quản trị cây này.' } };
    }
    console.error('Error removing member:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể xóa thành viên.' } };
  }
}

/**
 * Create a new Branch for the tree (ADMIN only)
 */
export async function createBranch(
  treeId: string,
  name: string
): Promise<ActionResponse<{ id: string; name: string }>> {
  try {
    const { user } = await requireTreeAdmin(treeId);

    const trimmed = name.trim();
    if (!trimmed) {
      return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Tên chi nhánh không được để trống.' } };
    }

    const branchCount = await prisma.treeBranch.count({ where: { treeId } });

    const branch = await prisma.treeBranch.create({
      data: {
        treeId,
        name: trimmed,
        order: branchCount + 1,
      },
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'CREATE_BRANCH',
        details: { branchId: branch.id, name: branch.name },
      },
    });

    revalidatePath(`/trees/${treeId}/settings`);
    revalidatePath(`/trees/${treeId}`);
    return { success: true, data: { id: branch.id, name: branch.name } };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền quản trị.' } };
    }
    console.error('Error creating branch:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể tạo chi nhánh mới.' } };
  }
}

/**
 * Delete a branch (ADMIN only)
 */
export async function deleteBranch(
  treeId: string,
  branchId: string
): Promise<ActionResponse<void>> {
  try {
    const { user } = await requireTreeAdmin(treeId);

    await prisma.treeBranch.delete({
      where: { id: branchId },
    });

    await prisma.auditLog.create({
      data: {
        treeId,
        userId: user.id,
        action: 'DELETE_BRANCH',
        details: { branchId },
      },
    });

    revalidatePath(`/trees/${treeId}/settings`);
    revalidatePath(`/trees/${treeId}`);
    return { success: true };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền quản trị.' } };
    }
    console.error('Error deleting branch:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể xóa chi nhánh.' } };
  }
}

/**
 * Delete an entire family tree and all its nodes in Neo4j and PostgreSQL (ADMIN only)
 */
export async function deleteTree(treeId: string): Promise<ActionResponse<void>> {
  try {
    await requireTreeAdmin(treeId);

    // Delete graph nodes and relationships in Neo4j with treeId
    try {
      await writeQuery(`MATCH (p:Person {treeId: $treeId}) DETACH DELETE p`, { treeId });
    } catch (neo4jErr) {
      console.warn('Notice deleting Neo4j nodes for tree:', neo4jErr);
    }

    // Delete tree in PostgreSQL (cascades to memberships, branches, proposals, auditLogs)
    await prisma.tree.delete({
      where: { id: treeId },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return { success: false, error: { code: error.message, message: 'Bạn không có quyền xóa cây gia phả này.' } };
    }
    console.error('Error deleting tree:', error);
    return { success: false, error: { code: 'INTERNAL_ERROR', message: 'Không thể xóa cây gia phả.' } };
  }
}

/**
 * Get audit logs for a tree (ADMIN only)
 */
export async function getTreeAuditLogs(treeId: string) {
  try {
    await requireTreeAdmin(treeId);

    const logs = await prisma.auditLog.findMany({
      where: { treeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return logs;
  } catch (error) {
    console.error('Error fetching tree audit logs:', error);
    return [];
  }
}

