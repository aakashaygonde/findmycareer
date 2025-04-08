
import { ChatMessage } from '@/types';

// Helper function to parse dates from storage
export const parseStoredMessages = (messages: any[]): ChatMessage[] => {
  return messages.map(msg => ({
    ...msg,
    timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp
  }));
};

// Helper function to get description for each assessment stage
export const getStageDescription = (stage: number): string => {
  switch (stage) {
    case 1:
      return "Exploration - Understanding your interests and passions";
    case 2:
      return "Skills Evaluation - Identifying your strengths and abilities";
    case 3:
      return "Values Clarification - Understanding what matters to you";
    case 4:
      return "Career Recommendations - Suggesting specific career paths";
    case 5:
      return "Roadmap Creation - Building your personalized career plan";
    default:
      return "Moving to the next stage of your career assessment";
  }
};

// Helper function to determine roadmap type based on message content
export const determineRoadmapType = (messageContent: string): string => {
  const content = messageContent.toLowerCase();
  
  if (content.includes('software') || 
      content.includes('programming') || 
      content.includes('tech')) {
    return 'technology';
  } else if (content.includes('design') || 
            content.includes('art') || 
            content.includes('creative')) {
    return 'creative';
  }
  
  return 'general';
};
