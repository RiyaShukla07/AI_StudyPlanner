import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FaBrain, FaRocket, FaChartLine, FaClock, FaTimes, FaCalendarAlt, FaBell, FaCheckCircle, FaLock } from 'react-icons/fa';

export default function LandingPage() {
  const navigate = useNavigate();
  const store = useStore();
  const [showDemoModal, setShowDemoModal] = useState(false);
  
  const handleGetStarted = () => {
    // Clear any existing data before starting fresh
    store.clearAll();
    navigate('/setup');
  };
  
  const handleLoadDemo = () => {
    setShowDemoModal(true);
  };
  
  const handleFeatureClick = (featureName: string, isDemoFeature: boolean = false) => {
    if (isDemoFeature) {
      // Load demo data and navigate to dashboard
      setShowDemoModal(false);
      const { loadDemoDataToStore } = require('../services/demoData');
      loadDemoDataToStore(store);
      navigate('/dashboard');
    } else {
      alert(`To access "${featureName}" and all premium features, please register! Click "Get Started" to create your personalized study plan.`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative py-4 px-4 sm:py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 animate-slideIn">
            <div className="p-2 bg-white rounded-lg shadow-lg">
              <FaBrain className="text-2xl sm:text-3xl text-indigo-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">AI Study Planner</h1>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="relative max-w-6xl mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-12 sm:mb-16 animate-fadeIn">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Study Smarter,<br />Not Harder
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed">
            AI-powered study scheduling for engineering students. Get a personalized, 
            adaptive study plan in 2 minutes that balances cognitive load, respects 
            deadlines, and learns from your progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={handleGetStarted}
              className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-indigo-600 rounded-xl font-bold 
                       hover:bg-gray-50 transition-all shadow-2xl text-lg sm:text-xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <FaRocket className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={handleLoadDemo}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-lg text-white rounded-xl font-bold 
                       hover:bg-white/20 transition-all shadow-2xl border-2 border-white/30 text-lg sm:text-xl"
            >
              Try Demo
            </button>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-20 px-4">
          <FeatureCard
            icon={<FaBrain className="text-4xl sm:text-5xl text-indigo-600" />}
            title="Smart Scheduling"
            description="AI analyzes cognitive load, prerequisites, and deadlines to create optimal study plans"
            delay="0s"
          />
          <FeatureCard
            icon={<FaRocket className="text-4xl sm:text-5xl text-green-600" />}
            title="Instant Setup"
            description="Get your personalized schedule in under 2 minutes with minimal input"
            delay="0.1s"
          />
          <FeatureCard
            icon={<FaChartLine className="text-4xl sm:text-5xl text-purple-600" />}
            title="Adaptive Learning"
            description="System learns from your feedback and automatically adjusts future sessions"
            delay="0.2s"
          />
          <FeatureCard
            icon={<FaClock className="text-4xl sm:text-5xl text-orange-600" />}
            title="Real-Time Guidance"
            description="Always know what to study right now with our 'What Should I Study Now?' feature"
            delay="0.3s"
          />
        </div>
        
        {/* Problem Statement */}
        <div className="mt-12 sm:mt-20 glass rounded-3xl p-6 sm:p-10 shadow-2xl mx-4 animate-fadeIn card-hover">
          <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-4">The Challenge</h3>
          <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
            Engineering students juggle 5-6 technically intensive subjects with different 
            prerequisites, deadlines, and cognitive demands. Traditional calendars and 
            to-do lists don't adapt to the dynamic nature of engineering coursework.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Students study hard, but not smart. They lack systems to balance cognitive load, 
            identify prerequisite gaps, and adapt to changing priorities.
          </p>
        </div>
        
        {/* Solution */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-10 shadow-2xl text-white mx-4 animate-fadeIn card-hover">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Solution</h3>
          <p className="text-base sm:text-lg mb-6 leading-relaxed">
            AI Study Planner generates personalized, deadline-aware schedules that:
          </p>
          <ul className="space-y-3 text-base sm:text-lg">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</span>
              <span>Prioritize weak topics and respect prerequisites</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</span>
              <span>Balance cognitive load across study sessions</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</span>
              <span>Automatically reschedule missed sessions</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</span>
              <span>Adapt based on difficulty feedback</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</span>
              <span>Provide real-time study guidance</span>
            </li>
          </ul>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative py-8 sm:py-12 text-center text-white/80 px-4">
        <p className="text-sm sm:text-base">Built for engineering students who want to study smarter 🚀</p>
      </footer>
      
      {/* Demo Features Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Explore Our Features</h2>
                <p className="text-white/90">Click on any feature to learn more</p>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Feature 1 - FREE DEMO */}
                <button
                  onClick={() => handleFeatureClick('AI-Powered Schedule Generation', true)}
                  className="relative text-left p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 border-2 border-indigo-400"
                >
                  {/* FREE DEMO Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                    FREE DEMO
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-600 rounded-lg">
                      <FaBrain className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Schedule</h3>
                      <p className="text-gray-600 mb-2">
                        Intelligent scheduling that balances cognitive load, respects prerequisites, and adapts to your learning pace.
                      </p>
                      <p className="text-green-600 font-semibold text-sm">
                        ✨ Click to try this feature now!
                      </p>
                    </div>
                  </div>
                </button>
                
                {/* Feature 2 - PREMIUM */}
                <button
                  onClick={() => handleFeatureClick('Smart Study Timer')}
                  className="relative text-left p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-green-300"
                >
                  <div className="absolute top-3 right-3 text-gray-400">
                    <FaLock className="text-xl" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <FaClock className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Study Timer</h3>
                      <p className="text-gray-600">
                        Built-in timer with difficulty feedback to track your progress and adjust future sessions automatically.
                      </p>
                    </div>
                  </div>
                </button>
                
                {/* Feature 3 - PREMIUM */}
                <button
                  onClick={() => handleFeatureClick('Progress Tracking')}
                  className="relative text-left p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-300"
                >
                  <div className="absolute top-3 right-3 text-gray-400">
                    <FaLock className="text-xl" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <FaChartLine className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Tracking</h3>
                      <p className="text-gray-600">
                        Visual progress bars, completion percentages, and detailed analytics for each subject and topic.
                      </p>
                    </div>
                  </div>
                </button>
                
                {/* Feature 4 - PREMIUM */}
                <button
                  onClick={() => handleFeatureClick('Adaptive Learning')}
                  className="relative text-left p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-orange-300"
                >
                  <div className="absolute top-3 right-3 text-gray-400">
                    <FaLock className="text-xl" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-600 rounded-lg">
                      <FaRocket className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Adaptive Learning</h3>
                      <p className="text-gray-600">
                        System learns from your feedback and automatically adjusts difficulty and session duration.
                      </p>
                    </div>
                  </div>
                </button>
                
                {/* Feature 5 - PREMIUM */}
                <button
                  onClick={() => handleFeatureClick('Deadline Management')}
                  className="relative text-left p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-blue-300"
                >
                  <div className="absolute top-3 right-3 text-gray-400">
                    <FaLock className="text-xl" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <FaCalendarAlt className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Deadline Management</h3>
                      <p className="text-gray-600">
                        Never miss a deadline! Automatic rescheduling and priority-based task management.
                      </p>
                    </div>
                  </div>
                </button>
                
                {/* Feature 6 - PREMIUM */}
                <button
                  onClick={() => handleFeatureClick('Real-Time Guidance')}
                  className="relative text-left p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-yellow-300"
                >
                  <div className="absolute top-3 right-3 text-gray-400">
                    <FaLock className="text-xl" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-600 rounded-lg">
                      <FaBell className="text-3xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Guidance</h3>
                      <p className="text-gray-600">
                        "What Should I Study Now?" feature tells you exactly what to focus on at any moment.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* CTA Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setShowDemoModal(false);
                    handleGetStarted();
                  }}
                  className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <FaCheckCircle />
                  Get Started Now - It's Free!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
}

function FeatureCard({ icon, title, description, delay = '0s' }: FeatureCardProps) {
  return (
    <div 
      className="glass rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all card-hover animate-fadeIn"
      style={{ animationDelay: delay }}
    >
      <div className="mb-4 sm:mb-6">{icon}</div>
      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
