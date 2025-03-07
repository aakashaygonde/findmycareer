import { ChatMessage } from '@/types';

interface AdvisorResponse {
  message: string;
  options?: string[];
  advanceStage?: boolean;
}

// Career paths and related information
export const careerAdvice = {
  technology: {
    paths: [
      { name: 'Software Development', 
        description: 'Design, create, and maintain computer programs and applications', 
        skills: ['Programming', 'Problem-solving', 'Logical thinking'],
        education: ['Computer Science degree', 'Coding bootcamp', 'Self-taught with portfolio'] 
      },
      { name: 'Data Science', 
        description: 'Analyze and interpret complex data to help organizations make better decisions',
        skills: ['Statistical analysis', 'Machine learning', 'Data visualization'],
        education: ['Statistics or Math degree', 'Data Science bootcamp', 'Online certifications']
      },
      { name: 'Cybersecurity', 
        description: 'Protect computer systems and networks from digital attacks',
        skills: ['Network security', 'Threat analysis', 'Security protocols'],
        education: ['Cybersecurity degree', 'IT security certifications', 'Ethical hacking courses']
      },
      { name: 'UX/UI Design', 
        description: 'Create intuitive, accessible, and enjoyable digital experiences for users',
        skills: ['User research', 'Visual design', 'Prototyping'],
        education: ['Design degree', 'UX bootcamp', 'Self-taught with portfolio']
      },
      { name: 'AI Engineering', 
        description: 'Develop artificial intelligence systems and machine learning models',
        skills: ['Machine learning', 'Programming', 'Mathematics'],
        education: ['Computer Science degree', 'AI/ML specialization', 'Advanced mathematics']
      },
      { name: 'DevOps Engineering', 
        description: 'Bridge development and operations to improve software delivery processes',
        skills: ['Cloud infrastructure', 'Automation', 'CI/CD pipelines'],
        education: ['IT degree', 'Cloud certifications', 'DevOps training programs']
      }
    ],
    questions: [
      "What aspect of technology interests you the most?",
      "Do you prefer building things, analyzing data, or solving problems?",
      "Are you more interested in the visual/creative side or the technical/logical side of technology?",
      "Do you enjoy working with hardware, software, or both?",
      "Would you rather create new systems or improve existing ones?"
    ]
  },
  creativeArts: {
    paths: [
      { name: 'Graphic Design', 
        description: 'Create visual content to communicate messages and ideas',
        skills: ['Visual design', 'Typography', 'Color theory'],
        education: ['Design degree', 'Visual arts training', 'Self-taught with portfolio']
      },
      { name: 'Content Creation', 
        description: 'Produce engaging written, visual, or audio content for various platforms',
        skills: ['Writing', 'Visual storytelling', 'Audience engagement'],
        education: ['Communications degree', 'Journalism training', 'Self-taught with portfolio']
      },
      { name: 'Animation', 
        description: 'Create moving imagery through various artistic techniques',
        skills: ['Drawing', '3D modeling', 'Storytelling'],
        education: ['Animation degree', 'Digital arts training', 'Self-taught with portfolio']
      },
      { name: 'Photography', 
        description: 'Capture and create compelling images for artistic or commercial purposes',
        skills: ['Composition', 'Lighting', 'Photo editing'],
        education: ['Photography degree', 'Visual arts training', 'Self-taught with portfolio']
      },
      { name: 'Film Production', 
        description: 'Create and produce video content for entertainment, education, or marketing',
        skills: ['Cinematography', 'Directing', 'Video editing'],
        education: ['Film degree', 'Media production training', 'Hands-on experience']
      },
      { name: 'Game Design', 
        description: 'Create engaging interactive experiences through video games',
        skills: ['Game mechanics', 'Level design', 'User experience'],
        education: ['Game design degree', 'Interactive media training', 'Game development courses']
      }
    ],
    questions: [
      "What type of creative work do you enjoy the most?",
      "Do you prefer digital creation or traditional mediums?",
      "Are you more interested in commercial art or artistic expression?",
      "Do you enjoy working on a team or independently in creative roles?",
      "How important is storytelling in your creative process?"
    ]
  },
  business: {
    paths: [
      { name: 'Marketing', 
        description: 'Promote products or services to potential customers',
        skills: ['Market research', 'Campaign planning', 'Analytics'],
        education: ['Marketing degree', 'Business administration', 'Digital marketing certifications']
      },
      { name: 'Finance', 
        description: 'Manage money, investments, and financial systems',
        skills: ['Financial analysis', 'Forecasting', 'Risk assessment'],
        education: ['Finance degree', 'Accounting certifications', 'MBA']
      },
      { name: 'Entrepreneurship', 
        description: 'Start and run your own business ventures',
        skills: ['Business planning', 'Leadership', 'Problem-solving'],
        education: ['Business degree', 'MBA', 'Self-taught with experience']
      },
      { name: 'Human Resources', 
        description: 'Manage an organization\'s workforce and culture',
        skills: ['Recruitment', 'Employee relations', 'Organizational development'],
        education: ['HR degree', 'Business administration', 'HR certifications']
      },
      { name: 'Project Management', 
        description: 'Plan, execute, and oversee projects from inception to completion',
        skills: ['Planning', 'Team leadership', 'Risk management'],
        education: ['Project Management degree', 'PMP certification', 'Business administration']
      },
      { name: 'Supply Chain Management', 
        description: 'Oversee the flow of goods and services from suppliers to customers',
        skills: ['Logistics', 'Process optimization', 'Vendor management'],
        education: ['Supply Chain degree', 'Business administration', 'Logistics certifications']
      }
    ],
    questions: [
      "What aspect of business interests you the most?",
      "Do you prefer working with numbers, strategies, or people?",
      "Are you more interested in growing organizations or managing existing processes?",
      "Do you enjoy making decisions based on data or intuition?",
      "Would you prefer to work in a startup environment or an established company?"
    ]
  },
  science: {
    paths: [
      { name: 'Research Scientist', 
        description: 'Conduct experiments and investigations to advance scientific knowledge',
        skills: ['Research methods', 'Data analysis', 'Scientific writing'],
        education: ['Science degree', 'Master\'s or PhD', 'Laboratory experience']
      },
      { name: 'Environmental Science', 
        description: 'Study environmental issues and develop solutions',
        skills: ['Field research', 'Data collection', 'Environmental analysis'],
        education: ['Environmental Science degree', 'Earth Sciences', 'Related certifications']
      },
      { name: 'Biotechnology', 
        description: 'Use biological systems to develop products and technologies',
        skills: ['Laboratory techniques', 'Data analysis', 'Research methods'],
        education: ['Biology degree', 'Biotechnology degree', 'Advanced science degree']
      },
      { name: 'Astronomy', 
        description: 'Study celestial objects and phenomena',
        skills: ['Data analysis', 'Research methods', 'Mathematical modeling'],
        education: ['Physics degree', 'Astronomy degree', 'Advanced science degree']
      },
      { name: 'Materials Science', 
        description: 'Research and develop new materials with specific properties',
        skills: ['Laboratory techniques', 'Material analysis', 'Problem-solving'],
        education: ['Materials Science degree', 'Engineering degree', 'Advanced science degree']
      },
      { name: 'Neuroscience', 
        description: 'Study the structure and function of the nervous system',
        skills: ['Laboratory techniques', 'Data analysis', 'Critical thinking'],
        education: ['Neuroscience degree', 'Biology degree', 'Medical training']
      }
    ],
    questions: [
      "What scientific field fascinates you the most?",
      "Do you prefer field work, laboratory work, or theoretical research?",
      "Are you more interested in fundamental science or applied science?",
      "Do you enjoy working with living organisms or non-living systems?",
      "Would you prefer to work in academia, industry, or government research?"
    ]
  },
  healthcare: {
    paths: [
      { name: 'Nursing', 
        description: 'Provide care and support for patients in various healthcare settings',
        skills: ['Patient care', 'Clinical assessment', 'Medical knowledge'],
        education: ['Nursing degree', 'Nursing certifications', 'Specialized training']
      },
      { name: 'Healthcare Administration', 
        description: 'Manage healthcare facilities, departments, or services',
        skills: ['Management', 'Healthcare regulations', 'Operational planning'],
        education: ['Healthcare Administration degree', 'Business degree with healthcare focus', 'MBA']
      },
      { name: 'Physical Therapy', 
        description: 'Help patients improve movement and manage pain',
        skills: ['Physical assessment', 'Treatment planning', 'Patient education'],
        education: ['Physical Therapy degree', 'Doctorate in Physical Therapy', 'Specialized certifications']
      },
      { name: 'Mental Health Counseling', 
        description: 'Provide support and treatment for mental health conditions',
        skills: ['Therapeutic techniques', 'Assessment', 'Patient rapport'],
        education: ['Psychology degree', 'Counseling degree', 'Clinical certifications']
      },
      { name: 'Public Health', 
        description: 'Address health issues at the community and population level',
        skills: ['Health education', 'Program planning', 'Data analysis'],
        education: ['Public Health degree', 'Epidemiology training', 'Health policy studies']
      },
      { name: 'Medical Laboratory Science', 
        description: 'Perform tests to diagnose and monitor diseases',
        skills: ['Laboratory techniques', 'Detail orientation', 'Technical knowledge'],
        education: ['Medical Laboratory Science degree', 'Clinical training', 'Professional certification']
      }
    ],
    questions: [
      "What aspect of healthcare interests you the most?",
      "Do you prefer direct patient care or behind-the-scenes roles?",
      "Are you more interested in physical health, mental health, or healthcare systems?",
      "Would you prefer to work in a hospital, clinic, or community setting?",
      "How important is the balance between technical skills and interpersonal skills in your ideal role?"
    ]
  },
  education: {
    paths: [
      { name: 'Teaching', 
        description: 'Educate students and help them develop knowledge and skills',
        skills: ['Instruction', 'Curriculum planning', 'Student assessment'],
        education: ['Education degree', 'Teaching credential', 'Subject-specific knowledge']
      },
      { name: 'Educational Leadership', 
        description: 'Lead educational institutions and programs',
        skills: ['Administration', 'Policy development', 'Teacher supervision'],
        education: ['Education degree', 'Educational leadership degree', 'Administrative credential']
      },
      { name: 'Educational Technology', 
        description: 'Develop and implement technology to enhance learning experiences',
        skills: ['Digital tools', 'Instructional design', 'Learning assessment'],
        education: ['Educational Technology degree', 'Computer Science background', 'Teaching experience']
      },
      { name: 'Special Education', 
        description: 'Work with students who have diverse learning needs',
        skills: ['Differentiated instruction', 'Behavior management', 'Individualized planning'],
        education: ['Special Education degree', 'Special Education credential', 'Specialized training']
      }
    ],
    questions: [
      "What age group are you most interested in working with?",
      "Do you prefer teaching specific subjects or broader curriculum areas?",
      "Are you more interested in classroom teaching or administrative roles?",
      "How do you feel about incorporating technology into education?",
      "What aspects of student development are most important to you?"
    ]
  },
  socialServices: {
    paths: [
      { name: 'Social Work', 
        description: 'Help individuals and communities address various challenges',
        skills: ['Case management', 'Counseling', 'Community resources'],
        education: ['Social Work degree', 'MSW', 'Clinical licensure']
      },
      { name: 'Nonprofit Management', 
        description: 'Lead organizations dedicated to social causes',
        skills: ['Program development', 'Fundraising', 'Volunteer management'],
        education: ['Nonprofit Management degree', 'Business Administration', 'Social Sciences background']
      },
      { name: 'Community Development', 
        description: 'Work to improve conditions in local communities',
        skills: ['Community organizing', 'Program planning', 'Grant writing'],
        education: ['Social Sciences degree', 'Urban Planning', 'Public Administration']
      },
      { name: 'Human Services', 
        description: 'Provide support services to meet human needs',
        skills: ['Client assessment', 'Service coordination', 'Crisis intervention'],
        education: ['Human Services degree', 'Psychology', 'Social Work']
      }
    ],
    questions: [
      "What social issues are you most passionate about addressing?",
      "Do you prefer working directly with individuals or on systemic change?",
      "Are you interested in counseling, case management, or program development?",
      "How important is advocacy in your ideal role?",
      "Would you prefer to work with specific populations or general community needs?"
    ]
  }
};

// Generic questions for different assessment stages
const stageQuestions = [
  // Stage 1: Initial interest assessment
  [
    "What subjects did you enjoy studying in school?",
    "What activities do you find yourself losing track of time while doing?",
    "What topics do you enjoy reading about or watching videos on?",
    "If you could spend a day learning about anything, what would it be?",
    "What kind of problems do you enjoy solving?"
  ],
  // Stage 2: Skills assessment
  [
    "What skills do you feel you're strongest in?",
    "What tasks do others often ask you to help with?",
    "What challenges do you enjoy tackling?",
    "What have you received compliments on in school or work settings?",
    "What activities come naturally to you that others might find difficult?"
  ],
  // Stage 3: Work environment preferences
  [
    "Do you prefer working independently or as part of a team?",
    "Would you rather work in a structured environment with clear guidelines or one with more flexibility?",
    "Do you enjoy fast-paced work or do you prefer taking your time to ensure accuracy?",
    "How important is work-life balance compared to career advancement for you?",
    "Would you prefer working in a large organization or a smaller company?"
  ],
  // Stage 4: Values and priorities
  [
    "What's more important to you: high income, work-life balance, or making a difference?",
    "Would you prefer job stability or opportunities for rapid advancement?",
    "Is it important for your work to align with your personal values?",
    "How much does location flexibility matter in your career choices?",
    "Do you value creativity and innovation or consistency and reliability more?"
  ],
  // Stage 5: Career path exploration
  [
    "Based on our conversation, I think you might be interested in these career paths. Which one sounds most appealing?",
    "Let's explore some specific roles within your areas of interest. Which of these would you like to learn more about?",
    "I have some career recommendations based on your responses. Would you like to hear about them?",
    "These career paths align with your interests and values. Which would you like to explore further?",
    "Based on what you've shared, here are some potential career matches. Which one resonates with you?"
  ]
];

// Keywords for better response matching
const keywordCategories = {
  technology: ['coding', 'programming', 'computers', 'tech', 'software', 'hardware', 'development', 'apps', 'websites', 'data', 'IT', 'digital', 'internet', 'cyber', 'AI', 'artificial intelligence', 'machine learning', 'cloud'],
  creativeArts: ['art', 'design', 'creative', 'drawing', 'painting', 'music', 'writing', 'photography', 'film', 'video', 'animation', 'graphic', 'visual', 'content', 'media', 'performance', 'fashion', 'crafts', 'storytelling'],
  business: ['business', 'management', 'marketing', 'finance', 'accounting', 'sales', 'entrepreneurship', 'leadership', 'economics', 'strategy', 'consulting', 'operations', 'HR', 'human resources', 'retail', 'commerce', 'administration'],
  science: ['science', 'research', 'experiment', 'laboratory', 'biology', 'chemistry', 'physics', 'environment', 'analysis', 'data', 'engineering', 'materials', 'astronomy', 'earth', 'geology', 'neuroscience', 'biotechnology'],
  healthcare: ['health', 'medical', 'patient', 'care', 'nursing', 'therapy', 'doctor', 'medicine', 'clinical', 'wellness', 'hospital', 'rehabilitation', 'diagnosis', 'treatment', 'psychology', 'mental health', 'public health'],
  education: ['teaching', 'education', 'school', 'learning', 'students', 'curriculum', 'instruction', 'classroom', 'tutoring', 'training', 'academic', 'professor', 'teacher', 'college', 'university', 'children', 'development'],
  socialServices: ['social work', 'community', 'nonprofit', 'helping', 'counseling', 'advocacy', 'support', 'services', 'welfare', 'case management', 'outreach', 'intervention', 'vulnerable populations', 'social justice', 'human services']
};

// Function to identify category based on keywords
function identifyCategory(text: string): string | null {
  text = text.toLowerCase();
  
  // Check for direct mentions of categories
  if (text.includes('technology') || text.includes('tech')) return 'technology';
  if (text.includes('creative') || text.includes('art')) return 'creativeArts';
  if (text.includes('business')) return 'business';
  if (text.includes('science')) return 'science';
  if (text.includes('healthcare') || text.includes('health care')) return 'healthcare';
  if (text.includes('education') || text.includes('teaching')) return 'education';
  if (text.includes('social') || text.includes('community')) return 'socialServices';
  
  // Check for keywords
  let maxMatches = 0;
  let bestCategory = null;
  
  for (const [category, keywords] of Object.entries(keywordCategories)) {
    let matches = 0;
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        matches++;
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }
  
  return maxMatches > 0 ? bestCategory : null;
}

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
