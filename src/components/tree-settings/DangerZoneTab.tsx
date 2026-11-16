"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteTree } from '@/app/actions/tree';
import { AlertTriangle, Trash2, Loader2, ShieldAlert } from 'lucide-react';

interface DangerZoneTabProps {
  treeId: string;
  treeName: string;
}

export default function DangerZoneTab({ treeId, treeName }: DangerZoneTabProps) {
  const router = useRouter();
  const [confirmName, setConfirmName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMatched = confirmName.trim() === treeName.trim();

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    if (!isMatched) {
      setError('Tên xác nhận không trùng khớp.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await deleteTree(treeId);
      if (res.success) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(res.error?.message || 'Không thể xóa cây gia phả.');
      }
    } catch {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-5">
        <div className="flex items-start gap-3 text-rose-600 dark:text-rose-400">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Vùng Nguy Hiểm: Xóa Cây Gia Phả
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Hành động này <span className="font-bold text-rose-600 dark:text-rose-400">không thể hoàn tác</span>. Toàn bộ thông tin thành viên, các mối quan hệ đồ thị, chi nhánh và quyền thành viên của cây này sẽ bị xóa vĩnh viễn khỏi hệ thống.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleDelete} className="space-y-4 pt-3 border-t border-rose-100 dark:border-rose-950/50">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Để xác nhận, vui lòng nhập chính xác tên dòng họ: <span className="font-mono text-rose-600 dark:text-rose-400 select-all font-bold">"{treeName}"</span>
            </label>
            <input
              type="text"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder={treeName}
              className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/20 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={!isMatched || loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang xóa vĩnh viễn...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Tôi Hiểu Rủi Ro, Hãy Xóa Cây Này
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
