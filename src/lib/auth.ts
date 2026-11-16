import { cookies } from 'next/headers';
import { prisma } from './prisma';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'gia_pha_session';
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'gia-pha-secret-key-change-in-production-123456';

interface SessionPayload {
  userId: string;
  email: string;
  exp: number;
}

/**
 * Sign a payload with HMAC SHA256
 */
function signToken(payload: SessionPayload): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

/**
 * Verify and decode token
 */
function verifyToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Creates a session for the user and sets the HTTP-only cookie
 */
export async function createSession(userId: string, email: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
  const token = signToken({ userId, email, exp: expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

/**
 * Deletes the session cookie
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Gets the current authenticated user and their tree memberships
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        memberships: {
          select: {
            id: true,
            treeId: true,
            role: true,
            personId: true,
            tree: {
              select: {
                id: true,
                name: true,
                slug: true,
                isPublic: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}
