'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import { verifyEvent } from "../event"
import { UserContext } from "@/lib/store"


interface VerifierItemProps {
  verifier: {
    id: string
    role: {
      name: string
    }
    verified: boolean
  }
  eventId: string
}

export function VerifierItem({ verifier, eventId }: VerifierItemProps) {
  
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(verifier.verified)
  const userStore = useContext(UserContext)
  const userRole = userStore ? userStore.getState().role : null
  const canVerify = userRole === verifier.role?.name
  const handleVerify = async () => {
    try {
      setIsLoading(true)
      const { success } = await verifyEvent(eventId, verifier.id)

      if (!success) {
        throw new Error('Failed to update verification status')
      }

      setIsVerified(true)
      toast.success('Verification successful')
    } catch (error) {
      console.error('Error verifying:', error)
      toast.error('Failed to update verification status')
    } finally {
      setIsLoading(false)
    }
  }

  if (isVerified) {
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          <span className="font-medium">{verifier.role?.name}</span>
        </div>
        <Badge className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Verified
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <span className="font-medium">{verifier.role?.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          Pending
        </Badge>
        {canVerify && 
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : 'Verify'}
          </Button>
         }
      </div>
    </div>
  )
}