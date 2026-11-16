"use client";

import React, { useState } from 'react';
import { useTreeStore } from '@/lib/useTreeStore';
import { MemberSearch } from '../MemberSearch';
import { FamilyMember } from '@/types/family';
import {
  GitBranch,
  Layers,
  Sparkles,
  RotateCcw,
  Maximize2,
  X,
  Bell
} from 'lucide-react';

interface TreeToolbarProps {
  allMembers: FamilyMember[];
  branches?: Array<{ id: string; name: string }>;
  onSelectMember: (member: FamilyMember) => void;
  onFitView: () => void;
  displayedCount: number;
  totalCount: number;
  maxGenerations: number;
  userRole?: string | null;
  onOpenProposals?: () => void;
  pendingProposalsCount?: number;
}

export default function TreeToolbar({
  allMembers,
  branches = [],
  onSelectMember,
  onFitView,
  displayedCount,
  totalCount,
  maxGenerations,
  userRole,
  onOpenProposals,
  pendingProposalsCount = 0,
}: TreeToolbarProps) {
  const {
    filter,
    rootPersonName,
    setBranch,
    setGenerationRange,
    resetFilter,
  } = useTreeStore();

  const [genPreset, setGenPreset] = useState<string>('all');

  const handleGenChange = (preset: string) => {
    setGenPreset(preset);
    switch (preset) {
      case 'd01_d05':
        setGenerationRange(1, 5);
        break;
      case 'd06_d15':
        setGenerationRange(6, 15);
        break;
      case 'd16_d25':
        setGenerationRange(16, 30);
        break;
      case 'all':
      default:
        setGenerationRange(undefined, undefined);
        break;
    }
  };

  const hasActiveFilter =
    Boolean(filter.branchId) ||
    Boolean(filter.rootPersonId) ||
    Boolean(filter.minGeneration) ||
    Boolean(filter.maxGeneration);

  return (
    <div className="absolute top-4 left-4 right-4 z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pointer-events-none">
      {/* Left Group: Search Bar & Subtree Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pointer-events-auto w-full md:w-auto">
        <div className="relative w-full sm:w-72 shadow-md rounded-2xl">
          <MemberSearch members={allMembers} onSelectMember={onSelectMember} />
        </div>

        {/* Subtree Focus active alert badge */}
        {filter.rootPersonId && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] text-[#FEF3C7] border border-[#B45309] text-xs font-black shadow-lg shadow-[#8B1E1E]/30 animate-in fade-in slide-in-from-left-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span className="truncate max-w-[160px]">
              Cây con: {rootPersonName || 'Cụ tổ'}
            </span>
            <button
              onClick={resetFilter}
              className="p-0.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              title="Thoát chế độ xem cây con"
            >
              <X className="w-3.5 h-3.5 text-[#FEF3C7]" />
            </button>
          </div>
        )}
      </div>

      {/* Right Group: Filters & Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pointer-events-auto bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#E7DFC9] dark:border-[#44403C] shadow-lg">
        {/* Branch Selector */}
        {branches.length > 0 && (
          <div className="flex items-center gap-1.5 pl-2 pr-1">
            <GitBranch className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
            <select
              value={filter.branchId || ''}
              onChange={(e) => setBranch(e.target.value || undefined)}
              className="bg-transparent text-xs font-bold text-[#8B1E1E] dark:text-[#FDE68A] outline-none cursor-pointer py-1 max-w-[130px] truncate"
            >
              <option value="" className="bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-white">
                Tất cả chi nhánh
              </option>
              {branches.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="h-4 w-px bg-[#E7DFC9] dark:bg-[#44403C]" />

        {/* Generation Preset Selector */}
        <div className="flex items-center gap-1.5 pl-2 pr-1">
          <Layers className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-[#F87171] shrink-0" />
          <select
            value={genPreset}
            onChange={(e) => handleGenChange(e.target.value)}
            className="bg-transparent text-xs font-bold text-[#292524] dark:text-[#F5EFEB] outline-none cursor-pointer py-1 max-w-[130px]"
          >
            <option value="all" className="bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-white">
              Tất cả các đời
            </option>
            <option value="d01_d05" className="bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-white">
              Đời 1 - 5 (Tiền nhân)
            </option>
            <option value="d06_d15" className="bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-white">
              Đời 6 - 15 (Trung đại)
            </option>
            <option value="d16_d25" className="bg-[#FAF7F0] dark:bg-[#1C1917] text-[#292524] dark:text-white">
              Đời 16+ (Hậu duệ)
            </option>
          </select>
        </div>

        {/* Clear Filter Button */}
        {hasActiveFilter && (
          <button
            onClick={() => {
              resetFilter();
              setGenPreset('all');
            }}
            className="p-1.5 rounded-xl bg-[#FEF3C7]/60 dark:bg-[#292524] text-[#B45309] dark:text-[#FDE68A] hover:text-[#8B1E1E] hover:bg-[#8B1E1E]/10 dark:hover:bg-[#8B1E1E]/30 transition-colors cursor-pointer"
            title="Đặt lại bộ lọc"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Proposals Queue Trigger (Admin & Editor only) */}
        {(userRole === 'ADMIN' || userRole === 'EDITOR') && onOpenProposals && (
          <>
            <div className="h-4 w-px bg-[#E7DFC9] dark:bg-[#44403C]" />
            <button
              onClick={onOpenProposals}
              className="relative p-1.5 rounded-xl bg-[#FEF3C7]/60 dark:bg-[#292524] hover:bg-[#FEF3C7] text-[#8B1E1E] dark:text-[#FDE68A] transition-colors cursor-pointer"
              title="Hàng đợi duyệt đề xuất chỉnh sửa"
            >
              <Bell className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-[#FDE68A]" />
              {pendingProposalsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#8B1E1E] text-[9px] font-black text-[#FEF3C7] ring-2 ring-[#FAF7F0] dark:ring-[#1C1917] animate-pulse">
                  {pendingProposalsCount}
                </span>
              )}
            </button>
          </>
        )}

        <div className="h-4 w-px bg-[#E7DFC9] dark:bg-[#44403C]" />

        {/* Fit View Button */}
        <button
          onClick={onFitView}
          className="p-1.5 rounded-xl bg-[#FEF3C7]/60 dark:bg-[#292524] hover:bg-[#FEF3C7] text-[#8B1E1E] dark:text-[#FDE68A] transition-colors cursor-pointer"
          title="Căn giữa toàn bộ cây"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Stats Pill */}
        <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FEF3C7]/60 dark:bg-[#292524] text-[11px] font-bold text-[#8B1E1E] dark:text-[#FDE68A] border border-[#FDE68A]/60 dark:border-[#44403C]">
          <span>{displayedCount}/{totalCount} người</span>
          <span>•</span>
          <span>{maxGenerations} đời</span>
        </div>
      </div>
    </div>
  );
}
