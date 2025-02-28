import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getUserInfo } from '@/services/user'

interface AuthState {
  user: { id: string; name: string } | null
  setUser: (user: any) => void
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: user => set({ user }),
      logout: () => set({ user: null }),
      loadUser: async () => {
        if (get().user) return
        const userInfo = await getUserInfo()
        if (userInfo) set({ user: userInfo })
      }
    }),
    { name: 'auth-storage' }
  )
)
