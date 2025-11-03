import { createFileRoute, Link } from '@tanstack/react-router'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/courses/$courseId/assignment/$assignmentId')({
  component: AssignmentDetailPage,
})

function AssignmentDetailPage() {
  const { courseId, assignmentId } = Route.useParams()
  const course = courses.find((c) => c.id === Number(courseId))
  const isCECS448 = courseId === '4'

  if (!course) {
    return <div>Course not found</div>
  }

  // Sample assignment data
  const assignments: Record<string, { title: string; dueDate: string; points: number; description: string }> = {
    '1': {
      title: 'UI Mockup Design',
      dueDate: '2025-11-10',
      points: 100,
      description: 'Create a high-fidelity mockup of a mobile app interface using Figma or similar tool.',
    },
    '2': {
      title: 'User Testing Report',
      dueDate: '2025-11-17',
      points: 150,
      description: 'Conduct user testing sessions and compile findings into a comprehensive report.',
    },
    '3': {
      title: 'Final Project',
      dueDate: '2025-12-05',
      points: 200,
      description: 'Complete final project including all deliverables: design, implementation, and documentation.',
    },
  }

  const assignment = assignments[assignmentId]

  if (!assignment) {
    return <div>Assignment not found</div>
  }

  return (
    <div className="w-full p-8 pt-20 md:pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/courses/$courseId/assignments" 
            params={{ courseId }}
            className="text-blue-600 hover:underline"
          >
            ← Back to Assignments
          </Link>
        </div>

        {isCECS448 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              ⏱️ Timer automatically stopped when you opened this CECS 448 assignment.
            </p>
          </div>
        )}

        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            <span>•</span>
            <span>{assignment.points} points</span>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-700 mb-6">{assignment.description}</p>

            <h3 className="text-xl font-semibold mb-3">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Read all requirements carefully</li>
              <li>Complete all deliverables</li>
              <li>Submit before the due date</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Submit Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
