import { EllipsisVertical, Star } from 'lucide-react'
import { useUIStore } from '@/stores/ui-store'
import { cn } from '@/lib/utils'

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
  const colorOverlay = useUIStore((s) => s.colorOverlay)
  const showGrades = useUIStore((s) => s.showGrades)
	const favorites = useUIStore((s) => s.favorites)
	const toggleFavorite = useUIStore((s) => s.toggleFavorite)

	const isFavorite = favorites.has(course.id);


  const hasImage = !!course.backgroundImage
  const overlay = colorOverlay
    ? `${course.color}cc, ${course.color}cc`
    : `transparent, transparent`

  const backgroundStyle: React.CSSProperties = hasImage
    ? {
        backgroundImage: `linear-gradient(to bottom, ${overlay}), url(${course.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { backgroundColor: course.color }

  const starStyle: React.CSSProperties = isFavorite 
    ? {
				color: 'black',
				fill: 'black'
      }
    : {
				color: 'black',
				fill: 'transparent'
      }

  return (
    <div
      className={[
        'rounded-sm p-0 cursor-pointer shadow-md hover:shadow-xl transition-shadow',
        variant === 'list' ? 'w-full' : 'w-full',
      ].join(' ')}
    >
      <div
        className={`${variant === 'grid' ? 'h-24' : 'h-40'} flex flex-col`}
        style={backgroundStyle}
      >
        <div className="flex justify-between items-center px-1 py-2">
          <div
            className={cn(
              'bg-white rounded-full text-xs text-muted-foreground px-2 font-semibold',
              !showGrades && 'invisible',
            )}
          >
            N/A
          </div>

          <div className="bg-white rounded-full text-xs text-muted-foreground p-1 font-semibold">
            <EllipsisVertical className="size-4" />
          </div>
        </div>

      	<div className="flex mt-auto justify-end items-center px-1 py-2 ">
					<Star onClick={() => {toggleFavorite(course.id)}} style={starStyle} className="size-4" />
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
