import { createFileRoute } from '@tanstack/react-router'
import { CourseCard } from '@/components/course-card'
import { courses } from '@/data/courses'
import { useUIStore } from '@/stores/ui-store'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const view = useUIStore((s) => s.view)
	const favorites = useUIStore((s) => s.favorites)
	const sortedCourses = [...courses].sort((a, b) => {
		const aFav = favorites.has(a.id) ? 1 : 0
		const bFav = favorites.has(b.id) ? 1 : 0
		return bFav - aFav
	})

  return (
    <div className="w-[90%] mx-auto mt-4 pt-15 pb-30">
      <h1 className="font-semibold text-4xl hidden md:block">Dashboard</h1>

      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="font-bold">Courses</h1>

        <p className="cursor-pointer text-[#09508C] underline">All Courses</p>
      </div>

        <div className={ view === "grid" ? "grid grid-cols-2 sm:grid-cols-2 gap-2" : "flex flex-col gap-6 underline"}>
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} variant={view} />
          ))}
        </div>
    </div>
  )
}
