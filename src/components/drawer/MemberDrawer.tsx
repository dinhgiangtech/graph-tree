"use client";

import React, { useState, useEffect } from 'react';
import { Scroll, X, Edit2, Plus, Heart, Baby } from 'lucide-react';
import { FamilyMember, Relationship, RelationshipType } from '@/types/family';
import MemberInfoView from './MemberInfoView';
import MemberEditForm from './MemberEditForm';
import { AddRelationForm } from './AddRelationForm';

interface MemberDrawerProps {
  member: FamilyMember | null;
  treeId?: string;
  allMembers?: FamilyMember[];
  relationships?: Relationship[];
  onSelectMember?: (member: FamilyMember) => void;
  onClose: () => void;
  onSaveMember: (updated: FamilyMember) => Promise<void>;
  onDeleteMember: () => Promise<void>;
  onAddRelation: (
    newMember: Omit<FamilyMember, 'id'>,
    relationType: RelationshipType
  ) => Promise<void>;
}

export function MemberDrawer({
  member,
  treeId,
  allMembers = [],
  relationships = [],
  onSelectMember,
  onClose,
  onSaveMember,
  onDeleteMember,
  onAddRelation
}: MemberDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [relationType, setRelationType] = useState<RelationshipType | null>(null);

  // Reset drawer modes when selected member changes
  useEffect(() => {
    setIsEditing(false);
    setRelationType(null);
  }, [member?.id]);

  if (!member) return null;

  return (
    <div className="w-[420px] bg-[#FAF7F0] dark:bg-[#1C1917] border-l border-[#E7DFC9] dark:border-[#44403C] shadow-2xl h-full flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300 font-sans">
      {/* Header with Traditional Crimson Ribbon */}
      <div className="p-4 bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] text-[#FEF3C7] border-b border-[#B45309] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-[#FDE68A]/30">
            <Scroll className="w-4 h-4 text-[#FDE68A]" />
          </div>
          <div>
            <h3 className="font-heritage-title font-black text-base tracking-tight text-[#FEF3C7]">
              Hồ Sơ Tộc Viên
            </h3>
            <p className="text-[10px] text-[#FDE68A] opacity-90 font-medium">
              Thông tin phả hệ & gia thế
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 hover:bg-white/20 rounded-xl text-[#FEF3C7] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Details Content */}
      <div className="p-5 flex-1 flex flex-col gap-5">
        {/* Mode selection tabs if not creating relation */}
        {!relationType && (
          <div className="flex gap-2 p-1 bg-[#F4EFE6] dark:bg-[#292524] rounded-2xl border border-[#E7DFC9] dark:border-[#44403C]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                !isEditing
                  ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-sm border border-[#B45309]'
                  : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#8B1E1E] dark:hover:text-[#FDE68A]'
              }`}
            >
              Chi Tiết Phả Hệ
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={`flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                isEditing
                  ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-sm border border-[#B45309]'
                  : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#8B1E1E] dark:hover:text-[#FDE68A]'
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Edit2 className="w-3.5 h-3.5" /> Chỉnh Sửa
              </span>
            </button>
          </div>
        )}

        {/* View Mode */}
        {!isEditing && !relationType && (
          <MemberInfoView
            member={member}
            treeId={treeId}
            allMembers={allMembers}
            relationships={relationships}
            onSelectMember={onSelectMember}
            onStartAddRelation={(type: RelationshipType) => setRelationType(type)}
            onDeleteMember={onDeleteMember}
          />
        )}

        {/* Edit Mode */}
        {isEditing && !relationType && (
          <MemberEditForm
            initialMember={member}
            onSave={async (updated: FamilyMember) => {
              await onSaveMember(updated);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        )}

        {/* Add Relation Mode */}
        {relationType && (
          <AddRelationForm
            currentMember={member}
            relationType={relationType}
            onCancel={() => setRelationType(null)}
            onSubmit={async (newMember, relType) => {
              await onAddRelation(newMember, relType);
              setRelationType(null);
            }}
          />
        )}

        {/* Quick Add Relations Bottom Bar */}
        {!isEditing && !relationType && (
          <div className="pt-4 border-t border-[#E7DFC9] dark:border-[#44403C] space-y-2">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Thao Tác Bổ Sung Quan Hệ:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRelationType('SPOUSE_OF')}
                className="py-2 px-3 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] border border-[#FDE68A] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Heart className="w-3.5 h-3.5 text-[#B45309]" />
                <span>+ Thêm Vợ / Chồng</span>
              </button>
              <button
                type="button"
                onClick={() => setRelationType('PARENT_OF')}
                className="py-2 px-3 rounded-xl bg-[#8B1E1E]/10 hover:bg-[#8B1E1E]/20 text-[#8B1E1E] dark:text-[#F87171] border border-[#8B1E1E]/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              >
                <Baby className="w-3.5 h-3.5 text-[#8B1E1E]" />
                <span>+ Thêm Con Cái</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberDrawer;
