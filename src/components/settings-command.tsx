import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command'
import { Switch } from './ui/switch'

type PageId = 'home' | 'push' | 'email'

type RowBase = {
  id: string
  label: string
  order: number
  keywords?: string
}

type NavRow = RowBase & {
  type: 'nav'
  to: PageId
  right?: React.ReactNode
}

type ToggleRow = RowBase & {
  type: 'toggle'
  get: () => boolean
  set: (v: boolean) => void
}

type Row = NavRow | ToggleRow

type Section = {
  id: 'preferences' | 'legal'
  title: string
  rows: Array<Row>
}

export function SettingsCommand() {
  const [page, setPage] = useState<PageId>('home')
  const [query, setQuery] = useState('')

  const [notifAll, setNotifAll] = useState(true)
  const [notifAnnouncements, setNotifAnnouncements] = useState(true)
  const [notifContent, setNotifContent] = useState(false)
  const [notifDueDates, setNotifDueDates] = useState(true)

  const sections: Array<Section> = useMemo(
    () => [
      {
        id: 'preferences',
        title: 'Preferences',
        rows: [
          {
            id: 'landing',
            type: 'nav',
            label: 'Landing Page: Dashboard',
            order: 1,
            to: 'appearance',
          },
          {
            id: 'appearance',
            type: 'nav',
            label: 'Appearance: Light Theme',
            order: 2,
            to: 'appearance',
          },
          {
            id: 'email',
            type: 'nav',
            label: 'Email Notifications',
            order: 3,
            to: 'email',
            right: <ChevronRight />,
          },
          {
            id: 'push',
            type: 'nav',
            label: 'Push Notifications',
            order: 4,
            to: 'push',
            right: <ChevronRight />,
          },
          {
            id: 'calendarFeed',
            type: 'nav',
            label: 'Subscribe to Calendar Feed',
            order: 5,
            to: 'appearance',
          },
        ].sort((a, b) => a.order - b.order),
      },
      {
        id: 'legal',
        title: 'Legal',
        rows: [
          {
            id: 'privacy',
            type: 'nav',
            label: 'Privacy Policy',
            order: 1,
            to: 'legal',
          },
          {
            id: 'terms',
            type: 'nav',
            label: 'Terms of Use',
            order: 2,
            to: 'legal',
          },
          {
            id: 'github',
            type: 'nav',
            label: 'Canvas on Github',
            order: 3,
            to: 'legal',
          },
        ].sort((a, b) => a.order - b.order),
      },
    ],
    [],
  )

  const pageRows: Record<PageId, Array<Row>> = useMemo(
    () => ({
      home: [],
      appearance: [
        {
          id: 'appearance-theme',
          type: 'nav',
          label: 'Theme: Light',
          order: 2,
          to: 'appearance',
        },
      ].sort((a, b) => a.order - b.order),

      email: [
        {
          id: 'push-all',
          type: 'toggle',
          label: 'All Submissions',
          order: 1,
          get: () => notifAll,
          set: setNotifAll,
          keywords: 'submissions homework work turned in',
        },
      ].sort((a: any, b: any) => a.order - b.order),

      push: [
        {
          id: 'push-all',
          type: 'toggle',
          label: 'All Submissions',
          order: 1,
          get: () => notifAll,
          set: setNotifAll,
          keywords: 'submissions homework work turned in',
        },
        {
          id: 'push-announce',
          type: 'toggle',
          label: 'Announcements',
          order: 2,
          get: () => notifAnnouncements,
          set: setNotifAnnouncements,
          keywords: 'news updates instructor',
        },
        {
          id: 'push-content',
          type: 'toggle',
          label: 'Course Content',
          order: 3,
          get: () => notifContent,
          set: setNotifContent,
          keywords: 'files modules pages',
        },
        {
          id: 'push-due',
          type: 'toggle',
          label: 'Due Dates',
          order: 4,
          get: () => notifDueDates,
          set: setNotifDueDates,
          keywords: 'deadlines assignments',
        },
      ].sort((a, b) => a.order - b.order),

      legal: [
        {
          id: 'legal-privacy',
          type: 'nav',
          label: 'Privacy Policy',
          order: 1,
          to: 'legal',
        },
        {
          id: 'legal-terms',
          type: 'nav',
          label: 'Terms of Use',
          order: 2,
          to: 'legal',
        },
      ].sort((a, b) => a.order - b.order),
    }),
    [notifAll, notifAnnouncements, notifContent, notifDueDates],
  )

  const searchableRows: Array<Row> = useMemo(() => {
    const flatSections = sections.flatMap((s, si) =>
      s.rows.map((r) => ({ ...r, order: si * 1000 + r.order }) as Row),
    )
    const flatPages = (Object.keys(pageRows) as Array<PageId>)
      .filter((p) => p !== 'home')
      .flatMap((p, pi) =>
        pageRows[p].map(
          (r) => ({ ...r, order: 10_000 + pi * 1000 + r.order }) as Row,
        ),
      )
    return [...flatSections, ...flatPages].sort((a, b) => a.order - b.order)
  }, [sections, pageRows])

  const isSearching = query.trim().length > 0

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && !query && page !== 'home') {
        e.preventDefault()
        setPage('home')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, query])

  return (
    <Command shouldFilter>
      <CommandInput
        placeholder="Search settings…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="h-full max-h-full">
        <CommandEmpty>No results found.</CommandEmpty>

        {!isSearching && page === 'home' && (
          <>
            <CommandGroup heading="Preferences">
              {sections
                .find((s) => s.id === 'preferences')!
                .rows.map((row) => (
                  <CommandItem
                    key={row.id}
                    value={`${row.label.toLowerCase()}`}
                    onSelect={() => {
                      if (row.type === 'nav') setPage(row.to)
                    }}
                    className="flex items-center justify-between py-4 border-b-2"
                  >
                    <span>{row.label}</span>
                    {'right' in row ? row.right : null}
                  </CommandItem>
                ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Legal">
              {sections
                .find((s) => s.id === 'legal')!
                .rows.map((row) => (
                  <CommandItem
                    key={row.id}
                    value={`${row.label.toLowerCase()}`}
                    onSelect={() => {
                      if (row.type === 'nav') setPage(row.to)
                    }}
                    className="flex items-center justify-between py-4 border-b-2"
                  >
                    <span>{row.label}</span>
                    {'right' in row ? row.right : null}
                  </CommandItem>
                ))}
            </CommandGroup>
          </>
        )}

        {!isSearching && page !== 'home' && (
          <>
            <CommandGroup heading={pageTitle(page)}>
              <CommandItem
                key={`${page}-back`}
                value="back"
                onSelect={() => setPage('home')}
                className="flex items-center justify-between py-4 border-b-2"
              >
                <span className="flex items-center gap-2">
                  <ChevronLeft />
                  Back
                </span>
              </CommandItem>

              {pageRows[page].map((row) =>
                row.type === 'nav' ? (
                  <CommandItem
                    key={row.id}
                    value={`${row.label.toLowerCase()}`}
                    onSelect={() => setPage(row.to)}
                    className="flex items-center justify-between py-4 border-b-2"
                  >
                    <span>{row.label}</span>
                    <ChevronRight />
                  </CommandItem>
                ) : (
                  <CommandItem
                    key={row.id}
                    value={`${row.label.toLowerCase()} ${row.keywords ?? ''}`}
                    onSelect={() => {}}
                    className="flex items-center justify-between py-4 border-b-2"
                  >
                    <span>{row.label}</span>
                    <Switch
                      checked={row.get()}
                      onCheckedChange={(v) => row.set(v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </CommandItem>
                ),
              )}
            </CommandGroup>
          </>
        )}

        {isSearching && (
          <CommandGroup heading="Results">
            {searchableRows.map((row) => (
              <CommandItem
                key={`search-${row.id}`}
                value={`${row.label.toLowerCase()} ${'keywords' in row ? (row.keywords ?? '') : ''}`}
                onSelect={() => {
                  if (row.type === 'nav') {
                    setPage(row.to)
                    setQuery('')
                  }
                }}
                className="flex items-center justify-between py-4 border-b-2"
              >
                <span>{row.label}</span>
                {row.type === 'nav' ? (
                  <ChevronRight />
                ) : (
                  <Switch
                    checked={row.get()}
                    onCheckedChange={(v) => row.set(v)}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}

function pageTitle(p: PageId) {
  switch (p) {
    case 'push':
      return 'Push Notifications'
    case 'email':
      return 'Email Notifications'

    default:
      return ''
  }
}
