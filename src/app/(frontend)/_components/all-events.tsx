// src/app/(frontend)/_components/all-events.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import Link from "next/link"
import { Calendar, Clock, Eye } from "lucide-react"
import type { Event } from "@/payload-types"

interface AllEventsProps {
  events: Event[]
}

export function AllEvents({ events }: AllEventsProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.eventName}</TableCell>
              <TableCell>
                <Badge variant="outline">{event.eventType}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {format(new Date(event.eventDateTime), 'PP')}
                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                  {format(new Date(event.eventDateTime), 'p')}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={event.verifiers?.every(v => v.verified) ? 'default' : 'secondary'}>
                  {event.verifiers?.every(v => v.verified) ? 'Verified' : 'Pending'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/event/${event.id}`} className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
