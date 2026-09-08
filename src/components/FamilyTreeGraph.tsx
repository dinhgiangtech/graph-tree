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
import { FamilyMemberNode } from './FamilyMemberNode';
import { FamilyUnionNode } from './FamilyUnionNode';
import { MemberSearch } from './MemberSearch';
import { EmptyTreeState } from './EmptyTreeState';
import { MemberDrawer } from './drawer/MemberDrawer';

// Custom Node types object for ReactFlow
const NODE_TYPES = {
  familyMember: FamilyMemberNode,
  familyUnion: FamilyUnionNode,
};

interface FamilyTreeGraphProps {
  initialData: FamilyTreeData;
}

function FamilyTreeGraph({ initialData }: FamilyTreeGraphProps) {
  const [data, setData] = useState<FamilyTreeData>(initialData);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const { setCenter, fitView } = useReactFlow();

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
  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.1, duration: 800 });
      }, 100);
    }
  }, [data.members.length, fitView]);

  // Node Selection Handler
  const onNodeClick = (_: any, node: Node) => {
    if (node.type === 'familyUnion') return;
    const member = data.members.find(m => m.id === node.id);
    if (member) {
      setSelectedMember(member);
      // Center camera on clicked node
      setCenter(node.position.x + 112, node.position.y + 40, { zoom: 1.1, duration: 600 });
    }
  };

  // Member search item selected
  const handleSelectSearchResult = (member: FamilyMember) => {
    setSelectedMember(member);
    const matchedNode = nodes.find(n => n.id === member.id);
    if (matchedNode) {
      setCenter(matchedNode.position.x + 112, matchedNode.position.y + 40, { zoom: 1.2, duration: 800 });
    }
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
      name: 'Người Sáng Lập Gia Tộc',
      gender: 'male',
      generation: 1
    };
    const newM = await upsertFamilyMember(emptyMember);
    const tree = await getFamilyTree();
    setData(tree);
    setSelectedMember(newM);
  };

  // Save changes to profile details
  const handleSaveMember = async (updatedForm: FamilyMember) => {
    const updated = await upsertFamilyMember(updatedForm);
    setData(prev => ({
      ...prev,
      members: prev.members.map(m => (m.id === updated.id ? updated : m))
    }));
    setSelectedMember(updated);
  };

  // Delete family member
  const handleDeleteMember = async () => {
    if (!selectedMember) return;
    if (!confirm(`Bạn có chắc chắn muốn xóa ${selectedMember.name} và mọi liên kết liên quan?`)) return;

    const success = await deleteFamilyMember(selectedMember.id);
    if (success) {
      setData(prev => ({
        members: prev.members.filter(m => m.id !== selectedMember.id),
        relationships: prev.relationships.filter(
          r => r.from !== selectedMember.id && r.to !== selectedMember.id
        )
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

    const newMember = await upsertFamilyMember(newMemberData, {
      relativeId: selectedMember.id,
      type: relType
    });

    const refreshed = await getFamilyTree();
    setData(refreshed);
    setSelectedMember(newMember);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* ==========================================
          LEFT SIDE: THE TREE VISUAL CANVAS
          ========================================== */}
      <div className="flex-1 h-full relative">
        {/* Top Search bar */}
        <MemberSearch
          members={data.members}
          onSelectMember={handleSelectSearchResult}
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
          <Background color="#cbd5e1" gap={20} size={1} />
          <Controls className="!bg-white dark:!bg-slate-800 !border-slate-200 dark:!border-slate-700 !shadow-md !rounded-xl overflow-hidden" />
          <MiniMap
            zoomable
            pannable
            className="!bg-white/80 dark:!bg-slate-800/80 !border-slate-200 dark:!border-slate-700 !shadow-md !rounded-xl"
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
      />
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
