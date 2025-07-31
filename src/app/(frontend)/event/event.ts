// src/app/(frontend)/event/event.ts
"use server"

import { getPayloadClient } from '@/lib/getPayloadClient'
import type { Event } from '@/payload-types' // Import the generated type

export async function fetchEvents(): Promise<Event[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'events',
      depth: 2,
      sort: 'eventDateTime'
    })
    return result.docs
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

export async function verifyEvent(eventId: string, verifierId: string) {
  try {
    const payload = await getPayloadClient()

    const event = await payload.findByID({
      collection: 'events',
      id: eventId,
      depth: 2,
    }) as Event

    const updatedVerifiers = event.verifiers?.map(verifier => 
      verifier.id === verifierId 
        ? { ...verifier, verified: true } 
        : verifier
    ) || []

    await payload.update({
      collection: 'events',
      id: eventId,
      data: {
        verifiers: updatedVerifiers
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error verifying event:', error)
    return { success: false, error: 'Failed to verify event' }
  }
}