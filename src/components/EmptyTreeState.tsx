"use client";

import React from 'react';
import { Database, Sparkles, Plus } from 'lucide-react';

interface EmptyTreeStateProps {
  onSeedDatabase: () => void;
  onCreateRootMember: () => void;
}

export function EmptyTreeState({ onSeedDatabase, onCreateRootMember }: EmptyTreeStateProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 p-6 text-center">
      <Database className="w-16 h-16 text-indigo-500 mb-4 animate-bounce" />
      <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">
        Không Tìm Thấy Thành Viên
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-sm text-sm">
        Cơ sở dữ liệu phả hệ của bạn hiện đang trống. Hãy gieo hạt giống đầu tiên cho cây gia tộc của bạn.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <button
          onClick={onSeedDatabase}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-105 transition-all flex items-center gap-2 cursor-pointer text-sm"
        >
          <Sparkles className="w-5 h-5" />
          Sử dụng Cây Gia Phả Mẫu
        </button>
        <button
          onClick={onCreateRootMember}
          className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2 cursor-pointer text-sm"
        >
          <Plus className="w-5 h-5" />
          Tạo Thành Viên Đầu Tiên
        </button>
      </div>
    </div>
  );
}

export default EmptyTreeState;
