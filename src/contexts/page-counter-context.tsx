import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { usePageCounter } from '@/hooks/use-page-counter'
import { TimerContext } from '@/contexts/timer-context'

interface PageCounterContextType {
  reset: () => number
  start: () => void
  currentCount: number
  displayCount: (count: number) => void
  clearDisplayedCount: () => void
  displayedCount: number | null
}

const PageCounterContext = createContext<PageCounterContextType | null>(null)

export function PageCounterProvider({ children }: { children: ReactNode }) {
  const pageCounter = usePageCounter()
  const [displayedCount, setDisplayedCount] = useState<number | null>(null)
  
  // Get timer context directly - handle null case
  const timerContext = useContext(TimerContext)
  const isRunning = timerContext?.isRunning ?? false

  // Update page counter based on timer state
  useEffect(() => {
    if (timerContext) {
      pageCounter.setTimerRunning(isRunning)
    }
  }, [isRunning, pageCounter, timerContext])

  const displayCount = (count: number) => {
    setDisplayedCount(count)
    // Count will persist until timer is started again or manually cleared
  }
  
  const clearDisplayedCount = () => {
    setDisplayedCount(null)
  }
  
  // Clear displayed count when timer starts
  useEffect(() => {
    if (isRunning) {
      setDisplayedCount(null)
    }
  }, [isRunning])

  return (
    <PageCounterContext.Provider value={{
      reset: pageCounter.reset,
      start: pageCounter.start,
      currentCount: pageCounter.currentCount,
      displayCount,
      clearDisplayedCount,
      displayedCount,
    }}>
      {children}
    </PageCounterContext.Provider>
  )
}

export function usePageCounterContext() {
  const context = useContext(PageCounterContext)
  if (!context) {
    throw new Error('usePageCounterContext must be used within PageCounterProvider')
  }
  return context
}

