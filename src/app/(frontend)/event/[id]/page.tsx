// src/app/(frontend)/event/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"
import { VerifierItem } from './VerifierItem'
import Link from "next/link"
import { Event, Role } from '@/payload-types'

// interface Event {
//   id: string
//   eventName: string
//   eventType: string
//   eventDateTime: string
//   banner?: {
//     url: string
//   }
//   verifiers: Array<{
//     id: string
//     role: {
//       id: string
//       name: string
//     }
//     verified: boolean
//   }>
// }

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadClient()
  
  try {
    const event = await payload.findByID({
      collection: 'events',
      id: params.id,
      depth: 2,
    }) as unknown as Event

    if (!event) {
      return notFound()
    }

    return (
      <div className="container mx-auto py-8 px-4">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/event" className="flex items-center gap-2">
            ← Back to Events
          </Link>
        </Button>

        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2">{event.eventType}</Badge>
                <CardTitle className="text-3xl">{event.eventName}</CardTitle>
                <div className="flex items-center gap-4 mt-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(event.eventDateTime), 'PPP')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {format(new Date(event.eventDateTime), 'p')}
                  </div>
                </div>
              </div>
              <Badge variant={event.verifiers?.every(v => v.verified) ? 'default' : 'secondary'}>
                {event.verifiers?.every(v => v.verified) ? 'Fully Verified' : 'Pending Verification'}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            {event.banner && (
              <div className="mb-8 rounded-lg overflow-hidden">
                {typeof event.banner === 'string' ? (
                  <img 
                    src={event.banner}
                    alt={event.eventName}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <img 
                    src={event.banner.url || ''}
                    alt={event.eventName}
                    className="w-full h-64 object-cover"
                  />
                )}
              </div>
            )}


            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Verification Status
              </h3>
              <div className="space-y-2">
                {event.verifiers?.map((verifier) => {
                  // Transform the verifier data to match the expected type
                  const roleName = typeof verifier.role === 'string' 
                    ? verifier.role 
                    : verifier.role?.name || 'Unknown Role';
                  
                  const verifierData = {
                    id: verifier.id || `${event.id}-${roleName}`, // Generate a fallback ID if not present
                    role: { name: roleName },
                    verified: verifier.verified || false
                  };
                  
                  return (
                    <VerifierItem 
                      key={verifierData.id}
                      verifier={verifierData}
                      eventId={event.id}
                    />
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error('Error fetching event:', error)
    return notFound()
  }
}