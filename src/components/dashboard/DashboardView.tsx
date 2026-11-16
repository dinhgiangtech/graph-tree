"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TreeSummary } from '@/app/actions/tree';
import TreeCard from './TreeCard';
import CreateTreeModal from './CreateTreeModal';
import {
  Plus,
  Search,
  Scroll,
  Crown,
  Users,
  Layers,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DashboardViewProps {
  userName: string;
  trees: TreeSummary[];
}

export default function DashboardView({ userName, trees }: DashboardViewProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTrees = trees.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.originPlace && t.originPlace.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalMembers = trees.reduce((acc, t) => acc + t.memberCount, 0);
  const adminTreesCount = trees.filter((t) => t.role === 'ADMIN').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      {/* Hero Welcome Banner with Vietnamese Heritage style */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FDFBF7] via-[#FAF7F0] to-[#F4EFE6] dark:bg-gradient-to-br dark:from-[#292524] dark:via-[#1C1917] dark:to-[#141210] border-2 border-[#D7CCA9] dark:border-[#B45309]/50 p-6 sm:p-8 text-[#1C1917] dark:text-[#FEF3C7] shadow-xl">
        {/* Trong Dong Ambient Watermark */}
        <div className="absolute right-[-20px] sm:right-6 top-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 opacity-15 dark:opacity-20 pointer-events-none select-none">
          <Image
            src="/trong-dong.webp"
            alt="Trống Đồng Đông Sơn"
            fill
            className="object-contain"
            sizes="256px"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#B45309]/10 dark:from-[#F59E0B]/15 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] dark:bg-black/30 border border-[#FDE68A] dark:border-[#FDE68A]/40 text-[#92400E] dark:text-[#FDE68A] text-xs font-bold tracking-wide shadow-2xs">
              <Scroll className="w-3.5 h-3.5 text-[#B45309] dark:text-[#FDE68A]" />
              Bách Gia Chi Phả • Tộc Phả Ký
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-heritage-title text-[#8B1E1E] dark:text-white">
              Kính chào, <span className="text-[#B45309] dark:text-[#FDE68A]">{userName}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#FEF3C7]/90 leading-relaxed font-serif italic">
              "Cây có cội mới trổ cành xanh lá, nước có nguồn mới bủa khắp rạch sông." Lưu giữ và trao truyền cội nguồn gia tộc cho muôn đời sau.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] font-black text-xs border border-[#B45309] shadow-lg shadow-[#8B1E1E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shrink-0 uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            Lập Cây Gia Phả Mới
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#D7CCA9] dark:border-[#B45309]/50">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-black/30 border border-[#E7DFC9] dark:border-[#FDE68A]/20 shadow-xs backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] dark:bg-[#FDE68A]/20 border border-[#FDE68A] dark:border-[#FDE68A]/40 flex items-center justify-center text-[#B45309] dark:text-[#FDE68A] shadow-2xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title">{trees.length}</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#FEF3C7]/80 font-bold">Cây phả hệ liên kết</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-black/30 border border-[#E7DFC9] dark:border-[#FDE68A]/20 shadow-xs backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] dark:bg-[#FDE68A]/20 border border-[#FDE68A] dark:border-[#FDE68A]/40 flex items-center justify-center text-[#B45309] dark:text-[#FDE68A] shadow-2xs">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title">{adminTreesCount}</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#FEF3C7]/80 font-bold">Cây quản trị (Tộc trưởng)</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-black/30 border border-[#E7DFC9] dark:border-[#FDE68A]/20 shadow-xs backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] dark:bg-[#FDE68A]/20 border border-[#FDE68A] dark:border-[#FDE68A]/40 flex items-center justify-center text-[#B45309] dark:text-[#FDE68A] shadow-2xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title">{totalMembers}</div>
              <div className="text-[11px] text-[#78716C] dark:text-[#FEF3C7]/80 font-bold">Tổng số tộc viên ghi nhận</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main List Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black font-heritage-title text-[#8B1E1E] dark:text-[#FDE68A]">
              Danh Sách Cây Phả Hệ Gia Tộc
            </h2>
            <p className="text-xs text-slate-500">
              Chọn cây gia phả để xem phả đồ, tra cứu danh bạ hoặc đọc sách phả ký
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#B45309] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên dòng họ, quê quán..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            />
          </div>
        </div>

        {/* Tree Cards Grid */}
        {filteredTrees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTrees.map((tree) => (
              <TreeCard key={tree.id} tree={tree} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FDFBF7] dark:bg-[#292524] rounded-3xl border border-[#E7DFC9] dark:border-[#44403C] p-8 space-y-4 shadow-sm">
            <Scroll className="w-12 h-12 text-[#B45309]/50 mx-auto" />
            <h3 className="font-bold text-base text-[#8B1E1E] dark:text-[#FDE68A]">
              {searchTerm ? 'Không tìm thấy cây gia phả phù hợp' : 'Chưa có cây gia phả nào'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm
                ? 'Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc tìm kiếm.'
                : 'Hãy bắt đầu lập cây gia phả đầu tiên để ghi danh tiên tổ và kết nối các thế hệ.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] font-bold text-xs shadow-md shadow-[#8B1E1E]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Lập Cây Gia Phả Đầu Tiên
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal create tree */}
      <CreateTreeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => router.refresh()}
      />
    </div>
  );
}
