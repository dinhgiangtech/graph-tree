"use client";

import React, { useState } from 'react';
import { Save, Loader2, Award, Moon, Calendar } from 'lucide-react';
import { FamilyMember } from '@/types/family';

interface MemberEditFormProps {
  initialMember: FamilyMember;
  onSave: (updated: FamilyMember) => Promise<void>;
  onCancel: () => void;
}

export default function MemberEditForm({ initialMember, onSave, onCancel }: MemberEditFormProps) {
  const [form, setForm] = useState<FamilyMember>({
    ...initialMember,
    is_alive: initialMember.is_alive ?? (initialMember.deathDate ? false : true),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in duration-200 text-xs font-sans">
      {/* Full Name & Gender */}
      <div className="flex flex-col gap-1.5">
        <label className="font-bold uppercase tracking-wider text-[#8B1E1E] dark:text-[#FDE68A]">
          Họ và Tên Thành Viên <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] font-bold text-sm text-[#292524] dark:text-[#F5EFEB]"
          value={form.name || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Giới Tính
          </label>
          <select
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] font-semibold text-[#292524] dark:text-[#F5EFEB]"
            value={form.gender || 'male'}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                gender: e.target.value as 'male' | 'female' | 'other',
              }))
            }
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Thế Hệ (Đời Thứ) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            required
            min={1}
            max={100}
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] font-bold text-[#292524] dark:text-[#F5EFEB]"
            value={form.generation ?? 1}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, generation: parseInt(e.target.value) || 1 }))
            }
          />
        </div>
      </div>

      {/* Alias & Title */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tên Tự / Tên Hiệu
          </label>
          <input
            type="text"
            placeholder="VD: Phúc An, Thụy..."
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.alias_name || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, alias_name: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tước Hiệu / Chức Sắc
          </label>
          <input
            type="text"
            placeholder="VD: Thủy Tổ, Trưởng tộc, Cụ Cả..."
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.title || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
      </div>

      {/* Living Status Toggle */}
      <div className="p-3 bg-[#FEF3C7]/40 dark:bg-[#292524] rounded-xl border border-[#FDE68A] dark:border-[#44403C] flex items-center justify-between">
        <div>
          <span className="font-bold text-[#8B1E1E] dark:text-[#FDE68A]">Tình Trạng Sinh Tử</span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {form.is_alive ? 'Thành viên hiện còn sống' : 'Tiền nhân đã quy tiên / tạ thế'}
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!form.is_alive}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                is_alive: e.target.checked,
                deathDate: e.target.checked ? '' : prev.deathDate,
              }))
            }
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#15803D]"></div>
        </label>
      </div>

      {/* Dates: Birth & Death (Solar) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
            Năm / Ngày Sinh (Dương)
          </label>
          <input
            type="text"
            placeholder="VD: 1985 hoặc 1985-05-20"
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.birthDate || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, birthDate: e.target.value }))}
          />
        </div>

        {!form.is_alive && (
          <div className="flex flex-col gap-1.5 animate-in fade-in">
            <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8B1E1E]" />
              Năm Mất (Dương lịch)
            </label>
            <input
              type="text"
              placeholder="VD: 2020 hoặc 2020-10-15"
              className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
              value={form.deathDate || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, deathDate: e.target.value }))}
            />
          </div>
        )}
      </div>

      {/* Traditional Lunar Anniversary (Ngày Giỗ Âm Lịch) */}
      {!form.is_alive && (
        <div className="p-3 bg-[#8B1E1E]/5 dark:bg-[#8B1E1E]/20 rounded-xl border border-[#8B1E1E]/20 flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-[#8B1E1E] dark:text-[#F87171] flex items-center gap-1">
            <Moon className="w-3.5 h-3.5 text-[#8B1E1E] dark:text-[#F87171]" />
            Ngày Giỗ Âm Lịch (Kỵ Nhật Truyền Thống)
          </label>
          <input
            type="text"
            placeholder="VD: Ngày 15 tháng 3 ÂL, hoặc Giờ Ngọ 20/07 ÂL"
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#8B1E1E] font-medium text-[#8B1E1E] dark:text-[#FDE68A]"
            value={form.lunar_death_date || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, lunar_death_date: e.target.value }))}
          />
        </div>
      )}

      {/* Places */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Quê Quán / Gốc Tổ
          </label>
          <input
            type="text"
            placeholder="VD: Thái Bình"
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.birthPlace || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, birthPlace: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Nơi Ở Hiện Nay / Chi Cư
          </label>
          <input
            type="text"
            placeholder="VD: Hà Nội"
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.current_residence || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, current_residence: e.target.value }))}
          />
        </div>
      </div>

      {/* Resting Place & Coordinates (if deceased) */}
      {!form.is_alive && (
        <div className="grid grid-cols-2 gap-3 animate-in fade-in">
          <div className="flex flex-col gap-1.5">
            <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Nơi An Nghỉ / Mộ Phần
            </label>
            <input
              type="text"
              placeholder="VD: Nghĩa trang quê nhà, khu lăng mộ"
              className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
              value={form.resting_place || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, resting_place: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Tọa Độ Phần Mộ
            </label>
            <input
              type="text"
              placeholder="VD: 20.123, 106.456"
              className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
              value={form.burial_coordinates || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, burial_coordinates: e.target.value }))}
            />
          </div>
        </div>
      )}

      {/* In-Law & Marriage order */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 p-3 bg-[#FAF7F0] dark:bg-[#1C1917] rounded-xl border border-[#E7DFC9] dark:border-[#44403C]">
          <input
            type="checkbox"
            id="inLawCheck"
            checked={!!form.in_law}
            onChange={(e) => setForm((prev) => ({ ...prev, in_law: e.target.checked }))}
            className="w-4 h-4 rounded text-[#8B1E1E] focus:ring-[#8B1E1E]"
          />
          <label htmlFor="inLawCheck" className="font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
            Là Dâu / Rể
          </label>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Thứ Tự Vợ (Nếu là Vợ)
          </label>
          <input
            type="number"
            min={1}
            max={10}
            placeholder="1: Vợ cả, 2: Vợ hai..."
            className="p-2 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.marriage_order || ''}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, marriage_order: parseInt(e.target.value) || undefined }))
            }
          />
        </div>
      </div>

      {/* Job */}
      <div className="flex flex-col gap-1.5">
        <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Chức Vụ / Nghề Nghiệp
        </label>
        <input
          type="text"
          placeholder="VD: Nhà giáo, Kỹ sư, Lão nông..."
          className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
          value={form.job || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, job: e.target.value }))}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Tiểu Sử / Sự Nghiệp / Công Trạng
        </label>
        <textarea
          rows={3}
          placeholder="Ghi chú chi tiết về cuộc đời, đạo đức và công đức truyền lại cho dòng họ..."
          className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] resize-none text-[#292524] dark:text-[#F5EFEB]"
          value={form.bio || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2 border-t border-[#E7DFC9] dark:border-[#44403C] pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 py-2.5 bg-[#F4EFE6] hover:bg-[#E7DFC9] dark:bg-[#292524] dark:hover:bg-[#3E2723] text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors cursor-pointer"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] font-bold rounded-xl shadow-md shadow-[#8B1E1E]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              Lưu Thay Đổi
            </>
          )}
        </button>
      </div>
    </form>
  );
}
