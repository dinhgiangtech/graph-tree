"use server";

import { readQuery, writeQuery } from '@/lib/neo4j';
import { FamilyMember, Relationship, FamilyTreeData, RelationshipType } from '@/types/family';
import { randomUUID } from 'crypto';

/**
 * Fetches all family members and relationships from the database (e.g. 24 generations).
 */
export async function getFamilyTree(): Promise<FamilyTreeData> {
  try {
    const membersResult = await readQuery<{ member: any }>(
      `MATCH (p:Person)
       RETURN {
         id: p.id,
         name: coalesce(p.full_name, p.name, p.id),
         gender: CASE toLower(coalesce(p.gender, 'other'))
                   WHEN 'male' THEN 'male'
                   WHEN 'female' THEN 'female'
                   ELSE 'other'
                 END,
         title: p.title,
         alias_name: p.alias_name,
         birthDate: p.birthDate,
         deathDate: p.deathDate,
         birthPlace: p.birthPlace,
         current_residence: p.current_residence,
         job: coalesce(p.job, p.title),
         bio: coalesce(p.bio, p.title),
         avatar: p.avatar,
         generation: coalesce(p.generation, 1),
         is_alive: p.is_alive
       } as member`
    );

    const relsResult = await readQuery<{ rel: any }>(
      `MATCH (p1:Person)-[r:PARENT_OF|FATHER_OF|MOTHER_OF|ADOPTED_BY|ADOPTIVE_PARENT_OF|SPOUSE_OF|MARRIED_TO]->(p2:Person)
       RETURN {
         id: coalesce(r.id, elementId(r), p1.id + '_' + type(r) + '_' + p2.id),
         from: p1.id,
         to: p2.id,
         type: CASE
                 WHEN type(r) IN ['FATHER_OF', 'MOTHER_OF', 'PARENT_OF', 'ADOPTED_BY', 'ADOPTIVE_PARENT_OF'] THEN 'PARENT_OF'
                 WHEN type(r) IN ['MARRIED_TO', 'SPOUSE_OF'] THEN 'SPOUSE_OF'
                 ELSE type(r)
               END
       } as rel`
    );

    return {
      members: membersResult.map(r => r.member),
      relationships: relsResult.map(r => r.rel)
    };
  } catch (error) {
    console.error('Error fetching family tree:', error);
    return { members: [], relationships: [] };
  }
}

/**
 * Adds or updates a family member.
 * If creating a child/spouse, you can pass relativeId and connectionType to automatically link them.
 */
export async function upsertFamilyMember(
  member: Omit<FamilyMember, 'id'> & { id?: string },
  connection?: { relativeId: string; type: RelationshipType }
): Promise<FamilyMember> {
  const id = member.id || randomUUID();
  let generation = member.generation ?? 1;

  // Calculate generation if a connection is specified
  if (connection && !member.id) {
    const relativeResult = await readQuery<{ generation: number }>(
      `MATCH (p:Person {id: $relativeId}) RETURN p.generation as generation`,
      { relativeId: connection.relativeId }
    );
    
    if (relativeResult.length > 0) {
      const relGen = relativeResult[0].generation ?? 1;
      if (connection.type === 'PARENT_OF' || connection.type === 'FATHER_OF' || connection.type === 'MOTHER_OF') {
        generation = relGen + 1;
      } else if (connection.type === 'SPOUSE_OF' || connection.type === 'MARRIED_TO') {
        generation = relGen;
      }
    }
  }

  const query = `
    MERGE (p:Person {id: $id})
    SET p.name = $name,
        p.full_name = $name,
        p.gender = $gender,
        p.title = $title,
        p.birthDate = $birthDate,
        p.deathDate = $deathDate,
        p.birthPlace = $birthPlace,
        p.job = $job,
        p.bio = $bio,
        p.avatar = $avatar,
        p.generation = $generation
    RETURN {
      id: p.id,
      name: coalesce(p.full_name, p.name),
      gender: toLower(coalesce(p.gender, 'other')),
      title: p.title,
      birthDate: p.birthDate,
      deathDate: p.deathDate,
      birthPlace: p.birthPlace,
      job: p.job,
      bio: p.bio,
      avatar: p.avatar,
      generation: p.generation
    } as member
  `;

  const params = {
    id,
    name: member.name,
    gender: (member.gender || 'male').toUpperCase(),
    title: member.title || '',
    birthDate: member.birthDate || '',
    deathDate: member.deathDate || '',
    birthPlace: member.birthPlace || '',
    job: member.job || '',
    bio: member.bio || '',
    avatar: member.avatar || '',
    generation
  };

  const result = await writeQuery<{ member: any }>(query, params);
  const upsertedMember = result[0].member;

  // If a connection is specified, create the relationship
  if (connection && !member.id) {
    if (connection.type === 'PARENT_OF' || connection.type === 'FATHER_OF' || connection.type === 'MOTHER_OF') {
      await addRelationship(connection.relativeId, id, 'PARENT_OF');
    } else if (connection.type === 'SPOUSE_OF' || connection.type === 'MARRIED_TO') {
      await addRelationship(connection.relativeId, id, 'SPOUSE_OF');
    }
  }

  return upsertedMember;
}

/**
 * Deletes a family member and all their relationships.
 */
export async function deleteFamilyMember(id: string): Promise<boolean> {
  try {
    await writeQuery(
      `MATCH (p:Person {id: $id})
       DETACH DELETE p`,
      { id }
    );
    return true;
  } catch (error) {
    console.error(`Error deleting family member ${id}:`, error);
    return false;
  }
}

/**
 * Creates a relationship between two family members.
 */
export async function addRelationship(
  fromId: string,
  toId: string,
  type: RelationshipType
): Promise<Relationship> {
  const relId = randomUUID();
  const relType = type === 'MARRIED_TO' ? 'SPOUSE_OF' : type === 'FATHER_OF' || type === 'MOTHER_OF' ? 'PARENT_OF' : type;
  
  const query = `
    MATCH (p1:Person {id: $fromId})
    MATCH (p2:Person {id: $toId})
    MERGE (p1)-[r:${relType}]->(p2)
    ON CREATE SET r.id = $relId
    RETURN {
      id: r.id,
      from: p1.id,
      to: p2.id,
      type: type(r)
    } as rel
  `;

  const result = await writeQuery<{ rel: any }>(query, { fromId, toId, relId });
  
  if (relType === 'SPOUSE_OF') {
    await writeQuery(
      `MATCH (p1:Person {id: $fromId}), (p2:Person {id: $toId})
       SET p2.generation = p1.generation`
      , { fromId, toId }
    );
  }
  
  return result[0].rel;
}

/**
 * Deletes a relationship.
 */
export async function deleteRelationship(fromId: string, toId: string, type: RelationshipType): Promise<boolean> {
  try {
    await writeQuery(
      `MATCH (p1:Person {id: $fromId})-[r:${type}]->(p2:Person {id: $toId})
       DELETE r`,
      { fromId, toId }
    );
    return true;
  } catch (error) {
    console.error(`Error deleting relationship ${type} from ${fromId} to ${toId}:`, error);
    return false;
  }
}

/**
 * Seeds the database with a default 3-generation family tree if empty.
 */
export async function seedDatabase(): Promise<FamilyTreeData | null> {
  try {
    const check = await readQuery<{ count: number }>('MATCH (p:Person) RETURN count(p) as count');
    if (check.length > 0 && check[0].count > 0) {
      return null;
    }

    console.log('Seeding family tree database...');

    const members = [
      { id: 'grandpa', name: 'Nguyễn Văn An', gender: 'male', birthDate: '1945-05-12', birthPlace: 'Hà Nội', job: 'Nhà giáo về hưu', bio: 'Người sáng lập gia tộc Nguyễn Văn', generation: 1 },
      { id: 'grandma', name: 'Lê Thị Bình', gender: 'female', birthDate: '1948-09-20', birthPlace: 'Nam Định', job: 'Bác sĩ về hưu', bio: 'Người giữ ngọn lửa yêu thương của gia đình', generation: 1 },
      { id: 'father', name: 'Nguyễn Văn Hùng', gender: 'male', birthDate: '1972-03-15', birthPlace: 'Hà Nội', job: 'Kỹ sư công nghệ', bio: 'Con trai cả của ông bà An - Bình', generation: 2 },
      { id: 'mother', name: 'Trần Thị Mai', gender: 'female', birthDate: '1975-07-22', birthPlace: 'Hải Phòng', job: 'Giáo viên', bio: 'Vợ của ông Hùng', generation: 2 },
      { id: 'uncle', name: 'Nguyễn Văn Minh', gender: 'male', birthDate: '1976-11-05', birthPlace: 'Hà Nội', job: 'Kinh doanh', bio: 'Con trai thứ hai của ông bà An - Bình', generation: 2 },
      { id: 'aunt', name: 'Phạm Thị Lan', gender: 'female', birthDate: '1980-01-18', birthPlace: 'Thái Bình', job: 'Kế toán', bio: 'Vợ của ông Minh', generation: 2 },
      { id: 'son_1', name: 'Nguyễn Văn Hải', gender: 'male', birthDate: '2000-10-10', birthPlace: 'Hà Nội', job: 'Lập trình viên', bio: 'Con trai cả của bố Hùng mẹ Mai', generation: 3 },
      { id: 'daughter_1', name: 'Nguyễn Thị Hoa', gender: 'female', birthDate: '2005-04-04', birthPlace: 'Hà Nội', job: 'Sinh viên', bio: 'Con gái út của bố Hùng mẹ Mai', generation: 3 },
      { id: 'cousin_1', name: 'Nguyễn Văn Cường', gender: 'male', birthDate: '2008-08-08', birthPlace: 'Hà Nội', job: 'Học sinh', bio: 'Con trai của chú Minh cô Lan', generation: 3 }
    ];

    for (const m of members) {
      await writeQuery(
        `CREATE (p:Person {
          id: $id,
          name: $name,
          full_name: $name,
          gender: $gender,
          birthDate: $birthDate,
          birthPlace: $birthPlace,
          job: $job,
          bio: $bio,
          generation: $generation
        })`,
        m
      );
    }

    const relationships = [
      { from: 'grandpa', to: 'grandma', type: 'SPOUSE_OF' },
      { from: 'grandpa', to: 'father', type: 'PARENT_OF' },
      { from: 'grandma', to: 'father', type: 'PARENT_OF' },
      { from: 'grandpa', to: 'uncle', type: 'PARENT_OF' },
      { from: 'grandma', to: 'uncle', type: 'PARENT_OF' },
      { from: 'father', to: 'mother', type: 'SPOUSE_OF' },
      { from: 'uncle', to: 'aunt', type: 'SPOUSE_OF' },
      { from: 'father', to: 'son_1', type: 'PARENT_OF' },
      { from: 'mother', to: 'son_1', type: 'PARENT_OF' },
      { from: 'father', to: 'daughter_1', type: 'PARENT_OF' },
      { from: 'mother', to: 'daughter_1', type: 'PARENT_OF' },
      { from: 'uncle', to: 'cousin_1', type: 'PARENT_OF' },
      { from: 'aunt', to: 'cousin_1', type: 'PARENT_OF' }
    ];

    for (const r of relationships) {
      const relId = randomUUID();
      await writeQuery(
        `MATCH (p1:Person {id: $from})
         MATCH (p2:Person {id: $to})
         CREATE (p1)-[r:${r.type} {id: $relId}]->(p2)`,
        { from: r.from, to: r.to, relId }
      );
    }

    return getFamilyTree();
  } catch (error) {
    console.error('Error seeding database:', error);
    return null;
  }
}
