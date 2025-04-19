
import { RoadmapData } from './index';

export interface DashboardStatsProps {
  roadmapData: RoadmapData;
  careerPath: any; // TODO: Create proper type for careerPath
}

export interface PrimaryRoadmapCardProps {
  primaryRoadmap: any;
  categoryData: any;
  careerPath: any;
  roadmapData: RoadmapData;
}

export interface LoadingStateProps {
  message?: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionLink: string;
}
