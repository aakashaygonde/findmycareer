
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Using Google's Gemini AI API
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

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

    // Determine the appropriate prompt based on the assessment stage
    let systemPrompt = getSystemPromptForStage(stage);

    // Format the conversation for the Gemini model
    let promptParts = [{
      text: systemPrompt
    }];

    // Add conversation history
    conversationHistory.forEach((msg) => {
      promptParts.push({ text: `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.message}\n` });
    });

    // Add current message
    promptParts.push({ text: `User: ${message}\nAssistant:` });

    console.log('Sending prompt to Gemini AI model');

    // Make the request to the Gemini AI API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: promptParts.map(part => ({ text: part.text }))
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API error:', errorData);
      
      // Fallback response when API fails
      return new Response(JSON.stringify({ 
        message: "I'm experiencing some technical difficulties right now. Please try again in a few moments or ask me a different question about your career interests.",
        options: ["Tell me about tech careers", "What careers match creative interests?", "What healthcare careers are growing?"],
        nextStage: stage
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('API response:', data);

    // Extract the generated text from the Gemini response
    let assistantMessage = "";
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      assistantMessage = data.candidates[0].content.parts[0].text.trim();
    } else {
      // Fallback if we can't parse the response
      assistantMessage = "I'm sorry, I couldn't generate a proper response. Please try asking something else about your career interests.";
    }
    
    // Look for questions in the message to use as options
    let options: string[] = [];
    
    // Extract questions from the response
    const sentences = assistantMessage.split(/[.!?]/).filter(s => s.includes('?'));
    if (sentences.length > 0) {
      // Take up to 3 shortest questions as options
      options = sentences
        .map(s => s.trim())
        .filter(s => s.length > 10 && s.length < 80)
        .sort((a, b) => a.length - b.length)
        .slice(0, 3);
    }
    
    // If no questions found, provide default options based on conversation context
    if (options.length === 0) {
      options = getDefaultOptionsForStage(stage, assistantMessage, message);
    }

    // Determine if we should advance to the next assessment stage
    let nextStage = stage;
    if (conversationHistory.length >= stage * 2 && stage < 5) {
      nextStage = stage + 1;
    }

    // Add career roadmap if we're in the later stages (4-5)
    let careerRoadmap = null;
    if (stage >= 4) {
      careerRoadmap = generateCareerRoadmap(conversationHistory, message, assistantMessage);
    }

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      options: options.length > 0 ? options : undefined,
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

// Helper function to get system prompt based on assessment stage
function getSystemPromptForStage(stage: number): string {
  const basePrompt = `You are a helpful career advisor assistant that provides personalized guidance on career paths, skills, and educational requirements. 

Your goal is to help users discover career opportunities that match their interests, skills, and aspirations. Use the information they share about their interests, skills, values, and preferences to recommend specific careers.

Key guidelines:
1. Focus on understanding the user's interests from their text descriptions
2. Analyze their messages to identify potential career matches
3. Provide specific, actionable advice and career recommendations
4. Be conversational and ask thoughtful follow-up questions
5. Include detailed information about recommended careers including skills required and education paths
6. At the end of your response, suggest a few relevant questions the user might ask next

Be friendly, supportive, and engaging. Provide detailed and specific career suggestions based on the user's input.`;

  // Add stage-specific instructions
  switch (stage) {
    case 1:
      return `${basePrompt}

You are in STAGE 1 of the assessment: EXPLORATION.
Focus on discovering the user's general interests, passions, and what they enjoy doing. Ask open-ended questions to understand their preferences. Don't recommend specific careers yet, but explore their motivations.`;

    case 2:
      return `${basePrompt}

You are in STAGE 2 of the assessment: SKILLS EVALUATION.
Focus on identifying the user's existing skills, strengths, and areas they excel in. Ask about their education, experience, and natural abilities. Start connecting these skills to potential career fields.`;

    case 3:
      return `${basePrompt}

You are in STAGE 3 of the assessment: VALUES CLARIFICATION.
Focus on understanding what matters most to the user in their career (work-life balance, salary, helping others, creativity, etc.). Discuss workplace environments they might thrive in and what gives them satisfaction.`;

    case 4:
      return `${basePrompt}

You are in STAGE 4 of the assessment: CAREER RECOMMENDATIONS.
Based on all previous conversations, provide 3-5 specific career recommendations that align with their interests, skills, and values. For each career, include:
- Job description
- Required education/qualifications
- Skills needed
- Salary range
- Growth potential
Be very specific with career titles.`;

    case 5:
      return `${basePrompt}

You are in STAGE 5 of the assessment: ROADMAP CREATION.
Focus on creating an actionable plan for the user to pursue their top career choice. Include:
- Short-term steps (next 3-6 months)
- Medium-term goals (6 months to 2 years)
- Long-term strategy (2+ years)
- Educational requirements
- Skill development needs
- Networking suggestions
- Resources they can use

Be specific, practical and actionable in your advice.`;

    default:
      return basePrompt;
  }
}

// Helper function to get default options based on the assessment stage
function getDefaultOptionsForStage(stage: number, assistantMessage: string, userMessage: string): string[] {
  const lowerAssistantMessage = assistantMessage.toLowerCase();
  const lowerUserMessage = userMessage.toLowerCase();

  switch (stage) {
    case 1:
      if (lowerAssistantMessage.includes('technology') || lowerUserMessage.includes('tech')) {
        return [
          "What technological activities do I enjoy the most?",
          "How do my interests in technology translate to careers?",
          "What non-technical interests do I have alongside tech?"
        ];
      } else if (lowerAssistantMessage.includes('creative') || lowerUserMessage.includes('art')) {
        return [
          "How do I express my creativity in daily life?",
          "What creative fields am I most curious about?",
          "Do I prefer solo creative work or collaborative projects?"
        ];
      } else {
        return [
          "What activities make me lose track of time?",
          "What subjects did I enjoy most in school?",
          "What kind of problems do I enjoy solving?"
        ];
      }

    case 2:
      return [
        "What skills have others complimented me on?",
        "What technical abilities have I developed?",
        "What skills would I like to improve?"
      ];

    case 3:
      return [
        "Is work-life balance important to me?",
        "Do I prefer stability or high earning potential?",
        "Is making a difference in society important to me?"
      ];

    case 4:
      return [
        "Tell me more details about the first career option",
        "What education paths would work for these careers?",
        "Which of these careers has the best growth potential?"
      ];

    case 5:
      return [
        "What are the first steps I should take?",
        "What resources can help me learn these skills?",
        "How can I network in this industry?"
      ];

    default:
      return [
        "Tell me more about these career options",
        "What skills would I need to develop?",
        "How can I get started in this field?"
      ];
  }
}

// Helper function to generate a career roadmap
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
        { title: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
        { title: "The Odin Project", url: "https://www.theodinproject.com/" },
        { title: "GitHub", url: "https://github.com/" }
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
