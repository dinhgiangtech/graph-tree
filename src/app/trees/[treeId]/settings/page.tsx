import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getTreeDetails } from '@/app/actions/tree';
import TreeSettingsView from '@/components/tree-settings/TreeSettingsView';
import TreeHeaderNav from '@/components/tree/TreeHeaderNav';

export const metadata = {
  title: 'Cài Đặt Cây Gia Phả | Gia Phả Số',
  description: 'Quản trị thông tin dòng họ, chi nhánh và phân quyền thành viên',
};

interface SettingsPageProps {
  params: Promise<{
    treeId: string;
  }>;
}

export default async function TreeSettingsPage({ params }: SettingsPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const { treeId } = await params;
  const treeInfo = await getTreeDetails(treeId);

  if (!treeInfo || !treeInfo.tree) {
    notFound();
  }

  // Security check: Only tree ADMIN can access the settings page
  if (!treeInfo.isOwnerOrAdmin) {
    redirect(`/trees/${treeId}`);
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full bg-slate-50/60 dark:bg-slate-950">
      <TreeHeaderNav
        tree={treeInfo.tree}
        currentUserRole={treeInfo.currentUserRole}
        isOwnerOrAdmin={treeInfo.isOwnerOrAdmin}
      />
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <TreeSettingsView
          tree={treeInfo.tree as any}
          currentUserId={user.id}
        />
      </div>
    </div>
  );
}
