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
    <div className="absolute top-4 left-4 z-10 w-80">
      {/* Search input field */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg rounded-2xl flex items-center px-3 py-2">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Tìm kiếm thành viên, tước hiệu..."
          className="bg-transparent border-none outline-none w-full ml-2 text-sm focus:ring-0"
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
            className="hover:bg-slate-200 dark:hover:bg-slate-700 p-1 rounded-full shrink-0 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown list */}
      {showSearchDropdown && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-20">
          {searchResults.map(m => (
            <button
              key={m.id}
              onClick={() => handleSelect(m)}
              className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700/50 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors cursor-pointer"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  m.gender === 'male'
                    ? 'bg-blue-100 text-blue-800'
                    : m.gender === 'female'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-slate-100 text-slate-800'
                }`}
              >
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  m.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="overflow-hidden flex-1">
                <div className="font-semibold text-sm truncate">{m.name}</div>
                <div className="text-xs opacity-60 flex items-center gap-2">
                  <span>Đời {m.generation ?? 1}</span>
                  {m.title && <span className="truncate max-w-[120px]">• {m.title}</span>}
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
