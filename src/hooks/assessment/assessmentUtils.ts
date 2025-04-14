
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
  
  return 'general';
};

// Helper function to convert USD salary to INR (Rupees)
export const convertToRupees = (usdMin: number, usdMax: number): { min: string, max: string } => {
  // Using an approximate conversion rate (1 USD = 83 INR)
  const exchangeRate = 83;
  
  const inrMin = Math.round(usdMin * exchangeRate);
  const inrMax = Math.round(usdMax * exchangeRate);
  
  // Format with commas for Indian number format
  const formatIndianRupees = (amount: number): string => {
    // Convert to string and split into array
    const numStr = amount.toString();
    const parts = [];
    
    // Handle the first 1-3 digits (from right)
    parts.unshift(numStr.slice(-3));
    
    // Handle the remaining digits in groups of 2
    let remaining = numStr.slice(0, -3);
    while (remaining.length > 0) {
      parts.unshift(remaining.slice(-2));
      remaining = remaining.slice(0, -2);
    }
    
    // Join with commas
    return '₹' + parts.join(',');
  };
  
  return {
    min: formatIndianRupees(inrMin),
    max: formatIndianRupees(inrMax)
  };
};
