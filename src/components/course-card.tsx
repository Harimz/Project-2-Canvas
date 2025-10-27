import { Megaphone, MessagesSquare, NotebookPen } from 'lucide-react'
import { Card } from './ui/card'

interface Props {
  course: {
    id: number
    title: string
    desc: string
    semester: string
    backgroundImage: string
    color: string
  }
}

export const CourseCard = ({ course }: Props) => {
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
    <div className="w-full md:basis-[18rem] md:max-w-[18rem] rounded-sm p-0 cursor-pointer hover:shadow-xl">
      <div className="h-[10rem] w-full" style={backgroundStyle}></div>

      <div className="px-4 py-4 shadow-md">
        <h1
          style={{ color: course.color }}
          className="font-semibold underline truncate"
        >
          {course.title}
        </h1>

        <p className="underline text-[#09508C]">{course.desc}</p>

        <p className="text-xs text-[#09508C]">{course.semester}</p>

        <div className="flex gap-8 mt-4">
          <Megaphone className="size-4" />

          <MessagesSquare className="size-4" />

          <NotebookPen className="size-4" />
        </div>
      </div>
    </div>
  )
}
