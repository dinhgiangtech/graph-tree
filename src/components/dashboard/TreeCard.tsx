"use client";

import React from 'react';
import Link from 'next/link';
import { TreeSummary } from '@/app/actions/tree';
import { TreeRole } from '@prisma/client';
import HeritageLogoIcon from '@/components/HeritageLogoIcon';
import {
  Scroll,
  Users,
  MapPin,
  Globe,
  Lock,
  Calendar,
  ChevronRight,
  Crown,
  ShieldCheck,
  UserCheck,
  Eye,
  Settings
} from 'lucide-react';

interface TreeCardProps {
  tree: TreeSummary;
}

export default function TreeCard({ tree }: TreeCardProps) {
  // Format role badge
  const renderRoleBadge = (role: TreeRole) => {
    switch (role) {
      case TreeRole.ADMIN:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] text-[#FEF3C7] border border-[#B45309] shadow-xs">
            <Crown className="w-3 h-3 text-[#FDE68A]" />
            Tộc trưởng (Admin)
          </span>
        );
      case TreeRole.EDITOR:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] dark:bg-[#78350F]/40 dark:text-[#FDE68A]">
            <ShieldCheck className="w-3 h-3 text-[#B45309]" />
            Biên tập viên
          </span>
        );
      case TreeRole.MEMBER:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <UserCheck className="w-3 h-3" />
            Thành viên
          </span>
        );
      case TreeRole.VIEWER:
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300">
            <Eye className="w-3 h-3" />
            Khách xem
          </span>
        );
    }
  };

  const formattedDate = new Date(tree.updatedAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="group relative bg-[#FDFBF7] dark:bg-[#292524] rounded-3xl border border-[#E7DFC9] dark:border-[#44403C] shadow-sm hover:shadow-xl hover:border-[#B45309] transition-all duration-300 flex flex-col justify-between overflow-hidden font-sans">
      {/* Top ambient highlight with gold & crimson */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8B1E1E] via-[#B45309] to-[#8B1E1E]" />

      <div className="p-5 sm:p-6 space-y-4">
        {/* Header with Title & Role Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#B45309]/50 flex items-center justify-center p-2 text-[#FEF3C7] group-hover:scale-105 transition-transform duration-200 shrink-0 shadow-md">
              <HeritageLogoIcon className="w-full h-full" />
            </div>
            <div>
              <Link
                href={`/trees/${tree.id}`}
                className="font-heritage-title font-black text-base text-[#8B1E1E] dark:text-[#FDE68A] hover:underline line-clamp-1"
                title={tree.name}
              >
                {tree.name}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                {renderRoleBadge(tree.role)}
              </div>
            </div>
          </div>

          <div className="shrink-0" title={tree.isPublic ? 'Công khai' : 'Riêng tư'}>
            {tree.isPublic ? (
              <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200">
                <Globe className="w-4 h-4" />
              </span>
            ) : (
              <span className="p-1.5 rounded-lg bg-[#FEF3C7] dark:bg-[#3E2723] text-[#B45309] flex items-center justify-center border border-[#FDE68A]">
                <Lock className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>

        {/* Description (if any) */}
        {tree.description ? (
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed italic">
            "{tree.description}"
          </p>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">
            Chưa có lược sử cho dòng họ này.
          </p>
        )}

        {/* Metadata info */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E7DFC9]/80 dark:border-[#44403C]/80 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 truncate" title={tree.originPlace || 'Chưa cập nhật'}>
            <MapPin className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
            <span className="truncate font-medium">{tree.originPlace || 'Gốc tổ: Chưa rõ'}</span>
          </div>

          <div className="flex items-center gap-1.5 justify-end">
            <Users className="w-3.5 h-3.5 text-[#8B1E1E] shrink-0" />
            <span className="font-bold text-[#8B1E1E] dark:text-[#FDE68A]">
              {tree.memberCount} tộc viên
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="px-5 py-3.5 bg-[#FAF7F0] dark:bg-[#1C1917] border-t border-[#E7DFC9] dark:border-[#44403C] flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
          <span>Cập nhật: {formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          {tree.role === TreeRole.ADMIN && (
            <Link
              href={`/trees/${tree.id}/settings`}
              className="p-2 rounded-xl text-slate-600 hover:text-[#8B1E1E] dark:hover:text-[#FDE68A] hover:bg-[#FEF3C7] dark:hover:bg-[#292524] transition-all cursor-pointer"
              title="Cài đặt cây gia phả"
            >
              <Settings className="w-4 h-4" />
            </Link>
          )}

          <Link
            href={`/trees/${tree.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] shadow-xs transition-all cursor-pointer group-hover:translate-x-0.5"
          >
            Vào Phả Đồ
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
