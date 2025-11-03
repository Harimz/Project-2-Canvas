import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ViewMode = 'grid' | 'list'

type UIState = {
  view: ViewMode
  showGrades: boolean
  colorOverlay: boolean
	favorites: Set<number>

  setView: (v: ViewMode) => void
  toggleView: () => void
  setShowGrades: (v: boolean) => void
  toggleShowGrades: () => void
  setColorOverlay: (v: boolean) => void
  toggleColorOverlay: () => void
	toggleFavorite: (id: number) => void
}

const storeInitializer = (set: any, get: any) => ({
  view: 'grid' as ViewMode,
  showGrades: true,
  colorOverlay: true,
  favorites: new Set<number>(),

  setView: (v: ViewMode) => set({ view: v }),
  toggleView: () => set({ view: get().view === 'grid' ? 'list' : 'grid' }),

  setShowGrades: (v: boolean) => set({ showGrades: v }),
  toggleShowGrades: () => set({ showGrades: !get().showGrades }),

  setColorOverlay: (v: boolean) => set({ colorOverlay: v }),
  toggleColorOverlay: () => set({ colorOverlay: !get().colorOverlay }),

  toggleFavorite: (id: number) =>
    set((state: UIState) => {
      const newFavorites = new Set(state.favorites)
      state.favorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id)
      return { favorites: newFavorites }
    }),
})

export const useUIStore =
  typeof window !== 'undefined'
    ? create<UIState>()(
        persist(storeInitializer, {
          name: 'ui-store',
          storage: createJSONStorage(() => localStorage),
          partialize: (s) => ({
            view: s.view,
            showGrades: s.showGrades,
            colorOverlay: s.colorOverlay,
          }),
        }),
      )
    : create<UIState>()(storeInitializer)
