// Core domain types for AI Study Planner

export enum TimePreference {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night'
}

export enum EngineeringBranch {
  CSE = 'Computer Science',
  ECE = 'Electronics & Communication',
  MECHANICAL = 'Mechanical',
  CIVIL = 'Civil',
  ELECTRICAL = 'Electrical',
  OTHER = 'Other'
}

export interface StudyAvailability {
  weekdayHours: number;
  weekendHours: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  college: string;
  branch: EngineeringBranch;
  graduationYear: number;
  email: string;
  studyAvailability: StudyAvailability;
  preferredStudyTime: TimePreference;
  targetCompletionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum CognitiveLoad {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export enum SubjectImportance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  cognitiveLoad: CognitiveLoad;
  prerequisites: string[];
  estimatedHours: number;
  completedHours: number;
  confidenceLevel: ConfidenceLevel;
  isWeak: boolean;
  lastStudied?: Date;
}

export interface Subject {
  id: string;
  name: string;
  credits: number;
  topics: Topic[];
  strongAreas: string[];
  weakAreas: string[];
  confidenceLevel: ConfidenceLevel;
  importance: SubjectImportance;
  isInterestSubject: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum SessionType {
  LEARNING = 'learning',
  REVISION = 'revision',
  PRACTICE = 'practice',
  DRILL = 'drill'
}

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  MISSED = 'missed',
  RESCHEDULED = 'rescheduled'
}

export enum DifficultyFeedback {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export interface StudySession {
  id: string;
  topicId: string;
  subjectId: string;
  scheduledDate: Date;
  startTime: string;
  duration: number;
  sessionType: SessionType;
  cognitiveLoad: CognitiveLoad;
  status: SessionStatus;
  actualStartTime?: Date;
  actualEndTime?: Date;
  difficultyFeedback?: DifficultyFeedback;
  notes?: string;
}

export interface Schedule {
  id: string;
  studentId: string;
  sessions: StudySession[];
  generatedAt: Date;
  lastUpdatedAt: Date;
  version: number;
}

export interface TopicProgress {
  topicId: string;
  completionPercentage: number;
  confidenceLevel: ConfidenceLevel;
  hoursSpent: number;
  sessionsCompleted: number;
  lastDifficultyFeedback?: DifficultyFeedback;
}

export interface SubjectProgress {
  subjectId: string;
  topicProgress: Map<string, TopicProgress>;
  overallConfidence: number;
  hoursSpent: number;
  hoursRemaining: number;
  completionPercentage: number;
}

export interface WeeklyStats {
  weekStartDate: Date;
  sessionsScheduled: number;
  sessionsCompleted: number;
  sessionsMissed: number;
  totalHoursStudied: number;
  averageDifficulty: number;
  confidenceImprovement: number;
}

export interface ProgressSnapshot {
  id: string;
  studentId: string;
  timestamp: Date;
  subjectProgress: Map<string, SubjectProgress>;
  overallProgress: number;
  weeklyStats: WeeklyStats;
}

export interface AppSettings {
  notificationsEnabled: boolean;
  notificationLeadTime: number;
  theme: 'light' | 'dark';
  studyMode: 'learning' | 'exam';
}

export interface AppState {
  student: StudentProfile | null;
  subjects: Subject[];
  schedule: Schedule | null;
  sessions: StudySession[];
  progress: ProgressSnapshot[];
  settings: AppSettings;
}
