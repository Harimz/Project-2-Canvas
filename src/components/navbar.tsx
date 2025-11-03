import { Grid2X2, List, Menu } from 'lucide-react'
import { CiGrid41 } from 'react-icons/ci'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

import { useUIStore } from '@/stores/ui-store'

export const Navbar = () => {
  const view = useUIStore((s) => s.view)
  const setView = useUIStore((s) => s.setView)

  return (
    <div className="fixed top-0 left-0 right-0 flex md:hidden bg-black p-4 gap-2 text-white items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-full">
          <SheetHeader>
            <SheetTitle>
              <img src="/canvas-logo.png" className="w-[10rem]" />
            </SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4"></div>
        </SheetContent>
      </Sheet>

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
