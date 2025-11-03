import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useTimerContext } from '@/contexts/timer-context'

export const Route = createFileRoute('/settings/notifications')({
  component: NotificationsSettingsPage,
})

function NotificationsSettingsPage() {
  const [assignmentNotifs, setAssignmentNotifs] = useState(true)
  const [gradeNotifs, setGradeNotifs] = useState(true)
  const [announcementNotifs, setAnnouncementNotifs] = useState(false)
  const { stop: stopTimer, isRunning } = useTimerContext()

  // Stop timer when all three notifications are enabled
  useEffect(() => {
    if (assignmentNotifs && gradeNotifs && announcementNotifs && isRunning) {
      stopTimer()
    }
  }, [assignmentNotifs, gradeNotifs, announcementNotifs, isRunning, stopTimer])

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

        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <h2 className="text-2xl font-semibold mb-6">Push Notifications</h2>

        {assignmentNotifs && gradeNotifs && announcementNotifs && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              ✅ All notifications enabled! Timer has been stopped.
            </p>
          </div>
        )}

        <div className="border rounded-lg p-6 bg-white shadow-sm space-y-6">
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="font-semibold mb-1">Assignment Notifications</h3>
              <p className="text-sm text-gray-600">Get notified about new assignments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={assignmentNotifs}
                onChange={(e) => setAssignmentNotifs(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-semibold mb-1">Grade Notifications</h3>
                <p className="text-sm text-gray-600">Get notified when grades are posted</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={gradeNotifs}
                  onChange={(e) => setGradeNotifs(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-semibold mb-1">Announcement Notifications</h3>
                <p className="text-sm text-gray-600">Get notified about course announcements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={announcementNotifs}
                  onChange={(e) => setAnnouncementNotifs(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={() => alert('Settings saved!')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

