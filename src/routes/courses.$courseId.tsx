import { createFileRoute } from '@tanstack/react-router'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/courses/$courseId')({
  component: CoursePage,
})

function CoursePage() {
  const { courseId } = Route.useParams()
  const course = courses.find((c) => c.id === Number(courseId))

  if (!course) {
    return (
      <div className="w-[90%] mx-auto mt-10">
        <h1 className="text-2xl font-bold">Course Not Found</h1>
        <p className="mt-4">The course you're looking for doesn't exist.</p>
      </div>
    )
  }

  const hasImage = !!course.backgroundImage

  const backgroundStyle: React.CSSProperties = hasImage
    ? {
        backgroundImage: `linear-gradient(to bottom, ${course.color}cc, ${course.color}cc), url(${course.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: course.color,
      }

  return (
    <div className="w-full">
      {/* Course Header Banner */}
      <div className="h-[15rem] w-full relative" style={backgroundStyle}>
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-6">
          <h1 className="text-white text-3xl font-bold">{course.title}</h1>
          <p className="text-white text-lg mt-2">{course.semester}</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="w-[90%] mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
            <p className="text-gray-700">
              Welcome to {course.desc}. This is your course page where you can
              access all materials, assignments, and announcements.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-gray-600">No recent activity</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Assignments</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="text-gray-600">No assignments yet</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Announcements
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Assignments
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Discussions
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Grades
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Modules
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Syllabus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
