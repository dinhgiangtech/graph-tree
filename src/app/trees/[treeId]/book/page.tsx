import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTreeDetails } from '@/app/actions/tree';
import { getFamilyTree } from '@/app/actions';
import TreeHeaderNav from '@/components/tree/TreeHeaderNav';
import PhahyBookView from '@/components/book/PhahyBookView';
import { Lock, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface BookPageProps {
  params: Promise<{
    treeId: string;
  }>;
}

export default async function TreeBookPage({ params }: BookPageProps) {
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
            Sách Phả Ký Được Đặt Riêng Tư
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bạn cần quyền thành viên để xem tập phả ký truyền thống của dòng họ này.
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

  // Fetch full tree members & relationships
  const treeData = await getFamilyTree(treeId);
  const totalMembers = treeData.members.length;
  const generations = treeData.members.map((m) => m.generation ?? 1);
  const totalGenerations = totalMembers > 0 ? Math.max(...generations) : 0;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-hidden bg-amber-50/40 dark:bg-slate-950">
      {/* Shared Navigation Header */}
      <div className="print:hidden">
        <TreeHeaderNav
          tree={tree}
          currentUserRole={currentUserRole}
          isOwnerOrAdmin={isOwnerOrAdmin}
          totalMembers={totalMembers}
          totalGenerations={totalGenerations}
        />
      </div>

      {/* Main Phả Ký Book View */}
      <PhahyBookView
        treeId={tree.id}
        tree={tree}
        members={treeData.members}
        relationships={treeData.relationships}
      />
    </div>
  );
}
