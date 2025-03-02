
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
      }
    ],
    questions: [
      "What aspect of technology interests you the most?",
      "Do you prefer building things, analyzing data, or solving problems?",
      "Are you more interested in the visual/creative side or the technical/logical side of technology?"
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
      }
    ],
    questions: [
      "What type of creative work do you enjoy the most?",
      "Do you prefer digital creation or traditional mediums?",
      "Are you more interested in commercial art or artistic expression?"
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
      }
    ],
    questions: [
      "What aspect of business interests you the most?",
      "Do you prefer working with numbers, strategies, or people?",
      "Are you more interested in growing organizations or managing existing processes?"
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
      }
    ],
    questions: [
      "What scientific field fascinates you the most?",
      "Do you prefer field work, laboratory work, or theoretical research?",
      "Are you more interested in fundamental science or applied science?"
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
      }
    ],
    questions: [
      "What aspect of healthcare interests you the most?",
      "Do you prefer direct patient care or behind-the-scenes roles?",
      "Are you more interested in physical health, mental health, or healthcare systems?"
    ]
  }
};

// Generic questions for different assessment stages
const stageQuestions = [
  // Stage 1: Initial interest assessment
  [
    "What subjects did you enjoy studying in school?",
    "What activities do you find yourself losing track of time while doing?",
    "What topics do you enjoy reading about or watching videos on?"
  ],
  // Stage 2: Skills assessment
  [
    "What skills do you feel you're strongest in?",
    "What tasks do others often ask you to help with?",
    "What challenges do you enjoy tackling?"
  ],
  // Stage 3: Work environment preferences
  [
    "Do you prefer working independently or as part of a team?",
    "Would you rather work in a structured environment with clear guidelines or one with more flexibility?",
    "Do you enjoy fast-paced work or do you prefer taking your time to ensure accuracy?"
  ],
  // Stage 4: Values and priorities
  [
    "What's more important to you: high income, work-life balance, or making a difference?",
    "Would you prefer job stability or opportunities for rapid advancement?",
    "Is it important for your work to align with your personal values?"
  ],
  // Stage 5: Career path exploration
  [
    "Based on our conversation, I think you might be interested in these career paths. Which one sounds most appealing?",
    "Let's explore some specific roles within your areas of interest. Which of these would you like to learn more about?",
    "I have some career recommendations based on your responses. Would you like to hear about them?"
  ]
];

// Keywords for better response matching
const keywordCategories = {
  technology: ['coding', 'programming', 'computers', 'tech', 'software', 'hardware', 'development', 'apps', 'websites', 'data'],
  creativeArts: ['art', 'design', 'creative', 'drawing', 'painting', 'music', 'writing', 'photography', 'film', 'video'],
  business: ['business', 'management', 'marketing', 'finance', 'accounting', 'sales', 'entrepreneurship', 'leadership', 'economics', 'strategy'],
  science: ['science', 'research', 'experiment', 'laboratory', 'biology', 'chemistry', 'physics', 'environment', 'analysis', 'data'],
  healthcare: ['health', 'medical', 'patient', 'care', 'nursing', 'therapy', 'doctor', 'medicine', 'clinical', 'wellness']
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

// Function to get response based on message content and assessment stage
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
          options: ["Technology", "Creative Arts", "Business", "Science", "Healthcare"]
        };
      }
      break;
      
    case 2: // Skills assessment
      if (category) {
        const categoryData = careerAdvice[category as keyof typeof careerAdvice];
        response = {
          message: categoryData.questions[Math.floor(Math.random() * categoryData.questions.length)],
          options: categoryData.paths.slice(0, 3).map(path => path.name),
          advanceStage: Math.random() > 0.5 // Randomly advance stage sometimes
        };
      } else {
        // Generic skills question
        response = {
          message: stageQuestions[1][Math.floor(Math.random() * stageQuestions[1].length)],
          options: ["Problem-solving", "Communication", "Creativity", "Analysis", "Organization"]
        };
      }
      break;
      
    case 3: // Work environment preferences
      response = {
        message: stageQuestions[2][Math.floor(Math.random() * stageQuestions[2].length)],
        options: ["Independent work", "Team collaboration", "Structured environment", "Flexible environment", "Fast-paced", "Detail-oriented"],
        advanceStage: true
      };
      break;
      
    case 4: // Values and priorities
      response = {
        message: stageQuestions[3][Math.floor(Math.random() * stageQuestions[3].length)],
        options: ["High income", "Work-life balance", "Making a difference", "Job stability", "Growth opportunities", "Creative freedom"],
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
          options: ["Learn more about this career", "See other options", "How do I get started?", "What's the job outlook?"]
        };
      } else {
        // Generic recommendations
        response = {
          message: "Based on our conversation, I have a few career paths that might interest you. Which would you like to explore further?",
          options: ["Tech: Software Development", "Business: Marketing", "Creative: Graphic Design", "Science: Research", "Healthcare: Administration"]
        };
      }
      break;
      
    default:
      // For stages beyond our structured assessment, provide more general career guidance
      const commonQuestions = [
        "What specific aspects of this career path would you like to know more about?",
        "Are you interested in learning about the education requirements for this field?",
        "Would you like to know about entry-level positions in this field?",
        "Are you concerned about any specific challenges in pursuing this career?"
      ];
      
      response = {
        message: commonQuestions[Math.floor(Math.random() * commonQuestions.length)],
        options: ["Education requirements", "Salary expectations", "Day-to-day responsibilities", "Career growth", "Industry trends"]
      };
  }
  
  return response;
}
