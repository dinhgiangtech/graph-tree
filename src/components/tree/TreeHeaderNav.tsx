"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Network,
  Contact,
  BookOpen,
  Settings,
  Scroll,
  ArrowLeft,
  Users,
  Layers,
  Crown,
  ShieldCheck,
  UserCheck,
  Eye,
  Globe
} from 'lucide-react';
import { TreeRole } from '@prisma/client';
import ThemeToggle from '@/components/ThemeToggle';

import HeritageLogoIcon from '@/components/HeritageLogoIcon';

interface TreeHeaderNavProps {
  tree: {
    id: string;
    name: string;
    originPlace?: string | null;
    branches?: Array<{ id: string; name: string }>;
  };
  currentUserRole?: TreeRole | null;
  isOwnerOrAdmin?: boolean;
  totalMembers?: number;
  totalGenerations?: number;
}

export default function TreeHeaderNav({
  tree,
  currentUserRole,
  isOwnerOrAdmin,
  totalMembers = 0,
  totalGenerations = 0,
}: TreeHeaderNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Phả Đồ',
      href: `/trees/${tree.id}`,
      icon: Network,
      active: pathname === `/trees/${tree.id}`,
    },
    {
      label: 'Danh Bạ',
      href: `/trees/${tree.id}/directory`,
      icon: Contact,
      active: pathname.startsWith(`/trees/${tree.id}/directory`),
    },
    {
      label: 'Phả Ký',
      href: `/trees/${tree.id}/book`,
      icon: BookOpen,
      active: pathname.startsWith(`/trees/${tree.id}/book`),
    },
  ];

  const renderRoleBadge = (role: TreeRole | null | undefined) => {
    if (!role) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20">
          <Globe className="w-3 h-3 text-emerald-500" />
          Khách vãng lai
        </span>
      );
    }
    switch (role) {
      case TreeRole.ADMIN:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] text-[#FEF3C7] border border-[#B45309] shadow-xs">
            <Crown className="w-3 h-3 text-[#FDE68A]" />
            Tộc trưởng
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <UserCheck className="w-3 h-3" />
            Thành viên
          </span>
        );
      case TreeRole.VIEWER:
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300">
            <Eye className="w-3 h-3" />
            Người xem
          </span>
        );
    }
  };

  return (
    <header className="h-14 shrink-0 bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 backdrop-blur-md border-b border-[#E7DFC9] dark:border-[#44403C] px-4 sm:px-6 flex items-center justify-between gap-4 z-30 shadow-xs">
      {/* Left: Back button & Tree Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/dashboard"
          className="p-2 rounded-xl text-slate-600 hover:text-[#8B1E1E] dark:hover:text-[#FDE68A] hover:bg-[#FEF3C7]/60 dark:hover:bg-[#292524] transition-colors"
          title="Quay lại danh sách cây"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="h-6 w-px bg-[#E7DFC9] dark:bg-[#44403C] hidden sm:block" />

        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#B45309]/50 flex items-center justify-center p-1.5 text-[#FEF3C7] shrink-0 shadow-sm">
            <HeritageLogoIcon className="w-full h-full" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-heritage-title font-black text-sm text-[#8B1E1E] dark:text-[#FDE68A] truncate max-w-[140px] sm:max-w-[240px]">
                {tree.name}
              </h1>
              {renderRoleBadge(currentUserRole)}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate hidden md:block">
              {tree.originPlace ? `Gốc tổ: ${tree.originPlace}` : 'Dòng họ truyền thống'}{' '}
              {tree.branches && tree.branches.length > 0 && `• ${tree.branches.length} Chi nhánh`}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Main View Switcher Tabs */}
      <nav className="flex items-center gap-1 bg-[#F4EFE6] dark:bg-[#292524] p-1 rounded-2xl border border-[#E7DFC9] dark:border-[#44403C]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                item.active
                  ? 'bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] text-[#FEF3C7] shadow-sm border border-[#B45309]'
                  : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#8B1E1E] dark:hover:text-[#FDE68A]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right: Stats & Settings */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FEF3C7]/70 dark:bg-[#292524] text-[#92400E] dark:text-[#FDE68A] font-bold text-[11px] border border-[#FDE68A] dark:border-[#44403C]">
            <Users className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{totalMembers} Người</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#8B1E1E]/10 dark:bg-[#8B1E1E]/20 text-[#8B1E1E] dark:text-[#F87171] font-bold text-[11px] border border-[#8B1E1E]/20">
            <Layers className="w-3.5 h-3.5" />
            <span>{totalGenerations} Đời</span>
          </div>
        </div>

        {isOwnerOrAdmin && (
          <Link
            href={`/trees/${tree.id}/settings`}
            className={`p-2 rounded-xl text-slate-600 hover:text-[#8B1E1E] dark:hover:text-[#FDE68A] hover:bg-[#FEF3C7]/60 dark:hover:bg-[#292524] transition-colors cursor-pointer ${
              pathname.includes('/settings')
                ? 'text-[#8B1E1E] dark:text-[#FDE68A] bg-[#FEF3C7] dark:bg-[#3E2723] border border-[#B45309]/30'
                : ''
            }`}
            title="Cài đặt cây gia phả"
          >
            <Settings className="w-4 h-4" />
          </Link>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}
