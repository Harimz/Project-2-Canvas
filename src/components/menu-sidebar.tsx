import {
  CircleQuestionMark,
  Folder,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react'
import { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Switch } from './ui/switch'
import SearchSelect from './search-bar'
import { SettingsCommand } from './settings-command'
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

const preferencesItems = [
  {
    text: 'Landing Page',
    action: '',
  },
  {
    text: 'Appearance',
    action: '',
  },
  {
    text: 'Email Notifications',
    action: '',
  },
  {
    text: 'Push Notifications',
    action: '',
  },
  {
    text: 'Subscribe to Calendar Feed',
    action: '',
  },
  {
    text: 'About',
    action: '',
  },
]
const inboxItems = [
  {
    text: 'Inbox Signature',
    action: '',
  },
]
const legalItems = [
  {
    text: 'Privacy Policy',
    action: '',
  },
  {
    text: 'Terms of Use',
    action: '',
  },
]

const options = [...preferencesItems, ...inboxItems, ...legalItems]

export const MenuSidebar = () => {
  const showGrades = useUIStore((s) => s.showGrades)
  const setShowGrades = useUIStore((s) => s.setShowGrades)

  const colorOverlay = useUIStore((s) => s.colorOverlay)
  const setColorOverlay = useUIStore((s) => s.setColorOverlay)

  const [openMenu, setOpenMenu] = useState(false)
  const [openSettings, setOpenSettings] = useState(false)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const handleOpenSettings = () => {
    setOpenMenu(false)

    setOpenSettings(true)
  }

  return (
    <>
      {/** Settings Menu */}
      <Sheet open={openSettings} onOpenChange={setOpenSettings}>
        <SheetContent side="bottom" className="h-[100vh]">
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>

          <SettingsCommand />
        </SheetContent>
      </Sheet>

      {/** Settings Menu */}
      <Sheet open={openMenu} onOpenChange={setOpenMenu}>
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
              <div
                className="flex gap-6 items-center"
                key={index}
                onClick={() => {
                  if (item.text === 'Settings') {
                    handleOpenSettings()
                  }
                }}
              >
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
    </>
  )
}
