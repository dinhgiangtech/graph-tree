"use client";

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('gia_pha_theme') as 'light' | 'dark' | null;
    if (savedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('gia_pha_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Avoid hydration mismatch by rendering a placeholder before mounted
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Chuyển chế độ giao diện"
        className={`p-2 rounded-xl bg-[#F4EFE6] dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] text-[#B45309] dark:text-[#FDE68A] opacity-60 cursor-pointer ${className}`}
      >
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "Chuyển sang Chế độ Sáng (Giấy ngà)" : "Chuyển sang Chế độ Tối (Gỗ mun)"}
      aria-label={isDark ? "Chuyển sang Chế độ Sáng (Giấy ngà)" : "Chuyển sang Chế độ Tối (Gỗ mun)"}
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#F4EFE6] dark:bg-[#292524] hover:bg-[#E7DFC9] dark:hover:bg-[#3E2723] border border-[#D7CCA9] dark:border-[#44403C] text-[#8B1E1E] dark:text-[#FDE68A] transition-all duration-200 cursor-pointer shadow-2xs ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-[#FDE68A] animate-in zoom-in-50 duration-200" />
        ) : (
          <Moon className="w-4 h-4 text-[#8B1E1E] animate-in zoom-in-50 duration-200" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold font-heritage-title">
          {isDark ? "Ban ngày" : "Ban đêm"}
        </span>
      )}
    </button>
  );
}
