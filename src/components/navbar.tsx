import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

export const Navbar = () => {
  return (
    <div className="flex md:hidden bg-[#273540] p-4 text-white items-center">
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

      <div className="w-full flex items-center justify-center">
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}
