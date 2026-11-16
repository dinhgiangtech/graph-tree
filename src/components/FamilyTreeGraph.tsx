"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { FamilyMember, FamilyTreeData, RelationshipType } from '@/types/family';
import {
  upsertFamilyMember,
  deleteFamilyMember,
  seedDatabase,
  getFamilyTree
} from '@/app/actions';
import { calculateTreeLayout } from '@/lib/treeLayout';
import { useTreeStore } from '@/lib/useTreeStore';
import { FamilyMemberNode } from './FamilyMemberNode';
import { FamilyUnionNode } from './FamilyUnionNode';
import { EmptyTreeState } from './EmptyTreeState';
import { MemberDrawer } from './drawer/MemberDrawer';
import { ProposalsDrawer, ProposalItem } from './drawer/ProposalsDrawer';
import TreeToolbar from './graph/TreeToolbar';
import { getTreeProposals } from '@/app/actions/proposal';
import { TreeRole } from '@prisma/client';

// Custom Node types object for ReactFlow
const NODE_TYPES = {
  familyMember: FamilyMemberNode,
  familyUnion: FamilyUnionNode,
};

interface FamilyTreeGraphProps {
  initialData: FamilyTreeData;
  treeId?: string;
  branches?: Array<{ id: string; name: string }>;
  userRole?: TreeRole | null;
}

function FamilyTreeGraph({
  initialData,
  treeId,
  branches = [],
  userRole,
}: FamilyTreeGraphProps) {
  const [data, setData] = useState<FamilyTreeData>(initialData);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isProposalsOpen, setIsProposalsOpen] = useState(false);
  const [proposals, setProposals] = useState<ProposalItem[]>([]);
  const { setCenter, fitView } = useReactFlow();

  const { filter, setRootPerson } = useTreeStore();

  const fetchProposals = useCallback(async () => {
    if (!treeId || (userRole !== TreeRole.ADMIN && userRole !== TreeRole.EDITOR)) return;
    try {
      const list = await getTreeProposals(treeId);
      setProposals(list as any);
    } catch (err) {
      console.error('Error fetching proposals:', err);
    }
  }, [treeId, userRole]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  // Load / Re-fetch tree data whenever filter or treeId changes
  useEffect(() => {
    let isMounted = true;
    async function fetchFilteredData() {
      try {
        const res = await getFamilyTree(treeId, filter);
        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        console.error('Error filtering tree data:', err);
      }
    }

    // Only refetch if filter is active or if data changed
    if (filter.branchId || filter.minGeneration || filter.maxGeneration || filter.rootPersonId) {
      fetchFilteredData();
    } else {
      fetchFilteredData();
    }

    return () => {
      isMounted = false;
    };
  }, [treeId, filter]);

  // Compute flow nodes and edges
  const layoutData = useCallback(
    (members: typeof data.members, relationships: typeof data.relationships, activeId?: string) => {
      return calculateTreeLayout(members, relationships, activeId);
    },
    []
  );

  const initialLayout = useMemo(() => {
    return layoutData(data.members, data.relationships, selectedMember?.id);
  }, [data, selectedMember, layoutData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialLayout.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialLayout.edges);

  // Sync state with layout updates when data or selection changes
  useEffect(() => {
    const layout = layoutData(data.members, data.relationships, selectedMember?.id);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [data, selectedMember, layoutData, setNodes, setEdges]);

  // Center view on mount or reset
  const handleFitView = useCallback(() => {
    setTimeout(() => {
      fitView({ padding: 0.15, duration: 600 });
    }, 50);
  }, [fitView]);

  useEffect(() => {
    if (nodes.length > 0) {
      handleFitView();
    }
  }, [data.members.length, handleFitView]);

  // Node Selection Handler
  const onNodeClick = (_: any, node: Node) => {
    if (node.type === 'familyUnion') return;
    const member = data.members.find((m) => m.id === node.id);
    if (member) {
      setSelectedMember(member);
      setCenter(node.position.x + 120, node.position.y + 40, { zoom: 1.15, duration: 600 });
    }
  };

  // Member search item selected
  const handleSelectSearchResult = (member: FamilyMember) => {
    setSelectedMember(member);
    const matchedNode = nodes.find((n) => n.id === member.id);
    if (matchedNode) {
      setCenter(matchedNode.position.x + 120, matchedNode.position.y + 40, { zoom: 1.25, duration: 800 });
    }
  };

  // Focus Subtree starting from a specific ancestor
  const handleFocusSubtree = (member: FamilyMember) => {
    setRootPerson(member.id, member.name);
  };

  // Database Seed Handler
  const handleSeed = async () => {
    const seeded = await seedDatabase();
    if (seeded) {
      setData(seeded);
      setSelectedMember(null);
    }
  };

  // Create First Root Member Handler
  const handleCreateRootMember = async () => {
    const id = 'root';
    const emptyMember: FamilyMember = {
      id,
      name: 'Khởi Tổ Gia Tộc',
      gender: 'male',
      generation: 1,
      treeId: treeId || undefined,
    };
    const newM = await upsertFamilyMember(emptyMember, undefined, treeId);
    const tree = await getFamilyTree(treeId);
    setData(tree);
    setSelectedMember(newM);
  };

  // Save changes to profile details
  const handleSaveMember = async (updatedForm: FamilyMember) => {
    const updated = await upsertFamilyMember(
      { ...updatedForm, treeId: treeId || updatedForm.treeId },
      undefined,
      treeId
    );
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === updated.id ? updated : m)),
    }));
    setSelectedMember(updated);
  };

  // Delete family member
  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedMember.name} và mọi liên kết liên quan?`)) return;

    const success = await deleteFamilyMember(selectedMember.id);
    if (success) {
      setData((prev) => ({
        members: prev.members.filter((m) => m.id !== selectedMember.id),
        relationships: prev.relationships.filter(
          (r) => r.from !== selectedMember.id && r.to !== selectedMember.id
        ),
      }));
      setSelectedMember(null);
    }
  };

  // Add Relationship (Spouse / Child)
  const handleAddRelation = async (
    newMemberData: Omit<FamilyMember, 'id'>,
    relType: RelationshipType
  ) => {
    if (!selectedMember) return;

    const newMember = await upsertFamilyMember(
      { ...newMemberData, treeId: treeId || undefined },
      {
        relativeId: selectedMember.id,
        type: relType,
      },
      treeId
    );

    const refreshed = await getFamilyTree(treeId, filter);
    setData(refreshed);
    setSelectedMember(newMember);
  };

  const generations = data.members.map((m) => m.generation ?? 1);
  const maxGenerations = data.members.length > 0 ? Math.max(...generations) : 0;

  const pendingCount = proposals.filter((p) => p.status === 'PENDING').length;

  const handleProposalReviewed = async () => {
    const refreshed = await getFamilyTree(treeId, filter);
    setData(refreshed);
    fetchProposals();
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans relative">
      {/* ==========================================
          LEFT SIDE: THE TREE VISUAL CANVAS
          ========================================== */}
      <div className="flex-1 h-full relative">
        {/* Top Interactive Toolbar (Search, Filter, FitView, Branches, Proposals) */}
        <TreeToolbar
          allMembers={data.members}
          branches={branches}
          onSelectMember={handleSelectSearchResult}
          onFitView={handleFitView}
          displayedCount={data.members.length}
          totalCount={initialData.members.length || data.members.length}
          maxGenerations={maxGenerations}
          userRole={userRole}
          onOpenProposals={() => setIsProposalsOpen(true)}
          pendingProposalsCount={pendingCount}
        />

        {/* Floating Database seed button if empty */}
        {data.members.length === 0 && (
          <EmptyTreeState
            onSeedDatabase={handleSeed}
            onCreateRootMember={handleCreateRootMember}
          />
        )}

        {/* The React Flow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={NODE_TYPES}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          className="bg-slate-50 dark:bg-slate-900/50"
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          <Controls className="!bg-white dark:!bg-slate-800 !border-slate-200 dark:!border-slate-700 !shadow-lg !rounded-2xl overflow-hidden !bottom-4 !left-4" />
          <MiniMap
            zoomable
            pannable
            className="!bg-white/85 dark:!bg-slate-800/85 !border-slate-200 dark:!border-slate-700 !shadow-lg !rounded-2xl !bottom-4 !right-4"
            nodeColor={(node) => {
              if (node.type === 'familyUnion') return 'transparent';
              if ((node.data as any)?.gender === 'male') return '#93c5fd';
              if ((node.data as any)?.gender === 'female') return '#fda4af';
              return '#cbd5e1';
            }}
          />
        </ReactFlow>
      </div>

      {/* ==========================================
          RIGHT SIDE: DETAILS DRAWER PANEL
          ========================================== */}
      <MemberDrawer
        member={selectedMember}
        allMembers={data.members}
        relationships={data.relationships}
        onSelectMember={handleSelectSearchResult}
        onClose={() => setSelectedMember(null)}
        onSaveMember={handleSaveMember}
        onDeleteMember={handleDeleteMember}
        onAddRelation={handleAddRelation}
        treeId={treeId}
      />

      {/* ==========================================
          PROPOSALS QUEUE DRAWER (ADMIN / EDITOR)
          ========================================== */}
      {treeId && (
        <ProposalsDrawer
          isOpen={isProposalsOpen}
          onClose={() => setIsProposalsOpen(false)}
          proposals={proposals}
          treeId={treeId}
          onProposalReviewed={handleProposalReviewed}
        />
      )}
    </div>
  );
}

// Wrap with ReactFlowProvider to enable using useReactFlow controls inside FamilyTreeGraph
export default function FamilyTreeGraphWrapper(props: FamilyTreeGraphProps) {
  return (
    <ReactFlowProvider>
      <FamilyTreeGraph {...props} />
    </ReactFlowProvider>
  );
}
