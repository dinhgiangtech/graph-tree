"use client";

import React, { useState } from 'react';
import { Plus, Heart, Baby, Loader2, Award, Calendar, Moon } from 'lucide-react';
import { FamilyMember, RelationshipType } from '@/types/family';

interface AddRelationFormProps {
  currentMember: FamilyMember;
  relationType: RelationshipType;
  onSubmit: (
    newMember: Omit<FamilyMember, 'id'>,
    relationType: RelationshipType
  ) => Promise<void>;
  onCancel: () => void;
}

export function AddRelationForm({
  currentMember,
  relationType,
  onSubmit,
  onCancel,
}: AddRelationFormProps) {
  const isAddingSpouse = relationType === 'SPOUSE_OF' || relationType === 'MARRIED_TO';

  const [form, setForm] = useState({
    name: '',
    gender: (isAddingSpouse && currentMember.gender === 'male'
      ? 'female'
      : isAddingSpouse && currentMember.gender === 'female'
      ? 'male'
      : 'male') as 'male' | 'female' | 'other',
    title: '',
    alias_name: '',
    birthDate: '',
    deathDate: '',
    lunar_death_date: '',
    birthPlace: currentMember.birthPlace || '',
    current_residence: currentMember.current_residence || '',
    job: '',
    bio: '',
    avatar: '',
    in_law: isAddingSpouse ? true : false,
    marriage_order: isAddingSpouse ? 1 : undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(
        {
          name: form.name.trim(),
          gender: form.gender,
          generation: isAddingSpouse ? (currentMember.generation ?? 1) : (currentMember.generation ?? 1) + 1,
          title: form.title?.trim() || undefined,
          alias_name: form.alias_name?.trim() || undefined,
          birthDate: form.birthDate?.trim() || undefined,
          deathDate: form.deathDate?.trim() || undefined,
          lunar_death_date: form.lunar_death_date?.trim() || undefined,
          birthPlace: form.birthPlace?.trim() || undefined,
          current_residence: form.current_residence?.trim() || undefined,
          job: form.job?.trim() || undefined,
          bio: form.bio?.trim() || undefined,
          avatar: form.avatar?.trim() || undefined,
          in_law: form.in_law,
          marriage_order: form.marriage_order,
          branchId: currentMember.branchId,
        },
        relationType
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in duration-200 text-xs font-sans">
      {/* Banner */}
      <div className="bg-[#FEF3C7]/60 dark:bg-[#292524] p-4 rounded-xl border border-[#FDE68A] dark:border-[#44403C] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] text-[#FEF3C7] flex items-center justify-center shrink-0 shadow-xs">
          {isAddingSpouse ? <Heart className="w-5 h-5 text-[#FEF3C7]" /> : <Baby className="w-5 h-5 text-[#FEF3C7]" />}
        </div>
        <div>
          <div className="font-bold text-[#8B1E1E] dark:text-[#FDE68A] text-sm font-heritage-title">
            Thêm {isAddingSpouse ? 'Bạn Đời / Vợ Chồng' : 'Con Cái (Hậu Duệ)'} Mới
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-400">
            Liên kết trực tiếp với: <span className="font-bold text-[#292524] dark:text-[#F5EFEB]">{currentMember.name}</span>
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="font-bold uppercase tracking-wider text-[#8B1E1E] dark:text-[#FDE68A]">
          Họ và Tên <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Nhập đầy đủ họ và tên..."
          className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] font-bold text-sm text-[#292524] dark:text-[#F5EFEB]"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>

      {/* Gender & In-Law Order */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Giới Tính
          </label>
          <select
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] font-semibold text-[#292524] dark:text-[#F5EFEB]"
            value={form.gender}
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

        {isAddingSpouse ? (
          <div className="flex flex-col gap-1.5">
            <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Thứ Tự Vợ (Nếu là Vợ)
            </label>
            <select
              className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] font-semibold text-[#292524] dark:text-[#F5EFEB]"
              value={form.marriage_order || 1}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  marriage_order: parseInt(e.target.value) || 1,
                }))
              }
            >
              <option value="1">Bà Cả (Chính thất)</option>
              <option value="2">Bà Hai (Thứ thất)</option>
              <option value="3">Bà Ba (Trắc thất)</option>
              <option value="4">Bà Bốn</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Thế Hệ (Tự động)
            </label>
            <div className="p-2.5 bg-[#F4EFE6] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl font-bold text-[#8B1E1E] dark:text-[#FDE68A]">
              Đời thứ {(currentMember.generation ?? 1) + 1}
            </div>
          </div>
        )}
      </div>

      {/* Alias & Title */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tên Tự / Tên Hiệu
          </label>
          <input
            type="text"
            placeholder="VD: Phúc An..."
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.alias_name}
            onChange={(e) => setForm((prev) => ({ ...prev, alias_name: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Tước Hiệu / Chức Sắc
          </label>
          <input
            type="text"
            placeholder="VD: Trưởng nam, Thứ nữ..."
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
      </div>

      {/* Dates: Birth & Death */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Năm Sinh (Dương lịch)
          </label>
          <input
            type="text"
            placeholder="VD: 1990"
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.birthDate}
            onChange={(e) => setForm((prev) => ({ ...prev, birthDate: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Năm Mất (Nếu đã mất)
          </label>
          <input
            type="text"
            placeholder="Để trống nếu còn sống"
            className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            value={form.deathDate}
            onChange={(e) => setForm((prev) => ({ ...prev, deathDate: e.target.value }))}
          />
        </div>
      </div>

      {/* Lunar Death Date (Ngày Giỗ Âm Lịch) */}
      <div className="flex flex-col gap-1.5">
        <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <Moon className="w-3.5 h-3.5 text-[#8B1E1E]" />
          Ngày Giỗ Âm Lịch (Kỵ Nhật nếu đã mất)
        </label>
        <input
          type="text"
          placeholder="VD: Ngày 15 tháng 3 ÂL"
          className="p-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C] rounded-xl outline-none focus:border-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
          value={form.lunar_death_date}
          onChange={(e) => setForm((prev) => ({ ...prev, lunar_death_date: e.target.value }))}
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
              Đang tạo...
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              Tạo Quan Hệ
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default AddRelationForm;
