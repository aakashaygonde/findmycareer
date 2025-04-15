
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Using a rule-based approach with predefined responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], stage = 1 } = await req.json();
    console.log('Received message:', message);
    console.log('Current assessment stage:', stage);

    // Using a rule-based approach instead of an external AI API
    const response = generateResponse(message, stage);
    
    // Determine if we should advance to the next assessment stage
    let nextStage = stage;
    if (stage < 5 && conversationHistory.length >= stage * 2) {
      nextStage = stage + 1;
    }

    // Special case for skip to recommendations
    if (message.toLowerCase().includes('skip') && stage < 4) {
      nextStage = 4;
    }

    // Add career roadmap if we're in the later stages (4-5)
    let careerRoadmap = null;
    if (stage >= 4) {
      const roadmapType = determineRoadmapType(message);
      careerRoadmap = generateCareerRoadmap(roadmapType);
    }

    const responseData = { 
      message: response.message,
      options: response.options,
      nextStage: nextStage,
      careerRoadmap: careerRoadmap
    };
    
    console.log('Sending response:', JSON.stringify(responseData).slice(0, 200) + '...');

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in career-advisor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "I'm having technical difficulties. Please try again with a different question.",
      options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"],
      nextStage: null
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to determine roadmap type based on message content
function determineRoadmapType(messageContent: string): string {
  const content = messageContent.toLowerCase();
  
  if (content.includes('software') || 
      content.includes('programming') || 
      content.includes('tech') || 
      content.includes('web development') || 
      content.includes('javascript') || 
      content.includes('code') || 
      content.includes('developer')) {
    return 'software';
  } 
  else if (content.includes('design') || 
          content.includes('art') || 
          content.includes('creative') || 
          content.includes('visual') || 
          content.includes('ux/ui') || 
          content.includes('graphics') ||
          content.includes('media')) {
    return 'design';
  }
  else if (content.includes('data') ||
          content.includes('analyst') ||
          content.includes('analytics') ||
          content.includes('statistics') ||
          content.includes('research')) {
    return 'data';
  }
  
  return 'general';
}

// Helper function to convert USD to INR and format with Indian numbering system
function convertToRupees(usdAmount: number): string {
  // Using an approximate conversion rate (1 USD = 83 INR)
  const exchangeRate = 83;
  const inrAmount = Math.round(usdAmount * exchangeRate);
  
  // Format with the Indian numbering system
  return formatIndianRupees(inrAmount);
}

// Helper function to format numbers in the Indian numbering system
function formatIndianRupees(amount: number): string {
  // Convert to string and split into array
  const numStr = amount.toString();
  
  if (numStr.length <= 3) {
    return '₹' + numStr;
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
  
  return '₹' + result;
}

// Function to generate responses without relying on external AI
function generateResponse(userMessage: string, stage: number) {
  let response = "";
  let options: string[] = [];
  
  // Stage-specific responses
  switch(stage) {
    case 1: // Exploration stage
      response = "Thanks for sharing! To help identify potential career paths, could you tell me more about the activities or subjects that you find most engaging? What kinds of tasks make you lose track of time?";
      options = ["I enjoy problem-solving activities", "I prefer creative work", "I like working with people"];
      break;
      
    case 2: // Skills evaluation
      response = "Let's talk about your skills. Everyone has natural talents and learned abilities. What would you say are your strongest skills? These could be technical skills, people skills, or any abilities you've developed.";
      options = ["I'm good at technical/analytical tasks", "My strengths are in communication", "I excel at organizing and planning"];
      break;
      
    case 3: // Values clarification
      response = "Understanding your values is crucial for career satisfaction. Think about what matters most to you in a work setting. Is it autonomy, teamwork, continuous learning, stability, or something else?";
      options = ["I value autonomy and independence", "I prefer collaborative environments", "Learning and growth opportunities are essential"];
      break;
      
    case 4: // Career recommendations
      response = "Based on our conversation, here are some careers that might align with your interests and skills:\n\n" +
        "1. **Software Developer**\n   - Description: Build applications and systems using programming languages\n   - Education: Computer Science degree or coding bootcamp\n   - Skills: Programming, problem-solving, teamwork\n   - Salary Range: " + convertToRupees(70000) + " - " + convertToRupees(120000) + " per year\n\n" +
        "2. **Data Analyst**\n   - Description: Analyze data to help businesses make decisions\n   - Education: Statistics, mathematics, or related field\n   - Skills: Statistical analysis, data visualization, SQL\n   - Salary Range: " + convertToRupees(60000) + " - " + convertToRupees(100000) + " per year\n\n" +
        "3. **UX/UI Designer**\n   - Description: Design user interfaces for websites and applications\n   - Education: Design degree or UX certification\n   - Skills: Design tools, user research, wireframing\n   - Salary Range: " + convertToRupees(65000) + " - " + convertToRupees(110000) + " per year\n\n" +
        "Which of these paths interests you most?";
      options = ["Tell me more about software development", "How do I start in data analysis?", "What skills do UX designers need?"];
      break;
      
    case 5: // Roadmap creation
      response = "Here's a general career roadmap:\n\n" +
        "**Short-term (3-6 months):**\n" +
        "- Identify specific skills needed for your chosen field\n" +
        "- Take foundational online courses in those areas\n" +
        "- Build a professional online presence (LinkedIn)\n\n" +
        "**Medium-term (6 months - 2 years):**\n" +
        "- Pursue further education or certification if needed\n" +
        "- Gain practical experience through internships or projects\n" +
        "- Build your professional network\n\n" +
        "**Long-term (2+ years):**\n" +
        "- Identify specialization opportunities\n" +
        "- Seek mentorship in your field\n" +
        "- Look for advancement opportunities\n\n" +
        "Remember that careers rarely follow a straight line - be open to opportunities as they arise.";
      options = ["How do I find mentors?", "What networking strategies work best?", "How important are certifications?"];
      break;
      
    default:
      response = "I'm here to help you explore career options. Could you tell me about your interests, skills, or what you're looking for in a career?";
      options = ["I want to explore careers based on my interests", "I'd like to know what careers match my skills", "I'm not sure where to start"];
  }
  
  return { message: response, options: options };
}

// Helper function to generate a career roadmap
function generateCareerRoadmap(careerPath: string): any {
  const roadmaps = {
    software: {
      shortTerm: [
        { title: "Learn Programming Fundamentals", description: "Master a language like Python or JavaScript" },
        { title: "Build Small Projects", description: "Create portfolio projects to demonstrate skills" },
        { title: "Take Online Courses", description: "Complete courses on platforms like Coursera or Udemy" }
      ],
      mediumTerm: [
        { title: "Contribute to Open Source", description: "Gain experience working on real-world projects" },
        { title: "Internship or Entry-Level Position", description: "Gain professional experience" },
        { title: "Learn Specialized Technologies", description: "Focus on in-demand frameworks and tools" }
      ],
      longTerm: [
        { title: "Pursue Advanced Roles", description: "Move into senior developer or specialized positions" },
        { title: "Consider Leadership Paths", description: "Explore technical lead or management roles" },
        { title: "Continuous Learning", description: "Stay updated with industry trends and technologies" }
      ],
      resources: [
        { id: "1", title: "freeCodeCamp", type: "course", url: "https://www.freecodecamp.org/", provider: "freeCodeCamp" },
        { id: "2", title: "The Odin Project", type: "course", url: "https://www.theodinproject.com/", provider: "The Odin Project" },
        { id: "3", title: "GitHub", type: "tool", url: "https://github.com/", provider: "GitHub" }
      ]
    },
    design: {
      shortTerm: [
        { title: "Learn Design Fundamentals", description: "Master basics of visual design and UX principles" },
        { title: "Create Portfolio Projects", description: "Build mock designs to showcase your skills" },
        { title: "Learn Industry Software", description: "Master tools like Figma, Adobe XD, or Sketch" }
      ],
      mediumTerm: [
        { title: "Get Feedback on Work", description: "Join communities like Dribbble and Behance" },
        { title: "Freelance Projects", description: "Build real-world experience with small clients" },
        { title: "Develop Specialized Skills", description: "Focus on areas like UI animation or design systems" }
      ],
      longTerm: [
        { title: "Find Full-time Position", description: "Apply to agencies or in-house design teams" },
        { title: "Build Your Brand", description: "Develop your personal style and reputation" },
        { title: "Explore Leadership", description: "Consider paths like Design Director or UX Lead" }
      ],
      resources: [
        { id: "1", title: "Figma Tutorials", type: "course", url: "https://www.figma.com/resources/learn-design/", provider: "Figma" },
        { id: "2", title: "Dribbble", type: "tool", url: "https://dribbble.com/", provider: "Dribbble" },
        { id: "3", title: "UX Design Institute", type: "course", url: "https://www.uxdesigninstitute.com/", provider: "UX Design Institute" }
      ]
    },
    data: {
      shortTerm: [
        { title: "Learn Data Analysis Tools", description: "Master Excel, SQL, and basic Python" },
        { title: "Practice with Public Datasets", description: "Create portfolio projects with Kaggle datasets" },
        { title: "Take Foundational Courses", description: "Learn statistics and data visualization" }
      ],
      mediumTerm: [
        { title: "Learn Advanced Methods", description: "Study machine learning and advanced analytics" },
        { title: "Build End-to-End Projects", description: "Create full data analysis projects with insights" },
        { title: "Gain Practical Experience", description: "Through internships or freelance work" }
      ],
      longTerm: [
        { title: "Specialize Your Skills", description: "Focus on areas like ML, NLP, or business intelligence" },
        { title: "Consider Advanced Degree", description: "Pursue Masters in Data Science if needed" },
        { title: "Leadership Opportunities", description: "Move toward Data Science Manager roles" }
      ],
      resources: [
        { id: "1", title: "Kaggle", type: "tool", url: "https://www.kaggle.com/", provider: "Kaggle" },
        { id: "2", title: "DataCamp", type: "course", url: "https://www.datacamp.com/", provider: "DataCamp" },
        { id: "3", title: "Towards Data Science", type: "article", url: "https://towardsdatascience.com/", provider: "Medium" }
      ]
    },
    general: {
      shortTerm: [
        { title: "Self-Assessment", description: "Identify your strengths, interests, and values" },
        { title: "Explore Options", description: "Research various career paths" },
        { title: "Skill Development", description: "Begin building relevant skills" }
      ],
      mediumTerm: [
        { title: "Education or Training", description: "Pursue necessary qualifications" },
        { title: "Entry-Level Experience", description: "Gain professional experience" },
        { title: "Build Professional Network", description: "Connect with industry professionals" }
      ],
      longTerm: [
        { title: "Career Advancement", description: "Move into more senior positions" },
        { title: "Specialization", description: "Develop expertise in specific areas" },
        { title: "Consider Leadership", description: "Explore management or entrepreneurial paths" }
      ],
      resources: [
        { id: "1", title: "LinkedIn Learning", type: "course", url: "https://www.linkedin.com/learning/", provider: "LinkedIn" },
        { id: "2", title: "Indeed Career Guide", type: "article", url: "https://www.indeed.com/career-advice", provider: "Indeed" },
        { id: "3", title: "O*NET OnLine", type: "tool", url: "https://www.onetonline.org/", provider: "U.S. Department of Labor" }
      ]
    }
  };
  
  return roadmaps[careerPath] || roadmaps.general;
}
