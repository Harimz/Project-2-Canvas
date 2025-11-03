import { useState } from 'react'
import { List, Filter, RotateCcw } from 'lucide-react'
import { CiGrid41 } from 'react-icons/ci'
import { useMatchRoute } from '@tanstack/react-router'
import { MenuSidebar } from './menu-sidebar'
import { useUIStore } from '@/stores/ui-store'
import { usePageCounter } from '@/hooks/use-page-counter'

export const Navbar = () => {
  const view = useUIStore((s) => s.view)
  const setView = useUIStore((s) => s.setView)
  const matchRoute = useMatchRoute()
  const { reset } = usePageCounter()
  const [showCount, setShowCount] = useState<number | null>(null)

  let title = 'Dashboard'
  if (matchRoute({ to: '/todo' })) {
    title = 'To Do'
  }

  const handleReset = () => {
    const count = reset()
    setShowCount(count)
    setTimeout(() => setShowCount(null), 3000) // Hide after 3 seconds
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex md:hidden bg-black p-4 gap-2 text-white items-center z-10">
      <MenuSidebar />

      <div className="w-full flex items-center justify-between">
        <h1>{title}</h1>
        <div className="flex items-center gap-3">
          {showCount !== null && (
            <span className="text-sm font-semibold animate-in fade-in">
              {showCount} {showCount === 1 ? 'page' : 'pages'}
            </span>
          )}
          <button
            onClick={handleReset}
            className="hover:opacity-70 transition-opacity"
            aria-label="Reset page counter"
          >
            <RotateCcw className="size-5" />
          </button>
          {title === 'Dashboard' ? (
            // Show List/Grid toggle on Dashboard
            view === 'grid' ? (
              <List className="size-5" onClick={() => setView('list')} />
            ) : (
              <CiGrid41 className="size-5" onClick={() => setView('grid')} />
            )
          ) : title === 'To Do' ? (
            // Show Filter icon on To Do page
            <Filter className="size-5" />
          ) : null}
        </div>
      </div>
    </div>
  )
}