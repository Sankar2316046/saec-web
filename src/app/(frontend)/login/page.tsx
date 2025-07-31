import { getPayloadUtil } from '@/lib/payload-utils'
import LoginForm from './_forms/login-form'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Saec-web',
  description:
    'Login to your Saec-web account',
}

interface PageProps {
  searchParams: Promise<{ redirectUrl?: string }>
}

const page = async ({ searchParams }: PageProps) => {
  const {redirectUrl} = await searchParams;
  const payload = await getPayloadUtil()
  const headerValues = await headers()
  const auth = await payload.auth({
    headers: headerValues,
  })

  if (auth.user) {
    redirect(redirectUrl || '/')
  }

  return (
    <div className="bg-peach w-full h-screen min-h-[500px] flex flex-col justify-center items-center gap-16 p-10">
      <h1 className="text-5xl text-brown font-bold">Login to your account</h1>
      <LoginForm redirectUrl={redirectUrl} />
    </div>
  )
}

export default page
