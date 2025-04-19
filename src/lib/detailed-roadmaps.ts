// Detailed career roadmap data with specific Indian market information
type RoadmapData = {
  salaryTrend: string;
  timeline: {
    entryLevel: string;
    midLevel: string;
    seniorLevel: string;
  };
  beginner: {
    skills: Array<{ name: string; description: string }>;
    resources: Array<{ name: string; description: string }>;
    projects: Array<{ name: string; description: string }>;
    outcomes: string;
  };
  intermediate: {
    skills: Array<{ name: string; description: string }>;
    certifications: Array<{ name: string; description: string }>;
    milestones: Array<{ name: string; description: string }>;
    outcomes: string;
  };
  advanced: {
    specializations: Array<{ name: string; description: string }>;
    leadership: Array<{ title: string; description: string }>;
    industryImpact: string;
  };
  indianMarket: {
    topCompanies: string[];
    regions: string[];
    salaryByExperience: {
      entrySalary: string;
      midSalary: string;
      seniorSalary: string;
      leadershipSalary: string;
    };
    outlook: string;
  };
};

type RoadmapCollection = {
  [key: string]: RoadmapData;
};

export const detailedRoadmaps: RoadmapCollection = {
  "Software Development": {
    salaryTrend: "Growing Rapidly",
    timeline: {
      entryLevel: "6 months - 1 year",
      midLevel: "2-3 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        {
          name: "Programming fundamentals",
          description: "Master core concepts like variables, data types, control structures, and OOP principles in languages like Java, Python, or JavaScript"
        },
        {
          name: "Data structures and algorithms",
          description: "Learn essential data structures (arrays, linked lists, trees) and basic algorithms for sorting, searching, and problem-solving"
        },
        {
          name: "Version control (Git)",
          description: "Understand repository management, branching strategies, and collaborative development using Git"
        },
        {
          name: "Basic frontend technologies",
          description: "Learn HTML5 for structure, CSS3 for styling, and JavaScript for interactivity in web applications"
        },
        {
          name: "Database fundamentals",
          description: "Master SQL basics, database design principles, and basic CRUD operations"
        }
      ],
      resources: [
        {
          name: "Coding bootcamps",
          description: "Intensive 3-6 month programs at institutions like Masai School or Newton School with placement assistance and hands-on learning"
        },
        {
          name: "Online learning platforms",
          description: "Practice coding on GeeksforGeeks, LeetCode for algorithmic problems, and structured courses on platforms like Coursera"
        },
        {
          name: "Documentation and tutorials",
          description: "Learn from official documentation, MDN Web Docs, and free YouTube channels like Telusko, CodeWithHarry"
        }
      ],
      projects: [
        {
          name: "Personal portfolio website",
          description: "Build a responsive website showcasing your projects using HTML, CSS, and JavaScript with modern design principles"
        },
        {
          name: "Task management application",
          description: "Create a full-stack app with CRUD operations, user authentication, and data persistence"
        },
        {
          name: "E-commerce platform clone",
          description: "Develop a simplified version of popular e-commerce sites with product listings, cart functionality, and checkout process"
        }
      ],
      outcomes: "Gain proficiency in core programming concepts, build basic web applications independently, and develop problem-solving skills necessary for entry-level positions"
    },
    intermediate: {
      skills: [
        {
          name: "Advanced frontend frameworks",
          description: "Master modern frameworks like React, Angular, or Vue.js, including state management and component architecture"
        },
        {
          name: "Backend development",
          description: "Build scalable server-side applications using Node.js, Python frameworks, or Java Spring"
        },
        {
          name: "Cloud platforms",
          description: "Learn deployment and scaling on AWS, Azure, or GCP, including containerization with Docker"
        },
        {
          name: "System design fundamentals",
          description: "Understand microservices architecture, API design patterns, and distributed systems"
        },
        {
          name: "Testing methodologies",
          description: "Implement unit testing, integration testing, and end-to-end testing using modern testing frameworks"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer Associate",
          description: "Comprehensive cloud development certification covering AWS services, deployment, and best practices"
        },
        {
          name: "Professional Full Stack Certification",
          description: "Advanced certification from platforms like Scaler, covering both frontend and backend technologies"
        },
        {
          name: "Microsoft Azure Developer Associate",
          description: "Learn cloud-native application development using Microsoft Azure services and tools"
        }
      ],
      milestones: [
        {
          name: "Lead feature development",
          description: "Take ownership of complete features from design to deployment, mentoring junior developers"
        },
        {
          name: "Architecture contributions",
          description: "Participate in system design decisions and implement complex technical solutions"
        },
        {
          name: "Code quality champion",
          description: "Establish coding standards, review processes, and maintain high-quality documentation"
        }
      ],
      outcomes: "Develop expertise in full-stack development, lead technical implementations, and make significant contributions to large-scale projects"
    },
    advanced: {
      specializations: [
        {
          name: "Technical Architecture",
          description: "Design and implement large-scale distributed systems, make critical technology decisions, and ensure scalability"
        },
        {
          name: "DevOps Engineering",
          description: "Implement CI/CD pipelines, automate deployment processes, and manage cloud infrastructure"
        },
        {
          name: "AI/ML Integration",
          description: "Incorporate machine learning models into applications and develop AI-powered features"
        }
      ],
      leadership: [
        {
          title: "Technical Lead",
          description: "Lead a team of 5-10 developers, make architectural decisions, and ensure project delivery"
        },
        {
          title: "Engineering Manager",
          description: "Manage multiple teams, handle resource allocation, and drive technical strategy"
        },
        {
          title: "Chief Technology Officer",
          description: "Define technical vision, make strategic decisions, and lead digital transformation initiatives"
        }
      ],
      industryImpact: "Shape the technology landscape through architectural decisions, mentoring, and contributions to the developer community through speaking engagements and open source"
    },
    indianMarket: {
      topCompanies: [
        "TCS", "Infosys", "Wipro", 
        "HCL", "Tech Mahindra", 
        "Amazon", "Microsoft", 
        "Google", "Flipkart", 
        "Zomato", "Swiggy"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Chennai", "Gurgaon/NCR", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹3,50,000 - ₹6,00,000",
        midSalary: "₹8,00,000 - ₹15,00,000",
        seniorSalary: "₹18,00,000 - ₹30,00,000",
        leadershipSalary: "₹35,00,000 - ₹80,00,000+"
      },
      outlook: "The software development market in India is projected to grow at 11-13% annually. Remote work opportunities have expanded the market, with multinational companies hiring Indian developers at competitive salaries. Product companies and funded startups typically offer higher compensation than service companies."
    }
  },
  
  "Data Science": {
    salaryTrend: "High Growth",
    timeline: {
      entryLevel: "1-1.5 years",
      midLevel: "2-4 years",
      seniorLevel: "5+ years"
    },
    beginner: {
      skills: [
        {
          name: "Programming in Python/R",
          description: "Learn programming fundamentals in Python or R with a focus on data manipulation libraries like Pandas and NumPy"
        },
        {
          name: "Statistics and mathematics",
          description: "Master probability, descriptive statistics, inferential statistics, hypothesis testing, and linear algebra fundamentals"
        },
        {
          name: "Data manipulation and cleaning",
          description: "Develop skills in cleaning messy datasets, handling missing values, and transforming data into analysis-ready formats"
        },
        {
          name: "Data visualization",
          description: "Create informative visualizations using libraries like Matplotlib, Seaborn, and interactive tools like Tableau or Power BI"
        },
        {
          name: "SQL and database basics",
          description: "Learn database fundamentals, SQL queries, and data extraction techniques from various database systems"
        },
        {
          name: "Basic machine learning algorithms",
          description: "Understand fundamental ML algorithms like linear regression, logistic regression, decision trees, and k-means clustering"
        }
      ],
      resources: [
        {
          name: "Online courses (Coursera, edX)",
          description: "Courses from IITs, IISc and international universities"
        },
        {
          name: "Analytics Vidhya",
          description: "Indian platform with tutorials and hackathons"
        },
        {
          name: "Great Learning and Upgrad programs",
          description: "Industry-aligned bootcamps with placement assistance"
        }
      ],
      projects: [
        {
          name: "Exploratory data analysis projects",
          description: "Analyze public datasets (Census data, COVID data, etc.)"
        },
        {
          name: "Predictive modeling",
          description: "Build models to predict outcomes like customer churn"
        },
        {
          name: "Dashboard creation",
          description: "Create interactive dashboards using Tableau or Power BI"
        }
      ],
      outcomes: "At this stage, you should be comfortable with data manipulation, basic statistical analysis, and creating visualizations to communicate insights."
    },
    intermediate: {
      skills: [
        {
          name: "Advanced ML algorithms",
          description: "Explore ensemble methods, neural networks, and advanced regression techniques with practical implementations"
        },
        {
          name: "Deep learning fundamentals",
          description: "Master frameworks like TensorFlow or PyTorch and understand CNN, RNN, and transformer architectures"
        },
        {
          name: "Big data technologies",
          description: "Learn distributed computing with Hadoop, Spark, and big data processing techniques for large datasets"
        },
        {
          name: "Feature engineering techniques",
          description: "Develop skills in creating and selecting meaningful features to improve model performance"
        },
        {
          name: "Model deployment and MLOps",
          description: "Implement end-to-end ML pipelines and deploy models to production environments with monitoring"
        },
        {
          name: "Cloud-based data solutions",
          description: "Utilize cloud platforms like AWS, Azure, or GCP for scalable data science workflows"
        }
      ],
      certifications: [
        {
          name: "Microsoft Certified: Azure Data Scientist Associate",
          description: "Validates expertise in using Azure for data science"
        },
        {
          name: "IBM Data Science Professional Certificate",
          description: "Comprehensive data science training"
        },
        {
          name: "Google Professional Data Engineer",
          description: "Focus on building data processing systems on Google Cloud"
        }
      ],
      milestones: [
        {
          name: "Data Analyst to Data Scientist",
          description: "Moving from descriptive to predictive analytics"
        },
        {
          name: "Building end-to-end ML solutions",
          description: "Creating solutions that go from data collection to deployment"
        },
        {
          name: "Domain specialization",
          description: "Becoming an expert in finance, healthcare, retail, etc."
        }
      ],
      outcomes: "At this stage, you should be able to lead data science projects, build complex models, and deploy them in production environments. You would typically earn between ₹12,00,000 to ₹20,00,000 annually."
    },
    advanced: {
      specializations: [
        {
          name: "Machine Learning Engineer",
          description: "Focus on deploying models at scale and ML systems"
        },
        {
          name: "Natural Language Processing",
          description: "Specializing in text analysis, especially for Indian languages"
        },
        {
          name: "Computer Vision Expert",
          description: "Focusing on image and video analysis applications"
        }
      ],
      leadership: [
        {
          title: "Lead Data Scientist",
          description: "Managing a team of data scientists and setting technical direction"
        },
        {
          title: "Director of Data Science",
          description: "Overseeing data strategy across organization"
        },
        {
          title: "Chief Data Officer",
          description: "Executive role focused on company-wide data initiatives"
        }
      ],
      industryImpact: "Senior data scientists in India are contributing to global research, speaking at conferences like Cypher and MLDS, and developing novel applications for Indian contexts like agriculture, healthcare, and financial inclusion."
    },
    indianMarket: {
      topCompanies: [
        "Mu Sigma", "Tiger Analytics", "Fractal Analytics", 
        "Amazon", "Flipkart", "Myntra", 
        "Swiggy", "Zomato", "PayTM", 
        "HSBC", "American Express"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Chennai", 
        "Pune", "Mumbai", "Gurgaon/NCR"
      ],
      salaryByExperience: {
        entrySalary: "₹5,00,000 - ₹8,00,000",
        midSalary: "₹12,00,000 - ₹20,00,000",
        seniorSalary: "₹25,00,000 - ₹40,00,000",
        leadershipSalary: "₹45,00,000 - ₹90,00,000+"
      },
      outlook: "The data science field in India is experiencing rapid growth with a 35% increase in demand year-over-year. Fintech, e-commerce, and healthcare sectors are the biggest employers. India is becoming a global hub for data science talent, with companies establishing dedicated AI/ML centers of excellence."
    }
  },
  
  "UX/UI Design": {
    salaryTrend: "Steady Growth",
    timeline: {
      entryLevel: "6 months - 1 year",
      midLevel: "2-3 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        "Visual design principles",
        "Typography and color theory",
        "Wireframing and prototyping",
        "User research basics",
        "Design tools (Figma, Adobe XD)",
        "Responsive design concepts"
      ],
      resources: [
        {
          name: "DesignBoat, IxDF courses",
          description: "Structured courses focusing on design fundamentals"
        },
        {
          name: "Design Sprint workshops",
          description: "Practical application of UX methodologies"
        },
        {
          name: "YouTube channels (The Futur, Design Course)",
          description: "Free tutorials on various design topics"
        }
      ],
      projects: [
        {
          name: "UI redesign of existing app",
          description: "Redesign interface of popular local apps"
        },
        {
          name: "User journey mapping",
          description: "Create detailed customer journeys for digital products"
        },
        {
          name: "Design system creation",
          description: "Build a simple component library and style guide"
        }
      ],
      outcomes: "At this stage, you should understand design principles, be proficient with design tools, and have a portfolio showcasing your ability to create visually appealing and functional interfaces."
    },
    intermediate: {
      skills: [
        "Advanced prototyping",
        "Usability testing",
        "Information architecture",
        "Interaction design patterns",
        "Design systems implementation",
        "Accessibility standards"
      ],
      certifications: [
        {
          name: "Google UX Design Professional Certificate",
          description: "Comprehensive UX training from Google"
        },
        {
          name: "Certified Usability Analyst (CUA)",
          description: "Focus on user research and testing methodologies"
        },
        {
          name: "Interaction Design Foundation certification",
          description: "Specialized courses in various UX domains"
        }
      ],
      milestones: [
        {
          name: "UI Designer to UX/UI Designer",
          description: "Expanding from visual design to user experience"
        },
        {
          name: "Leading design for significant features",
          description: "Owning the design process for major product components"
        },
        {
          name: "Collaborative work with product and development",
          description: "Effectively communicating design decisions across teams"
        }
      ],
      outcomes: "By this stage, you should be able to lead design projects, conduct user research, and translate business requirements into user-centered designs. Typical salary range is ₹8,00,000 to ₹18,00,000 annually."
    },
    advanced: {
      specializations: [
        {
          name: "UX Research Lead",
          description: "Focus on user research methodologies and insights"
        },
        {
          name: "Design Systems Architect",
          description: "Creating scalable design systems for large organizations"
        },
        {
          name: "Product Designer",
          description: "Holistic product thinking beyond just interface design"
        }
      ],
      leadership: [
        {
          title: "Design Manager",
          description: "Leading a team of designers and establishing processes"
        },
        {
          title: "Head of Design",
          description: "Setting design strategy and standards across products"
        },
        {
          title: "Chief Design Officer",
          description: "Executive-level role focusing on design as strategic advantage"
        }
      ],
      industryImpact: "Senior designers in India are shaping how products are built for the diverse Indian market, speaking at events like DesignUp and India HCI, and bridging global design practices with local user needs."
    },
    indianMarket: {
      topCompanies: [
        "Flipkart", "Swiggy", "Zomato", 
        "PhonePe", "PayTM", "CRED", 
        "Microsoft", "Google", "Amazon", 
        "Lollypop Design Studio", "Obvious"
      ],
      regions: [
        "Bangalore", "Mumbai", "Gurgaon/NCR", 
        "Hyderabad", "Pune", "Chennai"
      ],
      salaryByExperience: {
        entrySalary: "₹4,00,000 - ₹8,00,000",
        midSalary: "₹8,00,000 - ₹18,00,000",
        seniorSalary: "₹20,00,000 - ₹35,00,000",
        leadershipSalary: "₹40,00,000 - ₹70,00,000+"
      },
      outlook: "The UX/UI design field in India has matured significantly, with companies recognizing the business value of good design. Startups and product companies offer the highest salaries and growth opportunities. There's increasing demand for designers who understand the diverse Indian user base across languages and digital literacy levels."
    }
  },
  
  "Full-Stack Developer": {
    salaryTrend: "High Demand",
    timeline: {
      entryLevel: "1 year",
      midLevel: "2-3 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        "HTML, CSS, JavaScript fundamentals",
        "Frontend framework (React, Angular, Vue)",
        "Backend basics (Node.js, Express, Django, etc.)",
        "Database fundamentals (SQL, MongoDB)",
        "RESTful API development",
        "Version control with Git"
      ],
      resources: [
        {
          name: "Scaler Academy, Newton School",
          description: "Structured full-stack bootcamps with placements"
        },
        {
          name: "freeCodeCamp, The Odin Project",
          description: "Free comprehensive web development curriculum"
        },
        {
          name: "YouTube channels (Traversy Media, CodeWithHarry)",
          description: "Project-based learning videos"
        }
      ],
      projects: [
        {
          name: "Personal blog/portfolio",
          description: "Full-stack website with admin dashboard"
        },
        {
          name: "E-commerce clone",
          description: "Shopping cart, user authentication, product listing"
        },
        {
          name: "Social media feed",
          description: "Building a dynamic content feed with interactions"
        }
      ],
      outcomes: "At this stage, you should be able to build complete web applications from frontend to backend, understand database design, and deploy simple applications to production."
    },
    intermediate: {
      skills: [
        "Advanced frontend (state management, performance optimization)",
        "Microservices architecture",
        "Cloud deployment (AWS, Azure, GCP)",
        "Authentication systems and security",
        "Testing (unit, integration, E2E)",
        "CI/CD pipelines"
      ],
      certifications: [
        {
          name: "AWS Certified Developer",
          description: "Cloud skills for deploying and managing applications"
        },
        {
          name: "MongoDB Certified Developer",
          description: "Database design and optimization skills"
        },
        {
          name: "Specialization certifications from edX, Coursera",
          description: "Deep dives into specific technologies"
        }
      ],
      milestones: [
        {
          name: "Junior to Mid-level Developer",
          description: "Leading feature implementation independently"
        },
        {
          name: "Mentoring junior developers",
          description: "Providing technical guidance and code reviews"
        },
        {
          name: "Participating in system design",
          description: "Contributing to architectural decisions"
        }
      ],
      outcomes: "By this stage, you should be architecting complex applications, making technology stack decisions, and implementing best practices for security and performance. Expect to earn between ₹10,00,000 to ₹18,00,000 annually."
    },
    advanced: {
      specializations: [
        {
          name: "Technical Architect",
          description: "Designing large-scale distributed systems"
        },
        {
          name: "DevOps Engineer",
          description: "Focusing on deployment infrastructure and automation"
        },
        {
          name: "Performance Engineer",
          description: "Specialized in optimizing application performance"
        }
      ],
      leadership: [
        {
          title: "Technical Lead",
          description: "Leading development teams of 5-10 people"
        },
        {
          title: "Engineering Manager",
          description: "Managing multiple teams and technical direction"
        },
        {
          title: "CTO",
          description: "Setting technical vision and strategy, especially in startups"
        }
      ],
      industryImpact: "Senior full-stack developers can contribute to open source, speak at conferences like JSFoo and React India, and mentor the next generation through initiatives like developer meetups and hackathons."
    },
    indianMarket: {
      topCompanies: [
        "FAANG (Meta, Amazon, etc.)", "Flipkart", "Swiggy", 
        "Razorpay", "CRED", "Meesho", 
        "Zomato", "Ola", "Byju's", 
        "PayTM", "Freshworks"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Gurgaon/NCR", "Chennai", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹4,50,000 - ₹8,00,000",
        midSalary: "₹10,00,000 - ₹18,00,000",
        seniorSalary: "₹20,00,000 - ₹35,00,000",
        leadershipSalary: "₹40,00,000 - ₹80,00,000+"
      },
      outlook: "Full-stack development remains one of the most in-demand skills in India's tech ecosystem. Product-based companies and well-funded startups offer significantly higher compensation than service companies. Remote opportunities have expanded the market, with international companies hiring Indian developers at competitive rates."
    }
  },
  
  "Default roadmap": {
    salaryTrend: "Varies by Industry",
    timeline: {
      entryLevel: "1 year",
      midLevel: "2-4 years",
      seniorLevel: "5+ years"
    },
    beginner: {
      skills: [
        "Foundational technical skills",
        "Industry-specific knowledge",
        "Basic tools and software proficiency",
        "Problem-solving abilities",
        "Communication skills",
        "Time management"
      ],
      resources: [
        {
          name: "Online learning platforms",
          description: "Coursera, Udemy, edX for structured learning"
        },
        {
          name: "Industry certification programs",
          description: "Entry-level certifications in your chosen field"
        },
        {
          name: "Free learning resources",
          description: "YouTube tutorials, blogs, and open educational resources"
        }
      ],
      projects: [
        {
          name: "Portfolio projects",
          description: "Build examples of your work to showcase skills"
        },
        {
          name: "Volunteer opportunities",
          description: "Gain experience through pro-bono work"
        },
        {
          name: "Personal skill-building projects",
          description: "Self-directed projects to develop capabilities"
        }
      ],
      outcomes: "At this stage, you should understand the fundamentals of your field, have basic technical skills, and be ready for entry-level positions or internships."
    },
    intermediate: {
      skills: [
        "Advanced technical abilities",
        "Specialized knowledge areas",
        "Project management",
        "Mentoring and leadership",
        "Industry best practices",
        "Cross-functional collaboration"
      ],
      certifications: [
        {
          name: "Professional-level certifications",
          description: "Industry-recognized credentials for your field"
        },
        {
          name: "Specialized training programs",
          description: "Advanced courses in your area of expertise"
        },
        {
          name: "Management and leadership training",
          description: "Developing soft skills for career advancement"
        }
      ],
      milestones: [
        {
          name: "Individual contributor to specialist",
          description: "Becoming recognized for expertise in specific areas"
        },
        {
          name: "Taking on leadership responsibilities",
          description: "Leading projects or mentoring junior team members"
        },
        {
          name: "Industry recognition",
          description: "Having work recognized by peers and industry"
        }
      ],
      outcomes: "By this stage, you should have developed specialized expertise, be able to lead projects, and have established yourself as a valuable professional in your field."
    },
    advanced: {
      specializations: [
        {
          name: "Expert specialist",
          description: "Becoming a recognized authority in a specific domain"
        },
        {
          name: "Leadership track",
          description: "Moving into management and strategic roles"
        },
        {
          name: "Consultant or advisor",
          description: "Providing expert guidance across organizations"
        }
      ],
      leadership: [
        {
          title: "Team Lead or Manager",
          description: "Leading teams and developing talent"
        },
        {
          title: "Director or Department Head",
          description: "Setting strategy and direction for departments"
        },
        {
          title: "Executive Leadership",
          description: "C-suite or senior leadership positions"
        }
      ],
      industryImpact: "At the advanced stage, professionals can shape industry standards, mentor the next generation, speak at conferences, and contribute to the evolution of their field."
    },
    indianMarket: {
      topCompanies: [
        "Major Indian enterprises", "Multinational corporations", 
        "Leading startups", "Public sector organizations", 
        "Consulting firms", "Industry leaders"
      ],
      regions: [
        "Major metropolitan cities", "Emerging tech hubs", 
        "Industry-specific regions", "Special economic zones"
      ],
      salaryByExperience: {
        entrySalary: "₹3,00,000 - ₹6,00,000",
        midSalary: "₹7,00,000 - ₹15,00,000",
        seniorSalary: "₹18,00,000 - ₹30,00,000",
        leadershipSalary: "₹35,00,000 - ₹75,00,000+"
      },
      outlook: "Career prospects vary significantly by industry, with technology, finance, and healthcare generally offering the strongest growth opportunities. The Indian market continues to evolve, with increasing specialization and opportunities for professionals who combine technical expertise with management skills."
    }
  }
};

export const getRoadmapForCareer = (careerName: string): RoadmapData => {
  return detailedRoadmaps[careerName] || detailedRoadmaps["default"];
};
