"use client";

import React, { useState, useEffect } from 'react';
import { Info, X, Edit2 } from 'lucide-react';
import { FamilyMember, Relationship, RelationshipType } from '@/types/family';
import { MemberInfoView } from './MemberInfoView';
import { MemberEditForm } from './MemberEditForm';
import { AddRelationForm } from './AddRelationForm';

interface MemberDrawerProps {
  member: FamilyMember | null;
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
    <div className="w-[420px] bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-2xl h-full flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h3 className="font-extrabold text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-indigo-500" />
          Chi Tiết Thành Viên
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Details Content */}
      <div className="p-6 flex-1 flex flex-col gap-6">
        {/* Mode selection tabs if not creating relation */}
        {!relationType && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className={`flex-1 py-2 px-3 text-center text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                !isEditing
                  ? 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Thông Tin Chi Tiết
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={`flex-1 py-2 px-3 text-center text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                isEditing
                  ? 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
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
            allMembers={allMembers}
            relationships={relationships}
            onSelectMember={onSelectMember}
            onStartAddRelation={(type) => setRelationType(type)}
            onDeleteMember={onDeleteMember}
          />
        )}

        {/* Edit Mode */}
        {isEditing && !relationType && (
          <MemberEditForm
            key={member.id}
            initialMember={member}
            onSave={async (updated) => {
              await onSaveMember(updated);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        )}

        {/* Add Relation Mode */}
        {relationType && (
          <AddRelationForm
            key={`${member.id}-${relationType}`}
            parentOrSpouseMember={member}
            relationType={relationType}
            onSubmitRelation={async (newMember, type) => {
              await onAddRelation(newMember, type);
              setRelationType(null);
            }}
            onCancel={() => setRelationType(null)}
          />
        )}
      </div>
    </div>
  );
}

export default MemberDrawer;
