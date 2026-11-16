"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createFamilyTree } from '@/app/actions/tree';
import { X, Sparkles, MapPin, GitBranch, Globe, Lock, Loader2 } from 'lucide-react';
import HeritageLogoIcon from '@/components/HeritageLogoIcon';

interface CreateTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateTreeModal({ isOpen, onClose, onCreated }: CreateTreeModalProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [originPlace, setOriginPlace] = useState('');
  const [initialBranchName, setInitialBranchName] = useState('Chi Trưởng');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên dòng họ hoặc cây gia phả.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await createFamilyTree({
        name,
        originPlace,
        initialBranchName,
        description,
        isPublic,
        passcode: passcode || undefined,
      });

      if (res.success && res.data) {
        onClose();
        if (onCreated) {
          onCreated();
        }
        router.push(`/trees/${res.data.treeId}`);
      } else {
        setError(res.error?.message || 'Có lỗi xảy ra khi tạo cây gia phả.');
      }
    } catch (err: any) {
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-[#FAF7F0] dark:bg-[#1C1917] rounded-2xl shadow-2xl border border-[#D7CCA9] dark:border-[#44403C] overflow-hidden">
        {/* Header decoration banner */}
        <div className="bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] px-6 py-5 text-[#FEF3C7] flex items-center justify-between border-b border-[#B45309]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center p-2 border border-[#FDE68A]/30">
              <HeritageLogoIcon className="w-full h-full" />
            </div>
            <div>
              <h2 className="font-heritage-title text-lg font-bold text-[#FEF3C7]">Khởi Tạo Cây Gia Phả Mới</h2>
              <p className="text-xs text-[#FDE68A] opacity-90">Thiết lập cội nguồn và dòng dõi cho gia tộc của bạn</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FEF3C7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FCA5A5] text-[#991B1B] dark:text-[#F87171] text-xs font-medium">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#D6D3D1] mb-1.5 font-heritage-title">
              Tên Dòng Họ / Cây Gia Phả <span className="text-[#8B1E1E]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Gia Phả Họ Đinh - Chi Lăng"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D7CCA9] dark:border-[#44403C] bg-[#FDFBF7] dark:bg-[#292524] text-sm text-[#1C1917] dark:text-[#FAF7F0] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all"
              />
              <Sparkles className="w-4 h-4 text-[#B45309] absolute right-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Origin Place */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#D6D3D1] mb-1.5 font-heritage-title">
                Quê Quán / Gốc Tổ
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={originPlace}
                  onChange={(e) => setOriginPlace(e.target.value)}
                  placeholder="VD: Gia Viễn, Ninh Bình"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-[#D7CCA9] dark:border-[#44403C] bg-[#FDFBF7] dark:bg-[#292524] text-sm text-[#1C1917] dark:text-[#FAF7F0] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all"
                />
                <MapPin className="w-4 h-4 text-[#B45309] absolute left-3 top-3" />
              </div>
            </div>

            {/* Initial Branch */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#D6D3D1] mb-1.5 font-heritage-title">
                Chi Nhánh Ban Đầu
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={initialBranchName}
                  onChange={(e) => setInitialBranchName(e.target.value)}
                  placeholder="VD: Chi Trưởng"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-[#D7CCA9] dark:border-[#44403C] bg-[#FDFBF7] dark:bg-[#292524] text-sm text-[#1C1917] dark:text-[#FAF7F0] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all"
                />
                <GitBranch className="w-4 h-4 text-[#B45309] absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#44403C] dark:text-[#D6D3D1] mb-1.5 font-heritage-title">
              Mô Tả / Lược Sử Ngắn
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Giới thiệu sơ lược về truyền thống dòng tộc..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#D7CCA9] dark:border-[#44403C] bg-[#FDFBF7] dark:bg-[#292524] text-sm text-[#1C1917] dark:text-[#FAF7F0] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] transition-all resize-none"
            />
          </div>

          {/* Privacy settings */}
          <div className="p-3.5 rounded-xl bg-[#F4EFE6] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {isPublic ? (
                  <Globe className="w-4 h-4 text-[#15803D]" />
                ) : (
                  <Lock className="w-4 h-4 text-[#B45309]" />
                )}
                <div>
                  <div className="text-xs font-bold text-[#1C1917] dark:text-[#FAF7F0]">
                    {isPublic ? 'Cây công khai (Public)' : 'Cây riêng tư (Private)'}
                  </div>
                  <div className="text-[11px] text-[#78716C] dark:text-[#A8A29E]">
                    {isPublic
                      ? 'Bất kỳ ai có đường dẫn đều có thể xem phả đồ'
                      : 'Chỉ thành viên được mời mới có quyền xem'}
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
                <div className="w-9 h-5 bg-[#D6D3D1] peer-focus:outline-none rounded-full peer dark:bg-[#44403C] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B1E1E]"></div>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7DFC9] dark:border-[#44403C]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-xl text-[#78716C] dark:text-[#A8A29E] hover:bg-[#E7DFC9]/50 dark:hover:bg-[#44403C] transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] shadow-md shadow-[#8B1E1E]/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang khởi tạo...
                </>
              ) : (
                'Tạo Cây Ngay'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
