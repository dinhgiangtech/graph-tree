"use client";

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FamilyMember, Relationship } from '@/types/family';
import {
  Printer,
  Search,
  MapPin,
  Calendar,
  Heart,
  Users,
  Scroll,
  Type,
  ExternalLink,
  Moon,
  Crown
} from 'lucide-react';

interface PhahyBookViewProps {
  treeId: string;
  tree: {
    id: string;
    name: string;
    description?: string | null;
    originPlace?: string | null;
    branches?: Array<{ id: string; name: string }>;
  };
  members: FamilyMember[];
  relationships: Relationship[];
}

export default function PhahyBookView({
  treeId,
  tree,
  members,
  relationships,
}: PhahyBookViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('ALL');
  const [isSerif, setIsSerif] = useState(true);
  const [activeGenTab, setActiveGenTab] = useState<number | 'ALL'>('ALL');

  const printRef = useRef<HTMLDivElement>(null);

  // Group members and build relationships map
  const { memberMap, relationsMap, generationsMap, sortedGenerations } = useMemo(() => {
    const mMap = new Map<string, FamilyMember>(members.map((m) => [m.id, m]));
    const rMap = new Map<
      string,
      { spouses: Array<{ member: FamilyMember; order?: number }>; parents: FamilyMember[]; children: FamilyMember[] }
    >();

    members.forEach((m) => {
      rMap.set(m.id, { spouses: [], parents: [], children: [] });
    });

    relationships.forEach((rel) => {
      if (rel.type === 'PARENT_OF') {
        const parent = mMap.get(rel.from);
        const child = mMap.get(rel.to);
        if (parent && child) {
          rMap.get(child.id)?.parents.push(parent);
          rMap.get(parent.id)?.children.push(child);
        }
      } else if (rel.type === 'SPOUSE_OF') {
        const m1 = mMap.get(rel.from);
        const m2 = mMap.get(rel.to);
        if (m1 && m2) {
          rMap.get(m1.id)?.spouses.push({ member: m2, order: rel.marriageOrder });
          rMap.get(m2.id)?.spouses.push({ member: m1, order: rel.marriageOrder });
        }
      }
    });

    // Group members by generation
    const gMap = new Map<number, FamilyMember[]>();
    members.forEach((m) => {
      const gen = m.generation ?? 1;
      if (!gMap.has(gen)) {
        gMap.set(gen, []);
      }
      gMap.get(gen)!.push(m);
    });

    // Sort generations ascending
    const sortedGens = Array.from(gMap.keys()).sort((a, b) => a - b);

    // Sort members within each generation: direct bloodline first, then by birthDate / name
    sortedGens.forEach((g) => {
      gMap.get(g)?.sort((a, b) => {
        if (a.in_law !== b.in_law) {
          return a.in_law ? 1 : -1;
        }
        return a.name.localeCompare(b.name);
      });
    });

    return {
      memberMap: mMap,
      relationsMap: rMap,
      generationsMap: gMap,
      sortedGenerations: sortedGens,
    };
  }, [members, relationships]);

  // Filtered members list
  const filteredGenerations = useMemo(() => {
    const result: Array<{ gen: number; members: FamilyMember[] }> = [];

    sortedGenerations.forEach((gen) => {
      if (activeGenTab !== 'ALL' && activeGenTab !== gen) return;

      const genMembers = generationsMap.get(gen) || [];
      const filtered = genMembers.filter((m) => {
        if (selectedBranchId !== 'ALL' && m.branchId !== selectedBranchId) {
          return false;
        }
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchName = m.name.toLowerCase().includes(term);
          const matchAlias = m.alias_name?.toLowerCase().includes(term);
          const matchBio = m.bio?.toLowerCase().includes(term);
          const matchTitle = m.title?.toLowerCase().includes(term);
          const matchResting = m.resting_place?.toLowerCase().includes(term);
          const matchLunar = m.lunar_death_date?.toLowerCase().includes(term);
          if (!matchName && !matchAlias && !matchBio && !matchTitle && !matchResting && !matchLunar) {
            return false;
          }
        }
        return true;
      });

      if (filtered.length > 0) {
        result.push({ gen, members: filtered });
      }
    });

    return result;
  }, [sortedGenerations, generationsMap, activeGenTab, selectedBranchId, searchTerm]);

  // Roman numeral converter
  const toRoman = (num: number) => {
    const romanMap: [number, string][] = [
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I'],
    ];
    let result = '';
    let n = num;
    for (const [val, sym] of romanMap) {
      while (n >= val) {
        result += sym;
        n -= val;
      }
    }
    return result || `${num}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const branchMap = useMemo(() => new Map(tree.branches?.map((b) => [b.id, b.name])), [tree.branches]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FAF7F0] dark:bg-[#1C1917] font-sans">
      {/* Top Toolbar (Non-printable) */}
      <div className="print:hidden bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 backdrop-blur-md border-b border-[#E7DFC9] dark:border-[#44403C] p-4 space-y-3 shrink-0">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#B45309] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tra cứu tên, tiểu sử, ngày giỗ Âm lịch, chức sắc trong phả ký..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            />
          </div>

          {/* Quick Actions: Branch, Typography, Print */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Branch Filter */}
            {tree.branches && tree.branches.length > 0 && (
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-xs font-bold text-[#8B1E1E] dark:text-[#FDE68A] outline-none cursor-pointer"
              >
                <option value="ALL">Tất cả chi nhánh</option>
                {tree.branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            )}

            {/* Typography Switcher */}
            <button
              onClick={() => setIsSerif(!isSerif)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FEF3C7]/60 dark:bg-[#292524] hover:bg-[#FEF3C7] text-[#8B1E1E] dark:text-[#FDE68A] text-xs font-bold border border-[#FDE68A] dark:border-[#44403C] transition-colors cursor-pointer"
              title="Chuyển đổi kiểu chữ Cổ điển (Serif) / Hiện đại (Sans)"
            >
              <Type className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{isSerif ? 'Chữ Khắc Cổ Điển' : 'Chữ Hiện Đại'}</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B1E1E] to-[#7F1D1D] hover:from-[#991B1B] hover:to-[#8B1E1E] text-[#FEF3C7] border border-[#B45309] text-xs font-black shadow-md shadow-[#8B1E1E]/25 transition-all cursor-pointer"
              title="In hoặc Xuất Sách Phả Ký ra file PDF"
            >
              <Printer className="w-4 h-4" />
              <span>In Phả Ký / Xuất PDF A4</span>
            </button>
          </div>
        </div>

        {/* Quick Chapter Navigation Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 uppercase tracking-wider">Mục lục:</span>
          <button
            onClick={() => setActiveGenTab('ALL')}
            className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeGenTab === 'ALL'
                ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-xs border border-[#B45309]'
                : 'bg-[#FDFBF7] dark:bg-[#292524] text-slate-700 dark:text-slate-300 border border-[#E7DFC9] dark:border-[#44403C] hover:bg-[#FEF3C7]'
            }`}
          >
            Toàn Bộ Phả Ký
          </button>
          {sortedGenerations.map((gen) => (
            <button
              key={gen}
              onClick={() => setActiveGenTab(gen)}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeGenTab === gen
                  ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-xs border border-[#B45309]'
                  : 'bg-[#FDFBF7] dark:bg-[#292524] text-slate-700 dark:text-slate-300 border border-[#E7DFC9] dark:border-[#44403C] hover:bg-[#FEF3C7]'
              }`}
            >
              Đời {toRoman(gen)} ({generationsMap.get(gen)?.length || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Book Presentation Content */}
      <div
        ref={printRef}
        className={`flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 print:p-0 ${
          isSerif ? 'font-serif' : 'font-sans'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-12 bg-[#FDFBF7] dark:bg-[#292524] shadow-2xl border-2 border-[#B45309] rounded-3xl p-6 sm:p-12 print:shadow-none print:border-none print:p-0 print:max-w-full">
          {/* Book Cover / Frontispiece with Imperial Frame */}
          <div className="text-center py-8 border-b-2 border-double border-[#B45309] space-y-4">
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-[#8B1E1E] via-[#B45309] to-[#7F1D1D] p-1.5 border-2 border-[#B45309] shadow-xl shadow-[#8B1E1E]/25 mx-auto">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/trong-dong.webp"
                  alt="Trống Đồng Thế Ký"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.35em] font-black text-[#8B1E1E] dark:text-[#FDE68A] font-cinzel block">
                ✦ Tộc Phả Thế Ký ✦
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#8B1E1E] dark:text-[#FDE68A] tracking-tight font-heritage-title">
                {tree.name}
              </h1>
              {tree.originPlace && (
                <p className="text-sm text-[#B45309] dark:text-[#D97706] font-semibold italic">
                  Gốc tổ tích truyền: {tree.originPlace}
                </p>
              )}
            </div>

            {tree.description && (
              <div className="max-w-2xl mx-auto p-4 bg-[#FAF7F0] dark:bg-[#1C1917] rounded-2xl border border-[#E7DFC9] dark:border-[#44403C] text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed text-justify">
                "{tree.description}"
              </div>
            )}

            <div className="text-[11px] text-slate-500 font-bold pt-2">
              Lưu truyền: {sortedGenerations.length} thế hệ • Tổng số nhân khẩu phả hệ: {members.length} vị tiền nhân & con cháu
            </div>
          </div>

          {/* Chapters by Generation */}
          {filteredGenerations.map(({ gen, members: genMembers }) => (
            <section key={gen} className="space-y-6 pt-4 print:break-before-page">
              {/* Generation Header Title */}
              <div className="flex items-center gap-4 border-b-2 border-[#B45309]/60 pb-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] text-[#FEF3C7] font-black text-sm flex items-center justify-center shrink-0 shadow-md border border-[#D97706]">
                  {toRoman(gen)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title">
                    {gen === 1 ? 'Khởi Tổ Tiên Nhân (Đời Thứ I)' : `Đời Thứ ${toRoman(gen)} (Thế Hệ ${gen})`}
                  </h2>
                  <p className="text-xs text-[#B45309] dark:text-[#D97706] font-bold">
                    Gồm {genMembers.length} vị tộc viên
                  </p>
                </div>
              </div>

              {/* Members Biographies */}
              <div className="space-y-6">
                {genMembers.map((m, mIdx) => {
                  const rels = relationsMap.get(m.id);
                  const branchName = m.branchId ? branchMap.get(m.branchId) : null;
                  const isMale = m.gender === 'male';
                  const isAncestor = gen <= 2 || Boolean(m.title?.toLowerCase().includes('khởi tổ'));

                  return (
                    <article
                      key={m.id}
                      className={`p-5 sm:p-6 rounded-2xl border space-y-4 hover:border-[#B45309] transition-colors ${
                        isAncestor
                          ? 'bg-[#FEF3C7]/30 dark:bg-[#292524] border-2 border-[#B45309]'
                          : 'bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#E7DFC9] dark:border-[#44403C]'
                      }`}
                    >
                      {/* Person Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-[#8B1E1E] dark:text-[#FDE68A] bg-[#FEF3C7] dark:bg-[#3E2723] px-2 py-0.5 rounded border border-[#FDE68A]">
                              {gen}.{mIdx + 1}
                            </span>
                            <h3 className="text-lg font-black text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title">
                              {m.name}
                            </h3>
                            {m.alias_name && (
                              <span className="text-xs text-[#B45309] dark:text-[#D97706] font-semibold italic">
                                (Tự: {m.alias_name})
                              </span>
                            )}
                            {m.title && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-[#8B1E1E] text-[#FEF3C7] border border-[#B45309]">
                                {m.title}
                              </span>
                            )}
                            {m.in_law && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                                {isMale ? 'Rể' : 'Dâu'}
                              </span>
                            )}
                          </div>

                          {/* Branch & Lineage */}
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2 flex-wrap">
                            {branchName && <span className="font-bold text-[#8B1E1E]">Chi phái: {branchName}</span>}
                            {rels && rels.parents.length > 0 && (
                              <span>
                                • Con của:{' '}
                                <strong className="text-slate-800 dark:text-slate-200">
                                  {rels.parents.map((p) => p.name).join(' & ')}
                                </strong>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Link to Graph (Non-printable) */}
                        <div className="print:hidden shrink-0">
                          <Link
                            href={`/trees/${treeId}?focus=${m.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B1E1E] dark:text-[#FDE68A] hover:underline bg-[#FEF3C7]/60 dark:bg-[#292524] px-2.5 py-1 rounded-xl border border-[#FDE68A] dark:border-[#44403C] shadow-xs"
                          >
                            <span>Xem đồ thị</span>
                            <ExternalLink className="w-3 h-3 text-[#B45309]" />
                          </Link>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#FAF7F0] dark:bg-[#1C1917] p-3.5 rounded-xl border border-[#E7DFC9] dark:border-[#44403C] text-slate-700 dark:text-slate-300">
                        <div>
                          <span className="font-bold text-[#B45309]">Sinh - Mất:</span>{' '}
                          {m.birthDate || 'Chưa rõ'} {m.deathDate ? ` - Mất: ${m.deathDate}` : m.is_alive === false ? ' - Đã quy tiên' : ' (Hiện còn sống)'}
                        </div>

                        {/* Lunar Anniversary */}
                        {m.lunar_death_date && (
                          <div className="flex items-center gap-1 text-[#8B1E1E] dark:text-[#F87171] font-bold">
                            <Moon className="w-3.5 h-3.5 shrink-0" />
                            <span>Ngày Giỗ Âm Lịch (Kỵ nhật): {m.lunar_death_date}</span>
                          </div>
                        )}

                        {m.job && (
                          <div>
                            <span className="font-bold text-[#B45309]">Chức nghiệp:</span> {m.job}
                          </div>
                        )}

                        {m.resting_place && (
                          <div className="sm:col-span-2 flex items-center gap-1.5 text-[#8B1E1E] dark:text-[#F87171] font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
                            <span>Mộ phần / Nơi an nghỉ: {m.resting_place}</span>
                          </div>
                        )}
                      </div>

                      {/* Spouses & Offsprings */}
                      {rels && (rels.spouses.length > 0 || rels.children.length > 0) && (
                        <div className="space-y-2 text-xs border-l-2 border-[#B45309] pl-3.5">
                          {rels.spouses.length > 0 && (
                            <div className="flex items-start gap-1.5">
                              <Heart className="w-3.5 h-3.5 text-[#BE123C] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-600 dark:text-slate-400">
                                  Hôn phối (Bạn đời):
                                </span>{' '}
                                {rels.spouses.map((s, sIdx) => (
                                  <span key={s.member.id}>
                                    {sIdx > 0 && ', '}
                                    <strong className="text-[#8B1E1E] dark:text-[#FDE68A]">
                                      {s.member.name}
                                    </strong>
                                    {s.order ? ` (${s.order === 1 ? 'Chính thất / Bà Cả' : `Bà thứ ${s.order}`})` : ''}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {rels.children.length > 0 && (
                            <div className="flex items-start gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-600 dark:text-slate-400">
                                  Hậu duệ ({rels.children.length} người con):
                                </span>{' '}
                                <span className="text-slate-800 dark:text-slate-200">
                                  {rels.children.map((c, cIdx) => (
                                    <span key={c.id}>
                                      {cIdx > 0 && ', '}
                                      <strong>{c.name}</strong> ({c.gender === 'male' ? 'Nam' : 'Nữ'})
                                    </span>
                                  ))}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Biography & Epitaph */}
                      {m.bio && (
                        <div className="pt-2 border-t border-[#E7DFC9] dark:border-[#44403C] text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic whitespace-pre-line text-justify">
                          "{m.bio}"
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
