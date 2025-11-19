import { useRef, useState, useCallback, useEffect } from 'react'
import { useRouter } from '@tanstack/react-router'

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [displayTime, setDisplayTime] = useState<string | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const elapsedRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

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
      
      // Time will persist until timer is started again
    }
  }, [isRunning])

  const start = useCallback(() => {
    if (!isRunning) {
      // Reset elapsed time to 0 when starting
      elapsedRef.current = 0
      startTimeRef.current = Date.now()
      setIsRunning(true)
      setDisplayTime(null) // Clear displayed time when starting new timer

      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          elapsedRef.current = Date.now() - startTimeRef.current
        }
      }, 100)
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

  // Auto-stop timer for specific routes
  useEffect(() => {
    const unsubscribe = router.subscribe('onLoad', ({ toLocation }) => {
      const pathname = toLocation.pathname
      
      // Stop timer for Settings > Push Notifications
      if (pathname.includes('/settings/notifications')) {
        if (isRunning) {
          stop()
        }
      }
      
      // Stop timer for CECS 448 Mobile App Wireframe Design assignment
      if (pathname === '/courses/4/assignment/1') {
        if (isRunning) {
          stop()
        }
      }
    })

    return () => unsubscribe()
  }, [router, isRunning, stop])

  return {
    isRunning,
    displayTime,
    start,
    stop,
    reset,
  }
}

