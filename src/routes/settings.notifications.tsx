import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/notifications')({
  component: NotificationsSettingsPage,
})

function NotificationsSettingsPage() {
  return (
    <div className="w-full p-8 pt-20 md:pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            ⏱️ Timer automatically stopped when you opened Push Notifications settings.
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <h2 className="text-2xl font-semibold mb-6">Push Notifications</h2>

        <div className="border rounded-lg p-6 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Assignment Notifications</h3>
              <p className="text-sm text-gray-600">Get notified about new assignments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Grade Notifications</h3>
              <p className="text-sm text-gray-600">Get notified when grades are posted</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Announcement Notifications</h3>
              <p className="text-sm text-gray-600">Get notified about course announcements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

