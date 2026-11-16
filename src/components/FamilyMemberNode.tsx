"use client";

import React from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Calendar, Briefcase, Moon } from 'lucide-react';
import { GraphNodeData } from '@/types/family';

export function FamilyMemberNode({ data }: NodeProps<Node<GraphNodeData>>) {
  const isMale = data.gender === 'male';
  const gen = data.generation ?? 1;

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
    if (!data.birthDate && !data.deathDate) return 'Chưa rõ năm';
    const birth = data.birthDate ? data.birthDate.split('-')[0] : '???';
    const death = data.deathDate ? data.deathDate.split('-')[0] : 'Nay';
    return `${birth} - ${death}`;
  };

  const activeStyles = data.isSelected
    ? 'ring-4 ring-[#8B1E1E] dark:ring-[#F59E0B] ring-offset-2 scale-105 shadow-2xl'
    : 'shadow-md hover:shadow-xl';

  return (
    <div
      className={`w-64 rounded-2xl transition-all duration-300 text-left relative cursor-pointer overflow-hidden ${activeStyles} bg-[#FAF7F0] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C]`}
    >
      {/* Source/Target handles for React Flow routing */}
      <Handle
        type="target"
        position={Position.Top}
        id="parent-target"
        className="!bg-[#8B1E1E] dark:!bg-[#D97706] !w-2.5 !h-2.5 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="child-source"
        className="!bg-[#8B1E1E] dark:!bg-[#D97706] !w-2.5 !h-2.5 !border-white"
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        className="!bg-[#B45309] !w-2.5 !h-2.5 !border-white"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className="!bg-[#B45309] !w-2.5 !h-2.5 !border-white"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        className="!bg-[#B45309] !w-2.5 !h-2.5 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className="!bg-[#B45309] !w-2.5 !h-2.5 !border-white"
      />

      {/* Main card content */}
      <div className="p-3.5 space-y-2">
        <div className="flex items-center gap-3">
          {/* Avatar with Heritage Border */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border ${
              isMale
                ? 'bg-[#E0E7FF] dark:bg-[#1E293B] text-[#3730A3] dark:text-[#93C5FD] border-[#C7D2FE] dark:border-[#334155]'
                : 'bg-[#FCE7F3] dark:bg-[#3F1A28] text-[#9D174D] dark:text-[#F472B6] border-[#FBCFE8] dark:border-[#500724]'
            }`}
          >
            {data.avatar ? (
              <img src={data.avatar} alt={data.name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              getInitials(data.name)
            )}
          </div>

          {/* Name & Title */}
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-1">
              <h4
                className="font-bold text-sm truncate text-[#292524] dark:text-[#F5EFEB]"
                title={data.name}
              >
                {data.name}
              </h4>
            </div>

            {/* Title / Alias Name */}
            {(data.alias_name || data.title) && (
              <p
                className="text-[11px] text-[#B45309] dark:text-[#D97706] font-semibold truncate"
                title={data.title || data.alias_name}
              >
                {data.title ? `[${data.title}] ` : ''}
                {data.alias_name ? `Tự: ${data.alias_name}` : ''}
              </p>
            )}

            {/* In-Law badge */}
            {data.in_law && (
              <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] dark:bg-[#78350F]/40 dark:text-[#FDE68A]">
                {isMale ? 'Rể' : 'Dâu'}
              </span>
            )}
          </div>
        </div>

        {/* Lifespan & Lunar Anniversary */}
        <div className="pt-2 border-t border-[#E7DFC9]/80 dark:border-[#44403C]/80 space-y-1 text-xs text-[#57534E] dark:text-[#A8A29E]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3 text-[#B45309]" />
              {getLifeSpan()}
            </span>

            {/* Generation Badge */}
            <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-[#FEF3C7] dark:bg-[#3E2723] text-[#92400E] dark:text-[#FDE68A] border border-[#FDE68A] dark:border-[#78350F]">
              Đời {gen}
            </span>
          </div>

          {/* Lunar Death Anniversary (Kỵ nhật) if deceased */}
          {data.lunar_death_date && (
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-[#8B1E1E] dark:text-[#F87171] bg-[#8B1E1E]/5 dark:bg-[#8B1E1E]/20 px-2 py-0.5 rounded-md border border-[#8B1E1E]/20">
              <Moon className="w-3 h-3 shrink-0" />
              <span className="truncate">Kỵ nhật: {data.lunar_death_date}</span>
            </div>
          )}

          {/* Job or Resting Place */}
          {data.job && (
            <p className="text-[10.5px] truncate flex items-center gap-1 opacity-90">
              <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
              {data.job}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FamilyMemberNode;
