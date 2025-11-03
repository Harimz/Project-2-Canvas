import { useEffect, useRef } from 'react'
import { useRouter } from '@tanstack/react-router'

export function usePageCounter() {
  const router = useRouter()
  const countRef = useRef(0)
  const initializedRef = useRef(false)

  useEffect(() => {
    // Count initial page load
    if (!initializedRef.current) {
      countRef.current = 1
      initializedRef.current = true
    }

    // Subscribe to navigation events
    const unsubscribe = router.subscribe('onLoad', () => {
      countRef.current += 1
    })

    return () => {
      unsubscribe()
    }
  }, [router])

  const reset = () => {
    const count = countRef.current
    countRef.current = 0
    initializedRef.current = false
    return count
  }

  return { reset }
}

