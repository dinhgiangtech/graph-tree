"use client";

import React, { useActionState, useState } from 'react';
import Link from 'next/link';
import { loginAction } from '@/app/actions/auth';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2, Scroll, ShieldCheck } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import HeritageLogoIcon from '@/components/HeritageLogoIcon';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF7F0] dark:bg-[#1C1917] relative overflow-hidden text-[#1C1917] dark:text-[#FAF7F0] font-sans selection:bg-[#8B1E1E] selection:text-[#FEF3C7]">
      {/* Top right floating theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle showLabel />
      </div>
      {/* Decorative Heritage background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B45309]/10 dark:bg-[#B45309]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#8B1E1E]/10 dark:bg-[#8B1E1E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#B45309_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-6">
        {/* Logo and Brand Title with Traditional Seal */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8B1E1E] via-[#7F1D1D] to-[#991B1B] border-2 border-[#B45309] flex items-center justify-center p-2 shadow-xl shadow-[#8B1E1E]/20 group-hover:scale-105 transition-transform duration-300">
              <HeritageLogoIcon className="w-full h-full" />
            </div>
            <div className="text-center mt-1">
              <span className="text-2xl font-black tracking-tight font-heritage-title text-[#8B1E1E] dark:text-[#FDE68A] block">
                GIA PHẢ SỐ
              </span>
              <span className="text-[11px] text-[#B45309] dark:text-[#D97706] font-bold tracking-widest uppercase block">
                Bách Gia Chi Phả • Tộc Phả Ký
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-black mt-5 font-heritage-title text-[#1C1917] dark:text-white tracking-tight">
            Đăng Nhập Tộc Phả
          </h1>
          <p className="text-xs text-[#78716C] dark:text-[#A8A29E] mt-1 font-serif italic">
            Kết nối thế hệ • Gìn giữ cội nguồn gia tộc
          </p>
        </div>

        {/* Form Container (Warm Ivory Paper with Gold Trim) */}
        <div className="bg-[#FDFBF7] dark:bg-[#292524] border-2 border-[#D7CCA9] dark:border-[#44403C] rounded-3xl p-7 sm:p-8 shadow-2xl shadow-black/10 dark:shadow-black/60 relative">
          {/* Top banner accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[#8B1E1E] border border-[#B45309] text-[#FEF3C7] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FDE68A]" />
            Cổng Thông Tin Dòng Tộc
          </div>

          {state?.error && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#FEF2F2] dark:bg-[#450A0A]/40 border border-[#FCA5A5] dark:border-[#991B1B] text-[#991B1B] dark:text-[#F87171] text-xs font-semibold flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#991B1B] dark:bg-[#F87171] mt-1.5 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold font-heritage-title text-[#44403C] dark:text-[#D6D3D1] uppercase tracking-wider mb-1.5" htmlFor="email">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] dark:text-[#78716C]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@giapha.vn"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#D7CCA9] dark:border-[#44403C] rounded-xl text-[#1C1917] dark:text-white placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] text-xs transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold font-heritage-title text-[#44403C] dark:text-[#D6D3D1] uppercase tracking-wider" htmlFor="password">
                  Mật khẩu
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] dark:text-[#78716C]" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F0] dark:bg-[#1C1917] border border-[#D7CCA9] dark:border-[#44403C] rounded-xl text-[#1C1917] dark:text-white placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309] focus:border-[#B45309] text-xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#8B1E1E] dark:hover:text-[#FDE68A] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#8B1E1E] via-[#991B1B] to-[#7F1D1D] hover:from-[#991B1B] hover:to-[#8B1E1E] text-[#FEF3C7] font-bold rounded-xl border border-[#B45309] shadow-lg shadow-[#8B1E1E]/20 transition-all duration-200 flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang xác thực...
                  </>
                ) : (
                  <>
                    <span>Đăng Nhập Vào Phả Tộc</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 pt-5 border-t border-[#E7DFC9] dark:border-[#44403C] text-center text-xs text-[#78716C] dark:text-[#A8A29E]">
            Chưa có tài khoản dòng tộc?{' '}
            <Link href="/register" className="font-bold text-[#8B1E1E] dark:text-[#FDE68A] hover:underline underline-offset-2 transition-colors">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
