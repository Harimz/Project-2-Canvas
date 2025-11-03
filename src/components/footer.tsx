import { Bell, CalendarDays, ClipboardList, Gauge, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-2 py-4 flex items-center justify-between border-t-2 bg-white text-muted-foreground">
      <div className="items-center flex flex-col">
        <Gauge className="size-5" />
        <p className="text-xs">Dashboard</p>
      </div>
      <div className="items-center flex flex-col">
        <CalendarDays className="size-5" />
        <p className="text-xs">Calendar</p>
      </div>
      <div className="items-center flex flex-col">
        <ClipboardList className="size-5" />
        <p className="text-xs">To Do</p>
      </div>
      <div className="relative items-center flex flex-col">
        <Bell className="size-5" />
        <p className="text-xs">Notifications</p>

        <div className="absolute -top-3 right-4 bg-red-500 h-5 w-5 flex items-center justify-center rounded-full">
          <p className="text-xs text-white">21</p>
        </div>
      </div>
      <div className="items-center flex flex-col">
        <Mail className="size-5" />
        <p className="text-xs">Inbox</p>
      </div>
    </div>
  )
}
