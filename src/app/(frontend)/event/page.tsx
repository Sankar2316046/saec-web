// src/app/(frontend)/event/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { toast } from "sonner"
import { fetchEvents } from './event'
import { AllEvents } from '../_components/all-events'

export default function EventsPage() {
  const [events, setEvents] = useState<Awaited<ReturnType<typeof fetchEvents>>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents()
        setEvents(data || [])
      } catch (error) {
        toast.error('Failed to load events')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading events...</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Events</h1>
        <p className="text-muted-foreground">View and manage all events</p>
      </div>
      <AllEvents events={events} />
    </div>
  )
}