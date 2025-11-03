import { createFileRoute, Link } from '@tanstack/react-router'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/courses/$courseId/grades')({
  component: GradesPage,
})

function GradesPage() {
  const { courseId } = Route.useParams()
  const course = courses.find((c) => c.id === Number(courseId))
  const isCECS448 = courseId === '4'

  if (!course) {
    return <div>Course not found</div>
  }

  // Sample grades for demo
  const grades = [
    { name: 'UI Mockup Design', score: 95, total: 100, percentage: 95 },
    { name: 'User Testing Report', score: 140, total: 150, percentage: 93 },
    { name: 'Midterm Exam', score: 85, total: 100, percentage: 85 },
  ]

  const overallGrade = Math.round(
    grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length
  )

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
              ⏱️ Timer automatically stopped when you opened this CECS 448 Grades page.
            </p>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <h2 className="text-2xl font-semibold mb-6">Grades</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Current Grade</p>
            <p className="text-5xl font-bold text-blue-600">{overallGrade}%</p>
            <p className="text-sm text-gray-600 mt-1">A</p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Assignment</th>
                <th className="text-center p-4 font-semibold">Score</th>
                <th className="text-center p-4 font-semibold">Total</th>
                <th className="text-center p-4 font-semibold">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="p-4">{grade.name}</td>
                  <td className="text-center p-4">{grade.score}</td>
                  <td className="text-center p-4">{grade.total}</td>
                  <td className="text-center p-4 font-semibold">{grade.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
