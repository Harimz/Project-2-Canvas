import { Grid2X2, List, Menu } from 'lucide-react'
import { CiGrid41 } from 'react-icons/ci'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

import { MenuSidebar } from './menu-sidebar'
import { useUIStore } from '@/stores/ui-store'

export const Navbar = () => {
  const view = useUIStore((s) => s.view)
  const setView = useUIStore((s) => s.setView)

  return (
    <div className="fixed top-0 left-0 right-0 flex md:hidden bg-black p-4 gap-2 text-white items-center">
      <MenuSidebar />

      <div className="w-full flex items-center justify-between">
        <h1>Dashboard</h1>

        {view == 'grid' ? (
          <List className="size-5" onClick={() => setView('list')} />
        ) : (
          <CiGrid41 className="size-5" onClick={() => setView('grid')} />
        )}
      </div>
    </div>
  )
}
