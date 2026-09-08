import FamilyTreeGraph from '@/components/FamilyTreeGraph';
import { getFamilyTree } from './actions';
import { Users, Layers, Network, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const treeData = await getFamilyTree();

  // Compute key statistics for the dashboard header
  const totalMembers = treeData.members.length;
  const generations = treeData.members.map(m => m.generation ?? 1);
  const totalGenerations = totalMembers > 0 ? Math.max(...generations) : 0;

  return (
    <main className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* ==========================================
          HEADER DASHBOARD BAR
          ========================================== */}
      <header className="h-16 shrink-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/80 px-6 flex items-center justify-between z-10">

        {/* Title & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              CÂY GIA PHẢ KỸ THUẬT SỐ
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Hệ thống quản trị phả hệ gia tộc
            </p>
          </div>
        </div>

        {/* Real-time stats badges */}
        <div className="hidden md:flex items-center gap-6">
          {/* Total Members Count */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[10px] opacity-60 font-bold uppercase tracking-wider leading-none">Thành viên</div>
              <div className="text-sm font-black mt-0.5">{totalMembers} người</div>
            </div>
          </div>

          {/* Total Generations Count */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/20 flex items-center justify-center text-pink-500 dark:text-pink-400">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-[10px] opacity-60 font-bold uppercase tracking-wider leading-none">Thế hệ (Đời)</div>
              <div className="text-sm font-black mt-0.5">{totalGenerations} đời</div>
            </div>
          </div>

          {/* Database Connection Status badge */}
          <div className="flex items-center gap-2 border border-emerald-200/50 dark:border-emerald-900/30 bg-emerald-50/60 dark:bg-emerald-950/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-100/50 dark:shadow-none">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Kết nối Neo4j
          </div>
        </div>

        {/* Small badge for small screens */}
        <div className="flex md:hidden items-center gap-2 bg-indigo-50 dark:bg-indigo-950/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-4.5 h-4.5" />
          {totalMembers} Thành viên
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
