import { Bell, CalendarDays, ClipboardList, Gauge, Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Footer = () => {
  const linkClass = 'items-center flex flex-col'
  const activeClass = 'text-primary'

  return (
    <div className="fixed bottom-0 left-0 right-0 px-2 py-4 flex items-center justify-between border-t-2 bg-white text-muted-foreground">
      <Link
        to="/"
        className={linkClass}
        activeProps={{ className: activeClass }}
      >
        <Gauge className="size-5" />
        <p className="text-xs">Dashboard</p>
      </Link>

      <div className={linkClass}>
        <CalendarDays className="size-5" />
        <p className="text-xs">Calendar</p>
      </div>

      <Link
        to="/todo"
        className={linkClass}
        activeProps={{ className: activeClass }}
      >
        <ClipboardList className="size-5" />
        <p className="text-xs">To Do</p>
      </Link>

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