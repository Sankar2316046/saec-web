'use client'

import { useFormStatus } from 'react-dom'
import { loginUser } from '@/app/(frontend)/_actions/login'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(formData: FormData) {
    const res = await loginUser(formData)
    if (res.success) {
      window.location.href = '/' // or redirect from server
    } else {
      setError(res.message)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  )
}
