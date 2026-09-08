"use client";

import React, { useMemo } from 'react';
import {
  Calendar,
  MapPin,
  Briefcase,
  User,
  Heart,
  Plus,
  Trash2,
  Award,
  Home,
  Users,
  Baby,
  ChevronRight,
  GitFork
} from 'lucide-react';
import { FamilyMember, Relationship, RelationshipType } from '@/types/family';

interface MemberInfoViewProps {
  member: FamilyMember;
  allMembers?: FamilyMember[];
  relationships?: Relationship[];
  onSelectMember?: (member: FamilyMember) => void;
  onStartAddRelation: (type: RelationshipType) => void;
  onDeleteMember: () => void;
}

export function MemberInfoView({
  member,
  allMembers = [],
  relationships = [],
  onSelectMember,
  onStartAddRelation,
  onDeleteMember
}: MemberInfoViewProps) {
  const isMale = member.gender === 'male';
  const isFemale = member.gender === 'female';

  // Calculate Family Relationships
  const familyRelations = useMemo(() => {
    const parentRelTypes = ['PARENT_OF', 'FATHER_OF', 'MOTHER_OF'];
    const spouseRelTypes = ['SPOUSE_OF', 'MARRIED_TO'];

    // 1. Parents (Cha / Mẹ)
    const parentIds = relationships
      .filter(r => parentRelTypes.includes(r.type) && r.to === member.id)
      .map(r => r.from);
    const parents = allMembers.filter(m => parentIds.includes(m.id));

    // 2. Spouses (Bạn đời / Vợ / Chồng)
    const spouseIds = relationships
      .filter(r => spouseRelTypes.includes(r.type) && (r.from === member.id || r.to === member.id))
      .map(r => (r.from === member.id ? r.to : r.from));
    const spouses = allMembers.filter(m => spouseIds.includes(m.id));

    // 3. Children (Con cái)
    const childIds = relationships
      .filter(r => parentRelTypes.includes(r.type) && r.from === member.id)
      .map(r => r.to);
    const children = allMembers.filter(m => childIds.includes(m.id));

    // 4. Siblings (Anh / Chị / Em)
    const siblingIds = relationships
      .filter(r => parentRelTypes.includes(r.type) && parentIds.includes(r.from) && r.to !== member.id)
      .map(r => r.to);
    const siblings = allMembers.filter(m => siblingIds.includes(m.id));

    return {
      parents,
      spouses,
      children,
      siblings
    };
  }, [member.id, allMembers, relationships]);

  const renderRelativeCard = (relative: FamilyMember, label: string) => {
    const isRelMale = relative.gender === 'male';
    const isRelFemale = relative.gender === 'female';

    return (
      <div
        key={relative.id}
        onClick={() => onSelectMember && onSelectMember(relative)}
        className="group flex items-center justify-between p-2.5 bg-slate-50 hover:bg-indigo-50/70 dark:bg-slate-900/40 dark:hover:bg-indigo-950/30 border border-slate-100 hover:border-indigo-200 dark:border-slate-700/60 dark:hover:border-indigo-800/50 rounded-xl transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
              isRelMale
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                : isRelFemale
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            {relative.avatar ? (
              <img
                src={relative.avatar}
                alt={relative.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              relative.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {relative.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 shrink-0 font-medium">
                {label}
              </span>
            </div>
            <div className="text-[11px] opacity-65 truncate mt-0.5">
              Đời {relative.generation ?? 1}
              {relative.title ? ` • ${relative.title}` : relative.job ? ` • ${relative.job}` : ''}
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
      </div>
    );
  };

  const hasAnyRelations =
    familyRelations.parents.length > 0 ||
    familyRelations.spouses.length > 0 ||
    familyRelations.children.length > 0 ||
    familyRelations.siblings.length > 0;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Visual Header */}
      <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg border-2 shrink-0 ${
            isMale
              ? 'bg-blue-100 border-blue-300 text-blue-800'
              : isFemale
                ? 'bg-rose-100 border-rose-300 text-rose-800'
                : 'bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            member.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="overflow-hidden flex-1">
          <h2 className="text-xl font-extrabold leading-tight truncate">{member.name}</h2>
          {member.alias_name && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tên khác / Tự: <span className="font-semibold">{member.alias_name}</span>
            </p>
          )}
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold opacity-75">
            <span
              className={`px-2 py-0.5 rounded-full ${
                isMale
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                  : isFemale
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
                    : 'bg-slate-100 text-slate-800'
              }`}
            >
              {isMale ? 'Nam' : isFemale ? 'Nữ' : 'Khác'}
            </span>
            <span>•</span>
            <span>Đời {member.generation ?? 1}</span>
            {member.is_alive !== undefined && (
              <>
                <span>•</span>
                <span className={member.is_alive ? 'text-emerald-500' : 'text-slate-400'}>
                  {member.is_alive ? 'Còn sống' : 'Đã mất'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Properties fields list */}
      <div className="flex flex-col gap-4">
        {member.title && (
          <div className="flex items-start gap-3 text-sm">
            <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-xs uppercase tracking-wider">
                Tước hiệu / Công trạng
              </div>
              <div className="mt-0.5 font-medium text-amber-700 dark:text-amber-300">{member.title}</div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3 text-sm">
          <Calendar className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold opacity-60 text-xs uppercase tracking-wider">
              Năm Sinh / Mất
            </div>
            <div className="mt-0.5 font-medium">
              {member.birthDate || 'Chưa rõ năm sinh'}
              {member.deathDate ? ` đến ${member.deathDate}` : member.is_alive ? ' (Còn sống)' : member.birthDate ? ' (Đã mất)' : ''}
            </div>
          </div>
        </div>

        {member.birthPlace && (
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-xs uppercase tracking-wider">Quê Quán / Nguyên Quán</div>
              <div className="mt-0.5 font-medium">{member.birthPlace}</div>
            </div>
          </div>
        )}

        {member.current_residence && (
          <div className="flex items-start gap-3 text-sm">
            <Home className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-xs uppercase tracking-wider">Nơi ở hiện nay / Chi cư</div>
              <div className="mt-0.5 font-medium">{member.current_residence}</div>
            </div>
          </div>
        )}

        {member.job && member.job !== member.title && (
          <div className="flex items-start gap-3 text-sm">
            <Briefcase className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold opacity-60 text-xs uppercase tracking-wider">Chức vụ / Nghề Nghiệp</div>
              <div className="mt-0.5 font-medium">{member.job}</div>
            </div>
          </div>
        )}

        {member.bio && member.bio !== member.title && (
          <div className="flex items-start gap-3 text-sm">
            <User className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="font-bold opacity-60 text-xs uppercase tracking-wider">
                Tiểu sử / Ghi chú
              </div>
              <div className="mt-1 text-slate-600 dark:text-slate-350 leading-relaxed bg-slate-50 dark:bg-slate-900/20 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700/50 whitespace-pre-line text-sm">
                {member.bio}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================================== */}
      {/* MỐI QUAN HỆ GIA ĐÌNH (FAMILY RELATIONSHIPS SECTION) */}
      {/* ============================================================================== */}
      <div className="border-t border-slate-100 dark:border-slate-700 pt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <GitFork className="w-4 h-4 text-indigo-500" />
            Mối Quan Hệ Gia Đình
          </h4>
          <span className="text-[11px] text-slate-400 font-medium">
            (Bấm vào để xem)
          </span>
        </div>

        {/* 1. Cha / Mẹ */}
        {familyRelations.parents.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Cha / Mẹ ({familyRelations.parents.length})
            </div>
            <div className="flex flex-col gap-1.5">
              {familyRelations.parents.map(p =>
                renderRelativeCard(p, p.gender === 'female' ? 'Mẹ' : 'Cha')
              )}
            </div>
          </div>
        )}

        {/* 2. Bạn Đời / Vợ / Chồng */}
        {familyRelations.spouses.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-pink-500" />
              Bạn Đời ({familyRelations.spouses.length})
            </div>
            <div className="flex flex-col gap-1.5">
              {familyRelations.spouses.map(s =>
                renderRelativeCard(s, s.gender === 'female' ? 'Vợ' : 'Chồng')
              )}
            </div>
          </div>
        )}

        {/* 3. Con Cái */}
        {familyRelations.children.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Baby className="w-3.5 h-3.5 text-emerald-500" />
              Con Cái ({familyRelations.children.length})
            </div>
            <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
              {familyRelations.children.map(c =>
                renderRelativeCard(c, c.gender === 'female' ? 'Con gái' : 'Con trai')
              )}
            </div>
          </div>
        )}

        {/* 4. Anh / Chị / Em */}
        {familyRelations.siblings.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-500" />
              Anh / Chị / Em ({familyRelations.siblings.length})
            </div>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
              {familyRelations.siblings.map(sib =>
                renderRelativeCard(sib, sib.gender === 'female' ? 'Chị/Em gái' : 'Anh/Em trai')
              )}
            </div>
          </div>
        )}

        {/* Empty state if no relations recorded */}
        {!hasAnyRelations && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/30 rounded-xl text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-700">
            Chưa có thông tin liên kết quan hệ trực tiếp.
          </div>
        )}
      </div>

      {/* Add Spouse / Child Relationships Triggers */}
      <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
        <h4 className="font-bold text-xs uppercase tracking-wider opacity-60 mb-3">
          Tác vụ liên kết cây
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onStartAddRelation('SPOUSE_OF')}
            className="py-2.5 px-3 bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/20 dark:hover:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5" />
            Thêm Bạn Đời
          </button>
          <button
            type="button"
            onClick={() => onStartAddRelation('PARENT_OF')}
            className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm Con Cái
          </button>
        </div>
      </div>

      {/* Delete Trigger */}
      <div className="border-t border-slate-100 dark:border-slate-700 pt-6 mt-auto">
        <button
          type="button"
          onClick={onDeleteMember}
          className="w-full py-3 bg-red-50 dark:bg-red-950/10 hover:bg-red-100 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-red-200/50 dark:border-red-900/30 transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          Xóa Thành Viên Khỏi Hệ Thống
        </button>
      </div>
    </div>
  );
}

export default MemberInfoView;
