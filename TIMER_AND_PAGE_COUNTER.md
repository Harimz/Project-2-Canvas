# Timer and Page Counter Documentation

This document explains how the timer and page counter features work in the application, including when they stop, how they display data, and for how long.

## Timer

### How It Works

The timer is a manual stopwatch that tracks elapsed time in the browser session. It's implemented using the `useTimer` hook located in `src/hooks/use-timer.ts`.

**Key Features:**
- Starts at 0 when the play button is clicked
- Updates every 100 milliseconds (0.1 seconds) while running
- Uses `Date.now()` to calculate elapsed time based on when it was started
- Displays in the top-right corner of the desktop view (hidden on mobile)

### When It Stops

The timer stops in multiple scenarios:

1. **Manual Stop**: When the user clicks the stop button (square icon)
   - Located in the timer control in the top-right corner
   - The user must explicitly click the stop button to halt the timer

2. **Automatic Stop**: The timer automatically stops when navigating to any of the following routes:
   - **Settings > Push Notifications** (`/settings/notifications`)
     - The timer automatically stops when this route is loaded
   - **CECS 448 Mobile App Wireframe Design Assignment** (`/courses/4/assignment/1`)
     - The timer automatically stops when navigating to this assignment detail page
   - **CECS 448 Grades - Midterm Exam**
     - The timer automatically stops when the user reveals (checks) the "Midterm Exam" grade on the CECS 448 grades page
     - This occurs when clicking "See Grade" for the Midterm Exam
     - Only stops if the timer is currently running

All automatic stops are handled via router subscriptions and event handlers in the respective components.

### How It Shows Data

**While Running:**
- No time is displayed while the timer is running
- Only the stop button (square icon) is visible
- Time is calculated internally but not shown to prevent visual clutter

**After Stopping:**
- The elapsed time is formatted and displayed next to the timer control
- Format varies based on duration:
  - **With hours**: `"Xh Ym Zs"` (e.g., "1h 23m 45s")
  - **Hours only, no minutes**: `"Xh Ym Zs"` format is still used
  - **Minutes only**: `"Ym Zs"` (e.g., "23m 45s")
  - **Seconds only**: `"Zs"` (e.g., "45s")
- The formatted time appears with a fade-in animation
- Only whole seconds are shown (time is rounded down using `Math.floor`)

### How Long It Displays Data

**Display Duration: 5 seconds**

After the timer stops:
1. The formatted time immediately appears
2. After 5 seconds (5000 milliseconds), the time automatically disappears
3. The timer control returns to showing only the play button

The auto-hide timeout is set in the `stop` function:
```typescript
setTimeout(() => setDisplayTime(null), 5000)
```

---

## Page Counter

### How It Works

The page counter tracks the number of pages/routes visited while the timer is running. It's implemented using the `usePageCounter` hook located in `src/hooks/use-page-counter.ts`.

**Key Features:**
- Only counts pages when the timer is running
- Starts counting when the timer is started (current page becomes count 1)
- Increments by 1 each time a route navigation occurs (only while timer is running)
- Uses TanStack Router's `onLoad` event to detect page changes
- Displays in the top-right corner next to the timer (desktop view only, hidden on mobile)
- The count persists until manually reset or timer stops

### When It Starts

The page counter starts when:
- **Timer Starts**: When the user clicks the play button to start the timer
  - The current page automatically becomes count 1
  - The counter begins tracking page navigation from this point
  - No pages are counted before the timer is started

### When It Stops (Resets)

The page counter resets in multiple scenarios:

1. **Manual Reset**: When the user clicks the reset button (rotating arrow icon)
   - Located in the page counter control in the top-right corner
   - **Also resets the timer** - clicking reset resets both the timer and page counter
   - Clicking reset immediately resets the counter to 0 and stops the timer
   - The counter will start counting again from 1 when the timer is restarted
   - The reset action also triggers displaying the count before resetting

2. **Automatic Reset**: The page counter automatically resets when:
   - **Navigating to CECS 448 Mobile App Wireframe Design Assignment** (`/courses/4/assignment/1`)
     - The counter automatically resets when navigating to this assignment detail page (only if timer is running)
     - The reset occurs before the page load is counted, so this page becomes count 1
   - **Checking CECS 448 Midterm Exam Grade**
     - The counter automatically resets when the user reveals (checks) the "Midterm Exam" grade on the CECS 448 grades page
     - This occurs when clicking "See Grade" for the Midterm Exam
     - The counter starts fresh from 0 after resetting

**Important:** The page counter **does not count pages** when the timer is stopped. Only page navigations that occur while the timer is running are counted.

### How It Shows Data

**While Counting:**
- The count is tracked internally but **not displayed** while counting
- Only the reset button (rotating arrow icon) is visible
- This prevents visual clutter during normal navigation

**After Resetting:**
- When the reset button is clicked, the current count is shown before resetting
- Format: 
  - `"X page"` for count of 1 (e.g., "1 page")
  - `"X pages"` for count greater than 1 (e.g., "23 pages")
- The count appears with a fade-in animation next to the reset button
- After displaying, the counter resets to 0 and will start counting again on next navigation

### How Long It Displays Data

**Display Duration: 3 seconds**

After clicking the reset button:
1. The page count immediately appears (e.g., "15 pages")
2. The counter resets to 0 internally
3. After 3 seconds (3000 milliseconds), the count automatically disappears
4. The page counter control returns to showing only the reset button

The auto-hide timeout is set in the `handleReset` function in `src/routes/__root.tsx`:
```typescript
setTimeout(() => setShowCount(null), 3000)
```

---

## Summary Table

| Feature | Timer | Page Counter |
|---------|-------|--------------|
| **Starts** | When play button clicked | When timer starts (current page = count 1) |
| **Increments** | Every 100ms | On each route navigation (only while timer running) |
| **Stops/Resets** | Manual stop OR auto-stop on:<br/>- `/settings/notifications`<br/>- `/courses/4/assignment/1`<br/>- Revealing "Midterm Exam" grade | Manual reset (also resets timer) OR auto-reset on:<br/>- `/courses/4/assignment/1`<br/>- Revealing "Midterm Exam" grade |
| **Displays While Active** | No (hidden while running) | No (hidden while counting) |
| **Displays After Action** | Yes (formatted time) | Yes (page count) |
| **Display Duration** | 5 seconds | 3 seconds |
| **Display Format** | "Xh Ym Zs", "Ym Zs", or "Zs" | "X page" or "X pages" |
| **Location** | Top-right corner (desktop only) | Top-right corner (desktop only) |
| **Dependency** | Independent | Only counts when timer is running |

---

## Code References

- Timer hook: `src/hooks/use-timer.ts`
- Page counter hook: `src/hooks/use-page-counter.ts`
- Timer context: `src/contexts/timer-context.tsx`
- Page counter context: `src/contexts/page-counter-context.tsx`
- UI implementation: `src/routes/__root.tsx` (lines 17-99)
- Grades page implementation: `src/routes/courses.$courseId.grades.tsx`
- Assignment detail page: `src/routes/courses.$courseId.assignment.$assignmentId.tsx`

