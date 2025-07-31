import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'

export const getPayloadUtil = cache(async () => {
  return await getPayload({
    config: configPromise,
  })
})
