"use client";

import React, { useState } from 'react';
import { createBranch, deleteBranch } from '@/app/actions/tree';
import { TreeBranch } from '@prisma/client';
import {
  GitBranch,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Layers
} from 'lucide-react';

interface BranchesSettingsTabProps {
  treeId: string;
  branches: TreeBranch[];
}

export default function BranchesSettingsTab({
  treeId,
  branches: initialBranches,
}: BranchesSettingsTabProps) {
  const [branches, setBranches] = useState<TreeBranch[]>(initialBranches);
  const [newBranchName, setNewBranchName] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  async function handleCreateBranch(e: React.FormEvent) {
    e.preventDefault();
    if (!newBranchName.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await createBranch(treeId, newBranchName);
      if (res.success && res.data) {
        setBranches((prev) => [
          ...prev,
          {
            id: res.data!.id,
            treeId,
            name: res.data!.name,
            rootPersonId: null,
            order: prev.length + 1,
          },
        ]);
        setNewBranchName('');
        setMessage({ text: `Đã tạo chi nhánh "${res.data.name}" thành công!`, type: 'success' });
      } else {
        setMessage({ text: res.error?.message || 'Không thể tạo chi nhánh.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteBranch(branchId: string, branchName: string) {
    if (!confirm(`Bạn có chắc chắn muốn xóa chi nhánh "${branchName}"?`)) {
      return;
    }

    setActionLoading(branchId);
    setMessage(null);

    try {
      const res = await deleteBranch(treeId, branchId);
      if (res.success) {
        setBranches((prev) => prev.filter((b) => b.id !== branchId));
        setMessage({ text: 'Đã xóa chi nhánh thành công.', type: 'success' });
      } else {
        setMessage({ text: res.error?.message || 'Không thể xóa chi nhánh.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Lỗi kết nối máy chủ.', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          )}
          {message.text}
        </div>
      )}

      {/* Add New Branch Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-indigo-500" />
            Chi Nhánh & Ngành Dòng Tộc ({branches.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tạo các Chi/Nhánh để phân loại thành viên và lọc đồ thị theo cành nhánh dễ dàng
          </p>
        </div>

        <form onSubmit={handleCreateBranch} className="flex flex-col sm:flex-row gap-3 pt-2">
          <input
            type="text"
            required
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            placeholder="VD: Chi 1 - Hà Nội, Chi 2 - Hải Dương, Chi Trưởng..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tạo...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Thêm Chi Nhánh
              </>
            )}
          </button>
        </form>
      </div>

      {/* Branches List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
        {branches.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {branches.map((branch, idx) => {
              const isDeleting = actionLoading === branch.id;

              return (
                <div
                  key={branch.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs shrink-0">
                      #{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {branch.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Layers className="w-3 h-3 text-slate-400" />
                        Thứ tự: {branch.order}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteBranch(branch.id, branch.name)}
                    disabled={isDeleting}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer disabled:opacity-50"
                    title="Xóa chi nhánh"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-slate-500">
            Chưa có chi nhánh nào được tạo. Hãy thêm chi nhánh đầu tiên ở trên.
          </div>
        )}
      </div>
    </div>
  );
}
