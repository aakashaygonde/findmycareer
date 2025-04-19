
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
  growthRate: string; // Ensure this property is explicitly defined
  jobOpenings: string; // Ensure this property is explicitly defined
}
