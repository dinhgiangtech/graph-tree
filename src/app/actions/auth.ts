"use server";

import { prisma } from '@/lib/prisma';
import { createSession, destroySession, getCurrentUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export interface AuthState {
  success?: boolean;
  error?: string;
}

/**
 * Register a new user account
 */
export async function registerAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();
  const phone = formData.get('phone')?.toString().trim();

  if (!name || !email || !password) {
    return { error: 'Vui lòng nhập đầy đủ Họ tên, Email và Mật khẩu.' };
  }

  if (password.length < 6) {
    return { error: 'Mật khẩu phải có độ dài tối thiểu 6 ký tự.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc dùng email khác.' };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone: phone || null,
      },
    });

    await createSession(user.id, user.email || '');
  } catch (err: any) {
    console.error('Registration error:', err);
    return { error: 'Đã có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.' };
  }

  redirect('/dashboard');
}

/**
 * Log in with Email & Password
 */
export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Vui lòng nhập Email và Mật khẩu.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return { error: 'Email hoặc mật khẩu không chính xác.' };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { error: 'Email hoặc mật khẩu không chính xác.' };
    }

    await createSession(user.id, user.email || '');
  } catch (err: any) {
    console.error('Login error:', err);
    return { error: 'Đã có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.' };
  }

  redirect('/dashboard');
}

/**
 * Log out current user
 */
export async function logoutAction() {
  await destroySession();
  redirect('/login');
}

/**
 * Get current session user for client components
 */
export async function getAuthUserAction() {
  return await getCurrentUser();
}
