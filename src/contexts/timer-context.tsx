import { createContext, useContext, ReactNode } from 'react'
import { useTimer } from '@/hooks/use-timer'

interface TimerContextType {
  isRunning: boolean
  displayTime: string | null
  start: () => void
  stop: () => void
  reset: () => void
}

const TimerContext = createContext<TimerContextType | null>(null)

export function TimerProvider({ children }: { children: ReactNode }) {
  const timer = useTimer()

  return (
    <TimerContext.Provider value={timer}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimerContext() {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimerContext must be used within TimerProvider')
  }
  return context
}

