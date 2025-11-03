import { useState } from 'react'
import { List, Filter, RotateCcw, Play, Square } from 'lucide-react'
import { CiGrid41 } from 'react-icons/ci'
import { useMatchRoute, Link } from '@tanstack/react-router'
import { MenuSidebar } from './menu-sidebar'
import { useUIStore } from '@/stores/ui-store'
import { usePageCounter } from '@/hooks/use-page-counter'
import { useTimerContext } from '@/contexts/timer-context'

export const Navbar = () => {
  const view = useUIStore((s) => s.view)
  const setView = useUIStore((s) => s.setView)
  const matchRoute = useMatchRoute()
  const { reset } = usePageCounter()
  const [showCount, setShowCount] = useState<number | null>(null)
  const { isRunning, displayTime, start, stop } = useTimerContext()

  let title = 'Dashboard'
  let isClickable = true
  if (matchRoute({ to: '/todo' })) {
    title = 'To Do'
    isClickable = false
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
        {isClickable ? (
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h1>{title}</h1>
          </Link>
        ) : (
          <h1>{title}</h1>
        )}
        <div className="flex items-center gap-2">
          {/* Timer Display */}
          {displayTime && (
            <span className="text-xs font-semibold animate-in fade-in">
              {displayTime}
            </span>
          )}
          
          {/* Timer Controls */}
          {!isRunning ? (
            <button
              onClick={start}
              className="hover:opacity-70 transition-opacity"
              aria-label="Start timer"
              title="Start timer"
            >
              <Play className="size-4" />
            </button>
          ) : (
            <button
              onClick={stop}
              className="hover:opacity-70 transition-opacity"
              aria-label="Stop timer"
              title="Stop timer"
            >
              <Square className="size-4" />
            </button>
          )}

          {/* Page Counter Display */}
          {showCount !== null && (
            <span className="text-xs font-semibold animate-in fade-in">
              {showCount}p
            </span>
          )}
          
          {/* Page Counter Reset */}
          <button
            onClick={handleReset}
            className="hover:opacity-70 transition-opacity"
            aria-label="Reset page counter"
            title="Reset page counter"
          >
            <RotateCcw className="size-4" />
          </button>
          
          {/* View Toggle */}
          {title === 'Dashboard' ? (
            view === 'grid' ? (
              <List className="size-5" onClick={() => setView('list')} />
            ) : (
              <CiGrid41 className="size-5" onClick={() => setView('grid')} />
            )
          ) : title === 'To Do' ? (
            <Filter className="size-5" />
          ) : null}
        </div>
      </div>
    </div>
  )
}