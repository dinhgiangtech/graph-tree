import { Edge, Node } from '@xyflow/react';
import { FamilyMember, Relationship } from '@/types/family';

export interface LayoutResult {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Calculates graph layout positions (X, Y coordinates) for nodes and unified edge connectors.
 * Couples (Father & Mother) are merged into a single union point branching down to their children.
 */
export function calculateTreeLayout(
  members: FamilyMember[],
  relationships: Relationship[],
  activeId?: string
): LayoutResult {
  if (members.length === 0) {
    return { nodes: [], edges: [] };
  }

  // 1. Build a quick lookup for member by id
  const memberMap = new Map<string, FamilyMember>();
  members.forEach(m => memberMap.set(m.id, { ...m }));

  // 2. Ensure spouse generation alignment: if spouse generation is missing or mismatched, synchronize
  relationships.forEach(r => {
    if (r.type === 'SPOUSE_OF') {
      const p1 = memberMap.get(r.from);
      const p2 = memberMap.get(r.to);
      if (p1 && p2) {
        if (p1.generation && !p2.generation) {
          p2.generation = p1.generation;
        } else if (p2.generation && !p1.generation) {
          p1.generation = p2.generation;
        }
      }
    }
  });

  // 3. Group members by generation
  const gens: Record<number, FamilyMember[]> = {};
  memberMap.forEach(m => {
    const g = m.generation ?? 1;
    if (!gens[g]) gens[g] = [];
    gens[g].push(m);
  });

  const flowNodes: Node[] = [];
  const flowEdges: Edge[] = [];

  const sortedGens = Object.keys(gens)
    .map(Number)
    .sort((a, b) => a - b);

  const minGen = sortedGens.length > 0 ? sortedGens[0] : 1;

  // 4. Place member nodes in each generation row, keeping couples side-by-side
  sortedGens.forEach(g => {
    const genMembers = gens[g];
    const y = (g - minGen) * 280; // Vertical spacing between generations

    const placed = new Set<string>();
    const sortedInGen: FamilyMember[] = [];

    genMembers.forEach(m => {
      if (placed.has(m.id)) return;

      sortedInGen.push(m);
      placed.add(m.id);

      // Find all spouses (both directions: from -> to or to -> from)
      const spouseRels = relationships.filter(
        r => r.type === 'SPOUSE_OF' && (r.from === m.id || r.to === m.id)
      );

      spouseRels.forEach(rel => {
        const spouseId = rel.from === m.id ? rel.to : rel.from;
        if (!placed.has(spouseId)) {
          const spouse = memberMap.get(spouseId);
          if (spouse) {
            sortedInGen.push(spouse);
            placed.add(spouse.id);
          }
        }
      });
    });

    // Compute horizontal spacing
    const nodeWidth = 280;
    const totalWidth = sortedInGen.length * nodeWidth;
    const startX = -totalWidth / 2;

    sortedInGen.forEach((m, idx) => {
      const x = startX + idx * nodeWidth + nodeWidth / 2 - 120;
      flowNodes.push({
        id: m.id,
        type: 'familyMember',
        position: { x, y },
        data: { ...m, isSelected: m.id === activeId }
      });
    });
  });

  // 5. Build Map of Spouse Couples
  // Key format: smallerId___largerId
  const getCoupleKey = (id1: string, id2: string) => [id1, id2].sort().join('___');

  const spousePairs = new Set<string>();
  relationships.forEach(r => {
    if (r.type === 'SPOUSE_OF') {
      spousePairs.add(getCoupleKey(r.from, r.to));
    }
  });

  // 6. Map each child to their parent(s)
  const childParentsMap = new Map<string, string[]>();
  relationships.forEach(r => {
    if (r.type === 'PARENT_OF') {
      const parents = childParentsMap.get(r.to) || [];
      if (!parents.includes(r.from)) {
        parents.push(r.from);
      }
      childParentsMap.set(r.to, parents);
    }
  });

  // 7. Group children by parent couple or single parent
  // coupleChildren: Map<coupleKey, { p1: string, p2: string, children: string[] }>
  const coupleChildren = new Map<string, { p1: string; p2: string; children: string[] }>();
  // singleParentChildren: Map<parentId, string[]>
  const singleParentChildren = new Map<string, string[]>();

  childParentsMap.forEach((parents, childId) => {
    if (parents.length >= 2) {
      // Check if any two parents form a spouse pair
      let foundCouple = false;
      for (let i = 0; i < parents.length; i++) {
        for (let j = i + 1; j < parents.length; j++) {
          const key = getCoupleKey(parents[i], parents[j]);
          if (spousePairs.has(key) || !foundCouple) {
            foundCouple = true;
            if (!coupleChildren.has(key)) {
              coupleChildren.set(key, { p1: parents[i], p2: parents[j], children: [] });
            }
            coupleChildren.get(key)!.children.push(childId);
            break;
          }
        }
        if (foundCouple) break;
      }
    } else if (parents.length === 1) {
      const parentId = parents[0];
      const children = singleParentChildren.get(parentId) || [];
      children.push(childId);
      singleParentChildren.set(parentId, children);
    }
  });

  // 8. Create Family Union Nodes & Unified Edges for each couple
  const createdUnionKeys = new Set<string>();

  // Process all spouse pairs (both those with children and without children)
  spousePairs.forEach(key => {
    const [id1, id2] = key.split('___');
    const node1 = flowNodes.find(n => n.id === id1);
    const node2 = flowNodes.find(n => n.id === id2);
    if (!node1 || !node2) return;

    createdUnionKeys.add(key);

    const unionId = `union_${key}`;
    const isNode1Left = node1.position.x < node2.position.x;
    const leftNode = isNode1Left ? node1 : node2;
    const rightNode = isNode1Left ? node2 : node1;

    // Position union dot exactly halfway between the cards
    const unionX = (leftNode.position.x + 240 + rightNode.position.x) / 2 - 10;
    const unionY = leftNode.position.y + 35; // Center of the 80px card height

    // Add the Union Dot Node
    flowNodes.push({
      id: unionId,
      type: 'familyUnion',
      position: { x: unionX, y: unionY },
      data: {}
    });

    // Edge from Left Spouse -> Union Dot
    flowEdges.push({
      id: `edge_${leftNode.id}_${unionId}`,
      source: leftNode.id,
      target: unionId,
      type: 'straight',
      sourceHandle: 'right-source',
      targetHandle: 'union-left',
      style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4 4' },
      animated: false
    });

    // Edge from Right Spouse -> Union Dot
    flowEdges.push({
      id: `edge_${rightNode.id}_${unionId}`,
      source: rightNode.id,
      target: unionId,
      type: 'straight',
      sourceHandle: 'left-source',
      targetHandle: 'union-right',
      style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4 4' },
      animated: false
    });

    // Single unified edge branching down from Union Dot -> each Child
    const coupleInfo = coupleChildren.get(key);
    if (coupleInfo && coupleInfo.children.length > 0) {
      coupleInfo.children.forEach(childId => {
        const childNode = flowNodes.find(n => n.id === childId);
        if (!childNode) return;

        flowEdges.push({
          id: `edge_${unionId}_${childId}`,
          source: unionId,
          target: childId,
          type: 'smoothstep',
          sourceHandle: 'union-bottom',
          targetHandle: 'parent-target',
          style: { stroke: '#64748b', strokeWidth: 2 },
          animated: false
        });
      });
    }
  });

  // 9. Process any couples that have children but weren't in spousePairs
  coupleChildren.forEach((info, key) => {
    if (createdUnionKeys.has(key)) return;
    const node1 = flowNodes.find(n => n.id === info.p1);
    const node2 = flowNodes.find(n => n.id === info.p2);
    if (!node1 || !node2) return;

    createdUnionKeys.add(key);
    const unionId = `union_${key}`;
    const isNode1Left = node1.position.x < node2.position.x;
    const leftNode = isNode1Left ? node1 : node2;
    const rightNode = isNode1Left ? node2 : node1;

    const unionX = (leftNode.position.x + 240 + rightNode.position.x) / 2 - 10;
    const unionY = leftNode.position.y + 35;

    flowNodes.push({
      id: unionId,
      type: 'familyUnion',
      position: { x: unionX, y: unionY },
      data: {}
    });

    flowEdges.push({
      id: `edge_${leftNode.id}_${unionId}`,
      source: leftNode.id,
      target: unionId,
      type: 'straight',
      sourceHandle: 'right-source',
      targetHandle: 'union-left',
      style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4 4' },
      animated: false
    });

    flowEdges.push({
      id: `edge_${rightNode.id}_${unionId}`,
      source: rightNode.id,
      target: unionId,
      type: 'straight',
      sourceHandle: 'left-source',
      targetHandle: 'union-right',
      style: { stroke: '#f43f5e', strokeWidth: 2, strokeDasharray: '4 4' },
      animated: false
    });

    info.children.forEach(childId => {
      const childNode = flowNodes.find(n => n.id === childId);
      if (!childNode) return;

      flowEdges.push({
        id: `edge_${unionId}_${childId}`,
        source: unionId,
        target: childId,
        type: 'smoothstep',
        sourceHandle: 'union-bottom',
        targetHandle: 'parent-target',
        style: { stroke: '#64748b', strokeWidth: 2 },
        animated: false
      });
    });
  });

  // 10. Process single parent connections (if child only has 1 recorded parent)
  singleParentChildren.forEach((children, parentId) => {
    const parentNode = flowNodes.find(n => n.id === parentId);
    if (!parentNode) return;

    children.forEach(childId => {
      const childNode = flowNodes.find(n => n.id === childId);
      if (!childNode) return;

      flowEdges.push({
        id: `edge_${parentId}_${childId}`,
        source: parentId,
        target: childId,
        type: 'smoothstep',
        sourceHandle: 'child-source',
        targetHandle: 'parent-target',
        style: { stroke: '#64748b', strokeWidth: 2 },
        animated: false
      });
    });
  });

  return { nodes: flowNodes, edges: flowEdges };
}
