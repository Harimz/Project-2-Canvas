import { createFileRoute, Link } from '@tanstack/react-router'
import { courses } from '@/data/courses'
import { useTimerContext } from '@/contexts/timer-context'

export const Route = createFileRoute('/courses/$courseId/assignment/$assignmentId')({
  component: AssignmentDetailPage,
})

function AssignmentDetailPage() {
  const { courseId, assignmentId } = Route.useParams()
  const course = courses.find((c) => c.id === Number(courseId))
  const { stop: stopTimer, isRunning } = useTimerContext()
  const isCECS448 = courseId === '4'
  const isUsabilityTestingReport = assignmentId === '2'

  if (!course) {
    return <div>Course not found</div>
  }

  // CECS 448 assignment data
  const cecs448Assignments: Record<string, { title: string; dueDate: string; points: number; description: string; requirements: string[]; deliverables: string[] }> = {
    '1': {
      title: 'Mobile App Wireframe Design',
      dueDate: '2025-11-15',
      points: 100,
      description: 'Design a comprehensive set of wireframes for a mobile banking application. Your wireframes should demonstrate user flows for common banking tasks including checking balances, transferring money, and viewing transaction history.',
      requirements: [
        'Create at least 8-10 wireframe screens',
        'Include user flow diagrams showing navigation between screens',
        'Design for iOS or Android (choose one platform)',
        'Include annotations explaining key design decisions',
        'Use a wireframing tool like Figma, Sketch, or Adobe XD',
      ],
      deliverables: [
        'PDF document containing all wireframes',
        'User flow diagram',
        'Brief written explanation (1-2 pages) of your design rationale',
        'Link to your design file (Figma/Sketch)',
      ],
    },
    '2': {
      title: 'Usability Testing Report',
      dueDate: '2025-11-28',
      points: 150,
      description: 'Conduct usability testing on an existing website or mobile application and document your findings in a comprehensive report. You will recruit 3-5 participants to complete specific tasks while observing their interactions.',
      requirements: [
        'Select a website or app to test (must be approved by instructor)',
        'Recruit 3-5 test participants',
        'Create a testing protocol with 5-7 tasks',
        'Conduct moderated usability tests (in-person or remote)',
        'Document observations, issues, and user feedback',
        'Provide recommendations for improvements',
      ],
      deliverables: [
        'Usability testing protocol document',
        'Participant demographic information (anonymous)',
        'Detailed findings report with screenshots',
        'List of prioritized usability issues',
        'Recommendations for design improvements',
        '10-minute presentation of your findings',
      ],
    },
  }

  // Generic assignment data for other courses
  const genericAssignments: Record<string, { title: string; dueDate: string; points: number; description: string; requirements?: string[]; deliverables?: string[] }> = {
    '1': {
      title: 'Assignment 1',
      dueDate: '2025-11-10',
      points: 100,
      description: 'Complete the assigned tasks and submit your work.',
    },
    '2': {
      title: 'Assignment 2',
      dueDate: '2025-11-17',
      points: 150,
      description: 'Follow the instructions provided in class.',
    },
    '3': {
      title: 'Final Project',
      dueDate: '2025-12-05',
      points: 200,
      description: 'Complete your final project deliverables.',
    },
  }

  const assignments = isCECS448 ? cecs448Assignments : genericAssignments

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

        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
          <div className="flex gap-4 text-sm text-gray-600 mb-6">
            <span>📅 Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
            <span>•</span>
            <span>🎯 {assignment.points} points</span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{assignment.description}</p>
            </div>

            {assignment.requirements && assignment.requirements.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {assignment.requirements.map((req, index) => (
                    <li key={index} className="ml-2">{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {assignment.deliverables && assignment.deliverables.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Deliverables</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {assignment.deliverables.map((deliverable, index) => (
                    <li key={index} className="ml-2">{deliverable}</li>
                  ))}
                </ul>
              </div>
            )}

            {(!assignment.requirements || assignment.requirements.length === 0) && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Read all requirements carefully</li>
                  <li>Complete all deliverables</li>
                  <li>Submit before the due date</li>
                </ol>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t flex gap-3">
            <button 
              onClick={() => {
                if (isCECS448 && isUsabilityTestingReport && isRunning) {
                  stopTimer()
                  setTimeout(() => {
                    alert('Assignment submitted! Check the timer display at the top.')
                  }, 150)
                } else {
                  alert('Assignment submitted!')
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Assignment
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
