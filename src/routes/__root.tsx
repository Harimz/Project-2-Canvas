import { useState, useEffect, useRef } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { RotateCcw, Play, Square } from 'lucide-react'

import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageCounterProvider, usePageCounterContext } from '@/contexts/page-counter-context'
import { TimerProvider } from '@/contexts/timer-context'
import { useTimerContext } from '@/contexts/timer-context'
import { useIsMobile } from '@/hooks/use-mobile'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <TimerProvider>
      <PageCounterProvider>
        <RootLayout />
      </PageCounterProvider>
    </TimerProvider>
  )
}

function RootLayout() {
  const { reset: resetPageCounter, currentCount, displayCount, clearDisplayedCount, displayedCount } = usePageCounterContext()
  const [showCount, setShowCount] = useState<number | null>(null)
  const { isRunning, displayTime, start: startTimer, stop, reset: resetTimer } = useTimerContext()
  const previousDisplayTimeRef = useRef<string | null>(null)
  const isMobile = useIsMobile()
  
  // Detect fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  // When timer stops (displayTime appears), also display the page counter
  useEffect(() => {
    if (displayTime && !previousDisplayTimeRef.current) {
      // Timer just stopped, always try to display the page counter
      // Priority: displayedCount (already set) > currentCount (if > 0)
      if (displayedCount === null) {
        if (currentCount > 0) {
          // Display current count before it potentially gets reset
          displayCount(currentCount)
        }
      }
      // If displayedCount is already set (e.g., from grades page), it will be shown automatically
    }
    previousDisplayTimeRef.current = displayTime
  }, [displayTime, currentCount, displayedCount, displayCount])

  const handleReset = () => {
    const count = resetPageCounter()
    resetTimer()
    clearDisplayedCount() // Clear displayed count when manually resetting
    setShowCount(count)
    setTimeout(() => setShowCount(null), 3000) // Hide after 3 seconds
  }

  const handleStart = () => {
    startTimer()
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-svh">
        <Sidebar />
        <Navbar />
        
        {/* Desktop Timer & Page Counter - Top Right */}
        <div className="hidden md:block fixed top-4 right-4 z-50">
          <div className="flex items-center gap-3">
            {/* Page Counter Section */}
            <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full shadow-lg">
              {(() => {
                // Determine which count to show: manual reset > displayed count > current count
                const countToShow = showCount !== null ? showCount : displayedCount !== null ? displayedCount : currentCount
                // Show if we have a count > 0, or if we have a manual reset/show count, or if we have a displayed count from timer stop
                const shouldShow = countToShow > 0 || showCount !== null || displayedCount !== null
                
                if (!shouldShow) return null
                
                return (
                  <span className="text-sm font-semibold animate-in fade-in">
                    {countToShow} {countToShow === 1 ? 'page' : 'pages'}
                  </span>
                )
              })()}
              <button
                onClick={handleReset}
                className="hover:opacity-70 transition-opacity"
                aria-label="Reset page counter and timer"
                title="Show page count and reset timer & page counter"
              >
                <RotateCcw className="size-5" />
              </button>
            </div>

            {/* Timer Section */}
            <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full shadow-lg">
              {displayTime && (
                <span className="text-sm font-semibold animate-in fade-in">
                  {displayTime}
                </span>
              )}
              
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Start timer"
                  title="Start timer and page counter"
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
          </div>
        </div>

        {/* Mobile Timer & Page Counter - Only show when mobile and not in fullscreen */}
        {isMobile && !isFullscreen && (
          <div className="md:hidden fixed bottom-4 right-4 z-50">
            <div className="flex flex-col items-end gap-2">
              {/* Page Counter Section */}
              <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full shadow-lg">
                {(() => {
                  // Determine which count to show: manual reset > displayed count > current count
                  const countToShow = showCount !== null ? showCount : displayedCount !== null ? displayedCount : currentCount
                  // Show if we have a count > 0, or if we have a manual reset/show count, or if we have a displayed count from timer stop
                  const shouldShow = countToShow > 0 || showCount !== null || displayedCount !== null
                  
                  if (!shouldShow) return null
                  
                  return (
                    <span className="text-xs font-semibold animate-in fade-in">
                      {countToShow} {countToShow === 1 ? 'page' : 'pages'}
                    </span>
                  )
                })()}
                <button
                  onClick={handleReset}
                  className="active:opacity-70 transition-opacity"
                  aria-label="Reset page counter and timer"
                  title="Show page count and reset timer & page counter"
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>

              {/* Timer Section */}
              <div className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded-full shadow-lg">
                {displayTime && (
                  <span className="text-xs font-semibold animate-in fade-in">
                    {displayTime}
                  </span>
                )}
                
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="active:opacity-70 transition-opacity"
                    aria-label="Start timer"
                    title="Start timer and page counter"
                  >
                    <Play className="size-4" />
                  </button>
                ) : (
                  <button
                    onClick={stop}
                    className="active:opacity-70 transition-opacity"
                    aria-label="Stop timer"
                    title="Stop timer and show time"
                  >
                    <Square className="size-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <Outlet />
        <Footer />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
