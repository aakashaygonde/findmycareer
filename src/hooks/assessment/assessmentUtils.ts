
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

// Helper function to get salary ranges in INR for common careers
export const getCareerSalaryRangesINR = (career: string): { min: number, max: number } => {
  const salaryRanges: Record<string, { min: number, max: number }> = {
    // Technology
    'Full-Stack Developer': { min: 600000, max: 2000000 },
    'Frontend Developer': { min: 500000, max: 1500000 },
    'Backend Developer': { min: 550000, max: 1800000 },
    'Mobile App Developer': { min: 550000, max: 1600000 },
    'Software Development': { min: 550000, max: 1800000 },
    'DevOps Engineer': { min: 800000, max: 2500000 },
    'Data Scientist': { min: 800000, max: 2200000 },
    'Machine Learning Engineer': { min: 900000, max: 2500000 },
    'AI Engineer': { min: 1000000, max: 2800000 },
    'Cybersecurity Analyst': { min: 700000, max: 2000000 },
    'Cloud Architect': { min: 1200000, max: 3000000 },
    'Database Administrator': { min: 600000, max: 1500000 },
    
    // Creative
    'UX/UI Designer': { min: 500000, max: 1800000 },
    'Graphic Design': { min: 350000, max: 1200000 },
    'Content Creation': { min: 400000, max: 1000000 },
    'Digital Marketing': { min: 450000, max: 1500000 },
    'Animation': { min: 400000, max: 1500000 },
    'Game Design': { min: 500000, max: 1800000 },
    'Film Production': { min: 400000, max: 1500000 },
    'Photography': { min: 300000, max: 1200000 },
    
    // Business
    'Product Manager': { min: 1000000, max: 2500000 },
    'Project Management': { min: 800000, max: 2000000 },
    'Marketing': { min: 500000, max: 1500000 },
    'Finance': { min: 600000, max: 2000000 },
    'Human Resources': { min: 450000, max: 1500000 },
    'Entrepreneurship': { min: 0, max: 5000000 }, // Highly variable
    'Supply Chain Management': { min: 600000, max: 1800000 },
    
    // Science
    'Research Scientist': { min: 500000, max: 1500000 },
    'Biotechnology': { min: 500000, max: 1800000 },
    'Environmental Science': { min: 400000, max: 1200000 },
    'Materials Science': { min: 450000, max: 1400000 },
    'Astronomy': { min: 450000, max: 1300000 },
    'Neuroscience': { min: 500000, max: 1500000 },
    
    // Healthcare
    'Nursing': { min: 350000, max: 900000 },
    'Physical Therapy': { min: 400000, max: 1200000 },
    'Healthcare Administration': { min: 600000, max: 1800000 },
    'Mental Health Counseling': { min: 400000, max: 1000000 },
    'Public Health': { min: 450000, max: 1200000 },
    'Medical Laboratory Science': { min: 400000, max: 1100000 },
    
    // Education
    'Teaching': { min: 300000, max: 900000 },
    'Educational Leadership': { min: 600000, max: 1500000 },
    'Educational Technology': { min: 500000, max: 1500000 },
    'Special Education': { min: 350000, max: 900000 },
    
    // Social Services
    'Social Work': { min: 300000, max: 800000 },
    'Nonprofit Management': { min: 500000, max: 1500000 },
    'Community Development': { min: 400000, max: 1000000 },
    'Human Services': { min: 350000, max: 900000 },
    
    // Default fallback
    'default': { min: 400000, max: 1500000 }
  };
  
  return salaryRanges[career] || salaryRanges.default;
};

// Helper function to get salary range in rupees with proper formatting
export const getCareerSalaryInRupees = (career: string): string => {
  const inrSalary = getCareerSalaryRangesINR(career);
  return `₹${formatIndianNumber(inrSalary.min)} - ₹${formatIndianNumber(inrSalary.max)}`;
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
