import FamilyTreeGraph from '@/components/FamilyTreeGraph';
import { getFamilyTree } from './actions';
import { Users, Layers, Scroll, Sparkles } from 'lucide-react';
import Link from 'next/link';
import HeritageLogoIcon from '@/components/HeritageLogoIcon';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const treeData = await getFamilyTree();

  // Compute key statistics for the dashboard header
  const totalMembers = treeData.members.length;
  const generations = treeData.members.map(m => m.generation ?? 1);
  const totalGenerations = totalMembers > 0 ? Math.max(...generations) : 0;

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden bg-[#FAF7F0] dark:bg-[#1C1917] font-sans">
      {/* ==========================================
          HEADER DASHBOARD BAR
          ========================================== */}
      <header className="h-16 shrink-0 bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 backdrop-blur-md border-b border-[#E7DFC9] dark:border-[#44403C] px-6 flex items-center justify-between z-10 shadow-xs">

        {/* Title & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#B45309]/50 flex items-center justify-center p-2 text-[#FEF3C7] shadow-md shadow-[#8B1E1E]/20">
            <HeritageLogoIcon className="w-full h-full" />
          </div>
          <div>
            <h1 className="font-heritage-title font-black text-base tracking-tight text-[#8B1E1E] dark:text-[#FDE68A]">
              GIA PHẢ SỐ ĐẠI TỘC
            </h1>
            <p className="text-[10px] text-[#B45309] dark:text-[#D97706] font-bold uppercase tracking-wider mt-0.5">
              Hệ thống lưu truyền cội nguồn phả hệ
            </p>
          </div>
        </div>

        {/* Real-time stats badges */}
        <div className="hidden md:flex items-center gap-6">
          {/* Total Members Count */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] dark:bg-[#292524] flex items-center justify-center text-[#B45309]">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[10px] opacity-60 font-bold uppercase tracking-wider leading-none text-slate-500">Tộc Viên</div>
              <div className="text-sm font-black text-[#8B1E1E] dark:text-[#FDE68A] mt-0.5">{totalMembers} người</div>
            </div>
          </div>

          {/* Total Generations Count */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B1E1E]/10 dark:bg-[#8B1E1E]/20 flex items-center justify-center text-[#8B1E1E]">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[10px] opacity-60 font-bold uppercase tracking-wider leading-none text-slate-500">Thế Hệ (Đời)</div>
              <div className="text-sm font-black text-[#8B1E1E] dark:text-[#FDE68A] mt-0.5">{totalGenerations} đời</div>
            </div>
          </div>

          {/* Database Connection Status badge */}
          <div className="flex items-center gap-2 border border-[#B45309]/30 bg-[#FEF3C7]/60 dark:bg-[#292524] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#92400E] dark:text-[#FDE68A] shadow-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Đồ thị Neo4j
          </div>
        </div>

        {/* Right Actions & Dashboard link */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] hover:from-[#991B1B] hover:to-[#8B1E1E] text-[#FEF3C7] border border-[#B45309] text-xs font-black shadow-md shadow-[#8B1E1E]/20 transition-all cursor-pointer uppercase tracking-wider"
          >
            <span>Bảng Điều Khiển</span>
          </Link>
        </div>
      </header>

      {/* ==========================================
          THE FAMILY TREE FLOW CANVAS VIEW
          ========================================== */}
      <div className="flex-1 w-full h-full relative">
        <FamilyTreeGraph initialData={treeData} />
      </div>
    </main>
  );
}
