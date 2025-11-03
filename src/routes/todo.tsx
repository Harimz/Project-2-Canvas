import { createFileRoute } from '@tanstack/react-router'
import { Rocket, FilePenLine } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { todos, Todo, TodoIcon } from '@/data/todos'
import { cn } from '@/lib/utils'

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

    const renderTodoItem = (item: Todo) => (
        <div key={item.id} className="flex items-start gap-4 py-3">
            {getIcon(item.icon, cn('size-6 shrink-0', item.iconColor))}
            <div className="flex-1">
                <p className="font-semibold text-sm text-red-600">{item.course}</p>
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
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        Due Today
                    </AccordionTrigger>
                    <AccordionContent>
                        {dueToday.length > 0 ? (
                            dueToday.map(renderTodoItem)
                        ) : (
                            <p className="text-sm text-muted-foreground">No items due today.</p>
                        )}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="later" className="border-b">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        Due Later
                    </AccordionTrigger>
                    <AccordionContent>
                        {dueLater.length > 0 ? (
                            dueLater.map(renderTodoItem)
                        ) : (
                            <p className="text-sm text-muted-foreground">No items due later.</p>
                        )}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="past" className="border-b">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        Past Due
                    </AccordionTrigger>
                    <AccordionContent>
                        {pastDue.length > 0 ? (
                            pastDue.map(renderTodoItem)
                        ) : (
                            <p className="text-sm text-muted-foreground">No past due items.</p>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}