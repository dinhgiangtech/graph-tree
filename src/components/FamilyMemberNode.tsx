"use client";

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Calendar, Briefcase, Award } from 'lucide-react';
import { GraphNodeData } from '@/types/family';

export function FamilyMemberNode({ data }: NodeProps<GraphNodeData>) {
  const isMale = data.gender === 'male';
  const isFemale = data.gender === 'female';

  const borderStyles = isMale
    ? 'border-blue-400 dark:border-blue-700 bg-blue-50/95 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 hover:border-blue-500'
    : isFemale
      ? 'border-rose-400 dark:border-rose-700 bg-rose-50/95 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100 hover:border-rose-500'
      : 'border-slate-400 dark:border-slate-700 bg-slate-50/95 dark:bg-slate-950/30 text-slate-900 dark:text-slate-100 hover:border-slate-500';

  const activeStyles = data.isSelected
    ? 'ring-4 ring-indigo-500 ring-offset-2 scale-105 shadow-xl'
    : 'shadow-md';

  const getInitials = (name: string) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[parts.length - 2].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const getLifeSpan = () => {
    if (data.is_alive !== undefined) {
      if (data.is_alive) return 'Còn sống';
      if (!data.birthDate && !data.deathDate) return 'Đã mất';
    }
    if (!data.birthDate && !data.deathDate) return 'Chưa rõ năm sinh';
    const birth = data.birthDate ? data.birthDate.split('-')[0] : '???';
    const death = data.deathDate ? data.deathDate.split('-')[0] : 'Nay';
    return `${birth} - ${death}`;
  };

  const subtitle = data.title || data.job;

  return (
    <div className={`p-4 rounded-2xl border-2 ${borderStyles} ${activeStyles} w-60 transition-all duration-300 backdrop-blur-sm text-left relative cursor-pointer`}>
      {/* Source/Target handles for React Flow routing */}
      {/* Parents-children connect top-to-bottom */}
      <Handle type="target" position={Position.Top} id="parent-target" className="!bg-slate-400 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Bottom} id="child-source" className="!bg-slate-400 !w-2.5 !h-2.5" />
      
      {/* Spouses connect side-to-side */}
      <Handle type="target" position={Position.Left} id="left-target" className="!bg-pink-400 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Left} id="left-source" className="!bg-pink-400 !w-2.5 !h-2.5" />
      <Handle type="target" position={Position.Right} id="right-target" className="!bg-pink-400 !w-2.5 !h-2.5" />
      <Handle type="source" position={Position.Right} id="right-source" className="!bg-pink-400 !w-2.5 !h-2.5" />

      {/* Main card body */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shrink-0 ${
          isMale 
            ? 'bg-blue-200 border-blue-300 text-blue-800' 
            : isFemale 
              ? 'bg-rose-200 border-rose-300 text-rose-800' 
              : 'bg-slate-200 border-slate-300 text-slate-800'
        }`}>
          {data.avatar ? (
            <img src={data.avatar} alt={data.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(data.name)
          )}
        </div>

        {/* Info */}
        <div className="overflow-hidden flex-1">
          <h4 className="font-bold text-sm truncate" title={data.name}>
            {data.name}
          </h4>
          <p className="text-xs opacity-80 mt-0.5 flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {getLifeSpan()}
          </p>
          {subtitle && (
            <p className="text-[11px] opacity-75 mt-0.5 truncate flex items-center gap-1 font-normal" title={subtitle}>
              {data.title ? <Award className="w-3 h-3 shrink-0 text-amber-500" /> : <Briefcase className="w-3 h-3 shrink-0" />}
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Generation indicator badge */}
      <div className="absolute -top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 shadow">
        Đời {data.generation ?? 1}
      </div>
    </div>
  );
}

export default FamilyMemberNode;
