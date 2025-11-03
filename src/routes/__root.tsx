import { useState } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { RotateCcw } from 'lucide-react'

import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { usePageCounter } from '@/hooks/use-page-counter'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { reset } = usePageCounter()
  const [showCount, setShowCount] = useState<number | null>(null)

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
        
        {/* Desktop Page Counter - Top Right */}
        <div className="hidden md:block fixed top-4 right-4 z-50">
          <div className="flex items-center gap-2">
            {showCount !== null && (
              <span className="text-sm font-semibold animate-in fade-in bg-black text-white px-3 py-1 rounded-full">
                {showCount} {showCount === 1 ? 'page' : 'pages'}
              </span>
            )}
            <button
              onClick={handleReset}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
              aria-label="Reset page counter"
              title="Show page count and reset"
            >
              <RotateCcw className="size-5" />
            </button>
          </div>
        </div>

        <Outlet />
        <Footer />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
