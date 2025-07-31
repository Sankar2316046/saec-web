'use client'

// Provider wrapper
import { useRef } from 'react'
import { createUserStore, UserContext, UserProps, UserState, UserStore } from './store'

// Mimic the hook returned by `create`
import { useContext } from 'react'
import { useStore } from 'zustand'

type UserProviderProps = React.PropsWithChildren<UserProps>

function UserProvider({ children, ...props }: UserProviderProps) {
  const storeRef = useRef<UserStore | null>(null)
  if (!storeRef.current) {
    //
    storeRef.current = createUserStore(props)
  }
  return <UserContext.Provider value={storeRef.current}>{children}</UserContext.Provider>
}

export function useUserContext<T>(selector: (state: UserState) => T): T {
  const store = useContext(UserContext)
  if (!store) throw new Error('Missing UserContext.Provider in the tree')
  return useStore(store, selector)
}

export default UserProvider
