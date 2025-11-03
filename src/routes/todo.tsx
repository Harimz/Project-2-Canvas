import { createFileRoute } from '@tanstack/react-router'
import { FilePenLine, Rocket } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { todos, Todo, TodoIcon } from '@/data/todos'

export const Route = createFileRoute('/todo')({
  component: TodoPage,
})

const getIcon = (icon: TodoIcon, className: string) => {
  switch (icon) {
    case 'rocket':
      return <Rocket className={className} />
    case 'pen':
      return <FilePenLine className={className} />
    default:
      return null
  }
}

function TodoPage() {
  const dueToday = todos.filter((item) => item.status === 'due-today')
  const dueLater = todos.filter((item) => item.status === 'due-later')
  const pastDue = todos.filter((item) => item.status === 'past-due')

  const renderTodoItem = (item: Todo, status: 'due' | 'later' | 'past') => (
    <div key={item.id} className="flex items-start gap-4 py-3">
      {getIcon(
        item.icon,
        [
          status === 'past' && 'text-red-400',
          status === 'due' && 'text-green-400',
          status === 'later' && 'text-purple-400',
        ].join(' '),
      )}

      <div className="flex-1">
        <p
          className={[
            'font-semibold text-sm',
            status === 'past' && 'text-red-400',
            status === 'due' && 'text-green-400',
            status === 'later' && 'text-purple-400',
          ].join(' ')}
        >
          {item.course}
        </p>
        <p className="text-sm">{item.title}</p>
        <p className="text-xs text-muted-foreground">{item.dueDate}</p>
      </div>
    </div>
  )

  return (
    <div className="w-full h-full bg-white text-black px-4 pt-16 pb-20">
      <p className="text-sm text-muted-foreground mb-4">All Courses</p>
      <Accordion
        type="multiple"
        defaultValue={['today', 'later', 'past']}
        className="w-full"
      >
        <AccordionItem value="today" className="border-b">
          <AccordionTrigger className="font-semibold text-lg hover:no-underline text-muted-foreground">
            Due Today
          </AccordionTrigger>
          <AccordionContent>
            {dueToday.length > 0 ? (
              dueToday.map((item) => renderTodoItem(item, 'due'))
            ) : (
              <p className="text-sm text-muted-foreground">
                No items due today.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="later" className="border-b">
          <AccordionTrigger className="font-semibold text-lg hover:no-underline text-muted-foreground">
            Due Later
          </AccordionTrigger>
          <AccordionContent>
            {dueLater.length > 0 ? (
              dueLater.map((item) => renderTodoItem(item, 'later'))
            ) : (
              <p className="text-sm text-muted-foreground">
                No items due later.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="past" className="border-b">
          <AccordionTrigger className="font-semibold text-lg hover:no-underline text-muted-foreground">
            Past Due
          </AccordionTrigger>
          <AccordionContent>
            {pastDue.length > 0 ? (
              pastDue.map((item) => renderTodoItem(item, 'past'))
            ) : (
              <p className="text-sm text-muted-foreground">
                No past due items.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
