
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { ChatMessage, CareerRoadmap } from '@/types';
import { useAuth } from '@/context/AuthContext';

// Initial welcome message
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'm here to help you discover career paths that match your skills, interests, and values. Tell me about yourself - what subjects, activities, or types of work do you enjoy the most?",
    timestamp: new Date(),
    options: ['I enjoy working with technology', 'I like creative activities', 'I prefer helping people'],
    stageWhenSent: 1
  }
];

// Helper function to parse dates from storage
const parseStoredMessages = (messages: any[]): ChatMessage[] => {
  return messages.map(msg => ({
    ...msg,
    timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp
  }));
};

// Predefined advisor responses for each option
const predefinedResponses: Record<string, { message: string, options: string[], nextStage?: number }> = {
  // Stage 1 responses
  'I enjoy working with technology': {
    message: "Technology is a great field! What specific aspects of technology interest you the most?",
    options: ['Programming and software development', 'Hardware and electronics', 'Data analysis and visualization'],
    nextStage: 2
  },
  'I like creative activities': {
    message: "Creativity is valuable in many careers! What types of creative activities do you enjoy?",
    options: ['Visual arts and design', 'Writing and content creation', 'Music or performing arts'],
    nextStage: 2
  },
  'I prefer helping people': {
    message: "That's wonderful! Helping others is fulfilling. In what ways do you prefer to help people?",
    options: ['Teaching and education', 'Healthcare and wellness', 'Counseling and social services'],
    nextStage: 2
  },
  
  // Stage 2 responses
  'Programming and software development': {
    message: "Software development is in high demand! What skills do you already have or are interested in developing?",
    options: ['Web development (HTML, CSS, JavaScript)', 'Mobile app development', 'AI and machine learning'],
    nextStage: 3
  },
  'Hardware and electronics': {
    message: "That's a fascinating field! What aspects of hardware or electronics interest you most?",
    options: ['Computer hardware', 'Electronics design', 'Robotics and automation'],
    nextStage: 3
  },
  'Data analysis and visualization': {
    message: "Data skills are incredibly valuable today! What level of experience do you have with data?",
    options: ['Beginner - interested in learning', 'Some experience with tools like Excel', 'Advanced - familiar with programming for data'],
    nextStage: 3
  },
  
  // Stage 3 responses (example for one path)
  'Web development (HTML, CSS, JavaScript)': {
    message: "Based on your interests in web development, here are some potential career paths:\n\n1. **Frontend Developer**\n   - Focus on creating user interfaces and experiences\n   - Skills: HTML, CSS, JavaScript, React/Vue/Angular\n   - Salary range: $70,000 - $120,000\n\n2. **Full-Stack Developer**\n   - Work on both frontend and backend systems\n   - Skills: JavaScript, Node.js, databases, cloud services\n   - Salary range: $80,000 - $140,000\n\n3. **UX Engineer**\n   - Bridge design and development\n   - Skills: UI/UX principles, prototyping, frontend development\n   - Salary range: $85,000 - $130,000\n\nWould you like more details about any of these paths?",
    options: ['Tell me more about Frontend Development', 'Tell me more about Full-Stack Development', 'What education do I need for these roles?'],
    nextStage: 4
  },
  
  // Stage 4 responses
  'Tell me more about Frontend Development': {
    message: "**Frontend Development Career Path**\n\nHere's a roadmap for becoming a Frontend Developer:\n\n**Short-term (3-6 months):**\n- Learn HTML, CSS, and JavaScript fundamentals\n- Build simple websites and interactive components\n- Start learning a framework like React\n\n**Medium-term (6-12 months):**\n- Create more complex projects for your portfolio\n- Learn about responsive design and accessibility\n- Study version control (Git) and developer workflows\n\n**Long-term (1-2 years):**\n- Gain professional experience through internships or entry-level roles\n- Specialize in a specific framework or technology\n- Learn about performance optimization and modern web standards\n\nDoes this roadmap make sense for your goals?",
    options: ['Yes, this is helpful', 'What resources do you recommend?', 'I want to explore other options'],
    nextStage: 5
  },
  
  // Default fallback responses
  'default_stage_1': {
    message: "That's interesting! Could you tell me more about what specific activities or subjects you enjoy most?",
    options: ['I enjoy problem-solving', 'I like working with people', 'I prefer creative endeavors']
  },
  'default_stage_2': {
    message: "Thanks for sharing! Let's talk about your skills. What would you say are your strongest abilities?",
    options: ['Technical/analytical skills', 'Communication/people skills', 'Creative/artistic skills']
  },
  'default_stage_3': {
    message: "Based on what you've shared, you might be well-suited for careers that combine your interests and skills. Would you like to hear some specific recommendations?",
    options: ['Yes, I'd like to hear recommendations', 'I'd like to explore more options first', 'What education would I need?'],
    nextStage: 4
  },
  'default_stage_4': {
    message: "Here's a general career roadmap:\n\n**Short-term Goals (3-6 months):**\n- Identify key skills to develop\n- Take online courses or workshops\n- Build a professional online presence\n\n**Medium-term Goals (6-18 months):**\n- Gain practical experience through projects or internships\n- Network with professionals in your field\n- Obtain relevant certifications if needed\n\n**Long-term Goals (1-3 years):**\n- Apply for entry-level positions\n- Find a mentor in your field\n- Develop specialized knowledge\n\nDoes this roadmap sound helpful to you?",
    options: ['Yes, this is helpful', 'How do I find mentors?', 'What resources do you recommend?'],
    nextStage: 5
  },
  'default_stage_5': {
    message: "I'm glad you found this helpful! Remember that career development is a journey, and it's normal for your interests and goals to evolve over time. Keep exploring opportunities that align with your values and strengths.\n\nIs there anything else you'd like to know about career planning?",
    options: ['How do I deal with career changes?', 'What if I\'m not sure about my path?', 'Thanks, this has been helpful!']
  }
};

// Predefined roadmap data
const careerRoadmaps = {
  technology: {
    shortTerm: [
      { title: "Learn Fundamental Skills", description: "Master programming basics and tools" },
      { title: "Build Small Projects", description: "Create portfolio projects to demonstrate skills" },
      { title: "Take Online Courses", description: "Complete courses on platforms like Coursera or Udemy" }
    ],
    mediumTerm: [
      { title: "Gain Practical Experience", description: "Through internships or entry-level roles" },
      { title: "Specialize in a Field", description: "Focus on web, mobile, data, or other areas" },
      { title: "Build Your Network", description: "Connect with other professionals in tech" }
    ],
    longTerm: [
      { title: "Advance to Senior Roles", description: "Take on more complex projects and responsibilities" },
      { title: "Consider Leadership", description: "Explore technical lead or management paths" },
      { title: "Stay Current", description: "Continuously learn new technologies and trends" }
    ],
    resources: [
      { id: "1", title: "freeCodeCamp", type: "course", url: "https://www.freecodecamp.org/", provider: "freeCodeCamp" },
      { id: "2", title: "The Odin Project", type: "course", url: "https://www.theodinproject.com/", provider: "The Odin Project" },
      { id: "3", title: "Stack Overflow", type: "community", url: "https://stackoverflow.com/", provider: "Stack Overflow" }
    ]
  },
  creative: {
    shortTerm: [
      { title: "Develop Technical Skills", description: "Learn design tools and principles" },
      { title: "Build a Portfolio", description: "Create samples of your work" },
      { title: "Study Industry Standards", description: "Learn best practices in your creative field" }
    ],
    mediumTerm: [
      { title: "Freelance Projects", description: "Take on small client work to gain experience" },
      { title: "Networking", description: "Connect with other creatives and potential clients" },
      { title: "Develop a Personal Style", description: "Refine your unique creative approach" }
    ],
    longTerm: [
      { title: "Agency or In-house Roles", description: "Join established creative teams" },
      { title: "Specialized Expertise", description: "Become known for specific creative skills" },
      { title: "Mentorship", description: "Share knowledge with emerging creatives" }
    ],
    resources: [
      { id: "1", title: "Behance", type: "community", url: "https://www.behance.net/", provider: "Adobe" },
      { id: "2", title: "Skillshare", type: "course", url: "https://www.skillshare.com/", provider: "Skillshare" },
      { id: "3", title: "Dribbble", type: "community", url: "https://dribbble.com/", provider: "Dribbble" }
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
      { id: "2", title: "Indeed Career Guide", type: "resource", url: "https://www.indeed.com/career-advice", provider: "Indeed" },
      { id: "3", title: "O*NET OnLine", type: "tool", url: "https://www.onetonline.org/", provider: "U.S. Department of Labor" }
    ]
  }
};

export const useAssessmentChat = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  
  // Load persisted data from localStorage if available (with user-specific key)
  const loadPersistedData = () => {
    try {
      const savedMessages = localStorage.getItem(`assessmentMessages_${userId}`);
      const savedStage = localStorage.getItem(`assessmentStage_${userId}`);
      const savedRoadmap = localStorage.getItem(`careerRoadmap_${userId}`);

      return {
        messages: savedMessages 
          ? parseStoredMessages(JSON.parse(savedMessages)) 
          : initialMessages,
        stage: savedStage ? parseInt(savedStage, 10) : 1,
        roadmap: savedRoadmap ? JSON.parse(savedRoadmap) : null
      };
    } catch (error) {
      console.error('Error loading persisted assessment data:', error);
      return { messages: initialMessages, stage: 1, roadmap: null };
    }
  };

  const persistedData = loadPersistedData();
  const [messages, setMessages] = useState<ChatMessage[]>(persistedData.messages);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentStage, setAssessmentStage] = useState(persistedData.stage);
  const [careerRoadmap, setCareerRoadmap] = useState<CareerRoadmap | null>(persistedData.roadmap);
  const { toast } = useToast();
  
  // Persist state to localStorage whenever it changes (with user-specific key)
  useEffect(() => {
    try {
      localStorage.setItem(`assessmentMessages_${userId}`, JSON.stringify(messages));
      localStorage.setItem(`assessmentStage_${userId}`, assessmentStage.toString());
      if (careerRoadmap) {
        localStorage.setItem(`careerRoadmap_${userId}`, JSON.stringify(careerRoadmap));
      }
    } catch (error) {
      console.error('Error persisting assessment data:', error);
    }
  }, [messages, assessmentStage, careerRoadmap, userId]);

  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim()) return;

    console.log("Sending message:", messageContent);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      sender: 'user',
      message: messageContent,
      timestamp: new Date(),
      stageWhenSent: assessmentStage
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Simulate processing time for more natural interaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Find a matching predefined response or use default for current stage
      let response = predefinedResponses[messageContent];
      
      // If no direct match, use default for current stage
      if (!response) {
        response = predefinedResponses[`default_stage_${assessmentStage}`];
      }
      
      // Handle special case for skipping to recommendations
      if (messageContent.toLowerCase().includes('skip')) {
        response = {
          message: "Let's jump to career recommendations based on common interests and skills. Here are some popular career paths:\n\n1. **Software Development**\n   - Building applications and websites\n   - Skills: Programming, problem-solving\n   - Growth: High demand field\n\n2. **Data Analysis**\n   - Analyzing data to extract insights\n   - Skills: Statistical analysis, visualization\n   - Growth: Rapidly expanding field\n\n3. **UX/UI Design**\n   - Creating user-friendly digital experiences\n   - Skills: Visual design, user research\n   - Growth: Essential in modern product development\n\nWhich of these sounds most interesting to you?",
          options: ['Tell me more about Software Development', 'Tell me more about Data Analysis', 'Tell me more about UX/UI Design'],
          nextStage: 4
        };
      }
      
      // Add bot response
      const botResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: response.message,
        timestamp: new Date(),
        options: response.options || [],
        stageWhenSent: assessmentStage
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // Update stage if response indicates advancement
      if (response.nextStage && response.nextStage !== assessmentStage) {
        console.log(`Advancing to stage ${response.nextStage}`);
        setAssessmentStage(response.nextStage);
        
        // Show toast for stage advancement
        toast({
          title: `Stage ${response.nextStage} of 5`,
          description: getStageDescription(response.nextStage),
          duration: 4000,
        });
      }
      
      // Update career roadmap in later stages
      if (assessmentStage >= 3) {
        let roadmapType = 'general';
        
        if (messageContent.toLowerCase().includes('software') || 
            messageContent.toLowerCase().includes('programming') || 
            messageContent.toLowerCase().includes('tech')) {
          roadmapType = 'technology';
        } else if (messageContent.toLowerCase().includes('design') || 
                  messageContent.toLowerCase().includes('art') || 
                  messageContent.toLowerCase().includes('creative')) {
          roadmapType = 'creative';
        }
        
        setCareerRoadmap(careerRoadmaps[roadmapType as keyof typeof careerRoadmaps]);
      }
      
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      
      // Add a fallback bot message
      const fallbackResponse: ChatMessage = {
        id: uuidv4(),
        sender: 'bot',
        message: "I'm sorry, I'm having trouble processing that. Could you try again or choose one of the options below?",
        timestamp: new Date(),
        options: ["Tell me about your interests", "What skills do you have?", "What's important to you in a career?"],
        stageWhenSent: assessmentStage
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [assessmentStage, toast, userId]);

  // Helper function to get description for each assessment stage
  const getStageDescription = (stage: number): string => {
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
  
  // Add a method to clear chat history
  const resetAssessment = useCallback(() => {
    localStorage.removeItem(`assessmentMessages_${userId}`);
    localStorage.removeItem(`assessmentStage_${userId}`);
    localStorage.removeItem(`careerRoadmap_${userId}`);
    setMessages(initialMessages);
    setAssessmentStage(1);
    setCareerRoadmap(null);
    
    toast({
      title: "Assessment Reset",
      description: "Your career assessment has been reset.",
      duration: 3000,
    });
  }, [toast, userId]);

  return {
    messages,
    isTyping,
    assessmentStage,
    careerRoadmap,
    handleSendMessage,
    resetAssessment
  };
};
