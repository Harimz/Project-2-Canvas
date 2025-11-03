import { createFileRoute, Link } from '@tanstack/react-router'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/courses/$courseId/assignments')({
  component: AssignmentsPage,
})

function AssignmentsPage() {
  const { courseId } = Route.useParams()
  const course = courses.find((c) => c.id === Number(courseId))
  const isCECS448 = courseId === '4'

  if (!course) {
    return <div>Course not found</div>
  }

  // Sample assignments for demo
  const assignments = [
    { id: 1, title: 'UI Mockup Design', dueDate: '2025-11-10', points: 100 },
    { id: 2, title: 'User Testing Report', dueDate: '2025-11-17', points: 150 },
    { id: 3, title: 'Final Project', dueDate: '2025-12-05', points: 200 },
  ]

  return (
    <div className="w-full p-8 pt-20 md:pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/courses/$courseId" 
            params={{ courseId }}
            className="text-blue-600 hover:underline"
          >
            ← Back to {course.title}
          </Link>
        </div>

        {isCECS448 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              ⏱️ Timer automatically stopped when you opened this CECS 448 Assignments page.
            </p>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <h2 className="text-2xl font-semibold mb-6">Assignments</h2>

        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Link
              key={assignment.id}
              to="/courses/$courseId/assignment/$assignmentId"
              params={{ courseId, assignmentId: String(assignment.id) }}
              className="block border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {assignment.points} points
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
