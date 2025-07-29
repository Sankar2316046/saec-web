import type { Payload } from 'payload'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

let cached = (globalThis as any).__payload || {
  client: null as Payload | null,
  promise: null as Promise<Payload> | null,
}

if (!(globalThis as any).__payload) {
  (globalThis as any).__payload = cached
}

export const getPayloadClient = async (): Promise<Payload> => {
  if (cached.client) return cached.client

  if (!cached.promise) {
    cached.promise = getPayload({ config: payloadConfig })
      .then((client) => {
        cached.client = client
        return client
      })
      .catch((err) => {
        cached.promise = null
        throw err
      })
  }

  return cached.promise
}
