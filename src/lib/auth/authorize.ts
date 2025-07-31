/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only'

import { getUser } from '@/lib/getUser'
type Callback = ( ...args: any[]) => Promise<any>;
const createUnauthorizedError = (message: string = 'Unauthorized: Please login to continue') => {
  const error = new Error(message)
  error.name = 'UnauthorizedError'
  return error
}

export async function authorize<T extends Callback>(
  callback: T,
  ...props: Parameters<T>
): Promise<ReturnType<T>> {
  const user = await getUser()

  if (!user) {
    throw createUnauthorizedError()
  }

  return callback(...props,user)
}
