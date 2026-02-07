import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import { scheduleGenerator } from '../services/scheduleGenerator';
import { getBranchSubjects, getAllBranchSubjects } from '../services/branchTemplates';
import {
  StudentProfile,
  Subject,
  EngineeringBranch,
  TimePreference,
  SubjectImportance,
  CognitiveLoad,
  ConfidenceLevel
} from '../types';
import { FaBrain, FaPlus, FaTrash, FaLightbulb, FaArrowLeft } from 'react-icons/fa';

export default function SetupPage() {
  const navigate = useNavigate();
  const { setStudent, addSubject, setSchedule } = useStore();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: '',
    college: '',
    branch: EngineeringBranch.CSE,
    graduationYear: new Date().getFullYear() + 2,
    email: '',
    weekdayHours: 3,
    weekendHours: 6,
    preferredStudyTime: TimePreference.EVENING,
    targetDate: ''
  });
  
  // Subjects form state
  const [subjects, setSubjects] = useState<Array<{
    name: string;
    credits: number;
    confidence: ConfidenceLevel;
    importance: SubjectImportance;
    topics: string[];
  }>>([]);
  
  const [currentSubject, setCurrentSubject] = useState({
    name: '',
    credits: 3,
    confidence: 3 as ConfidenceLevel,
    importance: SubjectImportance.MEDIUM,
    topics: ['']
  });
  
  // Get all available subjects and topics for dropdowns
  const availableSubjects = useMemo(() => {
    const student = useStore.getState().student;
    if (student) {
      // If branch is OTHER, don't show any predefined subjects
      if (student.branch === EngineeringBranch.OTHER) {
        return [];
      }
      const branchSubjects = getBranchSubjects(student.branch);
      // Filter out subjects that are already added
      const addedSubjectNames = subjects.map(s => s.name.toLowerCase());
      return branchSubjects.filter(s => !addedSubjectNames.includes(s.name.toLowerCase()));
    }
    return getAllBranchSubjects();
  }, [subjects]);
  
  // Get topics for selected subject
  const availableTopics = useMemo(() => {
    const selectedSubject = availableSubjects.find(s => s.name === currentSubject.name);
    return selectedSubject ? selectedSubject.topics.map(t => t.name) : [];
  }, [currentSubject.name, availableSubjects]);
  
  // Handle subject selection change
  const handleSubjectChange = (value: string) => {
    if (value === 'other') {
      setCurrentSubject({ ...currentSubject, name: '' });
    } else {
      setCurrentSubject({ ...currentSubject, name: value });
    }
  };
  
  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const student: StudentProfile = {
      id: `student-${Date.now()}`,
      name: studentForm.name,
      college: studentForm.college,
      branch: studentForm.branch,
      graduationYear: studentForm.graduationYear,
      email: studentForm.email,
      studyAvailability: {
        weekdayHours: studentForm.weekdayHours,
        weekendHours: studentForm.weekendHours
      },
      preferredStudyTime: studentForm.preferredStudyTime,
      targetCompletionDate: new Date(studentForm.targetDate),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setStudent(student);
    setStep(2);
  };
  
  const handleLoadBranchSubjects = () => {
    const student = useStore.getState().student;
    if (!student) return;
    
    const branchTemplates = getBranchSubjects(student.branch);
    const loadedSubjects = branchTemplates.map(template => ({
      name: template.name,
      credits: template.credits,
      confidence: template.defaultConfidence as ConfidenceLevel,
      importance: template.importance,
      topics: template.topics.map(t => t.name)
    }));
    
    setSubjects(loadedSubjects);
  };
  
  const handleAddSubject = () => {
    // Filter out empty topics
    const filledTopics = currentSubject.topics.filter(t => t.trim() !== '');
    
    if (!currentSubject.name || !currentSubject.name.trim()) {
      alert('Please enter a subject name');
      return;
    }
    
    if (filledTopics.length === 0) {
      alert('Please enter at least one topic');
      return;
    }
    
    // Add subject with only filled topics
    const newSubject = { ...currentSubject, topics: filledTopics };
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    
    console.log('Subject added! Total subjects:', updatedSubjects.length);
    console.log('Subjects array:', updatedSubjects);
    
    // Reset form
    setCurrentSubject({
      name: '',
      credits: 3,
      confidence: 3 as ConfidenceLevel,
      importance: SubjectImportance.MEDIUM,
      topics: ['']
    });
  };
  
  const handleAddTopic = () => {
    setCurrentSubject({
      ...currentSubject,
      topics: [...currentSubject.topics, '']
    });
  };
  
  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...currentSubject.topics];
    newTopics[index] = value;
    setCurrentSubject({ ...currentSubject, topics: newTopics });
  };
  
  const handleRemoveTopic = (index: number) => {
    if (currentSubject.topics.length <= 1) {
      return; // Don't remove if it's the last topic
    }
    const newTopics = currentSubject.topics.filter((_, i) => i !== index);
    setCurrentSubject({ ...currentSubject, topics: newTopics });
  };
  
  const handleGenerateSchedule = async () => {
    console.log('Generate button clicked!');
    console.log('Current subjects:', subjects);
    
    if (subjects.length === 0) {
      alert('Please add at least one subject');
      return;
    }
    
    // Validate that all subjects have at least one topic
    const subjectsWithoutTopics = subjects.filter(s => !s.topics || s.topics.length === 0);
    if (subjectsWithoutTopics.length > 0) {
      alert('All subjects must have at least one topic. Please add topics to: ' + 
            subjectsWithoutTopics.map(s => s.name).join(', '));
      return;
    }
    
    setLoading(true);
    
    try {
      const student = useStore.getState().student;
      
      if (!student) {
        alert('Student profile not found. Please go back and complete your profile.');
        setLoading(false);
        return;
      }
      
      console.log('Student profile:', student);
      
      // Convert subjects to proper format with correct IDs
      const formattedSubjects: Subject[] = subjects.map(s => {
        const subjectId = `subject-${Date.now()}-${Math.random()}`;
        // Filter and trim topics to ensure no empty strings
        const cleanTopics = s.topics.filter(t => t && t.trim() !== '');
        
        if (cleanTopics.length === 0) {
          throw new Error(`Subject "${s.name}" has no valid topics`);
        }
        
        return {
          id: subjectId,
          name: s.name,
          credits: s.credits,
          topics: cleanTopics.map((topicName, idx) => ({
            id: `topic-${subjectId}-${idx}`,
            subjectId: subjectId,  // Use the same subject ID
            name: topicName.trim(),
            cognitiveLoad: CognitiveLoad.MEDIUM,
            prerequisites: [],
            estimatedHours: 5,
            completedHours: 0,
            confidenceLevel: s.confidence,
            isWeak: s.confidence <= 2
          })),
          strongAreas: [],
          weakAreas: cleanTopics.filter(() => s.confidence <= 2),
          confidenceLevel: s.confidence,
          importance: s.importance,
          isInterestSubject: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
      
      console.log('Formatted subjects:', formattedSubjects);
      
      // Add subjects to store
      formattedSubjects.forEach(subject => addSubject(subject));
      
      // Log for debugging
      console.log('Formatted subjects with topics:', formattedSubjects.map(s => ({
        name: s.name,
        topicCount: s.topics.length,
        topics: s.topics.map(t => t.name)
      })));
      
      // Generate schedule asynchronously to avoid blocking UI
      // Use requestAnimationFrame to ensure UI updates before heavy computation
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            console.log('Starting schedule generation...');
            const schedule = scheduleGenerator.generateSchedule(
              student,
              formattedSubjects
            );
            
            console.log('Generated schedule sessions:', schedule.sessions.length);
            
            // Verify all topics have sessions
            const allTopics = formattedSubjects.flatMap(subj => subj.topics);
            const topicsWithSessions = new Set(schedule.sessions.map(s => s.topicId));
            const topicsWithoutSessions = allTopics.filter(t => !topicsWithSessions.has(t.id));
            
            console.log('Total topics:', allTopics.length);
            console.log('Topics with sessions:', topicsWithSessions.size);
            
            if (topicsWithoutSessions.length > 0) {
              console.warn('Topics without sessions:', topicsWithoutSessions.map(t => t.name));
            }
            
            console.log('Sessions by topic:', schedule.sessions.map(s => ({
              topic: formattedSubjects
                .flatMap(subj => subj.topics)
                .find(t => t.id === s.topicId)?.name,
              subject: formattedSubjects.find(subj => subj.id === s.subjectId)?.name,
              date: format(s.scheduledDate, 'MMM d'),
              time: s.startTime,
              duration: s.duration
            })));
            
            setSchedule(schedule);
            setLoading(false);
            console.log('Navigating to dashboard...');
            navigate('/dashboard');
          } catch (scheduleError) {
            console.error('Error generating schedule:', scheduleError);
            setLoading(false);
            alert('Failed to generate schedule: ' + (scheduleError as Error).message);
          }
        }, 200);
      });
    } catch (error) {
      console.error('Error preparing data:', error);
      alert('Failed to prepare data: ' + (error as Error).message);
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      {/* Full-screen loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <svg className="animate-spin h-16 w-16 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Your Schedule...</h3>
            <p className="text-gray-600">This will take just a moment</p>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <FaBrain className="text-3xl sm:text-4xl text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Setup Your Study Plan</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 
                     hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <StepIndicator number={1} active={step === 1} completed={step > 1} label="Profile" />
            <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
            <StepIndicator number={2} active={step === 2} completed={step > 2} label="Subjects" />
          </div>
        </div>
        
        {/* Step 1: Student Profile */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
            <form onSubmit={handleStudentSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College
                  </label>
                  <input
                    type="text"
                    required
                    value={studentForm.college}
                    onChange={(e) => setStudentForm({ ...studentForm, college: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your college name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <select
                    value={studentForm.branch}
                    onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value as EngineeringBranch })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                  >
                    {Object.values(EngineeringBranch).map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    required
                    value={studentForm.graduationYear}
                    onChange={(e) => setStudentForm({ ...studentForm, graduationYear: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    required
                    value={studentForm.targetDate}
                    onChange={(e) => setStudentForm({ ...studentForm, targetDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weekday Study Hours
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="12"
                    value={studentForm.weekdayHours}
                    onChange={(e) => setStudentForm({ ...studentForm, weekdayHours: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weekend Study Hours
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="12"
                    value={studentForm.weekendHours}
                    onChange={(e) => setStudentForm({ ...studentForm, weekendHours: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Study Time
                  </label>
                  <select
                    value={studentForm.preferredStudyTime}
                    onChange={(e) => setStudentForm({ ...studentForm, preferredStudyTime: e.target.value as TimePreference })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value={TimePreference.MORNING}>Morning (6am - 12pm)</option>
                    <option value={TimePreference.AFTERNOON}>Afternoon (12pm - 6pm)</option>
                    <option value={TimePreference.EVENING}>Evening (6pm - 10pm)</option>
                    <option value={TimePreference.NIGHT}>Night (10pm - 2am)</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold 
                         hover:bg-indigo-700 transition-colors"
              >
                Continue to Subjects
              </button>
            </form>
          </div>
        )}
        
        {/* Step 2: Subjects */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Back to Profile Button */}
            <div className="flex justify-start">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 
                         hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FaArrowLeft />
                <span>Back to Profile</span>
              </button>
            </div>
            
            {/* Load Branch Subjects Button */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <FaLightbulb className="text-2xl text-yellow-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Start</h3>
                    <p className="text-sm text-gray-600">
                      Load pre-configured subjects for {useStore.getState().student?.branch} branch
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLoadBranchSubjects}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold 
                           hover:bg-indigo-700 transition-colors whitespace-nowrap"
                >
                  Load Branch Subjects
                </button>
              </div>
            </div>
            
            {/* Added Subjects */}
            {subjects.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Subjects ({subjects.length})</h3>
                <div className="space-y-3">
                  {subjects.map((subject, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {subject.credits} credits • Confidence: {subject.confidence}/5 • 
                          {subject.topics.length} topic{subject.topics.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {subject.topics.map((topic, topicIdx) => (
                            <span key={topicIdx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSubjects(subjects.filter((_, i) => i !== idx))}
                        className="text-red-600 hover:text-red-700 ml-4"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Add Subject Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Subject</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Name {currentSubject.name === '' && <span className="text-red-500">*</span>}
                    </label>
                    {availableSubjects.length === 0 ? (
                      // For OTHER branch - only show custom input
                      <input
                        type="text"
                        value={currentSubject.name}
                        onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                                 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your subject name (required)"
                        required
                      />
                    ) : (
                      // For other branches - show dropdown with predefined subjects
                      <>
                        <select
                          value={currentSubject.name || 'other'}
                          onChange={(e) => handleSubjectChange(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                                   focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="other">Other (Type your own)</option>
                          {availableSubjects.map((subject, idx) => (
                            <option key={idx} value={subject.name}>{subject.name}</option>
                          ))}
                        </select>
                        {currentSubject.name === '' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Please enter custom subject name (required)"
                              onChange={(e) => setCurrentSubject({ ...currentSubject, name: e.target.value })}
                              className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-2 
                                       focus:ring-indigo-500 focus:border-transparent"
                              required
                            />
                            <p className="text-xs text-red-600 mt-1">⚠️ Please enter a subject name to continue</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credits
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={currentSubject.credits}
                      onChange={(e) => setCurrentSubject({ ...currentSubject, credits: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                               focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confidence Level (1-5)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={currentSubject.confidence}
                      onChange={(e) => setCurrentSubject({ ...currentSubject, confidence: parseInt(e.target.value) as ConfidenceLevel })}
                      className="w-full"
                    />
                    <div className="text-center text-sm text-gray-600 mt-1">
                      {currentSubject.confidence}/5
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Importance
                    </label>
                    <select
                      value={currentSubject.importance}
                      onChange={(e) => setCurrentSubject({ ...currentSubject, importance: e.target.value as SubjectImportance })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                               focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value={SubjectImportance.LOW}>Low</option>
                      <option value={SubjectImportance.MEDIUM}>Medium</option>
                      <option value={SubjectImportance.HIGH}>High</option>
                      <option value={SubjectImportance.CRITICAL}>Critical</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics
                  </label>
                  <div className="space-y-2">
                    {currentSubject.topics.map((topic, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          list="topic-options"
                          value={topic}
                          onChange={(e) => handleTopicChange(idx, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                                   focus:ring-indigo-500 focus:border-transparent"
                          placeholder={`Topic ${idx + 1} or select from list`}
                        />
                        {currentSubject.topics.length > 1 && (
                          <button
                            onClick={() => handleRemoveTopic(idx)}
                            className="px-4 py-2 text-red-600 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))}
                    <datalist id="topic-options">
                      {availableTopics.map((topicName, idx) => (
                        <option key={idx} value={topicName} />
                      ))}
                    </datalist>
                  </div>
                  <button
                    onClick={handleAddTopic}
                    className="mt-2 flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <FaPlus /> Add Topic
                  </button>
                </div>
                
                <button
                  onClick={handleAddSubject}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold 
                           hover:bg-green-700 transition-colors"
                >
                  Add Subject
                </button>
              </div>
            </div>
            
            {/* Generate Schedule Button - Always visible and enabled */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={handleGenerateSchedule}
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg
                         hover:bg-indigo-700 transition-colors disabled:bg-gray-400 
                         disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Your Schedule...
                  </>
                ) : subjects.length === 0 ? (
                  'Generate My Schedule'
                ) : (
                  `Generate My Schedule (${subjects.length} subject${subjects.length !== 1 ? 's' : ''})`
                )}
              </button>
              {subjects.length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  You can generate a schedule anytime, or add subjects first
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  number: number;
  active: boolean;
  completed: boolean;
  label: string;
}

function StepIndicator({ number, active, completed, label }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg
                      ${completed ? 'bg-green-600 text-white' : 
                        active ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
        {number}
      </div>
      <span className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600">{label}</span>
    </div>
  );
}
