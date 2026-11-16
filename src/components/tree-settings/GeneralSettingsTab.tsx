"use client";

import React, { useState } from 'react';
import { updateTreeSettings } from '@/app/actions/tree';
import { Tree } from '@prisma/client';
import { Globe, Lock, Save, Loader2, CheckCircle2, MapPin, Sparkles, Key, FileSpreadsheet, Upload } from 'lucide-react';
import ImportExcelModal from '../tree/ImportExcelModal';

interface GeneralSettingsTabProps {
  tree: Tree;
}

export default function GeneralSettingsTab({ tree }: GeneralSettingsTabProps) {
  const [name, setName] = useState(tree.name);
  const [originPlace, setOriginPlace] = useState(tree.originPlace || '');
  const [description, setDescription] = useState(tree.description || '');
  const [isPublic, setIsPublic] = useState(tree.isPublic);
  const [passcode, setPasscode] = useState(tree.passcode || '');
  const [isImportOpen, setIsImportOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ text: 'Tên cây dòng họ không được để trống.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await updateTreeSettings(tree.id, {
        name,
        originPlace: originPlace || null,
        description: description || null,
        isPublic,
        passcode: passcode || null,
      });

      if (res.success) {
        setMessage({ text: 'Đã lưu thay đổi thông tin cây thành công!', type: 'success' });
      } else {
        setMessage({ text: res.error?.message || 'Có lỗi xảy ra khi lưu.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Không thể kết nối đến máy chủ.', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          }`}
        >
          {message.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />}
          {message.text}
        </div>
      )}

      {/* Basic Info Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Thông Tin Chung Dòng Họ
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cập nhật tên hiển thị, quê quán gốc tổ và lược sử phả hệ
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tên Dòng Họ / Cây Phả Hệ <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Quê Quán / Gốc Tổ
            </label>
            <div className="relative">
              <input
                type="text"
                value={originPlace}
                onChange={(e) => setOriginPlace(e.target.value)}
                placeholder="VD: Chi Lăng, Hưng Hà, Thái Bình"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Mô Tả / Lược Sử Truyền Thống
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Giới thiệu cội nguồn, danh nhân, truyền thống dòng tộc..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Privacy & Security Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-500" />
            Quyền Riêng Tư & Bảo Mật
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quy định ai có thể truy cập và xem thông tin cây gia phả
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                {isPublic ? <Globe className="w-5 h-5 text-emerald-500" /> : <Lock className="w-5 h-5 text-amber-500" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {isPublic ? 'Chế độ Công Khai (Public)' : 'Chế độ Riêng Tư (Private)'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {isPublic
                    ? 'Bất kỳ ai có đường link đều có thể xem đồ thị phả hệ'
                    : 'Chỉ các thành viên được cấp quyền mới có thể xem'}
                </div>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Mã Khóa Bảo Vệ Khách Xem (Passcode tùy chọn)
            </label>
            <div className="relative">
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Để trống nếu không cần mã truy cập"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Import Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Nhập Danh Sách Thành Viên Từ Excel / CSV
              </h3>
              <p className="text-xs text-slate-500">
                Nhập nhanh danh sách các đời, gia phả tổ tiên từ file bảng tính
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsImportOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Upload className="w-4 h-4" />
            <span>Mở Bảng Nhập Excel</span>
          </button>
        </div>
      </div>

      {/* Import Excel Modal */}
      <ImportExcelModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        treeId={tree.id}
      />

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lưu Thay Đổi
            </>
          )}
        </button>
      </div>
    </form>
  );
}
