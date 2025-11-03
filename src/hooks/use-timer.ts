import { useRef, useState, useCallback } from 'react'

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [displayTime, setDisplayTime] = useState<string | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const elapsedRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsedRef.current
      setIsRunning(true)
      setDisplayTime(null) // Hide time when starting

      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          elapsedRef.current = Date.now() - startTimeRef.current
        }
      }, 100)
    }
  }, [isRunning])

  const stop = useCallback(() => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
      
      // Format and display the time
      const totalSeconds = Math.floor(elapsedRef.current / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      let timeStr = ''
      if (hours > 0) {
        timeStr = `${hours}h ${minutes}m ${seconds}s`
      } else if (minutes > 0) {
        timeStr = `${minutes}m ${seconds}s`
      } else {
        timeStr = `${seconds}s`
      }
      
      setDisplayTime(timeStr)
      
      // Auto-hide after 5 seconds
      setTimeout(() => setDisplayTime(null), 5000)
    }
  }, [isRunning])

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
    elapsedRef.current = 0
    setIsRunning(false)
    setDisplayTime(null)
  }, [])

  return {
    isRunning,
    displayTime,
    start,
    stop,
    reset,
  }
}

