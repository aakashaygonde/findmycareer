
import { ChatMessage } from '@/types';

export interface AdvisorResponse {
  message: string;
  options?: string[];
  advanceStage?: boolean;
}

export interface CareerPath {
  name: string;
  description: string;
  skills: string[];
  education: string[];
}

export interface CategoryData {
  paths: CareerPath[];
  questions: string[];
}

export interface CareerAdviceData {
  [key: string]: CategoryData;
}
