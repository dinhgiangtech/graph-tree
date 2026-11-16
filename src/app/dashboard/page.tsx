import { getCurrentUser } from '@/lib/auth';
import { getMyTrees } from '@/app/actions/tree';
import { redirect } from 'next/navigation';
import DashboardView from '@/components/dashboard/DashboardView';

export const metadata = {
  title: 'Bảng Điều Khiển | Gia Phả Số',
  description: 'Quản lý danh sách các cây gia phả và dòng tộc của bạn',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const res = await getMyTrees();
  const trees = res.success && res.data ? res.data : [];

  return (
    <div className="flex-1 bg-slate-50/50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <DashboardView userName={user.name || 'Thành viên'} trees={trees} />
      </div>
    </div>
  );
}
