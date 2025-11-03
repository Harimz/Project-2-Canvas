import {
  CircleQuestionMark,
  Folder,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Switch } from './ui/switch'
import { useUIStore } from '@/stores/ui-store'

const settingItems = [
  {
    text: 'Files',
    icon: <Folder className="size-4" />,
  },
  {
    text: 'Settings',
    icon: <Settings className="size-4" />,
  },
  {
    text: 'Help',
    icon: <CircleQuestionMark className="size-4" />,
  },
  {
    text: 'Change User',
    icon: <User className="size-4" />,
  },
  {
    text: 'Log Out',
    icon: <LogOut className="size-4" />,
  },
]

export const MenuSidebar = () => {
  const showGrades = useUIStore((s) => s.showGrades)
  const setShowGrades = useUIStore((s) => s.setShowGrades)

  const colorOverlay = useUIStore((s) => s.colorOverlay)
  const setColorOverlay = useUIStore((s) => s.setColorOverlay)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="size-4" />
      </SheetTrigger>
      <SheetContent side="left" className="">
        <SheetHeader>
          <SheetTitle>
            <div className="mt-10">
              <Avatar className="size-18">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <h1 className="mt-4">Richie Chang</h1>
              <p className="font-light text-muted-foreground text-sm">
                Richi.Chang01@student.csulb.edu
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-4 px-4 text-muted-foreground">
          {settingItems.map((item, index) => (
            <div className="flex gap-6 items-center" key={index}>
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-black/5 py-1 px-2 rounded-sm">
            <p className="text-muted-foreground">Show Grades</p>
            <Switch
              id="switch-show-grades"
              checked={showGrades}
              onCheckedChange={setShowGrades}
            />{' '}
          </div>

          <div className="flex items-center justify-between bg-black/5 py-1 px-2 rounded-sm">
            <p className="text-muted-foreground">Color Overlay</p>
            <Switch
              id="switch-color-overlay"
              checked={colorOverlay}
              onCheckedChange={setColorOverlay}
            />{' '}
          </div>

          <p className="text-muted-foreground text-sm">
            Canvas Student V. 7.0.0
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
