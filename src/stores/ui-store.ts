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

const safeStorage =
  typeof window !== 'undefined'
    ? createJSONStorage(() => localStorage)
    : undefined

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      view: 'grid',
      showGrades: true,
      colorOverlay: true,
			favorites: new Set(),

      setView: (v) => set({ view: v }),
      toggleView: () => set({ view: get().view === 'grid' ? 'list' : 'grid' }),

      setShowGrades: (v) => set({ showGrades: v }),
      toggleShowGrades: () => set({ showGrades: !get().showGrades }),

      setColorOverlay: (v) => set({ colorOverlay: v }),
      toggleColorOverlay: () => set({ colorOverlay: !get().colorOverlay }),

			toggleFavorite: (id) => 
			set((state) => {
				const newFavorites = new Set(state.favorites)
				state.favorites.has(id) ? newFavorites.delete(id)  : newFavorites.add(id)
				return { favorites: newFavorites }
			}),
    }),
    {
      name: 'ui-store',
      storage: safeStorage,
      partialize: (s) => ({
        view: s.view,
        showGrades: s.showGrades,
        colorOverlay: s.colorOverlay,
      }),
    },
  ),
)
