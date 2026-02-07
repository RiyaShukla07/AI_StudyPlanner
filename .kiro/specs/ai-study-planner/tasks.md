# Task List: AI Study Planner - Hackathon Edition

## 🚨 HACKATHON MVP CUT LINE (Non-Negotiable)

**If time runs out, the project is demo-ready when these 8 things work:**

1. ✅ Student profile form (name, hours, target date)
2. ✅ Add subjects with topics (simple list, no fancy UI)
3. ✅ Generate schedule button → shows sessions
4. ✅ Visual schedule (even a simple list with times)
5. ✅ "What Should I Study Now?" card on dashboard
6. ✅ Timer that counts down + marks session complete
7. ✅ Missed sessions auto-reschedule (show notification)
8. ✅ Progress bars update after completing sessions

**Everything else is bonus points.**

---

## Phase 1: CORE MVP (48 Hours - Hackathon)

### Hour 0-4: Project Skeleton

- [ ] 1.1 Create React app with TypeScript
  - `npx create-react-app ai-study-planner --template typescript`
  - Delete boilerplate, create folders: `/components`, `/services`, `/types`
  - Install: `date-fns`, `zustand` (state), `tailwindcss`

- [ ] 1.2 Define core types (types/index.ts)
  - StudentProfile, Subject, Topic, StudySession, Schedule
  - Keep it simple - just the essential fields
  - No complex enums yet, use string literals

- [ ] 1.3 Set up Zustand store
  - One store file with: student, subjects, schedule, sessions
  - `localStorage` persistence (copy-paste from Zustand docs)
  - No fancy middleware

### Hour 4-8: Input Forms (Ugly but Functional)

- [ ] 2.1 Student profile form
  - Name, weekday hours, weekend hours, target date
  - Basic HTML inputs, no validation library
  - Save to Zustand on submit

- [ ] 2.2 Subject input form
  - Subject name, credits, confidence (1-5 slider)
  - "Add Topic" button → simple text input list
  - Store in Zustand subjects array

- [ ] 2.3 Simple navigation
  - Two routes: `/setup` and `/dashboard`
  - Button: "Generate My Schedule" → navigate to dashboard

### Hour 8-16: Schedule Generation (The Magic)

- [ ] 3.1 Basic schedule generator service
  - Calculate total available hours (weekdays × hours + weekends × hours)
  - Distribute hours by credits (simple proportion)
  - Adjust for confidence: low confidence = more time
  - **Skip prerequisite graph for MVP** - just order topics as entered

- [ ] 3.2 Create sessions from time allocation
  - Split allocated hours into 45-60 min sessions
  - Assign to days (round-robin across available days)
  - Assign time slots (morning/afternoon/evening - hardcode 3 slots)
  - Return array of StudySession objects

- [ ] 3.3 Generate schedule on button click
  - Call generator with student + subjects
  - Save schedule to Zustand
  - Navigate to dashboard

### Hour 16-24: Dashboard & Schedule Display

- [ ] 4.1 Dashboard layout
  - Top: "What Should I Study Now?" hero card
  - Middle: Today's sessions list
  - Bottom: All subjects progress bars

- [ ] 4.2 "What Should I Study Now?" logic
  - Find session scheduled for current time (within 1 hour window)
  - If none, show next upcoming session
  - Display: subject, topic, duration, "Start" button

- [ ] 4.3 Schedule list view
  - Group sessions by day
  - Show: time, subject, topic, duration
  - Color code by subject (random colors)
  - **Skip fancy calendar** - list is enough for demo

### Hour 24-32: Session Timer

- [ ] 5.1 Timer component
  - Start button → countdown from session duration
  - Show minutes:seconds remaining
  - Pause/Resume buttons
  - "Complete" button

- [ ] 5.2 Session completion flow
  - Mark session as completed in Zustand
  - Prompt: "Was this Easy, Medium, or Hard?" (3 buttons)
  - Update topic progress (increment completed hours)
  - Close timer, return to dashboard

- [ ] 5.3 Progress tracking
  - Calculate topic completion % (completed hours / estimated hours)
  - Calculate subject completion % (average of topics)
  - Update progress bars on dashboard


### Hour 32-40: Adaptive Rescheduling (The "AI" Part)

- [ ] 6.1 Missed session detection
  - On dashboard load, check for past scheduled sessions
  - If session time passed and status = "scheduled", mark as "missed"
  - Show banner: "You missed 1 session. We've rescheduled it."

- [ ] 6.2 Auto-reschedule logic
  - Find next available day with free time
  - Insert missed session into that day
  - Update schedule in Zustand
  - **Keep it simple** - just append to next day

- [ ] 6.3 Difficulty-based adaptation
  - If feedback = "Hard", multiply topic's remaining time by 1.3
  - If feedback = "Easy", multiply by 0.8
  - Regenerate future sessions for that topic
  - Show message: "Schedule adjusted based on your feedback"

### Hour 40-46: Polish for Demo

- [ ] 7.1 Make it look decent
  - Add Tailwind classes for spacing, colors
  - Card components for sections
  - Responsive layout (mobile-friendly)
  - Loading states (simple spinners)

- [ ] 7.2 Add demo data button
  - "Load Demo" button on landing page
  - Pre-fill with: CSE student, 3 subjects, 14-day deadline
  - Instant schedule generation
  - Judges can click and see it work immediately

- [ ] 7.3 Error handling
  - Show error if target date is in past
  - Show error if no subjects added
  - Show error if hours = 0
  - Simple alert() is fine for MVP

- [ ] 7.4 Add explanations
  - Tooltip on "What Should I Study Now?": "Based on deadlines and confidence"
  - Small text under schedule: "High-priority topics scheduled first"
  - Make the AI feel smart with simple copy

### Hour 46-48: Final Testing & Deploy

- [ ] 8.1 Manual testing flow
  - Complete full flow: profile → subjects → schedule → timer → completion
  - Test missed session detection (change system time or wait)
  - Test difficulty feedback adaptation
  - Fix critical bugs only

- [ ] 8.2 Deploy to Vercel/Netlify
  - `npm run build`
  - Deploy to Vercel (drag & drop or CLI)
  - Test production URL
  - Share link with team

- [ ] 8.3 Prepare demo script
  - 2-minute walkthrough script
  - Show problem (students struggle with planning)
  - Show solution (instant personalized schedule)
  - Show adaptation (missed session, difficulty feedback)
  - Emphasize: "AI that learns from you"

---

## Phase 2: DEMO ENHANCERS (If Time Remains)

**Only do these if Phase 1 is 100% done and working.**

### Quick Wins (30 min each)

- [ ]* 9.1 Color-code by cognitive load
  - Add "cognitive load" field to topics (High/Medium/Low)
  - Red = High, Yellow = Medium, Green = Low
  - Makes schedule look smarter

- [ ]* 9.2 Deadline urgency indicator
  - Add deadline field to subjects
  - Show countdown: "Exam in 5 days"
  - Highlight urgent subjects in red

- [ ]* 9.3 Buffer time blocks
  - Add 15% buffer time to schedule
  - Show as gray blocks labeled "Buffer"
  - Use buffer for rescheduled sessions first

- [ ]* 9.4 Confidence trend
  - Track confidence changes over time
  - Simple line chart (use Chart.js or Recharts)
  - Show "Confidence improving!" message

- [ ]* 9.5 Weekly summary
  - "This week: 12 hours studied, 8 sessions completed"
  - Simple stats card on dashboard
  - Makes progress visible

### Medium Wins (1-2 hours each)

- [ ]* 10.1 Prerequisite warnings
  - Add "prerequisites" field to topics
  - Show warning icon if studying topic before prereqs
  - Alert: "Complete Trees before Graphs for best results"

- [ ]* 10.2 Study mode toggle
  - Toggle: Learning Mode / Exam Mode
  - Exam mode: more revision, less new content
  - Regenerate schedule on toggle

- [ ]* 10.3 Branch templates
  - Dropdown: CSE / ECE / Mechanical
  - Pre-fill common subjects for that branch
  - Saves setup time, looks professional

- [ ]* 10.4 Export to calendar
  - Generate .ics file
  - Download button
  - "Import to Google Calendar" instructions

---

## Phase 3: ADVANCED FEATURES (Post-Hackathon)

**Do NOT attempt these during hackathon unless Phase 1 & 2 are perfect.**

- [ ]* 11.1 Burnout detection (3-4 hours)
- [ ]* 11.2 Spaced repetition (4-6 hours)
- [ ]* 11.3 What-if simulation (3-4 hours)
- [ ]* 11.4 Weekly reflection (2-3 hours)
- [ ]* 11.5 Interleaved practice (3-4 hours)

---

## WHAT NOT TO BUILD (Hackathon Traps)

### ❌ Don't Build These (They Don't Win Hackathons)

1. **Testing infrastructure** - No Jest, no test files. Manual testing only.
2. **Property-based tests** - Way too academic for 48 hours.
3. **Complex prerequisite DAG UI** - Just order topics manually.
4. **Drag-and-drop reordering** - Not worth the time.
5. **Fancy calendar library** - List view is enough.
6. **Accessibility audit** - Focus on core functionality.
7. **Performance optimization** - It's a demo, not production.
8. **Offline mode** - Unnecessary complexity.
9. **User authentication** - LocalStorage is fine.
10. **Backend/database** - Everything client-side.

### ✅ Do Build These (They Impress Judges)

1. **Instant demo data** - One-click to see it work
2. **Visual schedule** - Even simple looks smart
3. **Adaptive behavior** - Show the "AI" learning
4. **Progress visualization** - Bars, percentages, trends
5. **Clean UI** - Tailwind makes this fast
6. **Clear explanations** - Tell judges why it's smart
7. **Mobile responsive** - Judges test on phones
8. **Fast load time** - No heavy libraries

---

## DEMO SCRIPT (5 Minutes)

### Minute 1: The Problem
"Engineering students juggle 5-6 subjects with different deadlines and difficulty levels. Traditional calendars don't adapt. Students study hard, but not smart."

### Minute 2: The Solution
"AI Study Planner generates a personalized schedule in 2 minutes. Watch: I enter my subjects, confidence levels, and available hours. Click generate. Done."

### Minute 3: The Intelligence
"The system prioritizes weak subjects, respects deadlines, and balances cognitive load. High-difficulty topics get more time and better time slots."

### Minute 4: The Adaptation
"Here's the magic: I miss a session. The system auto-reschedules it. I mark a topic as 'Hard'. The system allocates more time. It learns from me."

### Minute 5: The Impact
"Students get personalized, adaptive schedules without decision fatigue. They study smarter, reduce stress, and improve retention. This is daily-use AI, not just exam prep."

---

## SUCCESS METRICS

### Minimum Viable Demo (Must Have)
- [ ] Profile → Schedule flow works end-to-end
- [ ] Schedule displays with times and subjects
- [ ] Timer works and marks sessions complete
- [ ] Missed sessions auto-reschedule
- [ ] Progress updates after completion
- [ ] Demo data loads instantly
- [ ] Deployed and accessible via URL

### Impressive Demo (Should Have)
- [ ] Color-coded schedule (cognitive load or subject)
- [ ] Deadline countdown visible
- [ ] Difficulty feedback changes schedule
- [ ] Confidence trends shown
- [ ] Mobile responsive
- [ ] Clean, professional UI

### Winning Demo (Nice to Have)
- [ ] Prerequisite warnings
- [ ] Study mode toggle
- [ ] Branch templates
- [ ] Buffer time visualization
- [ ] Export to calendar

---

## TIME MANAGEMENT RULES

### If Behind Schedule (Hour 24+)
1. **Cut features, not quality** - Remove Phase 2 items, perfect Phase 1
2. **Simplify UI** - Plain HTML is better than broken Tailwind
3. **Hardcode if needed** - Demo data can be hardcoded
4. **Skip edge cases** - Handle happy path only

### If Ahead of Schedule (Hour 36+)
1. **Add demo polish** - Better colors, spacing, copy
2. **Add one "wow" feature** - Pick easiest from Phase 2
3. **Improve explanations** - Make AI feel smarter with text
4. **Record demo video** - Practice the pitch

### Red Flags (Stop and Reassess)
- Hour 12: No working schedule generation → simplify algorithm
- Hour 24: No visual schedule → use simple list, skip calendar
- Hour 36: Timer not working → focus on display, skip pause/resume
- Hour 42: Not deployed → deploy now, fix bugs in production

---

## TECH STACK (Keep It Simple)

### Must Have
- React + TypeScript (CRA template)
- Zustand (state management)
- Tailwind CSS (styling)
- date-fns (date handling)
- Vercel/Netlify (deployment)

### Nice to Have
- React Router (navigation)
- Recharts (simple charts)
- React Icons (icons)

### Do NOT Add
- Redux (too complex)
- Material-UI (too heavy)
- Axios (use fetch)
- Testing libraries (no time)
- Backend frameworks (client-side only)

---

## FINAL CHECKLIST (Before Demo)

- [ ] App loads without errors
- [ ] Demo data button works
- [ ] Schedule generates in < 5 seconds
- [ ] Timer counts down correctly
- [ ] Missed session shows notification
- [ ] Progress bars update
- [ ] Mobile view doesn't break
- [ ] Deployed URL works
- [ ] Demo script practiced
- [ ] Backup plan if live demo fails (video/screenshots)

---

**Remember: A working simple demo beats a broken complex one. Ship early, iterate if time allows.**
