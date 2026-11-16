import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { logoutAction } from '@/app/actions/auth';
import { Scroll, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import HeritageLogoIcon from './HeritageLogoIcon';

export default async function HeaderNav() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#FAF7F0]/90 dark:bg-[#1C1917]/90 border-b border-[#E7DFC9] dark:border-[#44403C] transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#B45309]/50 flex items-center justify-center p-1.5 shadow-md shadow-[#8B1E1E]/20 group-hover:scale-105 transition-transform duration-200">
            <HeritageLogoIcon className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-[#8B1E1E] dark:text-[#FDE68A] font-heritage-title leading-tight">
              GIA PHẢ SỐ
            </span>
            <span className="text-[9px] text-[#B45309] dark:text-[#D97706] font-bold tracking-widest uppercase leading-none mt-0.5">
              Tộc Phả Truyền Thống
            </span>
          </div>
        </Link>

        {/* Navigation & User Menu */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#8B1E1E] dark:text-[#FDE68A] bg-[#FEF3C7]/60 dark:bg-[#292524] border border-[#E7DFC9] dark:border-[#44403C] hover:bg-[#FEF3C7] dark:hover:bg-[#3E2723] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-[#B45309]" />
                Bảng Điều Khiển
              </Link>

              {/* User Avatar & Logout */}
              <div className="flex items-center gap-3 pl-2 border-l border-[#E7DFC9] dark:border-[#44403C]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B1E1E] to-[#B45309] border border-[#B45309]/50 flex items-center justify-center text-[#FEF3C7] text-xs font-black shadow-sm">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs font-bold text-[#292524] dark:text-[#F5EFEB] hidden md:inline-block max-w-[120px] truncate">
                    {user.name}
                  </span>
                </div>

                <form action={logoutAction}>
                  <button
                    type="submit"
                    title="Đăng xuất"
                    className="p-2 rounded-xl text-slate-500 hover:text-[#8B1E1E] hover:bg-[#8B1E1E]/10 dark:hover:bg-[#8B1E1E]/20 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-[#8B1E1E] dark:text-[#FDE68A] hover:bg-[#FEF3C7]/50 rounded-xl transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-[#8B1E1E] hover:bg-[#991B1B] text-[#FEF3C7] border border-[#B45309] shadow-sm shadow-[#8B1E1E]/25 transition-all cursor-pointer"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
