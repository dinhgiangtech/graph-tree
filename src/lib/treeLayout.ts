import { Edge, Node } from '@xyflow/react';
import { FamilyMember, Relationship } from '@/types/family';

export interface LayoutResult {
  nodes: Node[];
  edges: Edge[];
  stats: {
    minGeneration: number;
    maxGeneration: number;
    totalGenerations: number;
    totalMembers: number;
  };
}

const CARD_WIDTH = 240;
const CARD_HEIGHT = 80;
const SPOUSE_GAP = 40;
const SIBLING_GAP = 50;
const FAMILY_GAP = 80;
const LEVEL_HEIGHT = 260;

/**
 * Calculates a clean hierarchical family tree graph layout.
 * Couples (Spouses) are positioned side-by-side with a central Union Node.
 * Children are clustered and centered beneath their parent unit.
 */
export function calculateTreeLayout(
  members: FamilyMember[],
  relationships: Relationship[],
  activeId?: string
): LayoutResult {
  if (!members || members.length === 0) {
    return {
      nodes: [],
      edges: [],
      stats: {
        minGeneration: 1,
        maxGeneration: 1,
        totalGenerations: 0,
        totalMembers: 0,
      },
    };
  }

  // 1. Build quick lookup maps
  const memberMap = new Map<string, FamilyMember>();
  members.forEach((m) => memberMap.set(m.id, { ...m }));

  // 2. Align spouse generations (if one is missing or mismatched)
  relationships.forEach((r) => {
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

  // 3. Group children by parent(s)
  const childToParents = new Map<string, string[]>();
  relationships.forEach((r) => {
    if (r.type === 'PARENT_OF') {
      const parents = childToParents.get(r.to) || [];
      if (!parents.includes(r.from)) {
        parents.push(r.from);
      }
      childToParents.set(r.to, parents);
    }
  });

  // 4. Group members by generation
  const gens: Record<number, FamilyMember[]> = {};
  memberMap.forEach((m) => {
    const g = m.generation ?? 1;
    if (!gens[g]) gens[g] = [];
    gens[g].push(m);
  });

  const sortedGens = Object.keys(gens)
    .map(Number)
    .sort((a, b) => a - b);

  const minGen = sortedGens.length > 0 ? sortedGens[0] : 1;
  const maxGen = sortedGens.length > 0 ? sortedGens[sortedGens.length - 1] : 1;

  const flowNodes: Node[] = [];
  const flowEdges: Edge[] = [];

  // 5. Build spouse pair relationships helper
  const getCoupleKey = (id1: string, id2: string) => [id1, id2].sort().join('___');
  const spousePairs = new Set<string>();
  relationships.forEach((r) => {
    if (r.type === 'SPOUSE_OF') {
      spousePairs.add(getCoupleKey(r.from, r.to));
    }
  });

  // 6. Map parent units to their children
  const coupleChildren = new Map<string, { p1: string; p2: string; children: string[] }>();
  const singleParentChildren = new Map<string, string[]>();

  childToParents.forEach((parents, childId) => {
    if (parents.length >= 2) {
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
      const pId = parents[0];
      const children = singleParentChildren.get(pId) || [];
      children.push(childId);
      singleParentChildren.set(pId, children);
    }
  });

  // 7. Calculate positions for each generation row
  sortedGens.forEach((g) => {
    const genMembers = gens[g];
    const y = (g - minGen) * LEVEL_HEIGHT;

    const placedInGen = new Set<string>();
    const familyUnitsInGen: Array<{ members: FamilyMember[]; isCouple: boolean }> = [];

    // Group members into family units in this generation (single nodes or couples)
    genMembers.forEach((m) => {
      if (placedInGen.has(m.id)) return;

      const spouseRels = relationships.filter(
        (r) => r.type === 'SPOUSE_OF' && (r.from === m.id || r.to === m.id)
      );

      const unitMembers: FamilyMember[] = [m];
      placedInGen.add(m.id);

      spouseRels.forEach((rel) => {
        const spouseId = rel.from === m.id ? rel.to : rel.from;
        if (!placedInGen.has(spouseId)) {
          const spouse = memberMap.get(spouseId);
          if (spouse) {
            unitMembers.push(spouse);
            placedInGen.add(spouseId);
          }
        }
      });

      familyUnitsInGen.push({
        members: unitMembers,
        isCouple: unitMembers.length > 1,
      });
    });

    // Compute width of each unit and total row width
    const unitWidths = familyUnitsInGen.map((unit) => {
      const count = unit.members.length;
      return count * CARD_WIDTH + (count - 1) * SPOUSE_GAP;
    });

    const totalRowWidth =
      unitWidths.reduce((acc, w) => acc + w, 0) +
      Math.max(0, familyUnitsInGen.length - 1) * FAMILY_GAP;

    let currentX = -totalRowWidth / 2;

    familyUnitsInGen.forEach((unit, uIdx) => {
      unit.members.forEach((m, mIdx) => {
        const x = currentX + mIdx * (CARD_WIDTH + SPOUSE_GAP);
        flowNodes.push({
          id: m.id,
          type: 'familyMember',
          position: { x, y },
          data: {
            ...m,
            isSelected: m.id === activeId,
          },
        });
      });

      currentX += unitWidths[uIdx] + FAMILY_GAP;
    });
  });

  // 8. Create Union Nodes and connections for each couple
  const processedCouples = new Set<string>();

  spousePairs.forEach((key) => {
    const [id1, id2] = key.split('___');
    const node1 = flowNodes.find((n) => n.id === id1);
    const node2 = flowNodes.find((n) => n.id === id2);
    if (!node1 || !node2) return;

    processedCouples.add(key);

    const unionId = `union_${key}`;
    const isNode1Left = node1.position.x <= node2.position.x;
    const leftNode = isNode1Left ? node1 : node2;
    const rightNode = isNode1Left ? node2 : node1;

    // Position union dot centered between left and right spouse cards
    const unionX = (leftNode.position.x + CARD_WIDTH + rightNode.position.x) / 2 - 10;
    const unionY = leftNode.position.y + 38;

    flowNodes.push({
      id: unionId,
      type: 'familyUnion',
      position: { x: unionX, y: unionY },
      data: {},
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
      animated: false,
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
      animated: false,
    });

    // Edge from Union Dot -> Children
    const cInfo = coupleChildren.get(key);
    if (cInfo && cInfo.children.length > 0) {
      cInfo.children.forEach((childId) => {
        const childNode = flowNodes.find((n) => n.id === childId);
        if (!childNode) return;

        flowEdges.push({
          id: `edge_${unionId}_${childId}`,
          source: unionId,
          target: childId,
          type: 'smoothstep',
          sourceHandle: 'union-bottom',
          targetHandle: 'parent-target',
          style: { stroke: '#64748b', strokeWidth: 2 },
          animated: false,
        });
      });
    }
  });

  // 9. Single parent edges (for nodes with only 1 recorded parent)
  singleParentChildren.forEach((children, parentId) => {
    const parentNode = flowNodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    children.forEach((childId) => {
      const childNode = flowNodes.find((n) => n.id === childId);
      if (!childNode) return;

      flowEdges.push({
        id: `edge_${parentId}_${childId}`,
        source: parentId,
        target: childId,
        type: 'smoothstep',
        sourceHandle: 'child-source',
        targetHandle: 'parent-target',
        style: { stroke: '#64748b', strokeWidth: 2 },
        animated: false,
      });
    });
  });

  return {
    nodes: flowNodes,
    edges: flowEdges,
    stats: {
      minGeneration: minGen,
      maxGeneration: maxGen,
      totalGenerations: sortedGens.length,
      totalMembers: members.length,
    },
  };
}
