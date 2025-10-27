import { createFileRoute } from '@tanstack/react-router'
import { CourseCard } from '@/components/course-card'
import { Separator } from '@/components/ui/separator'
import { courses } from '@/data/courses'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="w-[90%] mx-auto mt-10">
      <h1 className="font-semibold text-4xl hidden md:block">Dashboard</h1>

      <Separator className="my-6" />

      <div className="flex flex-wrap gap-10 items-stretch">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
