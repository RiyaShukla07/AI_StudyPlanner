import { addDays } from 'date-fns';
import {
  StudentProfile,
  Subject,
  EngineeringBranch,
  TimePreference,
  SubjectImportance,
  CognitiveLoad
} from '../types';
import { scheduleGenerator } from './scheduleGenerator';

export function generateDemoData() {
  const now = new Date();
  const targetDate = addDays(now, 14); // 2 weeks from now
  
  // Demo Student Profile
  const demoStudent: StudentProfile = {
    id: 'demo-student-1',
    name: 'Aman Kumar',
    college: 'XYZ Institute of Technology',
    branch: EngineeringBranch.CSE,
    graduationYear: 2026,
    email: 'aman@example.com',
    studyAvailability: {
      weekdayHours: 3,
      weekendHours: 6
    },
    preferredStudyTime: TimePreference.NIGHT,
    targetCompletionDate: targetDate,
    createdAt: now,
    updatedAt: now
  };
  
  // Demo Subjects
  const demoSubjects: Subject[] = [
    {
      id: 'subject-ds',
      name: 'Data Structures',
      credits: 4,
      topics: [
        {
          id: 'topic-ds-arrays',
          subjectId: 'subject-ds',
          name: 'Arrays',
          cognitiveLoad: CognitiveLoad.LOW,
          prerequisites: [],
          estimatedHours: 3,
          completedHours: 0,
          confidenceLevel: 4,
          isWeak: false
        },
        {
          id: 'topic-ds-linked-lists',
          subjectId: 'subject-ds',
          name: 'Linked Lists',
          cognitiveLoad: CognitiveLoad.MEDIUM,
          prerequisites: ['topic-ds-arrays'],
          estimatedHours: 4,
          completedHours: 0,
          confidenceLevel: 4,
          isWeak: false
        },
        {
          id: 'topic-ds-trees',
          subjectId: 'subject-ds',
          name: 'Trees',
          cognitiveLoad: CognitiveLoad.HIGH,
          prerequisites: ['topic-ds-linked-lists'],
          estimatedHours: 6,
          completedHours: 0,
          confidenceLevel: 2,
          isWeak: true
        },
        {
          id: 'topic-ds-graphs',
          subjectId: 'subject-ds',
          name: 'Graphs',
          cognitiveLoad: CognitiveLoad.HIGH,
          prerequisites: ['topic-ds-trees'],
          estimatedHours: 7,
          completedHours: 0,
          confidenceLevel: 2,
          isWeak: true
        }
      ],
      strongAreas: ['Arrays', 'Linked Lists'],
      weakAreas: ['Trees', 'Graphs'],
      confidenceLevel: 3,
      importance: SubjectImportance.HIGH,
      isInterestSubject: false,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'subject-os',
      name: 'Operating Systems',
      credits: 3,
      topics: [
        {
          id: 'topic-os-processes',
          subjectId: 'subject-os',
          name: 'Processes',
          cognitiveLoad: CognitiveLoad.MEDIUM,
          prerequisites: [],
          estimatedHours: 4,
          completedHours: 0,
          confidenceLevel: 3,
          isWeak: false
        },
        {
          id: 'topic-os-threads',
          subjectId: 'subject-os',
          name: 'Threads',
          cognitiveLoad: CognitiveLoad.MEDIUM,
          prerequisites: ['topic-os-processes'],
          estimatedHours: 4,
          completedHours: 0,
          confidenceLevel: 3,
          isWeak: false
        },
        {
          id: 'topic-os-deadlocks',
          subjectId: 'subject-os',
          name: 'Deadlocks',
          cognitiveLoad: CognitiveLoad.HIGH,
          prerequisites: ['topic-os-threads'],
          estimatedHours: 5,
          completedHours: 0,
          confidenceLevel: 1,
          isWeak: true
        },
        {
          id: 'topic-os-memory',
          subjectId: 'subject-os',
          name: 'Memory Management',
          cognitiveLoad: CognitiveLoad.HIGH,
          prerequisites: ['topic-os-processes'],
          estimatedHours: 6,
          completedHours: 0,
          confidenceLevel: 2,
          isWeak: true
        }
      ],
      strongAreas: ['Processes', 'Threads'],
      weakAreas: ['Deadlocks', 'Memory Management'],
      confidenceLevel: 2,
      importance: SubjectImportance.CRITICAL,
      isInterestSubject: false,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'subject-math',
      name: 'Engineering Mathematics',
      credits: 4,
      topics: [
        {
          id: 'topic-math-diff-eq',
          subjectId: 'subject-math',
          name: 'Differential Equations',
          cognitiveLoad: CognitiveLoad.MEDIUM,
          prerequisites: [],
          estimatedHours: 5,
          completedHours: 0,
          confidenceLevel: 4,
          isWeak: false
        },
        {
          id: 'topic-math-laplace',
          subjectId: 'subject-math',
          name: 'Laplace Transform',
          cognitiveLoad: CognitiveLoad.HIGH,
          prerequisites: ['topic-math-diff-eq'],
          estimatedHours: 6,
          completedHours: 0,
          confidenceLevel: 2,
          isWeak: true
        },
        {
          id: 'topic-math-fourier',
          subjectId: 'subject-math',
          name: 'Fourier Series',
          cognitiveLoad: CognitiveLoad.HIGH,
          prerequisites: ['topic-math-diff-eq'],
          estimatedHours: 6,
          completedHours: 0,
          confidenceLevel: 3,
          isWeak: false
        }
      ],
      strongAreas: ['Differential Equations'],
      weakAreas: ['Laplace Transform'],
      confidenceLevel: 3,
      importance: SubjectImportance.MEDIUM,
      isInterestSubject: false,
      createdAt: now,
      updatedAt: now
    }
  ];
  
  // Generate schedule
  const schedule = scheduleGenerator.generateSchedule(
    demoStudent,
    demoSubjects,
    now
  );
  
  return {
    student: demoStudent,
    subjects: demoSubjects,
    schedule
  };
}

export function loadDemoDataToStore(store: any) {
  const { student, subjects, schedule } = generateDemoData();
  
  // Clear existing data
  store.clearAll();
  
  // Load demo data
  store.setStudent(student);
  subjects.forEach(subject => store.addSubject(subject));
  store.setSchedule(schedule);
  
  console.log('Demo data loaded successfully!');
}
