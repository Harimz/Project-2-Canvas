import { EllipsisVertical, Star } from 'lucide-react'

interface Props {
  course: {
    id: number
    title: string
    desc: string
    semester: string
    backgroundImage: string
    color: string
  }
  variant?: 'list' | 'grid'
}

export const CourseCard = ({ course, variant = 'list' }: Props) => {
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
    <div
      className={[
        'rounded-sm p-0 cursor-pointer shadow-md hover:shadow-xl transition-shadow',
        variant === 'list' ? 'w-full' : 'w-full',
      ].join(' ')}
    >
      <div
        className={variant === 'grid' ? 'h-[6rem]' : 'h-[10rem]'}
        style={backgroundStyle}
      >
        <div className="flex justify-between items-center px-1 py-2">
          <div className="bg-white rounded-full text-xs text-muted-foreground px-2 font-semibold">
            N/A
          </div>

          <div className="bg-white rounded-full text-xs text-muted-foreground p-1 font-semibold">
            <EllipsisVertical className="size-4" />
          </div>
        </div>
      </div>

      <div className={['px-4', variant === 'list' ? 'py-4' : 'py-2'].join(' ')}>
        <h1
          style={{ color: course.color }}
          className={[
            'font-semibold underline truncate',
            variant === 'grid' && 'text-sm',
          ].join(' ')}
        >
          {course.title}
        </h1>

        <p
          className={[
            'underline text-[#09508C]',
            variant === 'grid' && 'text-xs',
          ].join(' ')}
        >
          {course.desc}
        </p>
      </div>
    </div>
  )
}
