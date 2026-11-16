"use client";

import React, { useMemo } from 'react';
import {
  Calendar,
  MapPin,
  Briefcase,
  User,
  Heart,
  Award,
  Home,
  Users,
  ChevronRight,
  GitFork,
  Sparkles,
  Compass,
  Moon,
  Crown
} from 'lucide-react';
import { FamilyMember, Relationship, RelationshipType } from '@/types/family';
import { useTreeStore } from '@/lib/useTreeStore';
import { claimProfile } from '@/app/actions/proposal';

interface MemberInfoViewProps {
  member: FamilyMember;
  treeId?: string;
  allMembers?: FamilyMember[];
  relationships?: Relationship[];
  onSelectMember?: (member: FamilyMember) => void;
  onStartAddRelation: (type: RelationshipType) => void;
  onDeleteMember: () => void;
}

export default function MemberInfoView({
  member,
  treeId,
  allMembers = [],
  relationships = [],
  onSelectMember,
  onStartAddRelation,
  onDeleteMember,
}: MemberInfoViewProps) {
  const isMale = member.gender === 'male';
  const isFemale = member.gender === 'female';
  const [claimLoading, setClaimLoading] = React.useState(false);
  const [claimSuccess, setClaimSuccess] = React.useState(false);

  const handleClaim = async () => {
    if (!treeId) return;
    setClaimLoading(true);
    try {
      const res = await claimProfile(treeId, member.id);
      if (res.success) {
        setClaimSuccess(true);
      }
    } finally {
      setClaimLoading(false);
    }
  };

  const { setRootPerson } = useTreeStore();

  // Calculate Family Relationships
  const familyRelations = useMemo(() => {
    const parentRelTypes = ['PARENT_OF', 'FATHER_OF', 'MOTHER_OF'];
    const spouseRelTypes = ['SPOUSE_OF', 'MARRIED_TO'];

    // 1. Parents (Cha / Mẹ)
    const parentIds = relationships
      .filter((r) => parentRelTypes.includes(r.type) && r.to === member.id)
      .map((r) => r.from);
    const parents = allMembers.filter((m) => parentIds.includes(m.id));

    // 2. Spouses (Bạn đời / Vợ / Chồng)
    const spouseIds = relationships
      .filter(
        (r) => spouseRelTypes.includes(r.type) && (r.from === member.id || r.to === member.id)
      )
      .map((r) => (r.from === member.id ? r.to : r.from));
    const spouses = allMembers.filter((m) => spouseIds.includes(m.id));

    // 3. Children (Con cái)
    const childIds = relationships
      .filter((r) => parentRelTypes.includes(r.type) && r.from === member.id)
      .map((r) => r.to);
    const children = allMembers.filter((m) => childIds.includes(m.id));

    // 4. Siblings (Anh / Chị / Em)
    const siblingIds = relationships
      .filter(
        (r) =>
          parentRelTypes.includes(r.type) &&
          parentIds.includes(r.from) &&
          r.to !== member.id
      )
      .map((r) => r.to);
    const siblings = allMembers.filter((m) => siblingIds.includes(m.id));

    return {
      parents,
      spouses,
      children,
      siblings,
    };
  }, [member.id, allMembers, relationships]);

  const renderRelativeCard = (relative: FamilyMember, label: string) => {
    const isRelMale = relative.gender === 'male';

    return (
      <div
        key={relative.id}
        onClick={() => onSelectMember && onSelectMember(relative)}
        className="group flex items-center justify-between p-2.5 bg-[#FAF7F0] hover:bg-[#FEF3C7]/80 dark:bg-[#292524] dark:hover:bg-[#3E2723]/80 border border-[#E7DFC9] hover:border-[#B45309] dark:border-[#44403C] rounded-xl transition-all cursor-pointer shadow-2xs"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
              isRelMale
                ? 'bg-[#E0E7FF] text-[#3730A3]'
                : 'bg-[#FCE7F3] text-[#9D174D]'
            }`}
          >
            {relative.avatar ? (
              <img
                src={relative.avatar}
                alt={relative.name}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              relative.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs truncate text-[#292524] dark:text-[#F5EFEB] group-hover:text-[#8B1E1E] dark:group-hover:text-[#FDE68A] transition-colors">
                {relative.name}
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] dark:bg-[#78350F]/40 dark:text-[#FDE68A] shrink-0 font-bold">
                {label}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
              Đời {relative.generation ?? 1}
              {relative.title ? ` • [${relative.title}]` : relative.job ? ` • ${relative.job}` : ''}
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#B45309] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
      </div>
    );
  };

  const hasAnyRelations =
    familyRelations.parents.length > 0 ||
    familyRelations.spouses.length > 0 ||
    familyRelations.children.length > 0 ||
    familyRelations.siblings.length > 0;

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-200 font-sans">
      {/* Visual Header */}
      <div className="flex items-center gap-4 bg-[#FDFBF7] dark:bg-[#292524] p-4 rounded-2xl border border-[#E7DFC9] dark:border-[#44403C] shadow-sm">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg border-2 shrink-0 shadow-md ${
            isMale
              ? 'bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] text-[#FEF3C7] border-[#D97706]'
              : 'bg-gradient-to-tr from-[#BE123C] to-[#E11D48] text-[#FFE4E6] border-[#FDA4AF]'
          }`}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-2xl object-cover"
            />
          ) : (
            member.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black font-heritage-title text-[#8B1E1E] dark:text-[#FDE68A] leading-tight truncate">
              {member.name}
            </h2>
            {member.marriage_order && member.marriage_order > 1 && (
              <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] shrink-0">
                Bà {member.marriage_order === 2 ? 'Hai' : member.marriage_order}
              </span>
            )}
          </div>

          {member.alias_name && (
            <p className="text-xs text-[#B45309] dark:text-[#D97706] font-semibold mt-0.5">
              Tự / Hiệu: <span>{member.alias_name}</span>
            </p>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-bold">
            <span
              className={`px-2 py-0.5 rounded-md ${
                isMale
                  ? 'bg-[#E0E7FF] text-[#3730A3] dark:bg-[#1E293B] dark:text-[#93C5FD]'
                  : 'bg-[#FCE7F3] text-[#9D174D] dark:bg-[#3F1A28] dark:text-[#F472B6]'
              }`}
            >
              {isMale ? 'Nam' : isFemale ? 'Nữ' : 'Khác'}
            </span>

            {member.in_law && (
              <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                {isMale ? 'Rể' : 'Dâu'}
              </span>
            )}

            <span>•</span>
            <span className="text-[#8B1E1E] dark:text-[#FDE68A]">Đời {member.generation ?? 1}</span>

            <span>•</span>
            <span className={member.is_alive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}>
              {member.is_alive ? 'Còn sống' : 'Đã khuất'}
            </span>
          </div>
        </div>
      </div>

      {/* Subtree Focus Button */}
      {familyRelations.children.length > 0 && (
        <button
          onClick={() => setRootPerson(member.id, member.name)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B1E1E]/10 via-[#B45309]/10 to-[#8B1E1E]/10 hover:from-[#8B1E1E]/20 hover:to-[#B45309]/20 border border-[#B45309]/40 text-[#8B1E1E] dark:text-[#FDE68A] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#B45309]" />
          Tập Trung Xem Nhánh Con Của Cụ
        </button>
      )}

      {/* Claim Profile button */}
      {treeId && (
        <div className="flex items-center gap-2">
          {claimSuccess ? (
            <div className="w-full py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center">
              ✓ Đã liên kết tài khoản của bạn với vị trí này
            </div>
          ) : (
            <button
              onClick={handleClaim}
              disabled={claimLoading}
              className="w-full py-2 px-3 rounded-xl bg-[#FEF3C7]/70 hover:bg-[#FEF3C7] dark:bg-[#292524] text-[#8B1E1E] dark:text-[#FDE68A] border border-[#FDE68A] dark:border-[#44403C] text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <User className="w-3.5 h-3.5 text-[#B45309]" />
              {claimLoading ? 'Đang liên kết...' : 'Đây Là Tôi (Liên kết hồ sơ)'}
            </button>
          )}
        </div>
      )}

      {/* Properties fields list */}
      <div className="flex flex-col gap-3.5 text-xs bg-[#FDFBF7] dark:bg-[#292524] p-4 rounded-2xl border border-[#E7DFC9] dark:border-[#44403C]">
        {member.title && (
          <div className="flex items-start gap-3">
            <Award className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-slate-500">
                Tước Hiệu / Chức Sắc Tộc Phả
              </div>
              <div className="mt-0.5 font-black text-[#8B1E1E] dark:text-[#FDE68A] text-sm font-heritage-title">
                {member.title}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-slate-500">
              Năm Sinh / Năm Mất (Dương Lịch)
            </div>
            <div className="mt-0.5 font-medium text-slate-800 dark:text-slate-200">
              {member.birthDate || 'Chưa rõ năm sinh'}
              {member.deathDate
                ? ` đến ${member.deathDate} (Thọ ${
                    member.birthDate && !isNaN(Number(member.birthDate)) && !isNaN(Number(member.deathDate))
                      ? Number(member.deathDate) - Number(member.birthDate) + ' tuổi'
                      : ''
                  })`
                : member.is_alive
                ? ' (Hiện còn sống)'
                : member.birthDate
                ? ' (Đã tạ thế)'
                : ''}
            </div>
          </div>
        </div>

        {/* Traditional Lunar Anniversary (Ngày giỗ Âm lịch) */}
        {!member.is_alive && (member.lunar_death_date || member.deathDate) && (
          <div className="flex items-start gap-3">
            <Moon className="w-4 h-4 text-[#8B1E1E] dark:text-[#F87171] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-[#8B1E1E] dark:text-[#F87171]">
                Ngày Giỗ Âm Lịch (Kỵ Nhật)
              </div>
              <div className="mt-0.5 font-bold text-[#8B1E1E] dark:text-[#FDE68A]">
                {member.lunar_death_date || 'Chưa cập nhật ngày Âm'}
              </div>
            </div>
          </div>
        )}

        {member.birthPlace && (
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-slate-500">
                Quê Quán / Gốc Tổ
              </div>
              <div className="mt-0.5 font-medium text-slate-800 dark:text-slate-200">
                {member.birthPlace}
              </div>
            </div>
          </div>
        )}

        {member.current_residence && (
          <div className="flex items-start gap-3">
            <Home className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-slate-500">
                Nơi Ở Hiện Nay / Chi Cư
              </div>
              <div className="mt-0.5 font-medium text-slate-800 dark:text-slate-200">
                {member.current_residence}
              </div>
            </div>
          </div>
        )}

        {/* Resting Place & Burial coordinates if deceased */}
        {!member.is_alive && (member.resting_place || member.burial_coordinates) && (
          <div className="flex items-start gap-3">
            <Compass className="w-4 h-4 text-[#8B1E1E] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-[#8B1E1E]">
                Nơi An Nghỉ / Mộ Phần
              </div>
              <div className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">
                {member.resting_place}
                {member.burial_coordinates && (
                  <span className="block text-[11px] text-slate-500">
                    Tọa độ: {member.burial_coordinates}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {member.job && member.job !== member.title && (
          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-slate-500">
                Chức Vụ / Nghề Nghiệp
              </div>
              <div className="mt-0.5 font-medium text-slate-800 dark:text-slate-200">
                {member.job}
              </div>
            </div>
          </div>
        )}

        {member.bio && (
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="font-bold opacity-60 text-[10px] uppercase tracking-wider text-slate-500">
                Tiểu Sử / Công Trạng
              </div>
              <div className="mt-1 text-slate-700 dark:text-slate-300 leading-relaxed bg-[#FAF7F0] dark:bg-[#1C1917] p-3 rounded-xl border border-[#E7DFC9] dark:border-[#44403C] whitespace-pre-line text-xs italic">
                "{member.bio}"
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================== */}
      {/* MỐI QUAN HỆ GIA ĐÌNH (FAMILY RELATIONSHIPS SECTION) */}
      {/* ============================================================================== */}
      <div className="border-t border-[#E7DFC9] dark:border-[#44403C] pt-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#8B1E1E] dark:text-[#FDE68A] flex items-center gap-1.5 font-heritage-title">
            <GitFork className="w-4 h-4 text-[#B45309]" />
            Mối Quan Hệ Dòng Tộc
          </h4>
          <span className="text-[10px] text-slate-400">
            (Bấm để chuyển xem)
          </span>
        </div>

        {/* 1. Cha / Mẹ */}
        {familyRelations.parents.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Cha / Mẹ ({familyRelations.parents.length})
            </div>
            <div className="flex flex-col gap-1.5">
              {familyRelations.parents.map((p) =>
                renderRelativeCard(p, p.gender === 'female' ? 'Mẹ' : 'Cha')
              )}
            </div>
          </div>
        )}

        {/* 2. Bạn đời / Vợ / Chồng */}
        {familyRelations.spouses.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-pink-500" />
              Hôn Phối (Bạn đời) ({familyRelations.spouses.length})
            </div>
            <div className="flex flex-col gap-1.5">
              {familyRelations.spouses.map((s, idx) =>
                renderRelativeCard(
                  s,
                  s.gender === 'female'
                    ? s.marriage_order
                      ? `Bà ${s.marriage_order}`
                      : 'Vợ'
                    : 'Chồng'
                )
              )}
            </div>
          </div>
        )}

        {/* 3. Con cái */}
        {familyRelations.children.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#15803D]" />
              Hậu Duệ (Con Cái) ({familyRelations.children.length})
            </div>
            <div className="flex flex-col gap-1.5">
              {familyRelations.children.map((c) =>
                renderRelativeCard(c, c.gender === 'female' ? 'Con gái' : 'Con trai')
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
