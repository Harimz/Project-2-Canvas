import { useState } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { RotateCcw, Play, Square } from 'lucide-react'

import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { usePageCounter } from '@/hooks/use-page-counter'
import { TimerProvider } from '@/contexts/timer-context'
import { useTimerContext } from '@/contexts/timer-context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <TimerProvider>
      <RootLayout />
    </TimerProvider>
  )
}

function RootLayout() {
  const { reset } = usePageCounter()
  const [showCount, setShowCount] = useState<number | null>(null)
  const { isRunning, displayTime, start, stop } = useTimerContext()

  const handleReset = () => {
    const count = reset()
    setShowCount(count)
    setTimeout(() => setShowCount(null), 3000) // Hide after 3 seconds
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-svh">
        <Sidebar />
        <Navbar />
        
        {/* Desktop Timer & Page Counter - Top Right */}
        <div className="hidden md:block fixed top-4 right-4 z-50">
          <div className="flex items-center gap-3">
            {/* Timer Section */}
            <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full shadow-lg">
              {displayTime && (
                <span className="text-sm font-semibold animate-in fade-in">
                  {displayTime}
                </span>
              )}
              
              {!isRunning ? (
                <button
                  onClick={start}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Start timer"
                  title="Start timer"
                >
                  <Play className="size-5" />
                </button>
              ) : (
                <button
                  onClick={stop}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Stop timer"
                  title="Stop timer and show time"
                >
                  <Square className="size-5" />
                </button>
              )}
            </div>

            {/* Page Counter Section */}
            <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full shadow-lg">
              {showCount !== null && (
                <span className="text-sm font-semibold animate-in fade-in">
                  {showCount} {showCount === 1 ? 'page' : 'pages'}
                </span>
              )}
              <button
                onClick={handleReset}
                className="hover:opacity-70 transition-opacity"
                aria-label="Reset page counter"
                title="Show page count and reset"
              >
                <RotateCcw className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <Outlet />
        <Footer />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
