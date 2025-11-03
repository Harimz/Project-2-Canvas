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

  // CECS 448 specific assignments
  const cecs448Assignments = [
    { 
      id: 1, 
      title: 'Mobile App Wireframe Design', 
      dueDate: '2025-11-15', 
      points: 100,
      description: 'Create wireframes for a mobile banking application',
      status: 'In Progress'
    },
    { 
      id: 2, 
      title: 'Usability Testing Report', 
      dueDate: '2025-11-28', 
      points: 150,
      description: 'Conduct usability testing on an existing website and document findings',
      status: 'Not Started'
    },
  ]

  // Generic assignments for other courses
  const genericAssignments = [
    { id: 1, title: 'Assignment 1', dueDate: '2025-11-10', points: 100, description: '', status: 'Assigned' },
    { id: 2, title: 'Assignment 2', dueDate: '2025-11-17', points: 150, description: '', status: 'Assigned' },
    { id: 3, title: 'Final Project', dueDate: '2025-12-05', points: 200, description: '', status: 'Assigned' },
  ]

  const assignments = isCECS448 ? cecs448Assignments : genericAssignments

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

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <h2 className="text-2xl font-semibold mb-6">Assignments</h2>

        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Link
              key={assignment.id}
              to="/courses/$courseId/assignment/$assignmentId"
              params={{ courseId, assignmentId: String(assignment.id) }}
              className="block border rounded-lg p-5 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline mb-1">
                    {assignment.title}
                  </h3>
                  {assignment.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {assignment.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600">
                      📅 Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    {assignment.status && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'In Progress' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : assignment.status === 'Not Started'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {assignment.status}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700 ml-4">
                  {assignment.points} pts
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
