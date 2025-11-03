export type TodoStatus = 'due-today' | 'due-later' | 'past-due'
export type TodoIcon = 'rocket' | 'pen'

export interface Todo {
  id: number
  course: string
  title: string
  dueDate: string
  status: TodoStatus
  icon: TodoIcon
  iconColor: string
}

export const todos: Todo[] = [
  {
    id: 1,
    course: 'BIOL 207 Sec20B 9725 Human Physiology',
    title: 'Writing Assignment 3',
    dueDate: 'Due Oct 2 at 9:30 AM',
    status: 'due-today',
    icon: 'pen',
    iconColor: 'text-green-500',
  },
  {
    id: 2,
    course: 'BIOL 207 Sec20B 9725 Human Physiology',
    title: 'Quiz 05',
    dueDate: 'Due Oct 3 at 11:59 PM',
    status: 'due-later',
    icon: 'rocket',
    iconColor: 'text-green-500',
  },
  {
    id: 3,
    course: 'CECS 453 Sec01 6568 Mobile Application De...',
    title: 'Examination 1 - Fall 25',
    dueDate: 'Due Oct 8 at 8:01 AM',
    status: 'due-later',
    icon: 'rocket',
    iconColor: 'text-red-500',
  },
  {
    id: 4,
    course: 'BIOL 207 Sec20B 9725 Human Physiology',
    title: 'Exam 02 Multiple Choice ONLY',
    dueDate: 'Due Oct 1 at 11:59 PM',
    status: 'past-due',
    icon: 'pen',
    iconColor: 'text-green-500',
  },
  {
    id: 5,
    course: 'BIOL 207 Sec20B 9725 Human Physiology',
    title: 'Exam 02 Writing Prompt ONLY',
    dueDate: 'Due Oct 1 at 11:59 PM',
    status: 'past-due',
    icon: 'pen',
    iconColor: 'text-green-500',
  },
]