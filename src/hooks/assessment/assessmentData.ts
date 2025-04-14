
import { ChatMessage, CareerRoadmap } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Initial welcome message
export const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'bot',
    message: "Hello! I'm your career advisor. I'm here to help you discover career paths that match your skills, interests, and values. Tell me about yourself - what subjects, activities, or types of work do you enjoy the most?",
    timestamp: new Date(),
    options: ['I enjoy working with technology', 'I like creative activities', 'I prefer helping people'],
    stageWhenSent: 1
  }
];

// Predefined advisor responses for each option
export const predefinedResponses: Record<string, { message: string, options: string[], nextStage?: number }> = {
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
    message: "Based on your interests in web development, here are some potential career paths:\n\n1. **Frontend Developer**\n   - Focus on creating user interfaces and experiences\n   - Skills: HTML, CSS, JavaScript, React/Vue/Angular\n   - Salary range: ₹5,00,000 - ₹12,00,000\n\n2. **Full-Stack Developer**\n   - Work on both frontend and backend systems\n   - Skills: JavaScript, Node.js, databases, cloud services\n   - Salary range: ₹6,00,000 - ₹16,00,000\n\n3. **UX Engineer**\n   - Bridge design and development\n   - Skills: UI/UX principles, prototyping, frontend development\n   - Salary range: ₹6,50,000 - ₹14,00,000\n\nWould you like more details about any of these paths?",
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
    options: ["Yes, I'd like to hear recommendations", "I'd like to explore more options first", "What education would I need?"],
    nextStage: 4
  },
  'default_stage_4': {
    message: "Here's a general career roadmap:\n\n**Short-term Goals (3-6 months):**\n- Identify key skills to develop\n- Take online courses or workshops\n- Build a professional online presence\n\n**Medium-term Goals (6-18 months):**\n- Gain practical experience through projects or internships\n- Network with professionals in your field\n- Obtain relevant certifications if needed\n\n**Long-term Goals (1-3 years):**\n- Apply for entry-level positions\n- Find a mentor in your field\n- Develop specialized knowledge\n\nDoes this roadmap sound helpful to you?",
    options: ['Yes, this is helpful', 'How do I find mentors?', 'What resources do you recommend?'],
    nextStage: 5
  },
  'default_stage_5': {
    message: "I'm glad you found this helpful! Remember that career development is a journey, and it's normal for your interests and goals to evolve over time. Keep exploring opportunities that align with your values and strengths.\n\nIs there anything else you'd like to know about career planning?",
    options: ['How do I deal with career changes?', "What if I'm not sure about my path?", 'Thanks, this has been helpful!']
  }
};

// Predefined roadmap data
export const careerRoadmaps: Record<string, CareerRoadmap> = {
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
      { id: "3", title: "Stack Overflow", type: "tool", url: "https://stackoverflow.com/", provider: "Stack Overflow" }
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
      { id: "1", title: "Behance", type: "tool", url: "https://www.behance.net/", provider: "Adobe" },
      { id: "2", title: "Skillshare", type: "course", url: "https://www.skillshare.com/", provider: "Skillshare" },
      { id: "3", title: "Dribbble", type: "tool", url: "https://dribbble.com/", provider: "Dribbble" }
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
