import 'server-only'
import { headers } from 'next/headers'
import { getPayloadUtil } from '@/lib/payload-utils'
import { User } from '@/payload-types'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getUser = cache(async () => {
  const payload = await getPayloadUtil()
  const headerValues = await headers()
  const cookieStore = await cookies()
  const token = cookieStore.get('saec-token')

  // If no token, return null immediately
  if (!token) {
    console.log('No authentication token found')
    return null
  }
  // const authHeaders = new Headers(headerValues)
  // authHeaders.set('Authorization', `Bearer ${token.value}`)
  const auth = await payload.auth({
    headers: headerValues,
  })
  if (auth.user) {
    const user = await payload.findByID({
      collection: 'users',
      id: auth.user.id,
      depth: 1, // This populates the role relationship
    });

    console.log('User with role:', user);
    return user as User;
  } else {
    return null
  }
})