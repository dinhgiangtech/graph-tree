"use client";

import React from 'react';
import { Sparkles, Plus } from 'lucide-react';
import HeritageLogoIcon from '@/components/HeritageLogoIcon';

interface EmptyTreeStateProps {
  onSeedDatabase: () => void;
  onCreateRootMember: () => void;
}

export function EmptyTreeState({ onSeedDatabase, onCreateRootMember }: EmptyTreeStateProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF7F0]/80 dark:bg-[#1C1917]/80 backdrop-blur-sm z-10 p-6 text-center font-sans">
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border-2 border-[#B45309] text-[#FEF3C7] flex items-center justify-center p-3 mb-4 shadow-xl shadow-[#8B1E1E]/20 animate-bounce">
        <HeritageLogoIcon className="w-full h-full" />
      </div>
      <h3 className="text-2xl font-black font-heritage-title text-[#8B1E1E] dark:text-[#FDE68A]">
        Cây Phả Hệ Chưa Có Tiên Tổ
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md text-xs sm:text-sm font-serif italic">
        "Gốc có vững cây mới bền, nguồn có sâu nước mới chảy dài." Hãy khởi tạo vị Cụ Khởi Tổ đầu tiên cho dòng họ của bạn.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <button
          onClick={onCreateRootMember}
          className="px-6 py-3 bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] hover:from-[#991B1B] hover:to-[#8B1E1E] text-[#FEF3C7] border border-[#B45309] rounded-2xl font-bold shadow-lg shadow-[#8B1E1E]/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          Khởi Tạo Cụ Thủy Tổ
        </button>
        <button
          onClick={onSeedDatabase}
          className="px-6 py-3 bg-[#FEF3C7] dark:bg-[#292524] border border-[#FDE68A] dark:border-[#44403C] hover:bg-[#FDE68A] text-[#92400E] dark:text-[#FDE68A] rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2 cursor-pointer text-xs"
        >
          <Sparkles className="w-4 h-4 text-[#B45309]" />
          Dùng Dữ Liệu Phả Hệ Mẫu
        </button>
      </div>
    </div>
  );
}

export default EmptyTreeState;
