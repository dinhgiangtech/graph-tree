"use client";

import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { FamilyMember } from '@/types/family';

interface MemberSearchProps {
  members: FamilyMember[];
  onSelectMember: (member: FamilyMember) => void;
}

export function MemberSearch({ members, onSelectMember }: MemberSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return members.filter(m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.title && m.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.alias_name && m.alias_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, members]);

  const handleSelect = (member: FamilyMember) => {
    setSearchQuery(member.name);
    setShowSearchDropdown(false);
    onSelectMember(member);
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  return (
    <div className="relative w-full z-10">
      {/* Search input field */}
      <div className="bg-[#FAF7F0]/95 dark:bg-[#1C1917]/95 backdrop-blur-md border border-[#E7DFC9] dark:border-[#44403C] shadow-md rounded-2xl flex items-center px-3 py-2">
        <Search className="w-4 h-4 text-[#B45309] shrink-0" />
        <input
          type="text"
          placeholder="Tìm kiếm danh tính, tên tự, tước hiệu..."
          className="bg-transparent border-none outline-none w-full ml-2 text-xs font-medium text-[#292524] dark:text-[#F5EFEB] placeholder:text-[#A8A29E] focus:ring-0"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchDropdown(true);
          }}
          onFocus={() => setShowSearchDropdown(true)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="hover:bg-[#FEF3C7] dark:hover:bg-[#292524] p-1 rounded-full shrink-0 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#8B1E1E]" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown list */}
      {showSearchDropdown && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#FDFBF7] dark:bg-[#292524] backdrop-blur-md border border-[#E7DFC9] dark:border-[#44403C] rounded-2xl shadow-2xl z-20 divide-y divide-[#E7DFC9]/60 dark:divide-[#44403C]">
          {searchResults.map(m => (
            <button
              key={m.id}
              onClick={() => handleSelect(m)}
              className="w-full text-left px-4 py-3 hover:bg-[#FEF3C7]/60 dark:hover:bg-[#3E2723]/60 flex items-center gap-3 transition-colors cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
                  m.gender === 'male'
                    ? 'bg-[#E0E7FF] text-[#3730A3]'
                    : 'bg-[#FCE7F3] text-[#9D174D]'
                }`}
              >
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} className="w-full h-full rounded-xl object-cover" />
                ) : (
                  m.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="overflow-hidden flex-1">
                <div className="font-bold text-xs text-[#292524] dark:text-[#F5EFEB] truncate">{m.name}</div>
                <div className="text-[10px] text-[#B45309] dark:text-[#D97706] flex items-center gap-2">
                  <span>Đời {m.generation ?? 1}</span>
                  {m.title && <span className="truncate max-w-[120px]">• [{m.title}]</span>}
                  {m.alias_name && <span className="truncate max-w-[120px]">• Tự: {m.alias_name}</span>}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemberSearch;
