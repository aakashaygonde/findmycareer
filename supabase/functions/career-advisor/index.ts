import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Using a free AI approach with predefined responses
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
    console.log('Conversation history:', conversationHistory);
    console.log('Current assessment stage:', stage);

    // Using a rule-based approach instead of an external AI API
    const response = generateResponse(message, conversationHistory, stage);
    
    // Determine if we should advance to the next assessment stage
    let nextStage = determineNextStage(stage, conversationHistory, message, response.message);

    // Add career roadmap if we're in the later stages (4-5)
    let careerRoadmap = null;
    if (stage >= 4) {
      careerRoadmap = generateCareerRoadmap(conversationHistory, message, response.message);
    }

    return new Response(JSON.stringify({ 
      message: response.message,
      options: response.options,
      nextStage: nextStage,
      careerRoadmap: careerRoadmap
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in career-advisor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "I'm having technical difficulties. Please try again with a different question.",
      options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"],
      nextStage: 1
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to generate responses without relying on external AI
function generateResponse(userMessage: string, conversationHistory: any[], stage: number) {
  const message = userMessage.toLowerCase();
  let response = "";
  let options: string[] = [];
  
  // Stage-specific responses
  switch(stage) {
    case 1: // Exploration stage
      if (message.includes("technology") || message.includes("tech") || message.includes("computer")) {
        response = "Technology is a fascinating field! It offers diverse career paths from software development to IT support, cybersecurity, and data analysis. What aspects of technology interest you the most? Are you drawn to creating software, analyzing data, or perhaps securing systems?";
        options = ["I enjoy coding and building software", "I'm interested in data analysis", "Cybersecurity sounds interesting"];
      } else if (message.includes("creative") || message.includes("art") || message.includes("design")) {
        response = "Creative careers can be very fulfilling! There are many paths like graphic design, UX/UI design, content creation, marketing, and more. What kind of creative activities do you enjoy the most?";
        options = ["I enjoy visual design", "I like writing and content creation", "I'm interested in digital media"];
      } else if (message.includes("people") || message.includes("help") || message.includes("teaching")) {
        response = "Careers focused on helping others can be very rewarding. This could include education, healthcare, counseling, social work, or customer service. What aspects of helping others interest you most?";
        options = ["I'm interested in healthcare", "Education appeals to me", "I enjoy providing advice and support"];
      } else {
        response = "Thanks for sharing! To help identify potential career paths, could you tell me more about the activities or subjects that you find most engaging? What kinds of tasks make you lose track of time?";
        options = ["I enjoy problem-solving activities", "I prefer creative work", "I like working with people"];
      }
      break;
      
    case 2: // Skills evaluation
      if (message.includes("coding") || message.includes("programming") || message.includes("develop")) {
        response = "Software development requires technical skills like programming languages, problem-solving, and logical thinking. It also benefits from skills like attention to detail and continuous learning. What programming languages or technical skills do you already have, if any?";
        options = ["I know some programming basics", "I'm completely new to coding", "I have experience with specific languages"];
      } else if (message.includes("data") || message.includes("analysis") || message.includes("numbers")) {
        response = "Data analysis combines technical skills like statistics and data manipulation with soft skills like critical thinking and communication. Do you have experience with any analytical tools or methods? Are you comfortable with mathematics?";
        options = ["I'm good with numbers and statistics", "I have basic spreadsheet skills", "I'm new to data analysis but eager to learn"];
      } else if (message.includes("design") || message.includes("creative") || message.includes("visual")) {
        response = "Design fields benefit from both creative and technical skills. Visual thinking, software proficiency, and understanding user needs are all valuable. What design tools or creative methods are you familiar with?";
        options = ["I have experience with design software", "I'm creative but new to digital tools", "I understand design principles"];
      } else {
        response = "Let's talk about your skills more broadly. Everyone has natural talents and learned abilities. What would you say are your strongest skills? These could be technical skills, people skills, or any abilities you've developed.";
        options = ["I'm good at technical/analytical tasks", "My strengths are in communication", "I excel at organizing and planning"];
      }
      break;
      
    case 3: // Values clarification
      if (message.includes("balance") || message.includes("flexibility") || message.includes("time")) {
        response = "Work-life balance is indeed important for long-term career satisfaction. Some careers offer more flexibility than others. Besides work-life balance, what other aspects of work do you value? Perhaps creativity, income potential, or making a difference?";
        options = ["Income potential is important to me", "I want to make a positive impact", "I value creative freedom"];
      } else if (message.includes("money") || message.includes("income") || message.includes("salary")) {
        response = "Financial stability and growth can certainly be important career factors. Different fields have varying income potentials and growth trajectories. Besides compensation, are there other aspects of work that you value highly?";
        options = ["Work environment matters to me", "I want opportunities for advancement", "I value recognition for my work"];
      } else if (message.includes("impact") || message.includes("difference") || message.includes("help")) {
        response = "Making a positive impact can be deeply fulfilling. Many careers allow you to contribute to society in different ways. How do you envision making a difference? Is it through direct service, creating products, or perhaps teaching others?";
        options = ["I want to help people directly", "I want to solve important problems", "I'm interested in sustainable practices"];
      } else {
        response = "Understanding your values is crucial for career satisfaction. Think about what matters most to you in a work setting. Is it autonomy, teamwork, continuous learning, stability, or something else? What workplace qualities would make you feel fulfilled?";
        options = ["I value autonomy and independence", "I prefer collaborative environments", "Learning and growth opportunities are essential"];
      }
      break;
      
    case 4: // Career recommendations
      // Based on previous conversation patterns, suggest careers
      let careerFocus = determineCareerFocus(conversationHistory);
      
      if (careerFocus === 'tech') {
        response = "Based on our conversation, here are some technology careers that might align with your interests and skills:\n\n" +
          "1. **Software Developer**\n   - Description: Build applications and systems using programming languages\n   - Education: Computer Science degree or coding bootcamp\n   - Skills: Programming, problem-solving, teamwork\n   - Salary Range: $70,000 - $150,000\n   - Growth: Strong job outlook with 22% growth expected\n\n" +
          "2. **Data Analyst**\n   - Description: Analyze data to help businesses make decisions\n   - Education: Statistics, mathematics, or related field\n   - Skills: Statistical analysis, data visualization, SQL\n   - Salary Range: $60,000 - $120,000\n   - Growth: Excellent prospects with increasing data-driven decision making\n\n" +
          "3. **UX/UI Designer**\n   - Description: Design user interfaces for websites and applications\n   - Education: Design degree or UX certification\n   - Skills: Design tools, user research, wireframing\n   - Salary Range: $65,000 - $130,000\n   - Growth: Growing demand as digital products proliferate\n\n" +
          "Which of these paths interests you most?";
        options = ["Tell me more about software development", "How do I start in data analysis?", "What skills do UX designers need?"];
      } else if (careerFocus === 'creative') {
        response = "Based on our conversation, here are some creative careers that might align with your interests and skills:\n\n" +
          "1. **Graphic Designer**\n   - Description: Create visual content for brands and communications\n   - Education: Design degree or certificate program\n   - Skills: Design software, visual communication, typography\n   - Salary Range: $45,000 - $90,000\n   - Growth: Steady demand across industries\n\n" +
          "2. **Content Creator/Marketing Specialist**\n   - Description: Develop content strategies and create engaging material\n   - Education: Marketing, communications, or related field\n   - Skills: Writing, social media, strategic thinking\n   - Salary Range: $50,000 - $100,000\n   - Growth: Expanding with digital marketing growth\n\n" +
          "3. **Art Director**\n   - Description: Lead creative direction for projects and campaigns\n   - Education: Design or fine arts background\n   - Skills: Advanced design, leadership, project management\n   - Salary Range: $70,000 - $150,000\n   - Growth: Competitive but stable market\n\n" +
          "Which of these paths interests you most?";
        options = ["Tell me more about graphic design", "How do I get into content marketing?", "What skills do art directors need?"];
      } else {
        response = "Based on our conversation, here are some careers that might align with your interests and skills:\n\n" +
          "1. **Project Manager**\n   - Description: Plan and oversee projects from initiation to completion\n   - Education: Business degree or PM certification\n   - Skills: Organization, leadership, communication\n   - Salary Range: $60,000 - $130,000\n   - Growth: Good prospects across many industries\n\n" +
          "2. **Human Resources Specialist**\n   - Description: Manage employee relations and organizational development\n   - Education: HR or business degree\n   - Skills: Interpersonal communication, conflict resolution\n   - Salary Range: $50,000 - $100,000\n   - Growth: Steady demand in all business sectors\n\n" +
          "3. **Healthcare Administrator**\n   - Description: Manage healthcare facilities or departments\n   - Education: Healthcare administration degree\n   - Skills: Leadership, healthcare knowledge, business acumen\n   - Salary Range: $65,000 - $120,000\n   - Growth: Excellent prospects with healthcare expansion\n\n" +
          "Which of these paths interests you most?";
        options = ["Tell me more about project management", "What's a typical day in human resources?", "How do I start in healthcare administration?"];
      }
      break;
      
    case 5: // Roadmap creation
      // Based on previous conversation patterns, create a roadmap
      let selectedCareer = determineSelectedCareer(conversationHistory);
      
      if (selectedCareer.includes("software") || selectedCareer.includes("develop") || selectedCareer.includes("programming")) {
        response = "Here's a roadmap to become a Software Developer:\n\n" +
          "**Short-term (3-6 months):**\n" +
          "- Learn fundamentals of programming through online courses (freeCodeCamp, Codecademy)\n" +
          "- Build small projects to practice your skills\n" +
          "- Join coding communities like GitHub or Stack Overflow\n\n" +
          "**Medium-term (6 months - 2 years):**\n" +
          "- Complete more advanced courses or consider a coding bootcamp\n" +
          "- Build a portfolio of projects that demonstrate your abilities\n" +
          "- Learn industry-standard tools and workflows\n" +
          "- Network with professionals in the field\n\n" +
          "**Long-term (2+ years):**\n" +
          "- Consider formal education if desired\n" +
          "- Specialize in a specific area (web, mobile, AI, etc.)\n" +
          "- Pursue senior roles or leadership positions\n\n" +
          "**Key Resources:**\n" +
          "- freeCodeCamp.org for free courses\n" +
          "- GitHub for project collaboration\n" +
          "- Stack Overflow for problem-solving\n" +
          "- Meetup.com for local tech events\n\n" +
          "The most important first step is to start coding regularly and build a learning habit.";
        options = ["What programming language should I learn first?", "How do I build a portfolio?", "Are bootcamps worth it?"];
      } else if (selectedCareer.includes("data") || selectedCareer.includes("analyst")) {
        response = "Here's a roadmap to become a Data Analyst:\n\n" +
          "**Short-term (3-6 months):**\n" +
          "- Learn the basics of statistics and data analysis\n" +
          "- Master Excel and basic SQL\n" +
          "- Take introductory courses in data visualization\n\n" +
          "**Medium-term (6 months - 2 years):**\n" +
          "- Learn Python or R for data analysis\n" +
          "- Master tools like Tableau or Power BI\n" +
          "- Work on data projects to build your portfolio\n" +
          "- Consider certification programs\n\n" +
          "**Long-term (2+ years):**\n" +
          "- Specialize in your industry of interest\n" +
          "- Consider advanced degrees if necessary\n" +
          "- Develop expertise in machine learning or advanced analytics\n\n" +
          "**Key Resources:**\n" +
          "- DataCamp or Coursera for online learning\n" +
          "- Kaggle for practice datasets and competitions\n" +
          "- LinkedIn Learning for targeted skill development\n" +
          "- Data-focused meetups and conferences\n\n" +
          "Start with mastering the fundamentals before moving to advanced techniques.";
        options = ["What SQL skills do I need?", "How do I practice data analysis?", "Which certifications are valuable?"];
      } else {
        response = "Here's a general career roadmap:\n\n" +
          "**Short-term (3-6 months):**\n" +
          "- Identify specific skills needed for your chosen field\n" +
          "- Take foundational online courses in those areas\n" +
          "- Build a professional online presence (LinkedIn)\n\n" +
          "**Medium-term (6 months - 2 years):**\n" +
          "- Pursue further education or certification if needed\n" +
          "- Gain practical experience through internships or projects\n" +
          "- Build your professional network\n" +
          "- Develop a portfolio of work\n\n" +
          "**Long-term (2+ years):**\n" +
          "- Identify specialization opportunities\n" +
          "- Seek mentorship in your field\n" +
          "- Look for advancement opportunities\n\n" +
          "**Key Resources:**\n" +
          "- Industry-specific online courses\n" +
          "- Professional associations in your field\n" +
          "- Networking events and conferences\n" +
          "- Mentorship programs\n\n" +
          "Remember that careers rarely follow a straight line - be open to opportunities as they arise.";
        options = ["How do I find mentors?", "What networking strategies work best?", "How important are certifications?"];
      }
      break;
      
    default:
      response = "I'm here to help you explore career options. Could you tell me about your interests, skills, or what you're looking for in a career?";
      options = ["I want to explore careers based on my interests", "I'd like to know what careers match my skills", "I'm not sure where to start"];
  }
  
  return { message: response, options: options };
}

// Helper function to determine career focus based on conversation
function determineCareerFocus(conversationHistory: any[]): string {
  const allText = conversationHistory.map(m => m.message).join(' ').toLowerCase();
  
  if (allText.includes('tech') || 
      allText.includes('code') || 
      allText.includes('software') ||
      allText.includes('data') ||
      allText.includes('programming')) {
    return 'tech';
  } else if (allText.includes('design') || 
             allText.includes('creative') || 
             allText.includes('art') ||
             allText.includes('write') ||
             allText.includes('content')) {
    return 'creative';
  } else {
    return 'general';
  }
}

// Helper function to determine selected career from conversation
function determineSelectedCareer(conversationHistory: any[]): string {
  // Get the last few messages to see what career was discussed most recently
  const recentMessages = conversationHistory.slice(-5).map(m => m.message).join(' ').toLowerCase();
  
  if (recentMessages.includes('software') || recentMessages.includes('developer') || recentMessages.includes('programming')) {
    return 'software developer';
  } else if (recentMessages.includes('data') || recentMessages.includes('analyst')) {
    return 'data analyst';
  } else if (recentMessages.includes('design') || recentMessages.includes('ux') || recentMessages.includes('ui')) {
    return 'designer';
  } else {
    return 'general career';
  }
}

// Keep the existing determineNextStage and generateCareerRoadmap functions
function determineNextStage(currentStage: number, conversationHistory: any[], userMessage: string, assistantMessage: string): number {
  // Don't advance past stage 5
  if (currentStage >= 5) {
    return 5;
  }
  
  // Count meaningful exchanges in this stage (pairs of user and assistant messages)
  const messagesInCurrentStage = conversationHistory.filter(msg => 
    msg.stageWhenSent === currentStage
  ).length;
  
  // Message content analysis for stage advancement
  const combinedText = (userMessage + " " + assistantMessage).toLowerCase();
  
  // Stage-specific advancement logic
  switch (currentStage) {
    case 1: // Exploration -> Skills
      // Advance if user has shared enough about interests or we've had sufficient exchanges
      if (messagesInCurrentStage >= 4 || 
          combinedText.includes("skill") || 
          combinedText.includes("good at") || 
          combinedText.includes("experience")) {
        return 2;
      }
      break;
      
    case 2: // Skills -> Values
      // Advance if user has shared their skills or we've had sufficient exchanges
      if (messagesInCurrentStage >= 4 || 
          combinedText.includes("value") || 
          combinedText.includes("important to me") ||
          combinedText.includes("care about") ||
          combinedText.includes("work environment") ||
          combinedText.includes("work-life")) {
        return 3;
      }
      break;
      
    case 3: // Values -> Career Recommendations
      // Advance if user has shared their values or we've had sufficient exchanges
      if (messagesInCurrentStage >= 4 || 
          combinedText.includes("career") || 
          combinedText.includes("job") ||
          combinedText.includes("recommendation") ||
          combinedText.includes("suggest")) {
        return 4;
      }
      break;
      
    case 4: // Career Recommendations -> Roadmap
      // Advance if user has shown interest in specific careers or we've had sufficient exchanges
      if (messagesInCurrentStage >= 4 || 
          combinedText.includes("how do i") || 
          combinedText.includes("steps") ||
          combinedText.includes("plan") ||
          combinedText.includes("roadmap") ||
          combinedText.includes("get started")) {
        return 5;
      }
      break;
  }
  
  // Stay in current stage if no advancement conditions met
  return currentStage;
}

function generateCareerRoadmap(conversationHistory: any[], currentMessage: string, assistantResponse: string): any {
  // Analyze the conversation history to identify career interests and skills
  const allMessages = [...conversationHistory.map(msg => msg.message), currentMessage, assistantResponse];
  const messageText = allMessages.join(' ').toLowerCase();
  
  // Extract likely career paths based on conversation
  let careerPath = 'general';
  if (messageText.includes('software') || messageText.includes('programming') || 
      messageText.includes('developer') || messageText.includes('coding')) {
    careerPath = 'software';
  } else if (messageText.includes('design') || messageText.includes('ux') || 
             messageText.includes('ui') || messageText.includes('creative')) {
    careerPath = 'design';
  } else if (messageText.includes('data') || messageText.includes('analyst') || 
             messageText.includes('analytics') || messageText.includes('statistics')) {
    careerPath = 'data';
  } else if (messageText.includes('marketing') || messageText.includes('social media') || 
             messageText.includes('advertising')) {
    careerPath = 'marketing';
  } else if (messageText.includes('healthcare') || messageText.includes('medical') || 
             messageText.includes('nursing') || messageText.includes('doctor')) {
    careerPath = 'healthcare';
  }
  
  // Generate roadmap based on identified career path
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
        { title: "Learn Design Principles", description: "Master fundamentals of visual design" },
        { title: "Build Design Portfolio", description: "Create projects showcasing your skills" },
        { title: "Learn Design Tools", description: "Become proficient in tools like Figma or Adobe XD" }
      ],
      mediumTerm: [
        { title: "Freelance Projects", description: "Build client experience through freelance work" },
        { title: "Internship or Junior Role", description: "Gain professional experience" },
        { title: "Specialize in UI/UX", description: "Develop expertise in user experience design" }
      ],
      longTerm: [
        { title: "Senior Design Positions", description: "Move into lead designer roles" },
        { title: "Design Leadership", description: "Explore design director or managerial paths" },
        { title: "Start Design Agency", description: "Consider entrepreneurial opportunities" }
      ],
      resources: [
        { title: "Behance", url: "https://www.behance.net/" },
        { title: "Dribbble", url: "https://dribbble.com/" },
        { title: "Figma", url: "https://www.figma.com/" }
      ]
    },
    data: {
      shortTerm: [
        { title: "Learn Data Analysis Tools", description: "Master Excel, SQL, and basic Python" },
        { title: "Take Online Courses", description: "Complete courses in statistics and data analysis" },
        { title: "Build Data Projects", description: "Create portfolio projects showcasing analytical skills" }
      ],
      mediumTerm: [
        { title: "Learn Advanced Statistics", description: "Develop deeper statistical knowledge" },
        { title: "Master Data Visualization", description: "Learn to create compelling data stories" },
        { title: "Entry-Level Analyst Position", description: "Gain professional experience" }
      ],
      longTerm: [
        { title: "Specialize in Machine Learning", description: "Explore AI and advanced analytics" },
        { title: "Senior Analyst or Data Scientist", description: "Move into advanced roles" },
        { title: "Leadership in Analytics", description: "Consider management or strategy positions" }
      ],
      resources: [
        { title: "Kaggle", url: "https://www.kaggle.com/" },
        { title: "DataCamp", url: "https://www.datacamp.com/" },
        { title: "Towards Data Science", url: "https://towardsdatascience.com/" }
      ]
    },
    marketing: {
      shortTerm: [
        { title: "Learn Marketing Fundamentals", description: "Master basics of digital marketing" },
        { title: "Build Social Media Presence", description: "Gain hands-on experience with platforms" },
        { title: "Take Certifications", description: "Complete courses like Google Analytics certification" }
      ],
      mediumTerm: [
        { title: "Develop Content Creation Skills", description: "Build portfolio of marketing content" },
        { title: "Gain Campaign Experience", description: "Manage marketing campaigns" },
        { title: "Entry-Level Marketing Position", description: "Gain professional experience" }
      ],
      longTerm: [
        { title: "Specialize in Growth Marketing", description: "Focus on driving business results" },
        { title: "Leadership Roles", description: "Move into marketing manager positions" },
        { title: "Strategic Marketing", description: "Consider director or CMO paths" }
      ],
      resources: [
        { title: "HubSpot Academy", url: "https://academy.hubspot.com/" },
        { title: "Google Digital Garage", url: "https://learndigital.withgoogle.com/" },
        { title: "Marketing Examples", url: "https://marketingexamples.com/" }
      ]
    },
    healthcare: {
      shortTerm: [
        { title: "Research Educational Requirements", description: "Understand qualifications needed" },
        { title: "Shadow Healthcare Professionals", description: "Gain exposure to the field" },
        { title: "Volunteer in Healthcare Settings", description: "Build relevant experience" }
      ],
      mediumTerm: [
        { title: "Complete Required Education", description: "Pursue necessary degrees or certifications" },
        { title: "Clinical Experience", description: "Gain hands-on patient care experience" },
        { title: "Licensing and Certification", description: "Complete required professional credentials" }
      ],
      longTerm: [
        { title: "Specialization", description: "Develop expertise in specific areas" },
        { title: "Advanced Practice", description: "Consider further education for advanced roles" },
        { title: "Leadership or Teaching", description: "Explore management or educational positions" }
      ],
      resources: [
        { title: "Bureau of Labor Statistics - Healthcare", url: "https://www.bls.gov/ooh/healthcare/" },
        { title: "MedlinePlus", url: "https://medlineplus.gov/" },
        { title: "American Medical Association", url: "https://www.ama-assn.org/" }
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
        { title: "LinkedIn Learning", url: "https://www.linkedin.com/learning/" },
        { title: "Indeed Career Guide", url: "https://www.indeed.com/career-advice" },
        { title: "O*NET OnLine", url: "https://www.onetonline.org/" }
      ]
    }
  };
  
  return roadmaps[careerPath];
}
