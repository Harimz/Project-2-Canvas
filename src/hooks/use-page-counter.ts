import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from '@tanstack/react-router'

export function usePageCounter() {
  const router = useRouter()
  const countRef = useRef(0)
  const timerRunningRef = useRef(false)
  const hasStartedRef = useRef(false)
  const [currentCount, setCurrentCount] = useState(0)

  const updateCount = useCallback((newCount: number) => {
    countRef.current = newCount
    setCurrentCount(newCount)
  }, [])

  const setTimerRunning = useCallback((isRunning: boolean) => {
    timerRunningRef.current = isRunning
    
    // When timer starts, reset counter and set current page as count 1
    if (isRunning && !hasStartedRef.current) {
      updateCount(1)
      hasStartedRef.current = true
    }
  }, [updateCount])

  useEffect(() => {
    // Subscribe to navigation events
    const unsubscribe = router.subscribe('onLoad', ({ toLocation }) => {
      const pathname = toLocation.pathname
      
      // Only count pages when timer is running
      if (!timerRunningRef.current) {
        return
      }
      
      // Auto-reset page counter for CECS 448 Mobile App Wireframe Design assignment
      if (pathname === '/courses/4/assignment/1') {
        hasStartedRef.current = false
        // Count this page load as the first page after reset
        updateCount(1)
        hasStartedRef.current = true
        return
      }
      
      // If timer just started, this is the first page (already set to 1)
      if (!hasStartedRef.current) {
        updateCount(1)
        hasStartedRef.current = true
      } else {
        // Subsequent page loads - increment
        updateCount(countRef.current + 1)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [router])

  const reset = useCallback(() => {
    const count = countRef.current
    updateCount(0)
    hasStartedRef.current = false
    return count
  }, [updateCount])

  const start = useCallback(() => {
    // Reset and start counting from current page
    updateCount(1)
    hasStartedRef.current = true
  }, [updateCount])

  return { 
    reset, 
    start,
    setTimerRunning,
    currentCount,
  }
}

