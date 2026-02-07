# AI Study Planner - Smart Scheduling for Engineering Students

An AI-powered study planner that generates personalized, adaptive study schedules for engineering students. Built for hackathons with a focus on immediate value and practical features.

## Features

### Core MVP Features
- ✅ **Smart Schedule Generation**: AI analyzes cognitive load, prerequisites, and deadlines
- ✅ **"What Should I Study Now?"**: Real-time study guidance eliminates decision fatigue
- ✅ **Pomodoro Timer**: Built-in session tracking with pause/resume
- ✅ **Adaptive Rescheduling**: Automatically handles missed sessions
- ✅ **Difficulty Feedback**: System learns and adjusts based on your experience
- ✅ **Progress Tracking**: Visual progress bars for all subjects and topics
- ✅ **Cognitive Load Balancing**: High-effort tasks scheduled during peak energy times

### Key Benefits
- 📊 Get a personalized schedule in under 2 minutes
- 🧠 Balance cognitive load across study sessions
- 📅 Respect prerequisite dependencies automatically
- 🎯 Prioritize based on confidence levels and deadlines
- 🔄 Adapt dynamically to your feedback and progress

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Zustand with localStorage persistence
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Icons**: React Icons

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-study-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment.

## Usage Guide

### 1. Setup Your Profile
- Enter your name, college, branch, and graduation year
- Specify available study hours (weekdays and weekends)
- Set your preferred study time (morning/afternoon/evening/night)
- Choose your target completion date

### 2. Add Subjects
- Add each subject with:
  - Subject name and credit hours
  - Confidence level (1-5 scale)
  - Importance (low/medium/high/critical)
  - List of topics to cover

### 3. Generate Schedule
- Click "Generate My Schedule"
- System creates an optimized study plan in seconds
- Schedule respects your constraints and priorities

### 4. Start Studying
- Dashboard shows "What Should I Study Now?"
- Click "Start" to begin a session with built-in timer
- Complete sessions and provide difficulty feedback
- System automatically adapts future sessions

## Project Structure

```
ai-study-planner/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Main application pages
│   │   ├── LandingPage.tsx
│   │   ├── SetupPage.tsx
│   │   └── Dashboard.tsx
│   ├── services/         # Business logic
│   │   └── scheduleGenerator.ts
│   ├── store/            # Zustand state management
│   │   └── useStore.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── tailwind.config.js   # Tailwind config
```

## Key Algorithms

### Schedule Generation
1. **Calculate Available Hours**: Based on weekday/weekend hours and target date
2. **Prerequisite Ordering**: Topological sort ensures topics are studied in correct order
3. **Priority Calculation**: Factors in confidence, importance, cognitive load, and weak areas
4. **Time Allocation**: Distributes hours proportionally with adjustments for difficulty
5. **Session Generation**: Creates time-slotted sessions with cognitive load balancing

### Adaptive Rescheduling
- Detects missed sessions automatically
- Reschedules to next available time slot
- Maintains prerequisite ordering
- Uses buffer time when available

### Difficulty-Based Adaptation
- **Hard feedback**: Increases future time allocation by 30%
- **Easy feedback**: Decreases future time allocation by 20%
- **Medium feedback**: No adjustment needed

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### Manual Hosting
1. Build: `npm run build`
2. Serve the `dist` directory with any static file server

## Demo Data

Click "Try Demo" on the landing page to load sample data:
- Pre-configured CSE student profile
- 3 subjects with multiple topics
- 14-day study schedule
- Instant access to all features

## Future Enhancements

### Phase 2 (Post-Hackathon)
- Burnout detection and prevention
- Spaced repetition for weak topics
- Interleaved practice scheduling
- Calendar export (Google Calendar)
- Email/push notifications
- Branch-specific templates

### Phase 3 (Advanced)
- What-if scenario planning
- Study efficiency analytics
- Mentor progress reports
- Offline mode support
- Mobile app (React Native)

## Architecture Highlights

### State Management
- Zustand for lightweight, performant state
- localStorage persistence for data durability
- No complex middleware or boilerplate

### Type Safety
- Full TypeScript coverage
- Strict type checking enabled
- Comprehensive type definitions

### Performance
- Vite for fast development and builds
- Lazy loading for route-based code splitting
- Optimized re-renders with proper memoization

## Contributing

This is a hackathon project focused on rapid development and demo-ready features. Contributions are welcome!

### Development Guidelines
- Keep code simple and readable
- Focus on user-facing features over infrastructure
- Prioritize working demos over perfect code
- Test manually - no automated tests for MVP

## License

MIT License - feel free to use this project for learning or hackathons.

## Acknowledgments

Built for engineering students who want to study smarter, not harder.

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Remember**: A working simple demo beats a broken complex one. Ship early, iterate if time allows.
