import { ChatMessage } from '@/types';
import { AdvisorResponse } from './types';
import { careerAdvice } from './career-paths';
import { stageQuestions } from './stage-questions';
import { identifyCategory } from './keywords';

// Function to get more personalized conversation continuations
function getPersonalizedFollowUp(message: string, stage: number): string | null {
  const lowercaseMsg = message.toLowerCase();
  
  // Personalized follow-ups based on common responses
  if (stage === 1) {
    if (lowercaseMsg.includes('math') || lowercaseMsg.includes('numbers')) {
      return "That's great! Strong math skills can lead to careers in finance, data science, engineering, or actuarial science. What aspects of math do you enjoy the most?";
    }
    if (lowercaseMsg.includes('people') || lowercaseMsg.includes('helping')) {
      return "Enjoying work with people is valuable! This could lead to careers in healthcare, counseling, human resources, teaching, or customer service. What aspects of helping others do you find most fulfilling?";
    }
  }
  
  if (stage === 2) {
    if (lowercaseMsg.includes('communication') || lowercaseMsg.includes('writing')) {
      return "Strong communication skills are highly valued in many fields like marketing, public relations, journalism, and management. How do you typically use these skills in your daily life?";
    }
    if (lowercaseMsg.includes('problem') || lowercaseMsg.includes('solving')) {
      return "Problem-solving is a critical skill! It's particularly valuable in fields like engineering, research, management consulting, and technology. What kinds of problems do you enjoy solving the most?";
    }
  }
  
  if (stage === 3) {
    if (lowercaseMsg.includes('team') || lowercaseMsg.includes('collaborate')) {
      return "Teamwork is essential in many modern workplaces. Fields like project management, healthcare, and business often involve significant collaboration. What do you enjoy most about working with others?";
    }
    if (lowercaseMsg.includes('independent') || lowercaseMsg.includes('alone')) {
      return "Working independently can be very rewarding! Careers in research, writing, programming, or consulting often offer autonomy. What aspects of independent work appeal to you?";
    }
  }
  
  // If no specific pattern matches, return null to use default responses
  return null;
}

// Enhanced function to get response based on message content and assessment stage
export function getAdvisorResponse(
  message: string, 
  history: ChatMessage[], 
  stage: number
): AdvisorResponse {
  // Default response in case no specific match is found
  let response: AdvisorResponse = {
    message: "That's interesting! Could you tell me more about your interests or skills?",
    options: ["Technical skills", "Creative skills", "People skills", "Analytical skills"]
  };
  
  // Try to get a personalized follow-up based on the message
  const personalizedResponse = getPersonalizedFollowUp(message, stage);
  if (personalizedResponse) {
    response.message = personalizedResponse;
    // Keep the default options or customize based on the response
  }
  
  // Identify category based on message
  const category = identifyCategory(message);
  
  // Handle based on assessment stage
  switch (stage) {
    case 1: // Initial interest assessment
      if (category) {
        const categoryData = careerAdvice[category as keyof typeof careerAdvice];
        response = {
          message: `It sounds like you're interested in ${category === 'creativeArts' ? 'creative arts' : category}! ${stageQuestions[0][Math.floor(Math.random() * stageQuestions[0].length)]}`,
          options: categoryData.paths.slice(0, 4).map(path => path.name),
          advanceStage: true
        };
      } else {
        // General first stage question if no category identified
        response = {
          message: stageQuestions[0][Math.floor(Math.random() * stageQuestions[0].length)],
          options: ["Technology", "Creative Arts", "Business", "Science", "Healthcare", "Education", "Social Services"]
        };
      }
      break;
      
    case 2: // Skills assessment
      if (category) {
        const categoryData = careerAdvice[category as keyof typeof careerAdvice];
        response = {
          message: categoryData.questions[Math.floor(Math.random() * categoryData.questions.length)],
          options: categoryData.paths.slice(0, 4).map(path => path.name),
          advanceStage: Math.random() > 0.5 // Randomly advance stage sometimes
        };
      } else {
        // Generic skills question
        response = {
          message: stageQuestions[1][Math.floor(Math.random() * stageQuestions[1].length)],
          options: ["Problem-solving", "Communication", "Creativity", "Analysis", "Organization", "Leadership", "Technical skills"]
        };
      }
      break;
      
    case 3: // Work environment preferences
      response = {
        message: stageQuestions[2][Math.floor(Math.random() * stageQuestions[2].length)],
        options: ["Independent work", "Team collaboration", "Structured environment", "Flexible environment", "Fast-paced", "Detail-oriented", "Remote work"],
        advanceStage: true
      };
      break;
      
    case 4: // Values and priorities
      response = {
        message: stageQuestions[3][Math.floor(Math.random() * stageQuestions[3].length)],
        options: ["High income", "Work-life balance", "Making a difference", "Job stability", "Growth opportunities", "Creative freedom", "Flexible location"],
        advanceStage: true
      };
      break;
      
    case 5: // Career path recommendations
      // If we've identified a category, recommend careers from that category
      if (category) {
        const categoryData = careerAdvice[category as keyof typeof careerAdvice];
        const recommendedPath = categoryData.paths[Math.floor(Math.random() * categoryData.paths.length)];
        
        response = {
          message: `Based on your interests and preferences, I think ${recommendedPath.name} could be a great fit for you! ${recommendedPath.description}. This career typically requires skills in ${recommendedPath.skills.join(', ')}. Common education paths include ${recommendedPath.education.join(', ')}. Would you like to explore this further?`,
          options: ["Learn more about this career", "See other options", "How do I get started?", "What's the job outlook?", "Typical day in this role"]
        };
      } else {
        // Generic recommendations from multiple categories if no specific category identified
        const recommendedPaths = [
          careerAdvice.technology.paths[0],
          careerAdvice.business.paths[0],
          careerAdvice.creativeArts.paths[0],
          careerAdvice.science.paths[0],
          careerAdvice.healthcare.paths[0]
        ];
        
        response = {
          message: "Based on our conversation, I have a few career paths that might interest you. Which would you like to explore further?",
          options: recommendedPaths.map(path => `${path.name}: ${path.description.substring(0, 30)}...`)
        };
      }
      break;
      
    default:
      // For stages beyond our structured assessment, provide more detailed career guidance
      const commonQuestions = [
        "What specific aspects of this career path would you like to know more about?",
        "Are you interested in learning about the education requirements for this field?",
        "Would you like to know about entry-level positions in this field?",
        "Are you concerned about any specific challenges in pursuing this career?",
        "Would you like to discuss the long-term career growth in this field?"
      ];
      
      response = {
        message: commonQuestions[Math.floor(Math.random() * commonQuestions.length)],
        options: ["Education requirements", "Salary expectations", "Day-to-day responsibilities", "Career growth", "Industry trends", "Required certifications", "Work-life balance"]
      };
  }
  
  return response;
}
