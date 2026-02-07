# Quick Start Guide - AI Study Planner

## Installation & Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Using the Application

### Option 1: Try Demo (Fastest - 30 seconds)
1. Click "Try Demo" on landing page
2. Instantly see a pre-configured schedule
3. Explore all features with sample data

### Option 2: Create Your Own Schedule (2 minutes)
1. Click "Get Started"
2. Fill in your profile:
   - Name, college, branch
   - Study hours (weekdays/weekends)
   - Preferred study time
   - Target completion date
3. Add subjects:
   - Subject name and credits
   - Confidence level (1-5)
   - Topics to cover
4. Click "Generate My Schedule"
5. Start studying!

## Key Features to Demo

### 1. "What Should I Study Now?" Card
- Shows current priority task
- One-click to start session
- Eliminates decision fatigue

### 2. Study Timer
- Click "Start" on any session
- Pomodoro-style countdown
- Pause/Resume functionality
- Completion feedback

### 3. Difficulty Feedback
- After completing a session
- Choose: Easy / Medium / Hard
- System adapts future sessions automatically

### 4. Progress Tracking
- Visual progress bars per subject
- Overall completion percentage
- Session status tracking

### 5. Smart Scheduling
- Cognitive load balancing
- Prerequisite ordering
- Deadline prioritization
- Confidence-based time allocation

## Demo Script (5 minutes)

### Minute 1: The Problem
"Engineering students juggle multiple subjects with different deadlines and difficulty. 
Traditional calendars don't adapt. Students study hard, but not smart."

### Minute 2: The Solution
"AI Study Planner generates a personalized schedule in 2 minutes. 
Watch: I enter my subjects, confidence levels, and available hours. 
Click generate. Done."

### Minute 3: The Intelligence
"The system prioritizes weak subjects, respects deadlines, and balances cognitive load. 
High-difficulty topics get more time and better time slots."

### Minute 4: The Adaptation
"Here's the magic: I complete a session and mark it as 'Hard'. 
The system automatically allocates more time for similar topics. 
It learns from me."

### Minute 5: The Impact
"Students get personalized, adaptive schedules without decision fatigue. 
They study smarter, reduce stress, and improve retention. 
This is daily-use AI, not just exam prep."

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clean build
rm -rf dist
npm run build
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

## Next Steps

1. ✅ Test the demo flow
2. ✅ Create your own schedule
3. ✅ Complete a study session
4. ✅ Provide difficulty feedback
5. ✅ Check progress tracking

## Support

- Check README.md for detailed documentation
- Review code comments for implementation details
- Open GitHub issues for bugs or questions

---

**Pro Tip**: Use the demo data to quickly showcase all features during presentations!
