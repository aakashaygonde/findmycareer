
export interface Career {
  id: string;
  title: string;
  description: string;
  requiredSkills: Skill[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  growth: string; // e.g., "High", "Medium", "Low"
  educationLevel: string;
  jobCount: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0-100 proficiency
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  skills: Skill[];
  interests: string[];
  education: {
    level: string;
    field: string;
  };
  careerGoals: string[];
  savedCareers: Career[];
  completedMilestones: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
  options?: string[];
  stageWhenSent?: number;
}

export interface CareerRoadmap {
  shortTerm: RoadmapItem[];
  mediumTerm: RoadmapItem[];
  longTerm: RoadmapItem[];
  resources: Resource[];
}

export interface RoadmapItem {
  title: string;
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'tutorial' | 'job' | 'article' | 'tool';
  url: string;
  provider: string;
  duration?: string;
  cost?: {
    amount: number;
    currency: string;
  };
}

export interface AssessmentResult {
  recommendedCareers: Career[];
  skillGap: {
    existing: Skill[];
    needed: Skill[];
  };
  roadmap: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'project' | 'certification' | 'education';
  timeframe: 'short' | 'medium' | 'long';
  completed: boolean;
  resources?: Resource[];
}
