import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  AppState,
  StudentProfile,
  Subject,
  Schedule,
  StudySession,
  ProgressSnapshot,
  AppSettings,
  DifficultyFeedback,
  SessionStatus
} from '../types';

interface StoreState extends AppState {
  // Student actions
  setStudent: (student: StudentProfile) => void;
  
  // Subject actions
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  // Schedule actions
  setSchedule: (schedule: Schedule) => void;
  updateSchedule: (schedule: Schedule) => void;
  
  // Session actions
  updateSession: (id: string, updates: Partial<StudySession>) => void;
  completeSession: (id: string, feedback: DifficultyFeedback) => void;
  markSessionMissed: (id: string) => void;
  
  // Progress actions
  addProgressSnapshot: (snapshot: ProgressSnapshot) => void;
  
  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  // Utility actions
  clearAll: () => void;
  loadDemoData: () => void;
}

const initialState: AppState = {
  student: null,
  subjects: [],
  schedule: null,
  sessions: [],
  progress: [],
  settings: {
    notificationsEnabled: true,
    notificationLeadTime: 15,
    theme: 'light',
    studyMode: 'learning'
  }
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setStudent: (student) => set({ student }),
      
      addSubject: (subject) => set((state) => ({
        subjects: [...state.subjects, subject]
      })),
      
      updateSubject: (id, updates) => set((state) => ({
        subjects: state.subjects.map(s => 
          s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s
        )
      })),
      
      deleteSubject: (id) => set((state) => ({
        subjects: state.subjects.filter(s => s.id !== id)
      })),
      
      setSchedule: (schedule) => set({ schedule }),
      
      updateSchedule: (schedule) => set({ schedule }),
      
      updateSession: (id, updates) => set((state) => {
        const updatedSessions = state.sessions.map(s =>
          s.id === id ? { ...s, ...updates } : s
        );
        
        // Also update in schedule if exists
        const updatedSchedule = state.schedule ? {
          ...state.schedule,
          sessions: state.schedule.sessions.map(s =>
            s.id === id ? { ...s, ...updates } : s
          )
        } : null;
        
        return {
          sessions: updatedSessions,
          schedule: updatedSchedule
        };
      }),
      
      completeSession: (id, feedback) => set((state) => {
        const session = state.sessions.find(s => s.id === id);
        if (!session) return state;
        
        const updates: Partial<StudySession> = {
          status: SessionStatus.COMPLETED,
          actualEndTime: new Date(),
          difficultyFeedback: feedback
        };
        
        const updatedSessions = state.sessions.map(s =>
          s.id === id ? { ...s, ...updates } : s
        );
        
        const updatedSchedule = state.schedule ? {
          ...state.schedule,
          sessions: state.schedule.sessions.map(s =>
            s.id === id ? { ...s, ...updates } : s
          )
        } : null;
        
        return {
          sessions: updatedSessions,
          schedule: updatedSchedule
        };
      }),
      
      markSessionMissed: (id) => set((state) => ({
        sessions: state.sessions.map(s =>
          s.id === id ? { ...s, status: SessionStatus.MISSED } : s
        )
      })),
      
      addProgressSnapshot: (snapshot) => set((state) => ({
        progress: [...state.progress, snapshot]
      })),
      
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings }
      })),
      
      clearAll: () => set(initialState),
      
      loadDemoData: () => {
        // Import and load demo data
        import('../services/demoData').then(({ loadDemoDataToStore }) => {
          loadDemoDataToStore(get());
        });
      }
    }),
    {
      name: 'ai-study-planner-storage',
      version: 1
    }
  )
);
