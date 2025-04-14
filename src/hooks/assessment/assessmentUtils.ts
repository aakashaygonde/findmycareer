
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
      content.includes('tech') || 
      content.includes('web development') || 
      content.includes('javascript') || 
      content.includes('code') || 
      content.includes('developer')) {
    return 'technology';
  } 
  else if (content.includes('design') || 
          content.includes('art') || 
          content.includes('creative') || 
          content.includes('visual') || 
          content.includes('ux/ui') || 
          content.includes('graphics') ||
          content.includes('media')) {
    return 'creative';
  }
  else if (content.includes('data') ||
          content.includes('analyst') ||
          content.includes('analytics') ||
          content.includes('statistics') ||
          content.includes('research')) {
    return 'data';
  }
  
  return 'general';
};

// Helper function to format Indian number system (e.g., 1,00,000)
export const formatIndianNumber = (amount: number): string => {
  const numStr = amount.toString();
  
  if (numStr.length <= 3) {
    return numStr;
  }
  
  // Handle the last 3 digits
  let result = numStr.slice(-3);
  let remaining = numStr.slice(0, -3);
  
  // Add the rest of the digits in groups of 2
  while (remaining.length > 0) {
    const segment = remaining.slice(-2);
    result = segment + "," + result;
    remaining = remaining.slice(0, -2);
    
    // If there's only one digit left, add it
    if (remaining.length === 1) {
      result = remaining + "," + result;
      break;
    }
  }
  
  return result;
};

// Helper function to convert USD salary to INR (Rupees)
export const convertToRupees = (usdMin: number, usdMax: number): { min: string, max: string } => {
  // Using an approximate conversion rate (1 USD = 83 INR)
  const exchangeRate = 83;
  
  const inrMin = Math.round(usdMin * exchangeRate);
  const inrMax = Math.round(usdMax * exchangeRate);
  
  return {
    min: '₹' + formatIndianNumber(inrMin),
    max: '₹' + formatIndianNumber(inrMax)
  };
};

// Helper function to get USD salary ranges for common tech roles
export const getCareerSalaryUSD = (career: string): { min: number, max: number } => {
  const salaryRanges: Record<string, { min: number, max: number }> = {
    'Full-Stack Developer': { min: 75000, max: 120000 },
    'Data Scientist': { min: 90000, max: 140000 },
    'UX/UI Designer': { min: 65000, max: 110000 },
    'DevOps Engineer': { min: 85000, max: 130000 },
    'Cybersecurity Analyst': { min: 80000, max: 125000 },
    'Product Manager': { min: 85000, max: 140000 },
    'Mobile App Developer': { min: 70000, max: 115000 },
    'Cloud Architect': { min: 110000, max: 160000 },
    'AI Engineer': { min: 95000, max: 150000 },
    'Digital Marketer': { min: 60000, max: 100000 },
    // Default fallback
    'default': { min: 60000, max: 100000 }
  };
  
  return salaryRanges[career] || salaryRanges.default;
};

// Helper function to get salary range in rupees with proper formatting
export const getCareerSalaryInRupees = (career: string): string => {
  const usdSalary = getCareerSalaryUSD(career);
  const inrSalary = convertToRupees(usdSalary.min, usdSalary.max);
  
  return `${inrSalary.min} - ${inrSalary.max}`;
};
