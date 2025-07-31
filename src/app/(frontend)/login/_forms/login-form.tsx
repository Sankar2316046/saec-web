'use client';

import { loginUser } from '../_actions/loginUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FormEvent, useState } from 'react';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password-input';
import { useUserContext } from '@/lib/store-provider';

const LoginForm = ({ redirectUrl }: { redirectUrl?: string }) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const setUser = useUserContext((state) => state.setUser);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        console.log('Login Success - User Details:', {
          id: result.user.id,
          email: result.user.email,
          role: result.user.role,
        });
        
        const user = {
          ...result.user,
          role: {
            id: result.user.role.id,
            name: (result.user.role as any).name
          },
          updatedAt: result.user.updatedAt,  // Include from the result
          createdAt: result.user.createdAt   // Include from the result
        };
        
        await setUser(user);
        toast.success('Successfully logged in!');
        
      
          router.push('/');
        
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'EMAIL_NOT_FOUND') {
          toast.error('No account found with this email')   
        } else if (error.message === 'INVALID_PASSWORD') {
          toast.error('Incorrect password')
        } else {
          toast.error('Unable to login. Please try again.')
        }
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-96">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 ">
          <Label className="text-brown">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            className="border border-gray-600 p-3 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label className="text-brown">Password</Label>
          <PasswordInput
            name="password"
            placeholder="Enter password"
            required
            className="border border-gray-600 p-3 rounded-lg"
            minLength={6}
          />
        </div>
        <Button
          
          type="submit"
      
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
