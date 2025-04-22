import { CareerAdviceData } from './types';

// Career paths and related information
export const careerAdvice: CareerAdviceData = {
  technology: {
    paths: [
      { name: 'Software Development', 
        description: 'Design, create, and maintain computer programs and applications', 
        skills: ['Programming', 'Problem-solving', 'Logical thinking'],
        education: ['Computer Science degree', 'Coding bootcamp', 'Self-taught with portfolio'] 
      },
      { name: 'Full-Stack Developer', 
        description: 'Build complete web applications, handling both frontend and backend development', 
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
        education: ['Computer Science degree', 'Web Development bootcamp', 'Self-taught with portfolio'] 
      },
      { name: 'Frontend Developer', 
        description: 'Create responsive, interactive user interfaces for websites and web applications', 
        skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX principles', 'Responsive design'],
        education: ['Web Development degree', 'Frontend bootcamp', 'Self-taught with portfolio'] 
      },
      { name: 'Backend Developer', 
        description: 'Develop server-side logic, databases, and APIs to power web applications', 
        skills: ['Server-side languages', 'Database management', 'API development', 'Security', 'Cloud services'],
        education: ['Computer Science degree', 'Backend bootcamp', 'Self-taught with portfolio'] 
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
