"use client";

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { FamilyMember } from '@/types/family';

interface MemberEditFormProps {
  initialMember: FamilyMember;
  onSave: (updated: FamilyMember) => Promise<void>;
  onCancel: () => void;
}

export function MemberEditForm({ initialMember, onSave, onCancel }: MemberEditFormProps) {
  const [form, setForm] = useState<FamilyMember>({ ...initialMember });
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Họ và Tên</label>
        <input
          type="text"
          required
          className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 font-semibold text-sm"
          value={form.name || ''}
          onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Giới Tính</label>
          <select
            className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm"
            value={form.gender || 'male'}
            onChange={(e) => setForm(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' | 'other' }))}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Thế Hệ (Đời)</label>
          <input
            type="number"
            required
            min={0}
            className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm font-semibold"
            value={form.generation ?? 0}
            onChange={(e) => setForm(prev => ({ ...prev, generation: parseInt(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Ngày Sinh</label>
          <input
            type="date"
            className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm"
            value={form.birthDate || ''}
            onChange={(e) => setForm(prev => ({ ...prev, birthDate: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider opacity-60">Ngày Mất (Nếu có)</label>
          <input
            type="date"
            className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm"
            value={form.deathDate || ''}
            onChange={(e) => setForm(prev => ({ ...prev, deathDate: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Quê Quán</label>
        <input
          type="text"
          className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm"
          value={form.birthPlace || ''}
          onChange={(e) => setForm(prev => ({ ...prev, birthPlace: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Nghề Nghiệp</label>
        <input
          type="text"
          className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm"
          value={form.job || ''}
          onChange={(e) => setForm(prev => ({ ...prev, job: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Đường dẫn ảnh đại diện (URL)</label>
        <input
          type="text"
          placeholder="https://example.com/avatar.jpg"
          className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-xs"
          value={form.avatar || ''}
          onChange={(e) => setForm(prev => ({ ...prev, avatar: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider opacity-60">Tiểu sử / Ghi chú</label>
        <textarea
          rows={4}
          className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-500 text-sm resize-none"
          value={form.bio || ''}
          onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
        />
      </div>

      <div className="flex gap-3 mt-4 border-t border-slate-100 dark:border-slate-700 pt-5">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-650 text-slate-800 dark:text-slate-100 font-bold rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-100 dark:shadow-none transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
        </button>
      </div>
    </form>
  );
}

export default MemberEditForm;
