import { List, Filter } from 'lucide-react'
import { CiGrid41 } from 'react-icons/ci'
import { useMatchRoute } from '@tanstack/react-router'
import { MenuSidebar } from './menu-sidebar'
import { useUIStore } from '@/stores/ui-store'

export const Navbar = () => {
  const view = useUIStore((s) => s.view)
  const setView = useUIStore((s) => s.setView)
  const matchRoute = useMatchRoute()

  let title = 'Dashboard'
  if (matchRoute({ to: '/todo' })) {
    title = 'To Do'
  }

  return (
    <div className="fixed top-0 left-0 right-0 flex md:hidden bg-black p-4 gap-2 text-white items-center z-10">
      <MenuSidebar />

      <div className="w-full flex items-center justify-between">
        <h1>{title}</h1>
        {title === 'Dashboard' ? (
          // Show List/Grid toggle on Dashboard
          view === 'grid' ? (
            <List className="size-5" onClick={() => setView('list')} />
          ) : (
            <CiGrid41 className="size-5" onClick={() => setView('grid')} />
          )
        ) : title === 'To Do' ? (
          // Show Filter icon on To Do page
          <Filter className="size-5" />
        ) : null}
      </div>
    </div>
  )
}