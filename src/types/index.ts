
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

export interface UserRoadmap {
  id: string;
  user_id: string;
  career_name: string;
  category: string;
  roadmap_key: string;
  is_primary: boolean | null;
  created_at: string;
}

export interface RoadmapData {
  salaryTrend: string;
  timeline: {
    entryLevel: string;
    midLevel: string;
    seniorLevel: string;
  };
  beginner: {
    skills: Array<{ name: string; description: string }>;
    resources: Array<{ name: string; description: string }>;
    projects: Array<{ name: string; description: string }>;
    outcomes: string;
  };
  intermediate: {
    skills: Array<{ name: string; description: string }>;
    certifications: Array<{ name: string; description: string }>;
    milestones: Array<{ name: string; description: string }>;
    outcomes: string;
  };
  advanced: {
    specializations: Array<{ name: string; description: string }>;
    leadership: Array<{ title: string; description: string }>;
    industryImpact: string;
  };
  indianMarket: {
    topCompanies: string[];
    regions: string[];
    salaryByExperience: {
      entrySalary: string;
      midSalary: string;
      seniorSalary: string;
      leadershipSalary: string;
    };
    outlook: string;
  };
  growthRate: string;
  jobOpenings: string;
}
