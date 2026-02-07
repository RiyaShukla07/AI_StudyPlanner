import { addDays, differenceInDays, isWeekend } from 'date-fns';
import {
  StudentProfile,
  Subject,
  Topic,
  Schedule,
  StudySession,
  SessionType,
  SessionStatus,
  CognitiveLoad,
  TimePreference
} from '../types';

export class ScheduleGenerator {
  generateSchedule(
    student: StudentProfile,
    subjects: Subject[],
    startDate: Date = new Date()
  ): Schedule {
    // Step 1: Calculate total available hours
    const totalHours = this.calculateAvailableHours(
      student,
      startDate,
      student.targetCompletionDate
    );
    
    // Step 2: Get all topics in prerequisite order
    const orderedTopics = this.orderTopicsByPrerequisites(subjects);
    
    // Step 3: Calculate priority scores
    const prioritizedTopics = this.calculatePriorities(
      orderedTopics,
      subjects
    );
    
    // Step 4: Allocate time
    const timeAllocations = this.allocateTime(
      prioritizedTopics,
      totalHours,
      subjects
    );
    
    // Step 5: Generate sessions
    const sessions = this.generateSessions(
      timeAllocations,
      student,
      startDate,
      subjects
    );
    
    return {
      id: this.generateId(),
      studentId: student.id,
      sessions,
      generatedAt: new Date(),
      lastUpdatedAt: new Date(),
      version: 1
    };
  }
  
  private calculateAvailableHours(
    student: StudentProfile,
    startDate: Date,
    endDate: Date
  ): number {
    const days = differenceInDays(endDate, startDate);
    let totalHours = 0;
    
    for (let i = 0; i <= days; i++) {
      const currentDay = addDays(startDate, i);
      totalHours += isWeekend(currentDay)
        ? student.studyAvailability.weekendHours
        : student.studyAvailability.weekdayHours;
    }
    
    return totalHours;
  }
  
  private orderTopicsByPrerequisites(subjects: Subject[]): Topic[] {
    const allTopics: Topic[] = [];
    subjects.forEach(subject => {
      allTopics.push(...subject.topics);
    });
    
    // Simple topological sort
    const sorted: Topic[] = [];
    const visited = new Set<string>();
    
    const visit = (topic: Topic) => {
      if (visited.has(topic.id)) return;
      
      // Visit prerequisites first
      topic.prerequisites.forEach(prereqId => {
        const prereq = allTopics.find(t => t.id === prereqId);
        if (prereq) visit(prereq);
      });
      
      visited.add(topic.id);
      sorted.push(topic);
    };
    
    allTopics.forEach(topic => visit(topic));
    return sorted;
  }
  
  private calculatePriorities(
    topics: Topic[],
    subjects: Subject[]
  ): Array<{ topic: Topic; subject: Subject; priority: number }> {
    return topics.map(topic => {
      const subject = subjects.find(s => s.id === topic.subjectId)!;
      
      // Confidence factor (lower confidence = higher priority)
      const confidenceFactor = (6 - topic.confidenceLevel) / 5;
      
      // Importance weight
      const importanceWeight = this.getImportanceWeight(subject.importance);
      
      // Cognitive load factor
      const cognitiveLoadFactor = this.getCognitiveLoadFactor(topic.cognitiveLoad);
      
      // Weak topic boost
      const weakBoost = topic.isWeak ? 1.5 : 1.0;
      
      const priority = confidenceFactor * importanceWeight * cognitiveLoadFactor * weakBoost;
      
      return { topic, subject, priority };
    }).sort((a, b) => b.priority - a.priority);
  }
  
  private getImportanceWeight(importance: string): number {
    const weights: Record<string, number> = {
      low: 0.7,
      medium: 1.0,
      high: 1.3,
      critical: 1.6
    };
    return weights[importance] || 1.0;
  }
  
  private getCognitiveLoadFactor(load: CognitiveLoad): number {
    const factors: Record<CognitiveLoad, number> = {
      [CognitiveLoad.LOW]: 0.8,
      [CognitiveLoad.MEDIUM]: 1.0,
      [CognitiveLoad.HIGH]: 1.3
    };
    return factors[load];
  }
  
  private allocateTime(
    prioritizedTopics: Array<{ topic: Topic; subject: Subject; priority: number }>,
    totalHours: number,
    subjects: Subject[]
  ): Map<string, number> {
    const allocations = new Map<string, number>();
    const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
    
    console.log('Allocating time for', prioritizedTopics.length, 'topics');
    console.log('Total available hours:', totalHours);
    
    prioritizedTopics.forEach(({ topic, subject }) => {
      // Base allocation from credits
      const creditShare = (subject.credits / totalCredits) * totalHours;
      
      // Adjust for confidence
      const confidenceMultiplier = (6 - topic.confidenceLevel) / 5;
      
      // Adjust for cognitive load
      const loadMultiplier = this.getCognitiveLoadFactor(topic.cognitiveLoad);
      
      const allocatedHours = creditShare * confidenceMultiplier * loadMultiplier * 0.8; // 80% for buffer
      const finalHours = Math.max(1, allocatedHours); // Minimum 1 hour
      allocations.set(topic.id, finalHours);
      
      console.log(`Topic "${topic.name}": ${finalHours.toFixed(2)} hours allocated`);
    });
    
    return allocations;
  }
  
  private generateSessions(
    timeAllocations: Map<string, number>,
    student: StudentProfile,
    startDate: Date,
    subjects: Subject[] = []
  ): StudySession[] {
    const sessions: StudySession[] = [];
    // Ensure we start from today at midnight for consistent date comparison
    let currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);
    const endDate = new Date(student.targetCompletionDate);
    
    console.log('Generating sessions for', timeAllocations.size, 'topics');
    console.log('Start date:', currentDate.toDateString());
    
    // Create a map for faster topic lookup
    const topicMap = new Map<string, { topic: Topic; subjectId: string }>();
    for (const subject of subjects) {
      for (const topic of subject.topics) {
        topicMap.set(topic.id, { topic, subjectId: subject.id });
      }
    }
    
    const topicQueue: Array<{ topicId: string; subjectId: string; remainingHours: number; cognitiveLoad: CognitiveLoad }> = [];
    timeAllocations.forEach((hours, topicId) => {
      const topicData = topicMap.get(topicId);
      if (topicData) {
        topicQueue.push({ 
          topicId, 
          subjectId: topicData.subjectId,
          remainingHours: hours,
          cognitiveLoad: topicData.topic.cognitiveLoad
        });
        console.log(`Added to queue: ${topicData.topic.name} (${hours.toFixed(2)} hours)`);
      }
    });
    
    console.log('Topic queue size:', topicQueue.length);
    
    // Limit iterations to prevent infinite loops
    let maxIterations = 365; // Max 1 year
    let iterations = 0;
    
    while (topicQueue.length > 0 && currentDate <= endDate && iterations < maxIterations) {
      iterations++;
      
      const dailyHours = isWeekend(currentDate)
        ? student.studyAvailability.weekendHours
        : student.studyAvailability.weekdayHours;
      
      let hoursScheduledToday = 0;
      
      while (hoursScheduledToday < dailyHours && topicQueue.length > 0) {
        const current = topicQueue[0];
        const sessionDuration = Math.min(
          60, // Max 60 minutes per session
          (dailyHours - hoursScheduledToday) * 60,
          current.remainingHours * 60
        );
        
        if (sessionDuration < 30) break; // Don't create sessions shorter than 30 min
        
        const timeSlot = this.getTimeSlot(
          hoursScheduledToday,
          student.preferredStudyTime
        );
        
        sessions.push({
          id: this.generateId(),
          topicId: current.topicId,
          subjectId: current.subjectId,
          scheduledDate: new Date(currentDate),
          startTime: timeSlot,
          duration: sessionDuration,
          sessionType: SessionType.LEARNING,
          cognitiveLoad: current.cognitiveLoad,
          status: SessionStatus.SCHEDULED
        });
        
        hoursScheduledToday += sessionDuration / 60;
        current.remainingHours -= sessionDuration / 60;
        
        if (current.remainingHours <= 0) {
          topicQueue.shift();
        }
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return sessions;
  }
  
  private getTimeSlot(hoursIntoDay: number, preference: TimePreference): string {
    const baseHour = this.getPreferredStartHour(preference);
    const hour = baseHour + Math.floor(hoursIntoDay);
    return `${hour.toString().padStart(2, '0')}:00`;
  }
  
  private getPreferredStartHour(preference: TimePreference): number {
    const hours: Record<TimePreference, number> = {
      [TimePreference.MORNING]: 8,
      [TimePreference.AFTERNOON]: 14,
      [TimePreference.EVENING]: 18,
      [TimePreference.NIGHT]: 21
    };
    return hours[preference];
  }
  
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const scheduleGenerator = new ScheduleGenerator();
