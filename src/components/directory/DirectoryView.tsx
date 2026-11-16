"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FamilyMember, Relationship } from '@/types/family';
import {
  Search,
  Filter,
  Eye,
  GitBranch,
  Crown,
  MapPin,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  LayoutGrid,
  FileSpreadsheet,
  X,
  ExternalLink,
  Moon,
  Calendar,
  Sparkles
} from 'lucide-react';

interface DirectoryViewProps {
  treeId: string;
  treeName: string;
  members: FamilyMember[];
  relationships: Relationship[];
  branches: Array<{ id: string; name: string }>;
}

export default function DirectoryView({
  treeId,
  treeName,
  members,
  relationships,
  branches = [],
}: DirectoryViewProps) {
  const router = useRouter();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [selectedGen, setSelectedGen] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL'); // ALL, ALIVE, DECEASED
  const [selectedGender, setSelectedGender] = useState<string>('ALL'); // ALL, male, female
  const [selectedInLaw, setSelectedInLaw] = useState<string>('ALL'); // ALL, DIRECT, IN_LAW

  // View mode & Sorting
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'generation_asc' | 'generation_desc' | 'name_asc' | 'birth_asc'>('generation_asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Selected Member for quick modal preview
  const [previewMember, setPreviewMember] = useState<FamilyMember | null>(null);

  // Map member relations (Parents, Spouses)
  const memberRelationsMap = useMemo(() => {
    const map = new Map<string, { spouses: FamilyMember[]; parents: FamilyMember[]; children: FamilyMember[] }>();
    const memberMap = new Map(members.map((m) => [m.id, m]));

    members.forEach((m) => {
      map.set(m.id, { spouses: [], parents: [], children: [] });
    });

    relationships.forEach((rel) => {
      if (rel.type === 'PARENT_OF') {
        const parent = memberMap.get(rel.from);
        const child = memberMap.get(rel.to);
        if (parent && child) {
          map.get(child.id)?.parents.push(parent);
          map.get(parent.id)?.children.push(child);
        }
      } else if (rel.type === 'SPOUSE_OF') {
        const m1 = memberMap.get(rel.from);
        const m2 = memberMap.get(rel.to);
        if (m1 && m2) {
          map.get(m1.id)?.spouses.push(m2);
          map.get(m2.id)?.spouses.push(m1);
        }
      }
    });

    return map;
  }, [members, relationships]);

  // Distinct generations available
  const availableGenerations = useMemo(() => {
    const gens = Array.from(new Set(members.map((m) => m.generation ?? 1))).sort((a, b) => a - b);
    return gens;
  }, [members]);

  // Filtering Logic
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = m.name?.toLowerCase().includes(term);
        const matchAlias = m.alias_name?.toLowerCase().includes(term);
        const matchJob = m.job?.toLowerCase().includes(term);
        const matchResting = m.resting_place?.toLowerCase().includes(term);
        const matchTitle = m.title?.toLowerCase().includes(term);
        const matchLunar = m.lunar_death_date?.toLowerCase().includes(term);
        if (!matchName && !matchAlias && !matchJob && !matchResting && !matchTitle && !matchLunar) {
          return false;
        }
      }

      // Branch filter
      if (selectedBranch !== 'ALL') {
        if (m.branchId !== selectedBranch) return false;
      }

      // Generation filter
      if (selectedGen !== 'ALL') {
        if (m.generation !== Number(selectedGen)) return false;
      }

      // Status filter (alive / deceased)
      if (selectedStatus === 'ALIVE' && m.is_alive === false) return false;
      if (selectedStatus === 'DECEASED' && m.is_alive !== false) return false;

      // Gender filter
      if (selectedGender !== 'ALL' && m.gender !== selectedGender) return false;

      // In-law filter
      if (selectedInLaw === 'DIRECT' && m.in_law === true) return false;
      if (selectedInLaw === 'IN_LAW' && m.in_law !== true) return false;

      return true;
    });
  }, [members, searchTerm, selectedBranch, selectedGen, selectedStatus, selectedGender, selectedInLaw]);

  // Sorting Logic
  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      switch (sortBy) {
        case 'generation_asc':
          return (a.generation ?? 1) - (b.generation ?? 1) || a.name.localeCompare(b.name);
        case 'generation_desc':
          return (b.generation ?? 1) - (a.generation ?? 1) || a.name.localeCompare(b.name);
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'birth_asc':
          return (a.birthDate || '').localeCompare(b.birthDate || '');
        default:
          return 0;
      }
    });
  }, [filteredMembers, sortBy]);

  // Paginated records
  const totalItems = sortedMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedMembers.slice(start, start + pageSize);
  }, [sortedMembers, currentPage, pageSize]);

  // Stats
  const aliveCount = members.filter((m) => m.is_alive !== false).length;
  const deceasedCount = members.filter((m) => m.is_alive === false).length;
  const maleCount = members.filter((m) => m.gender === 'male').length;
  const femaleCount = members.filter((m) => m.gender === 'female').length;

  // Export CSV for Excel
  const handleExportCSV = () => {
    const headers = [
      'STT',
      'Họ và tên',
      'Tên tự / Hiệu',
      'Tước vị tộc phả',
      'Giới tính',
      'Đời thứ',
      'Chi nhánh',
      'Huyết thống/Dâu rể',
      'Tình trạng',
      'Ngày sinh',
      'Ngày mất',
      'Ngày giỗ Âm lịch (Kỵ nhật)',
      'Cha/Mẹ',
      'Bạn đời (Vợ/Chồng)',
      'Nghề nghiệp',
      'Nơi an nghỉ / Mộ phần',
      'Tiểu sử tóm tắt'
    ];

    const branchNameMap = new Map(branches.map((b) => [b.id, b.name]));

    const rows = sortedMembers.map((m, idx) => {
      const rels = memberRelationsMap.get(m.id);
      const parentNames = rels?.parents.map((p) => p.name).join('; ') || '';
      const spouseNames = rels?.spouses.map((s) => s.name).join('; ') || '';
      const branchName = m.branchId ? branchNameMap.get(m.branchId) || '' : '';

      return [
        idx + 1,
        `"${m.name.replace(/"/g, '""')}"`,
        `"${(m.alias_name || '').replace(/"/g, '""')}"`,
        `"${(m.title || '').replace(/"/g, '""')}"`,
        m.gender === 'female' ? 'Nữ' : 'Nam',
        m.generation ?? 1,
        `"${branchName.replace(/"/g, '""')}"`,
        m.in_law ? 'Dâu / Rể' : 'Huyết thống',
        m.is_alive === false ? 'Đã khuất' : 'Còn sống',
        `"${(m.birthDate || '').replace(/"/g, '""')}"`,
        `"${(m.deathDate || '').replace(/"/g, '""')}"`,
        `"${(m.lunar_death_date || '').replace(/"/g, '""')}"`,
        `"${parentNames.replace(/"/g, '""')}"`,
        `"${spouseNames.replace(/"/g, '""')}"`,
        `"${(m.job || '').replace(/"/g, '""')}"`,
        `"${(m.resting_place || '').replace(/"/g, '""')}"`,
        `"${(m.bio || '').replace(/"/g, '""')}"`
      ];
    });

    // Add UTF-8 BOM so Excel opens Vietnamese characters properly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh-ba-dong-ho-${treeName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const branchNameMap = useMemo(() => new Map(branches.map((b) => [b.id, b.name])), [branches]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#FAF7F0] dark:bg-[#1C1917] font-sans">
      {/* Top Controls Bar */}
      <div className="bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 backdrop-blur-md border-b border-[#E7DFC9] dark:border-[#44403C] p-4 space-y-3">
        {/* Row 1: Search, Export, Stats */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#B45309] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tra cứu họ tên, tên tự, tước vị, ngày giỗ Âm lịch, nơi an nghỉ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B45309] text-[#292524] dark:text-[#F5EFEB]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#8B1E1E]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Stats Pill & Export */}
          <div className="flex items-center flex-wrap gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FEF3C7]/60 dark:bg-[#292524] text-xs font-bold text-[#8B1E1E] dark:text-[#FDE68A] border border-[#FDE68A] dark:border-[#44403C]">
              <span>{filteredMembers.length}/{members.length} Người</span>
              <span>•</span>
              <span className="text-[#3730A3] dark:text-[#93C5FD]">{maleCount} Nam</span>
              <span>•</span>
              <span className="text-[#9D174D] dark:text-[#F472B6]">{femaleCount} Nữ</span>
              <span>•</span>
              <span className="text-[#15803D] dark:text-[#4ADE80]">{aliveCount} Còn sống</span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#F4EFE6] dark:bg-[#292524] p-1 rounded-xl border border-[#E7DFC9] dark:border-[#44403C]">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#8B1E1E]'
                }`}
                title="Dạng bảng chi tiết"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#8B1E1E]'
                }`}
                title="Dạng thẻ lưới"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] text-xs font-bold shadow-sm transition-all cursor-pointer"
              title="Xuất bảng danh bạ ra file CSV / Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Xuất Excel</span>
            </button>
          </div>
        </div>

        {/* Row 2: Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1 text-[#8B1E1E] dark:text-[#FDE68A] text-[11px] font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>Bộ lọc:</span>
          </div>

          {/* Branch Filter */}
          {branches.length > 0 && (
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] font-semibold text-[#8B1E1E] dark:text-[#FDE68A] outline-none cursor-pointer"
            >
              <option value="ALL">Tất cả chi nhánh</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          )}

          {/* Generation Filter */}
          <select
            value={selectedGen}
            onChange={(e) => {
              setSelectedGen(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] font-semibold text-[#292524] dark:text-[#F5EFEB] outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả các đời</option>
            {availableGenerations.map((gen) => (
              <option key={gen} value={gen}>
                Đời thứ {gen}
              </option>
            ))}
          </select>

          {/* Gender Filter */}
          <select
            value={selectedGender}
            onChange={(e) => {
              setSelectedGender(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] font-semibold text-[#292524] dark:text-[#F5EFEB] outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả giới tính</option>
            <option value="male">Nam giới</option>
            <option value="female">Nữ giới</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] font-semibold text-[#292524] dark:text-[#F5EFEB] outline-none cursor-pointer"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ALIVE">Còn sống</option>
            <option value="DECEASED">Đã quy tiên / Đã khuất</option>
          </select>

          {/* In-law Filter */}
          <select
            value={selectedInLaw}
            onChange={(e) => {
              setSelectedInLaw(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] font-semibold text-[#292524] dark:text-[#F5EFEB] outline-none cursor-pointer"
          >
            <option value="ALL">Huyết thống & Dâu rể</option>
            <option value="DIRECT">Con cháu huyết thống</option>
            <option value="IN_LAW">Dâu / Rể</option>
          </select>

          {/* Sorting */}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px] hidden lg:inline">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] font-semibold text-[#292524] dark:text-[#F5EFEB] outline-none cursor-pointer"
            >
              <option value="generation_asc">Theo Đời (Tăng dần)</option>
              <option value="generation_desc">Theo Đời (Giảm dần)</option>
              <option value="name_asc">Theo Tên (A - Z)</option>
              <option value="birth_asc">Theo Năm sinh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {paginatedMembers.length > 0 ? (
          viewMode === 'table' ? (
            /* TABLE VIEW */
            <div className="bg-[#FDFBF7] dark:bg-[#292524] rounded-3xl border border-[#E7DFC9] dark:border-[#44403C] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F4EFE6] dark:bg-[#1C1917] border-b border-[#E7DFC9] dark:border-[#44403C] text-[#8B1E1E] dark:text-[#FDE68A] font-black uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4 w-12 text-center">STT</th>
                      <th className="py-3.5 px-4">Họ và Tên Tộc Viên</th>
                      <th className="py-3.5 px-4">Đời</th>
                      <th className="py-3.5 px-4">Chi Nhánh</th>
                      <th className="py-3.5 px-4">Sinh - Mất</th>
                      <th className="py-3.5 px-4">Ngày Giỗ (Kỵ Nhật)</th>
                      <th className="py-3.5 px-4">Cha Mẹ</th>
                      <th className="py-3.5 px-4">Hôn Phối</th>
                      <th className="py-3.5 px-4">Nơi An Nghỉ</th>
                      <th className="py-3.5 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7DFC9]/60 dark:divide-[#44403C]/60 text-[#292524] dark:text-[#F5EFEB]">
                    {paginatedMembers.map((m, idx) => {
                      const rels = memberRelationsMap.get(m.id);
                      const isMale = m.gender === 'male';
                      const isAncestor = (m.generation ?? 1) <= 2 || Boolean(m.title?.toLowerCase().includes('khởi tổ'));
                      const branchName = m.branchId ? branchNameMap.get(m.branchId) : null;

                      return (
                        <tr
                          key={m.id}
                          className="hover:bg-[#FEF3C7]/40 dark:hover:bg-[#3E2723]/30 transition-colors group cursor-pointer"
                          onClick={() => setPreviewMember(m)}
                        >
                          <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400">
                            {(currentPage - 1) * pageSize + idx + 1}
                          </td>

                          {/* Name & Badge */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${
                                  isAncestor
                                    ? 'bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] text-[#FEF3C7] border border-[#D97706]'
                                    : isMale
                                    ? 'bg-[#E0E7FF] text-[#3730A3]'
                                    : 'bg-[#FCE7F3] text-[#9D174D]'
                                }`}
                              >
                                {m.name[0]?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <div className="font-bold flex items-center gap-1.5">
                                  <span className={isAncestor ? 'text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title font-black' : 'text-[#292524] dark:text-[#F5EFEB]'}>
                                    {m.name}
                                  </span>
                                  {m.in_law && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                                      {isMale ? 'Rể' : 'Dâu'}
                                    </span>
                                  )}
                                  {m.is_alive === false && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                      Đã khuất
                                    </span>
                                  )}
                                </div>
                                {(m.alias_name || m.title) && (
                                  <div className="text-[11px] text-[#B45309] dark:text-[#D97706] font-semibold">
                                    {m.title ? `[${m.title}] ` : ''}
                                    {m.alias_name ? `Tự: ${m.alias_name}` : ''}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Generation */}
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-extrabold bg-[#FEF3C7] dark:bg-[#3E2723] text-[#92400E] dark:text-[#FDE68A] border border-[#FDE68A] dark:border-[#78350F]">
                              Đời {m.generation ?? 1}
                            </span>
                          </td>

                          {/* Branch */}
                          <td className="py-3 px-4">
                            {branchName ? (
                              <span className="inline-flex items-center gap-1 text-[#8B1E1E] dark:text-[#FDE68A] font-bold">
                                <GitBranch className="w-3 h-3 text-[#B45309]" />
                                {branchName}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic text-[11px]">-</span>
                            )}
                          </td>

                          {/* Birth - Death */}
                          <td className="py-3 px-4 text-[11px]">
                            {m.birthDate || m.deathDate ? (
                              <div>
                                {m.birthDate && <div>* {m.birthDate}</div>}
                                {m.deathDate && <div className="text-slate-500 dark:text-slate-400">† {m.deathDate}</div>}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>

                          {/* Lunar Death Anniversary (Kỵ nhật) */}
                          <td className="py-3 px-4 text-[11px]">
                            {m.lunar_death_date ? (
                              <span className="font-bold text-[#8B1E1E] dark:text-[#F87171] flex items-center gap-1">
                                <Moon className="w-3 h-3 text-[#8B1E1E]" />
                                {m.lunar_death_date}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>

                          {/* Parents */}
                          <td className="py-3 px-4 text-[11px]">
                            {rels && rels.parents.length > 0 ? (
                              <div className="space-y-0.5">
                                {rels.parents.map((p) => (
                                  <div key={p.id} className="truncate max-w-[130px] font-bold text-slate-700 dark:text-slate-300">
                                    {p.name}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>

                          {/* Spouses */}
                          <td className="py-3 px-4 text-[11px]">
                            {rels && rels.spouses.length > 0 ? (
                              <div className="space-y-0.5">
                                {rels.spouses.map((s) => (
                                  <div key={s.id} className="truncate max-w-[130px] font-bold text-[#9D174D] dark:text-[#F472B6]">
                                    {s.name}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>

                          {/* Resting place */}
                          <td className="py-3 px-4 text-[11px]">
                            {m.resting_place ? (
                              <div className="flex items-center gap-1 text-[#8B1E1E] dark:text-[#F87171] truncate max-w-[150px] font-medium">
                                <MapPin className="w-3 h-3 text-[#B45309] shrink-0" />
                                <span className="truncate">{m.resting_place}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400 italic">-</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => setPreviewMember(m)}
                                className="p-1.5 rounded-lg bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] transition-colors"
                                title="Xem hồ sơ"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <Link
                                href={`/trees/${treeId}?focus=${m.id}`}
                                className="p-1.5 rounded-lg bg-[#8B1E1E]/10 hover:bg-[#8B1E1E]/20 text-[#8B1E1E] dark:text-[#F87171] transition-colors"
                                title="Xem trên phả đồ"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* GRID CARD VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedMembers.map((m) => {
                const isMale = m.gender === 'male';
                const isAncestor = (m.generation ?? 1) <= 2 || Boolean(m.title?.toLowerCase().includes('khởi tổ'));
                const branchName = m.branchId ? branchNameMap.get(m.branchId) : null;

                return (
                  <div
                    key={m.id}
                    onClick={() => setPreviewMember(m)}
                    className={`p-4 rounded-3xl border shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                      isAncestor
                        ? 'bg-[#FDFBF7] dark:bg-[#292524] border-2 border-[#B45309]'
                        : 'bg-[#FAF7F0] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C]'
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
                              isAncestor
                                ? 'bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] text-[#FEF3C7] border border-[#D97706]'
                                : isMale
                                ? 'bg-[#E0E7FF] text-[#3730A3]'
                                : 'bg-[#FCE7F3] text-[#9D174D]'
                            }`}
                          >
                            {m.name[0]?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <h4 className={`font-black text-xs group-hover:text-[#8B1E1E] dark:group-hover:text-[#FDE68A] transition-colors ${
                              isAncestor ? 'text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title' : 'text-[#292524] dark:text-[#F5EFEB]'
                            }`}>
                              {m.name}
                            </h4>
                            <div className="text-[10px] text-[#B45309] dark:text-[#D97706] font-semibold">
                              {m.alias_name ? `Tự: ${m.alias_name}` : m.title || (isMale ? 'Nam' : 'Nữ')}
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-[#FEF3C7] dark:bg-[#3E2723] text-[#92400E] dark:text-[#FDE68A] border border-[#FDE68A]">
                          Đời {m.generation ?? 1}
                        </span>
                      </div>

                      {/* Card Details */}
                      <div className="mt-3 pt-3 border-t border-[#E7DFC9]/80 dark:border-[#44403C]/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {branchName && (
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B1E1E] dark:text-[#FDE68A]">
                            <GitBranch className="w-3 h-3 text-[#B45309] shrink-0" />
                            <span className="truncate">{branchName}</span>
                          </div>
                        )}
                        {(m.birthDate || m.deathDate) && (
                          <div className="text-[11px]">
                            {m.birthDate ? `* ${m.birthDate}` : ''} {m.deathDate ? `• † ${m.deathDate}` : ''}
                          </div>
                        )}
                        {m.lunar_death_date && (
                          <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#8B1E1E] dark:text-[#F87171]">
                            <Moon className="w-3 h-3 shrink-0" />
                            <span className="truncate">Kỵ: {m.lunar_death_date}</span>
                          </div>
                        )}
                        {m.job && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{m.job}</span>
                          </div>
                        )}
                        {m.resting_place && (
                          <div className="flex items-center gap-1.5 text-[11px] text-[#8B1E1E] dark:text-[#F87171] font-medium">
                            <MapPin className="w-3 h-3 text-[#B45309] shrink-0" />
                            <span className="truncate">{m.resting_place}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#E7DFC9]/80 dark:border-[#44403C]/80 text-[11px]">
                      <span className="text-slate-400">
                        {m.is_alive === false ? 'Đã khuất' : 'Còn sống'}
                      </span>
                      <Link
                        href={`/trees/${treeId}?focus=${m.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 font-bold text-[#8B1E1E] dark:text-[#FDE68A] hover:underline"
                      >
                        Phả đồ <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-[#FDFBF7] dark:bg-[#292524] rounded-3xl border border-[#E7DFC9] dark:border-[#44403C] shadow-sm space-y-3">
            <Search className="w-12 h-12 text-[#B45309]/50 mx-auto" />
            <h3 className="font-bold text-sm text-[#8B1E1E] dark:text-[#FDE68A]">Không tìm thấy tộc viên nào</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Không có thành viên nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn. Hãy thử thay đổi bộ lọc.
            </p>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-500 text-xs">
              Hiển thị {(currentPage - 1) * pageSize + 1} -{' '}
              {Math.min(currentPage * pageSize, totalItems)} trong tổng số {totalItems} thành viên
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-[#292524] dark:text-[#F5EFEB] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-[#FEF3C7]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .map((page, idx, arr) => {
                  const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-xl font-bold transition-all cursor-pointer ${
                          currentPage === page
                            ? 'bg-[#8B1E1E] text-[#FEF3C7] shadow-sm'
                            : 'bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-[#292524] dark:text-[#F5EFEB] hover:bg-[#FEF3C7]'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-[#FDFBF7] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-[#292524] dark:text-[#F5EFEB] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-[#FEF3C7]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Profile Preview Modal */}
      {previewMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#FAF7F0] dark:bg-[#1C1917] rounded-3xl border-2 border-[#B45309] shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-base text-[#FEF3C7] shadow-md ${
                    previewMember.gender === 'male'
                      ? 'bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#D97706]'
                      : 'bg-gradient-to-tr from-[#BE123C] to-[#E11D48] border border-[#FDA4AF]'
                  }`}
                >
                  {previewMember.name[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-heritage-title font-black text-base text-[#8B1E1E] dark:text-[#FDE68A]">
                    {previewMember.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#B45309] dark:text-[#D97706] font-bold">
                    <span>Đời thứ {previewMember.generation ?? 1}</span>
                    {previewMember.in_law && <span>• Dâu/Rể</span>}
                    {previewMember.branchId && (
                      <span>• {branchNameMap.get(previewMember.branchId)}</span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPreviewMember(null)}
                className="p-1.5 rounded-xl bg-[#F4EFE6] dark:bg-[#292524] text-slate-500 hover:text-[#8B1E1E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-2.5 text-xs bg-[#FDFBF7] dark:bg-[#292524] p-4 rounded-2xl border border-[#E7DFC9] dark:border-[#44403C] text-[#292524] dark:text-[#F5EFEB]">
              {previewMember.title && (
                <div>
                  <span className="font-bold text-[#8B1E1E] dark:text-[#FDE68A]">Tước vị tộc phả:</span> {previewMember.title}
                </div>
              )}
              {previewMember.alias_name && (
                <div>
                  <span className="font-bold text-[#B45309]">Tên tự / Hiệu:</span> {previewMember.alias_name}
                </div>
              )}
              <div>
                <span className="font-bold text-slate-500">Tình trạng:</span>{' '}
                {previewMember.is_alive === false ? 'Đã quy tiên / Đã khuất' : 'Còn sống'}
              </div>
              {(previewMember.birthDate || previewMember.deathDate) && (
                <div>
                  <span className="font-bold text-slate-500">Năm sinh / Mất:</span>{' '}
                  {previewMember.birthDate || 'Chưa rõ'} - {previewMember.deathDate || (previewMember.is_alive === false ? 'Chưa rõ' : 'Hiện tại')}
                </div>
              )}
              {previewMember.lunar_death_date && (
                <div className="text-[#8B1E1E] dark:text-[#F87171] font-bold flex items-center gap-1">
                  <Moon className="w-3 h-3" />
                  <span>Ngày Giỗ Âm Lịch (Kỵ nhật): {previewMember.lunar_death_date}</span>
                </div>
              )}
              {previewMember.job && (
                <div>
                  <span className="font-bold text-slate-500">Nghề nghiệp:</span> {previewMember.job}
                </div>
              )}
              {previewMember.resting_place && (
                <div>
                  <span className="font-bold text-[#8B1E1E]">Nơi an nghỉ:</span> {previewMember.resting_place}
                </div>
              )}
              {previewMember.bio && (
                <div className="pt-1">
                  <span className="font-bold text-slate-500 block mb-0.5">Tiểu sử:</span>
                  <p className="text-slate-700 dark:text-slate-300 italic whitespace-pre-line leading-relaxed">
                    "{previewMember.bio}"
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Link
                href={`/trees/${treeId}?focus=${previewMember.id}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] text-xs font-bold text-center shadow-md shadow-[#8B1E1E]/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FDE68A]" />
                <span>Xem trên Phả Đồ</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
