import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ViewMode = 'grid' | 'list'

type UIState = {
  view: ViewMode
  setView: (v: ViewMode) => void
  toggleView: () => void
}

const safeStorage =
  typeof window !== 'undefined'
    ? createJSONStorage(() => localStorage)
    : undefined

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      view: 'grid',
      setView: (v) => set({ view: v }),
      toggleView: () => set({ view: get().view === 'grid' ? 'list' : 'grid' }),
    }),
    {
      name: 'ui-store',
      storage: safeStorage,
      partialize: (state) => ({ view: state.view }),
    },
  ),
)
