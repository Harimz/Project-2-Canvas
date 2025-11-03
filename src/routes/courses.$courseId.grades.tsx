import { createFileRoute, Link } from '@tanstack/react-router'
import { courses } from '@/data/courses'
import { useState } from 'react'
import { useTimerContext } from '@/contexts/timer-context'

export const Route = createFileRoute('/courses/$courseId/grades')({
  component: GradesPage,
})

function GradesPage() {
  const { courseId } = Route.useParams()
  const course = courses.find((c) => c.id === Number(courseId))
  const isCECS448 = courseId === '4'
  const [revealedGrades, setRevealedGrades] = useState<Set<number>>(new Set())
  const { stop: stopTimer, isRunning } = useTimerContext()

  if (!course) {
    return <div>Course not found</div>
  }

  // CECS 448 specific grades
  const cecs448Grades = [
    { id: 1, name: 'Mobile App Wireframe Design', score: 92, total: 100, percentage: 92, feedback: 'Excellent wireframes with clear user flows!' },
    { id: 2, name: 'Usability Testing Report', score: null, total: 150, percentage: null, feedback: null }, // Not graded yet
    { id: 3, name: 'Midterm Exam', score: 88, total: 100, percentage: 88, feedback: 'Good understanding of UI principles.' },
    { id: 4, name: 'Quiz 1: Design Patterns', score: 45, total: 50, percentage: 90, feedback: 'Great work!' },
  ]

  // Generic grades for other courses
  const genericGrades = [
    { id: 1, name: 'Assignment 1', score: 95, total: 100, percentage: 95, feedback: 'Good work' },
    { id: 2, name: 'Assignment 2', score: 140, total: 150, percentage: 93, feedback: 'Excellent' },
    { id: 3, name: 'Midterm Exam', score: 85, total: 100, percentage: 85, feedback: 'Well done' },
  ]

  const grades = isCECS448 ? cecs448Grades : genericGrades

  // Calculate overall grade (only from graded assignments)
  const gradedAssignments = grades.filter(g => g.percentage !== null)
  const overallGrade = gradedAssignments.length > 0
    ? Math.round(gradedAssignments.reduce((sum, g) => sum + g.percentage!, 0) / gradedAssignments.length)
    : 0

  const toggleGrade = (id: number, gradeName: string) => {
    // Stop timer for CECS 448 Midterm Exam when revealing grade
    if (isCECS448 && gradeName === 'Midterm Exam' && !revealedGrades.has(id) && isRunning) {
      stopTimer()
    }
    
    setRevealedGrades(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

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
        <h2 className="text-2xl font-semibold mb-6">Grades</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Current Grade</p>
            <p className="text-5xl font-bold text-blue-600">{overallGrade}%</p>
            <p className="text-sm text-gray-600 mt-1">A</p>
          </div>
        </div>

        <div className="space-y-4">
          {grades.map((grade) => (
            <div key={grade.id} className="border rounded-lg p-5 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{grade.name}</h3>
                  <p className="text-sm text-gray-600">Out of {grade.total} points</p>
                </div>
                <div className="text-right">
                  {grade.score === null ? (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Not Graded Yet
                    </span>
                  ) : !revealedGrades.has(grade.id) ? (
                    <button
                      onClick={() => toggleGrade(grade.id, grade.name)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      See Grade
                      {isCECS448 && grade.name === 'Midterm Exam' && isRunning && (
                        <span className="ml-1 text-xs">(⏱️)</span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleGrade(grade.id, grade.name)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                    >
                      Hide Grade
                    </button>
                  )}
                </div>
              </div>

              {revealedGrades.has(grade.id) && grade.score !== null && (
                <div className="mt-4 pt-4 border-t animate-in fade-in">
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Score</p>
                      <p className="text-2xl font-bold text-blue-600">{grade.score}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total</p>
                      <p className="text-2xl font-bold text-blue-600">{grade.total}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Percentage</p>
                      <p className="text-2xl font-bold text-blue-600">{grade.percentage}%</p>
                    </div>
                  </div>
                  {grade.feedback && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Instructor Feedback:</p>
                      <p className="text-sm text-gray-600">{grade.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
