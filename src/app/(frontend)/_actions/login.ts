'use server'

import { cookies } from 'next/headers'
import { getPayloadClient } from '@/lib/getPayloadClient'

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const payload = await getPayloadClient()

  try {
    const { user } = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
      req: {
        cookies,
      } as any,
    })

    return { success: true, user }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Login failed',
    }
  }
}
