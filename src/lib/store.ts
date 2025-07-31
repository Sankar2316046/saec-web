import { createStore, StoreApi } from 'zustand'
import { createContext } from 'react'

import {persist, createJSONStorage} from 'zustand/middleware'

import { toast } from 'sonner'
import { User as PayloadUser } from '@/payload-types';


// In store.ts
export type User = {
  id: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
  updatedAt?: string;  // Make optional
  createdAt?: string;  // Make optional
  [key: string]: any;  // Allow other properties
};
export interface UserProps {
  user: User | null
}


export interface UserState extends UserProps {
  isLoggedIn: boolean; // Add this line
  setUser: (user: User) => void
  role: string | null
  logout: () => void
  
}

export type UserStore = ReturnType<typeof createUserStore>

export const UserContext = createContext<StoreApi<UserState> | null>(null)

export const createUserStore = (initProps?: Partial<UserProps>) => {
  return createStore<UserState>()(
    persist(
      (set, get) => ({
        user: initProps?.user || null,
        isLoggedIn: !!initProps?.user,
        role: initProps?.user?.role.name || null,
        setUser: async (user: User) => {
          try {
            // Ensure we store all relevant customer data
            const enrichedUser = {
              ...user,
             
            };

            set({
              user: enrichedUser,
              isLoggedIn: true,
              role: enrichedUser.role.name || null,
            });

          
          } catch (error) {
            console.error('Error setting user:', error);
            toast.error('Error loading user data');
          }
        },

        logout: () => {
          const currentState = get();
          console.log('Logout - Clearing User State:', {
            user: currentState.user,
            isLoggedIn: currentState.isLoggedIn,
            role: currentState.role,
          });
          
          set({ 
            user: null, 
            isLoggedIn: false,
            role: null,
          });
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
          role: state.role,
        }),
      }
    )
  )
}