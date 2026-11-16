import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getTreeDetails } from '@/app/actions/tree';
import { getFamilyTree } from '@/app/actions';
import FamilyTreeGraph from '@/components/FamilyTreeGraph';
import TreeHeaderNav from '@/components/tree/TreeHeaderNav';
import {
  TreePine,
  Users,
  Layers,
  ArrowLeft,
  Settings,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Eye,
  Lock,
  Globe
} from 'lucide-react';
import { TreeRole } from '@prisma/client';

export const dynamic = 'force-dynamic';

interface TreePageProps {
  params: Promise<{
    treeId: string;
  }>;
}

export default async function TreeCanvasPage({ params }: TreePageProps) {
  const { treeId } = await params;
  const treeInfo = await getTreeDetails(treeId);

  if (!treeInfo || !treeInfo.tree) {
    notFound();
  }

  const { tree, currentUserRole, isOwnerOrAdmin } = treeInfo;

  // Check access: if tree is private and user is not a member
  if (!tree.isPublic && !currentUserRole) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-md w-full text-center space-y-4 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-500 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Cây Gia Phả Này Được Đặt Riêng Tư
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bạn cần được Quản trị viên (Tộc trưởng) cấp quyền thành viên để xem đồ thị gia phả của dòng họ này.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại Bảng điều khiển
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch family tree graph nodes & edges for this treeId
  const treeData = await getFamilyTree(treeId);

  const totalMembers = treeData.members.length;
  const generations = treeData.members.map((m) => m.generation ?? 1);
  const totalGenerations = totalMembers > 0 ? Math.max(...generations) : 0;

  // Role badge rendering
  const renderRoleBadge = (role: TreeRole | null) => {
    if (!role) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20">
          <Globe className="w-3 h-3 text-emerald-500" />
          Khách vãng lai
        </span>
      );
    }
    switch (role) {
      case TreeRole.ADMIN:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <ShieldAlert className="w-3 h-3" />
            Tộc trưởng (Admin)
          </span>
        );
      case TreeRole.EDITOR:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            <ShieldCheck className="w-3 h-3" />
            Biên tập viên
          </span>
        );
      case TreeRole.MEMBER:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <UserCheck className="w-3 h-3" />
            Thành viên
          </span>
        );
      case TreeRole.VIEWER:
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30">
            <Eye className="w-3 h-3" />
            Người xem
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Shared Header bar */}
      <TreeHeaderNav
        tree={tree}
        currentUserRole={currentUserRole}
        isOwnerOrAdmin={isOwnerOrAdmin}
        totalMembers={totalMembers}
        totalGenerations={totalGenerations}
      />

      {/* Canvas view */}
      <div className="flex-1 w-full h-full relative">
        <FamilyTreeGraph
          initialData={treeData}
          treeId={tree.id}
          branches={tree.branches}
          userRole={currentUserRole}
        />
      </div>
    </div>
  );
}
