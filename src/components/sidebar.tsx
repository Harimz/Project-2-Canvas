import { useState } from 'react'
import { ArrowRightToLine } from 'lucide-react'
import { FaUser } from 'react-icons/fa'
import { cn } from '@/lib/utils'

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState(0)

  return (
    <div
      className={cn(
        'bg-[#273540] w-[54px] h-full top-0 bottom-0 justify-between flex-col p-4 items-center hidden md:flex',
        expanded && 'w-[84px]',
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="border-[3px] border-white rounded-full flex items-center justify-center overflow-hidden">
          <FaUser className="size-7 text-gray-400" />
        </div>
      </div>

      <ArrowRightToLine
        className="size-8 text-white cursor-pointer"
        onClick={() => setExpanded((state) => !state)}
      />
    </div>
  )
}
