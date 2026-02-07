import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { format, isToday, isFuture } from 'date-fns';
import { FaBrain, FaPlay, FaPause, FaCheck, FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { StudySession, SessionStatus, DifficultyFeedback } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const { student, schedule, subjects, completeSession, updateSession, clearAll } = useStore();
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && activeSession) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev >= activeSession.duration * 60) {
            setTimerRunning(false);
            setShowFeedback(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, activeSession]);
  
  // Get current recommendation
  const getCurrentRecommendation = (): StudySession | null => {
    if (!schedule) return null;
    
    const now = new Date();
    const todaySessions = schedule.sessions.filter(s => 
      isToday(s.scheduledDate) && s.status === SessionStatus.SCHEDULED
    );
    
    // Find session for current time (within 1 hour window)
    const currentHour = now.getHours();
    const currentSession = todaySessions.find(s => {
      const sessionHour = parseInt(s.startTime.split(':')[0]);
      return Math.abs(sessionHour - currentHour) <= 1;
    });
    
    if (currentSession) return currentSession;
    
    // Return next upcoming session
    return todaySessions[0] || null;
  };
  
  const currentRecommendation = getCurrentRecommendation();
  
  const handleStartSession = (session: StudySession) => {
    setActiveSession(session);
    setTimerSeconds(0);
    setTimerRunning(true);
    updateSession(session.id, {
      status: SessionStatus.IN_PROGRESS,
      actualStartTime: new Date()
    });
  };
  
  const handlePauseSession = () => {
    setTimerRunning(false);
  };
  
  const handleResumeSession = () => {
    setTimerRunning(true);
  };
  
  const handleCompleteFeedback = (feedback: DifficultyFeedback) => {
    if (activeSession) {
      completeSession(activeSession.id, feedback);
      setShowFeedback(false);
      setActiveSession(null);
      setTimerSeconds(0);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getSubjectName = (subjectId: string): string => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Unknown Subject';
  };
  
  const getTopicName = (topicId: string): string => {
    for (const subject of subjects) {
      const topic = subject.topics.find(t => t.id === topicId);
      if (topic) return topic.name;
    }
    return 'Unknown Topic';
  };
  
  const getTodaySessions = (): StudySession[] => {
    if (!schedule) return [];
    const todaySessions = schedule.sessions.filter(s => isToday(s.scheduledDate));
    console.log('Total sessions:', schedule.sessions.length);
    console.log('Today sessions:', todaySessions.length);
    console.log('All sessions dates:', schedule.sessions.map(s => ({
      topic: getTopicName(s.topicId),
      date: format(s.scheduledDate, 'MMM d, yyyy'),
      isToday: isToday(s.scheduledDate)
    })));
    return todaySessions;
  };
  
  const getUpcomingSessions = (): StudySession[] => {
    if (!schedule) return [];
    const upcoming = schedule.sessions
      .filter(s => isFuture(s.scheduledDate) && s.status === SessionStatus.SCHEDULED)
      .slice(0, 10); // Show more sessions
    console.log('Upcoming sessions:', upcoming.length);
    return upcoming;
  };
  
  const calculateProgress = (): number => {
    if (!schedule) return 0;
    const completed = schedule.sessions.filter(s => s.status === SessionStatus.COMPLETED).length;
    return Math.round((completed / schedule.sessions.length) * 100);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? This will clear all your data.')) {
      clearAll();
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3 animate-slideIn">
              <div className="p-2 bg-white rounded-lg shadow-lg">
                <FaBrain className="text-2xl sm:text-3xl text-indigo-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">AI Study Planner</h1>
                <p className="text-xs sm:text-sm text-white/80">Welcome back, {student?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass text-left sm:text-right px-4 py-2 rounded-lg">
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Overall Progress</div>
                <div className="text-xl sm:text-2xl font-bold gradient-text">{calculateProgress()}%</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowProfile(true)}
                  className="p-3 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 rounded-lg transition-all shadow-lg"
                  title="View Profile"
                >
                  <FaUser className="text-lg" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="p-3 bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 rounded-lg transition-all shadow-lg"
                  title="Home"
                >
                  <FaHome className="text-lg" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-3 bg-white/20 backdrop-blur-lg text-white hover:bg-red-500 rounded-lg transition-all shadow-lg"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && student && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Profile</h3>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <FaUser className="text-2xl text-indigo-600" />
                  <div>
                    <label className="text-xs font-medium text-gray-600">Name</label>
                    <p className="text-xl font-bold text-gray-900">{student.name}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg text-gray-900">{student.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">College</label>
                <p className="text-lg text-gray-900">{student.college}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Branch</label>
                <p className="text-lg text-gray-900">{student.branch}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Graduation Year</label>
                <p className="text-lg text-gray-900">{student.graduationYear}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Study Hours</label>
                <p className="text-lg text-gray-900">
                  Weekdays: {student.studyAvailability.weekdayHours}h | 
                  Weekends: {student.studyAvailability.weekendHours}h
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Preferred Study Time</label>
                <p className="text-lg text-gray-900 capitalize">{student.preferredStudyTime}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Target Completion</label>
                <p className="text-lg text-gray-900">
                  {format(student.targetCompletionDate, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowProfile(false)}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold 
                         hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowProfile(false);
                  handleLogout();
                }}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold 
                         hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Active Session Timer */}
        {activeSession && (
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 sm:p-8 text-white shadow-xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {getSubjectName(activeSession.subjectId)} - {getTopicName(activeSession.topicId)}
              </h2>
              <div className="text-5xl sm:text-6xl font-bold my-4 sm:my-6">
                {formatTime(timerSeconds)}
              </div>
              <div className="text-base sm:text-lg mb-4 sm:mb-6">
                Target: {activeSession.duration} minutes
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                {timerRunning ? (
                  <button
                    onClick={handlePauseSession}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-white text-indigo-600 rounded-lg font-semibold 
                             hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPause /> Pause
                  </button>
                ) : (
                  <button
                    onClick={handleResumeSession}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-white text-indigo-600 rounded-lg font-semibold 
                             hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPlay /> Resume
                  </button>
                )}
                <button
                  onClick={() => setShowFeedback(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-semibold 
                           hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaCheck /> Complete
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Feedback Modal */}
        {showFeedback && activeSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How was this session?</h3>
              <p className="text-gray-600 mb-6">Your feedback helps us adjust future sessions</p>
              <div className="space-y-3">
                <button
                  onClick={() => handleCompleteFeedback(DifficultyFeedback.EASY)}
                  className="w-full py-3 bg-green-100 text-green-700 rounded-lg font-semibold 
                           hover:bg-green-200 transition-colors"
                >
                  😊 Easy - I understood everything
                </button>
                <button
                  onClick={() => handleCompleteFeedback(DifficultyFeedback.MEDIUM)}
                  className="w-full py-3 bg-yellow-100 text-yellow-700 rounded-lg font-semibold 
                           hover:bg-yellow-200 transition-colors"
                >
                  😐 Medium - Some challenging parts
                </button>
                <button
                  onClick={() => handleCompleteFeedback(DifficultyFeedback.HARD)}
                  className="w-full py-3 bg-red-100 text-red-700 rounded-lg font-semibold 
                           hover:bg-red-200 transition-colors"
                >
                  😓 Hard - Need more time on this
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* What Should I Study Now? */}
        {!activeSession && currentRecommendation && (
          <div className="mb-6 sm:mb-8 bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <FaBrain className="text-2xl sm:text-3xl text-indigo-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">What Should I Study Now?</h2>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {getSubjectName(currentRecommendation.subjectId)}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 mb-1">
                    Topic: {getTopicName(currentRecommendation.topicId)}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Duration: {currentRecommendation.duration} minutes
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Scheduled for {format(currentRecommendation.scheduledDate, 'h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => handleStartSession(currentRecommendation)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white rounded-lg font-bold text-base sm:text-lg
                           hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlay /> Start Now
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Today's Schedule */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Schedule</h2>
          <div className="space-y-3">
            {getTodaySessions().length > 0 ? (
              getTodaySessions().map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  subjectName={getSubjectName(session.subjectId)}
                  topicName={getTopicName(session.topicId)}
                  onStart={() => handleStartSession(session)}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No sessions scheduled for today</p>
            )}
          </div>
        </div>
        
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
          <div className="space-y-3">
            {getUpcomingSessions().map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {getSubjectName(session.subjectId)} - {getTopicName(session.topicId)}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {format(session.scheduledDate, 'MMM d, yyyy')} at {session.startTime} • 
                    {session.duration} min
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${session.cognitiveLoad === 'high' ? 'bg-red-100 text-red-700' :
                    session.cognitiveLoad === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'}`}>
                  {session.cognitiveLoad}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Subject Progress */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Progress</h2>
          <div className="space-y-4">
            {subjects.map(subject => {
              const subjectSessions = schedule?.sessions.filter(s => s.subjectId === subject.id) || [];
              const completed = subjectSessions.filter(s => s.status === SessionStatus.COMPLETED).length;
              const progress = subjectSessions.length > 0 
                ? Math.round((completed / subjectSessions.length) * 100) 
                : 0;
              
              return (
                <div key={subject.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{subject.name}</span>
                      {progress === 100 && (
                        <span className="text-green-600 text-sm">✓ Completed</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        progress === 100 ? 'bg-green-600' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{completed} of {subjectSessions.length} sessions completed</span>
                  </div>
                </div>
              );
            })}
            {subjects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No subjects added yet</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Topics Overview */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Topics by Subject</h2>
          <div className="space-y-6">
            {subjects.map(subject => {
              const topicSessions = subject.topics.map(topic => {
                const sessions = schedule?.sessions.filter(s => s.topicId === topic.id) || [];
                const completed = sessions.filter(s => s.status === SessionStatus.COMPLETED).length;
                return {
                  topic,
                  totalSessions: sessions.length,
                  completedSessions: completed,
                  progress: sessions.length > 0 ? Math.round((completed / sessions.length) * 100) : 0
                };
              });
              
              return (
                <div key={subject.id} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{subject.name}</h3>
                  <div className="space-y-2">
                    {topicSessions.map(({ topic, totalSessions, completedSessions, progress }) => (
                      <div key={topic.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{topic.name}</span>
                            {progress === 100 && (
                              <span className="text-green-600 text-xs">✓</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {completedSessions} of {totalSessions} sessions completed
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                progress === 100 ? 'bg-green-600' : 'bg-indigo-600'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {subjects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No topics to display</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

interface SessionCardProps {
  session: StudySession;
  subjectName: string;
  topicName: string;
  onStart: () => void;
}

function SessionCard({ session, subjectName, topicName, onStart }: SessionCardProps) {
  const getStatusColor = (status: SessionStatus) => {
    switch (status) {
      case SessionStatus.COMPLETED:
        return 'bg-green-100 text-green-700';
      case SessionStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-700';
      case SessionStatus.MISSED:
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{subjectName} - {topicName}</h4>
        <p className="text-sm text-gray-600">
          {session.startTime} • {session.duration} minutes
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
          {session.status}
        </span>
        {session.status === SessionStatus.SCHEDULED && (
          <button
            onClick={onStart}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold 
                     hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <FaPlay /> Start
          </button>
        )}
      </div>
    </div>
  );
}
