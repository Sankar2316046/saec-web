'use server'

import { getPayloadUtil } from '@/lib/payload-utils'
import { loginSchema } from '../_forms/schema'
import { cookies } from 'next/headers'
import { env } from 'process'
// In loginUser.ts
export type LoginResponse = {
  success: boolean;
  user: {
    id: string;
    email: string;
    role: {
      id: string;
      name: string;
    };
    [key: string]: any; // Allow other user properties
  };
  error?: string;
} | {
  success: false;
  error: string;
};

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const data = loginSchema.parse({
    email,
    password,
  });

  const payload = await getPayloadUtil();

  try {
    // First check if user exists
    const userExists = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (userExists.totalDocs === 0) {
      throw new Error('EMAIL_NOT_FOUND');
    }

    // Try to login
    const res = await payload.login({
      collection: 'users',
      data: {
        email: data.email,
        password: data.password,
      },
      depth: 1,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: 'saec-token',
      value: res.token ?? '',
      httpOnly: true,
      secure: env.NEXT_PUBLIC_ISDEVELOPMENT ? false : true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    // In loginUser.ts
  const role = typeof res.user.role === 'string' 
  ? { id: res.user.role, name: res.user.role } // If it's a string, use it for both id and name
  : { 
      id: res.user.role.id, 
      name: (res.user.role as any).name 
    };

  return {
    success: true,
    user: {
      ...res.user,
      role: role
    },
  };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('INVALID_PASSWORD');
  }
}
