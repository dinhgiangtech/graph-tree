"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Tree, TreeBranch, TreeRole } from '@prisma/client';
import GeneralSettingsTab from './GeneralSettingsTab';
import MembersSettingsTab from './MembersSettingsTab';
import BranchesSettingsTab from './BranchesSettingsTab';
import DangerZoneTab from './DangerZoneTab';
import AuditLogsTab from './AuditLogsTab';
import HeritageLogoIcon from '@/components/HeritageLogoIcon';
import {
  Settings,
  Users,
  GitBranch,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  History
} from 'lucide-react';

interface MemberItem {
  id: string;
  role: TreeRole;
  joinedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

interface TreeSettingsViewProps {
  tree: Tree & {
    branches: TreeBranch[];
    memberships: MemberItem[];
  };
  currentUserId: string;
}

type TabType = 'general' | 'members' | 'branches' | 'audit' | 'danger';

export default function TreeSettingsView({ tree, currentUserId }: TreeSettingsViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general' as TabType, label: 'Thông Tin & Bảo Mật', icon: Settings },
    { id: 'members' as TabType, label: `Thành Viên (${tree.memberships.length})`, icon: Users },
    { id: 'branches' as TabType, label: `Chi Nhánh (${tree.branches.length})`, icon: GitBranch },
    { id: 'audit' as TabType, label: 'Lịch Sử Hoạt Động', icon: History },
    { id: 'danger' as TabType, label: 'Vùng Nguy Hiểm', icon: AlertTriangle, isDanger: true },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              Bảng điều khiển
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/trees/${tree.id}`} className="hover:text-indigo-600 transition-colors truncate max-w-[200px]">
              {tree.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-medium">Cài đặt</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5 font-heritage-title">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#B45309]/50 flex items-center justify-center p-1.5 text-white shadow-sm shrink-0">
              <HeritageLogoIcon className="w-full h-full" />
            </div>
            Cài Đặt Cây Gia Phả: {tree.name}
          </h1>
        </div>

        <Link
          href={`/trees/${tree.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-sm transition-all cursor-pointer self-start sm:self-center"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay Lại Đồ Thị Cây
        </Link>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? tab.isDanger
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/25'
                    : 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : tab.isDanger
                  ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'general' && <GeneralSettingsTab tree={tree} />}
        {activeTab === 'members' && (
          <MembersSettingsTab
            treeId={tree.id}
            currentUserId={currentUserId}
            members={tree.memberships}
          />
        )}
        {activeTab === 'branches' && (
          <BranchesSettingsTab treeId={tree.id} branches={tree.branches} />
        )}
        {activeTab === 'audit' && <AuditLogsTab treeId={tree.id} />}
        {activeTab === 'danger' && (
          <DangerZoneTab treeId={tree.id} treeName={tree.name} />
        )}
      </div>
    </div>
  );
}
