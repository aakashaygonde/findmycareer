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
        {
          name: "Visual design principles",
          description: "Understanding composition, color theory, layout, and visual hierarchy to create appealing designs"
        },
        {
          name: "Typography and color theory",
          description: "Mastering font selection, pairing, and color schemes to communicate brand personality"
        },
        {
          name: "Wireframing and prototyping",
          description: "Creating low and high-fidelity mockups to demonstrate interface functionality and flow"
        },
        {
          name: "User research basics",
          description: "Learning how to conduct user interviews, create personas, and map user journeys"
        },
        {
          name: "Design tools (Figma, Adobe XD)",
          description: "Becoming proficient with industry-standard design software for creating mockups and prototypes"
        },
        {
          name: "Responsive design concepts",
          description: "Understanding how to design for different screen sizes and device capabilities"
        }
      ],
      resources: [
        {
          name: "DesignBoat, IxDF courses",
          description: "Structured courses focusing on design fundamentals and industry-specific best practices"
        },
        {
          name: "Design Sprint workshops",
          description: "Practical application of UX methodologies through focused, rapid prototyping sessions"
        },
        {
          name: "YouTube channels (The Futur, Design Course)",
          description: "Free tutorials on various design topics from established professionals in the field"
        }
      ],
      projects: [
        {
          name: "UI redesign of existing app",
          description: "Redesign interface of popular local apps to improve usability and visual appeal"
        },
        {
          name: "User journey mapping",
          description: "Create detailed customer journeys for digital products to identify pain points and opportunities"
        },
        {
          name: "Design system creation",
          description: "Build a simple component library and style guide for consistent design implementation"
        }
      ],
      outcomes: "At this stage, you should understand design principles, be proficient with design tools, and have a portfolio showcasing your ability to create visually appealing and functional interfaces."
    },
    intermediate: {
      skills: [
        {
          name: "Advanced prototyping",
          description: "Creating high-fidelity interactive prototypes that closely simulate real application behavior"
        },
        {
          name: "Usability testing",
          description: "Conducting structured tests to evaluate how real users interact with designs"
        },
        {
          name: "Information architecture",
          description: "Organizing and structuring content for optimal user navigation and comprehension"
        },
        {
          name: "Interaction design patterns",
          description: "Implementing established patterns and innovating new solutions for complex interactions"
        },
        {
          name: "Design systems implementation",
          description: "Creating comprehensive design systems with components, guidelines, and documentation"
        },
        {
          name: "Accessibility standards",
          description: "Ensuring designs are inclusive and usable by people with diverse abilities and needs"
        }
      ],
      certifications: [
        {
          name: "Google UX Design Professional Certificate",
          description: "Comprehensive UX training from Google covering the entire design process"
        },
        {
          name: "Certified Usability Analyst (CUA)",
          description: "Focus on user research and testing methodologies for creating user-centered designs"
        },
        {
          name: "Interaction Design Foundation certification",
          description: "Specialized courses in various UX domains from a respected industry organization"
        }
      ],
      milestones: [
        {
          name: "UI Designer to UX/UI Designer",
          description: "Expanding from visual design to user experience research and strategy"
        },
        {
          name: "Leading design for significant features",
          description: "Owning the design process for major product components or entire product lines"
        },
        {
          name: "Collaborative work with product and development",
          description: "Effectively communicating design decisions across teams and influencing product direction"
        }
      ],
      outcomes: "By this stage, you should be able to lead design projects, conduct user research, and translate business requirements into user-centered designs. Typical salary range is ₹8,00,000 to ₹18,00,000 annually."
    },
    advanced: {
      specializations: [
        {
          name: "UX Research Lead",
          description: "Focus on user research methodologies and insights to drive product strategy"
        },
        {
          name: "Design Systems Architect",
          description: "Creating scalable design systems for large organizations with multiple products"
        },
        {
          name: "Product Designer",
          description: "Holistic product thinking beyond just interface design, including business strategy"
        }
      ],
      leadership: [
        {
          title: "Design Manager",
          description: "Leading a team of designers and establishing processes for effective design work"
        },
        {
          title: "Head of Design",
          description: "Setting design strategy and standards across products and influencing company direction"
        },
        {
          title: "Chief Design Officer",
          description: "Executive-level role focusing on design as strategic advantage for the organization"
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
    salaryTrend: "Growing Rapidly",
    timeline: {
      entryLevel: "6 months - 1 year",
      midLevel: "2-3 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        {
          name: "HTML, CSS & JavaScript",
          description: "Master the fundamental building blocks of web development including semantic HTML, responsive CSS, and modern JavaScript ES6+"
        },
        {
          name: "Frontend Framework (React)",
          description: "Learn a popular frontend framework like React, including components, state management, and hooks"
        },
        {
          name: "Node.js Fundamentals",
          description: "Understand server-side JavaScript with Node.js including npm, express, and RESTful API development"
        },
        {
          name: "Database Management",
          description: "Learn both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) database systems, including CRUD operations and data modeling"
        },
        {
          name: "Version Control (Git)",
          description: "Master repository management, branching, merging, and collaborative workflows with Git and GitHub"
        }
      ],
      resources: [
        {
          name: "The Odin Project, freeCodeCamp",
          description: "Free comprehensive full-stack curriculum with hands-on projects and community support"
        },
        {
          name: "Masai School, Newton School",
          description: "Intensive bootcamps with placement assistance specifically tailored for the Indian market"
        },
        {
          name: "Udemy courses by Stephen Grider, Maximilian Schwarzmüller",
          description: "Comprehensive project-based courses covering both frontend and backend technologies"
        }
      ],
      projects: [
        {
          name: "Personal portfolio website",
          description: "Build a responsive portfolio site with HTML, CSS, JavaScript and deploy it to GitHub Pages or Netlify"
        },
        {
          name: "MERN stack to-do application",
          description: "Create a full-stack task manager with MongoDB, Express, React, and Node.js with user authentication"
        },
        {
          name: "E-commerce platform",
          description: "Develop a basic online store with product listings, shopping cart, checkout process, and admin dashboard"
        }
      ],
      outcomes: "Gain proficiency in both frontend and backend technologies, build complete web applications independently, and develop the problem-solving skills needed for entry-level full-stack positions"
    },
    intermediate: {
      skills: [
        {
          name: "Advanced React patterns",
          description: "Master context API, hooks, custom hooks, and advanced state management with Redux or similar libraries"
        },
        {
          name: "Backend architecture",
          description: "Design scalable APIs, implement authentication/authorization, and handle middleware effectively"
        },
        {
          name: "Database optimization",
          description: "Learn advanced querying, indexing strategies, and performance tuning for databases"
        },
        {
          name: "DevOps basics",
          description: "Understand CI/CD pipelines, Docker containerization, and cloud deployment with AWS, Azure or GCP"
        },
        {
          name: "Testing methodologies",
          description: "Implement comprehensive testing strategies including unit, integration, and end-to-end testing"
        },
        {
          name: "TypeScript",
          description: "Add static typing to JavaScript applications for improved code quality and developer experience"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer Associate",
          description: "Cloud deployment and serverless architecture skills for modern web applications"
        },
        {
          name: "MongoDB Developer Certification",
          description: "Advanced database design, optimization, and best practices for NoSQL databases"
        },
        {
          name: "Professional React or Node.js certifications",
          description: "Specialized credentials from platforms like LinkedIn Learning or industry associations"
        }
      ],
      milestones: [
        {
          name: "Lead feature development",
          description: "Take ownership of complete features from design to deployment while mentoring junior developers"
        },
        {
          name: "System architecture design",
          description: "Contribute to architectural decisions and implement scalable technical solutions"
        },
        {
          name: "Open source contributions",
          description: "Participate in open source projects or develop libraries used by the community"
        }
      ],
      outcomes: "Become proficient in full-stack architecture, lead technical implementations, optimize application performance, and make significant contributions to large-scale projects"
    },
    advanced: {
      specializations: [
        {
          name: "Systems Architect",
          description: "Design complex distributed systems, make critical technology decisions, and ensure scalability across the stack"
        },
        {
          name: "DevOps Specialist",
          description: "Focus on automated deployment, infrastructure as code, and monitoring/observability for high-availability systems"
        },
        {
          name: "Performance Optimization Expert",
          description: "Specialize in identifying and resolving performance bottlenecks across frontend and backend systems"
        }
      ],
      leadership: [
        {
          title: "Tech Lead",
          description: "Lead a team of 5-10 full-stack developers, make architectural decisions, and ensure project delivery"
        },
        {
          title: "Engineering Manager",
          description: "Manage multiple teams, handle resource allocation, and drive technical strategy"
        },
        {
          title: "CTO/VP of Engineering",
          description: "Define technical vision, make strategic decisions, and lead digital transformation initiatives"
        }
      ],
      industryImpact: "Shape the technology landscape through architectural innovations, mentoring the next generation of developers, and contributing to the developer community through open source, speaking engagements, and thought leadership"
    },
    indianMarket: {
      topCompanies: [
        "TCS", "Infosys", "Wipro", 
        "Amazon", "Microsoft", 
        "Razorpay", "Swiggy", 
        "Zomato", "CRED", 
        "PhonePe", "Zerodha"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Chennai", "Gurgaon/NCR", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹4-8 LPA",
        midSalary: "₹10-20 LPA",
        seniorSalary: "₹20-40 LPA",
        leadershipSalary: "₹40-80+ LPA"
      },
      outlook: "Full-stack developers are in high demand across India, with particularly strong growth in fintech, e-commerce, and SaaS sectors. The remote work trend has further expanded opportunities beyond traditional tech hubs."
    }
  },
  
  "Frontend Developer": {
    salaryTrend: "Strong Growth",
    timeline: {
      entryLevel: "4-8 months",
      midLevel: "1-3 years",
      seniorLevel: "3+ years"
    },
    beginner: {
      skills: [
        {
          name: "HTML5 & CSS3",
          description: "Master semantic HTML elements, responsive design with CSS Grid/Flexbox, and CSS variables/preprocessing"
        },
        {
          name: "JavaScript Fundamentals",
          description: "Learn core JS concepts including DOM manipulation, events, async programming with Promises, and ES6+ features"
        },
        {
          name: "React.js",
          description: "Understand components, props, state, hooks, and the component lifecycle in modern React applications"
        },
        {
          name: "Responsive Design",
          description: "Create mobile-first layouts that adapt to various screen sizes and devices using media queries and flexible units"
        },
        {
          name: "Web Performance Basics",
          description: "Learn image optimization, lazy loading, and performance measuring tools to create fast-loading websites"
        }
      ],
      resources: [
        {
          name: "freeCodeCamp, Frontend Masters",
          description: "Structured curriculum and workshops by industry experts covering modern frontend technologies"
        },
        {
          name: "CSS-Tricks, Smashing Magazine",
          description: "In-depth articles and tutorials on frontend development best practices and techniques"
        },
        {
          name: "Web Dev Simplified, Traversy Media (YouTube)",
          description: "Video tutorials with practical project-based learning covering various frontend topics"
        }
      ],
      projects: [
        {
          name: "Portfolio website",
          description: "Build a responsive personal portfolio showcasing your projects and skills with modern CSS techniques"
        },
        {
          name: "Interactive dashboard",
          description: "Create a data visualization interface with charts, filters, and interactive elements using React"
        },
        {
          name: "E-commerce UI",
          description: "Develop product listing pages, shopping cart, and checkout flow with responsive design and accessibility"
        }
      ],
      outcomes: "Develop proficiency in creating modern, responsive user interfaces, gain practical experience with React components, and build a portfolio showcasing your frontend skills"
    },
    intermediate: {
      skills: [
        {
          name: "State management",
          description: "Master Redux, Context API, or other state management libraries for complex application state"
        },
        {
          name: "TypeScript",
          description: "Implement static typing in frontend applications for improved code quality and developer experience"
        },
        {
          name: "Testing",
          description: "Write effective tests using Jest, React Testing Library, and Cypress for unit and end-to-end testing"
        },
        {
          name: "Performance optimization",
          description: "Implement code splitting, memoization, virtualization, and other techniques to optimize React applications"
        },
        {
          name: "CSS Architecture",
          description: "Design scalable CSS systems using methodologies like BEM, CSS Modules, or styled-components"
        },
        {
          name: "Frontend build tools",
          description: "Master Webpack, Vite, and other modern build tools for optimizing application delivery"
        }
      ],
      certifications: [
        {
          name: "Meta Frontend Developer Certificate",
          description: "Industry-recognized credential covering React and modern frontend development practices"
        },
        {
          name: "Google UX Design Certificate",
          description: "Learn design thinking and user experience principles to enhance your frontend development"
        },
        {
          name: "AWS Certified Developer - Associate",
          description: "Cloud integration skills for modern frontend applications with backend services"
        }
      ],
      milestones: [
        {
          name: "Lead UI development",
          description: "Take ownership of the user interface for significant features or entire products"
        },
        {
          name: "Create component libraries",
          description: "Design and implement reusable component systems and design systems for consistent UI"
        },
        {
          name: "Drive accessibility initiatives",
          description: "Champion web accessibility standards and implement inclusive design practices"
        }
      ],
      outcomes: "Master advanced frontend patterns, optimize application performance, build scalable UI architectures, and become a go-to resource for frontend challenges within your organization"
    },
    advanced: {
      specializations: [
        {
          name: "UI Architecture",
          description: "Design complex frontend systems, implement micro-frontend architectures, and lead design system development"
        },
        {
          name: "Performance Engineering",
          description: "Specialize in measuring and optimizing web performance metrics and user experience"
        },
        {
          name: "Interactive Data Visualization",
          description: "Create complex data visualization systems and interactive dashboards with D3.js or similar libraries"
        }
      ],
      leadership: [
        {
          title: "Frontend Tech Lead",
          description: "Lead frontend teams, establish coding standards, and make architectural decisions"
        },
        {
          title: "UI Engineering Manager",
          description: "Manage frontend teams, mentor developers, and align UI development with product goals"
        },
        {
          title: "Director of Frontend Engineering",
          description: "Set frontend technology strategy and lead multiple teams across an organization"
        }
      ],
      industryImpact: "Shape frontend development practices through speaking at conferences, contributing to open source libraries, writing technical articles, and mentoring the next generation of UI developers"
    },
    indianMarket: {
      topCompanies: [
        "Flipkart", "Amazon", "Swiggy", 
        "MakeMyTrip", "Paytm", 
        "Razorpay", "Ola", 
        "TCS", "Infosys", 
        "CRED", "Dream11"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Gurgaon/NCR", "Mumbai", "Chennai"
      ],
      salaryByExperience: {
        entrySalary: "₹3-7 LPA",
        midSalary: "₹8-18 LPA",
        seniorSalary: "₹18-35 LPA",
        leadershipSalary: "₹35-60+ LPA"
      },
      outlook: "Frontend developers with React skills are in high demand across India's tech landscape, particularly in e-commerce, fintech, and product companies. Companies increasingly value frontend expertise as user experience becomes a key competitive differentiator."
    }
  },
  
  "Backend Developer": {
    salaryTrend: "Steadily Growing",
    timeline: {
      entryLevel: "6 months - 1 year",
      midLevel: "2-4 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        {
          name: "Server-side language",
          description: "Master a backend language such as Node.js, Python, Java, or Go, including syntax and core programming concepts"
        },
        {
          name: "API development",
          description: "Build RESTful APIs and understand HTTP methods, status codes, and API design principles"
        },
        {
          name: "Database management",
          description: "Learn SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) databases, including schema design and CRUD operations"
        },
        {
          name: "Authentication & authorization",
          description: "Implement user authentication with JWT, OAuth, and role-based access control systems"
        },
        {
          name: "Version control & CI/CD basics",
          description: "Use Git for version control and understand basic continuous integration and deployment workflows"
        }
      ],
      resources: [
        {
          name: "Backend roadmaps on roadmap.sh",
          description: "Structured learning paths for different backend technologies and languages"
        },
        {
          name: "Node.js documentation, Python Django tutorials",
          description: "Official documentation and tutorials for popular backend frameworks"
        },
        {
          name: "Udemy courses (Node.js, Spring Boot, Django)",
          description: "Comprehensive courses covering backend development with practical projects"
        }
      ],
      projects: [
        {
          name: "RESTful API",
          description: "Create a complete CRUD API with authentication, proper error handling, and data validation"
        },
        {
          name: "User management system",
          description: "Build a backend for user registration, authentication, and profile management"
        },
        {
          name: "Data processing service",
          description: "Develop a service that processes and analyzes data from external sources or APIs"
        }
      ],
      outcomes: "Develop the ability to create secure, efficient backend services, understand database management, and implement proper API design for modern web applications"
    },
    intermediate: {
      skills: [
        {
          name: "Advanced database concepts",
          description: "Master database optimization, indexing strategies, transactions, and advanced query optimization"
        },
        {
          name: "Microservices architecture",
          description: "Design and implement distributed systems with separate, specialized services"
        },
        {
          name: "Caching strategies",
          description: "Implement Redis, Memcached, or similar technologies for performance optimization"
        },
        {
          name: "Message queues & event-driven architecture",
          description: "Use RabbitMQ, Kafka, or similar tools for asynchronous processing and service communication"
        },
        {
          name: "Containerization & orchestration",
          description: "Deploy applications with Docker and manage them with Kubernetes or similar platforms"
        },
        {
          name: "API security",
          description: "Protect against common vulnerabilities, implement rate limiting, and secure sensitive data"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer Associate",
          description: "Cloud-native backend development using AWS services and best practices"
        },
        {
          name: "MongoDB Developer Certification",
          description: "Specialized database skills for NoSQL data modeling and optimization"
        },
        {
          name: "Microsoft Azure Developer Associate",
          description: "Backend development skills using Azure cloud services and solutions"
        }
      ],
      milestones: [
        {
          name: "Design complex systems",
          description: "Architect scalable backend solutions for high-traffic or data-intensive applications"
        },
        {
          name: "Performance optimization",
          description: "Identify and resolve bottlenecks to improve system throughput and response times"
        },
        {
          name: "Technical documentation",
          description: "Create comprehensive API documentation and technical specifications for complex systems"
        }
      ],
      outcomes: "Become proficient in designing scalable, maintainable backend architectures, optimize system performance, and implement advanced features like microservices and event-driven systems"
    },
    advanced: {
      specializations: [
        {
          name: "Distributed Systems Architect",
          description: "Design highly available, fault-tolerant systems that can scale horizontally across multiple servers"
        },
        {
          name: "Database Specialist",
          description: "Focus on advanced database administration, optimization, and data architecture"
        },
        {
          name: "Cloud Infrastructure Expert",
          description: "Specialize in serverless architectures, infrastructure as code, and complex cloud deployments"
        }
      ],
      leadership: [
        {
          title: "Backend Tech Lead",
          description: "Lead backend development teams, make architectural decisions, and ensure scalable implementations"
        },
        {
          title: "Engineering Manager",
          description: "Manage development teams while maintaining technical expertise and strategic planning"
        },
        {
          title: "Chief Architect",
          description: "Define system architecture across the organization and establish technical standards"
        }
      ],
      industryImpact: "Influence backend development practices through system architecture innovations, contributing to open source tools, speaking at conferences, and mentoring emerging backend developers"
    },
    indianMarket: {
      topCompanies: [
        "Amazon", "Microsoft", "Google", 
        "Flipkart", "Paytm", "Razorpay", 
        "TCS", "Infosys", "Wipro", 
        "MakeMyTrip", "Ola", "PhonePe"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Chennai", "Gurgaon/NCR", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹5-8 LPA",
        midSalary: "₹10-22 LPA",
        seniorSalary: "₹22-45 LPA",
        leadershipSalary: "₹45-90+ LPA"
      },
      outlook: "Backend developers are consistently in high demand across India's tech industry, with particularly strong demand in fintech, SaaS, and e-commerce sectors. Companies value backend expertise for building scalable platforms that can handle India's large and growing digital user base."
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
        {
          name: "Foundational technical skills",
          description: "Building the core technical abilities required for your specific field"
        },
        {
          name: "Industry-specific knowledge",
          description: "Understanding the domain, terminology, and best practices of your industry"
        },
        {
          name: "Basic tools and software proficiency",
          description: "Mastering the essential tools and platforms used in your profession"
        },
        {
          name: "Problem-solving abilities",
          description: "Developing analytical thinking and approaches to overcome challenges"
        },
        {
          name: "Communication skills",
          description: "Learning to effectively communicate ideas, progress, and results"
        },
        {
          name: "Time management",
          description: "Organizing tasks, meeting deadlines, and balancing multiple priorities"
        }
      ],
      resources: [
        {
          name: "Online learning platforms",
          description: "Coursera, Udemy, edX for structured learning with certificates and projects"
        },
        {
          name: "Industry certification programs",
          description: "Entry-level certifications in your chosen field to validate skills"
        },
        {
          name: "Free learning resources",
          description: "YouTube tutorials, blogs, and open educational resources for self-paced learning"
        }
      ],
      projects: [
        {
          name: "Portfolio projects",
          description: "Build examples of your work to showcase skills and demonstrate capabilities"
        },
        {
          name: "Volunteer opportunities",
          description: "Gain experience through pro-bono work for non-profits or community organizations"
        },
        {
          name: "Personal skill-building projects",
          description: "Self-directed projects to develop capabilities in specific areas of interest"
        }
      ],
      outcomes: "At this stage, you should understand the fundamentals of your field, have basic technical skills, and be ready for entry-level positions or internships."
    },
    intermediate: {
      skills: [
        {
          name: "Advanced technical abilities",
          description: "Developing deeper expertise in specialized areas of your field"
        },
        {
          name: "Specialized knowledge areas",
          description: "Focusing on specific domains that align with your career goals"
        },
        {
          name: "Project management",
          description: "Leading initiatives and coordinating resources to achieve objectives"
        },
        {
          name: "Mentoring and leadership",
          description: "Guiding others and taking responsibility for team outcomes"
        },
        {
          name: "Industry best practices",
          description: "Implementing standards and methodologies recognized as optimal in your field"
        },
        {
          name: "Cross-functional collaboration",
          description: "Working effectively with different teams and disciplines across an organization"
        }
      ],
      certifications: [
        {
          name: "Professional-level certifications",
          description: "Industry-recognized credentials for your field that validate advanced skills"
        },
        {
          name: "Specialized training programs",
          description: "Advanced courses in your area of expertise from recognized institutions"
        },
        {
          name: "Management and leadership training",
          description: "Developing soft skills for career advancement and team leadership"
        }
      ],
      milestones: [
        {
          name: "Individual contributor to specialist",
          description: "Becoming recognized for expertise in specific areas within your organization"
        },
        {
          name: "Taking on leadership responsibilities",
          description: "Leading projects or mentoring junior team members as you grow professionally"
        },
        {
          name: "Industry recognition",
          description: "Having work recognized by peers and industry through publications or awards"
        }
      ],
      outcomes: "By this stage, you should have developed specialized expertise, be able to lead projects, and have established yourself as a valuable professional in your field."
    },
    advanced: {
      specializations: [
        {
          name: "Expert specialist",
          description: "Becoming a recognized authority in a specific domain with deep expertise"
        },
        {
          name: "Leadership track",
          description: "Moving into management and strategic roles with broader organizational impact"
        },
        {
          name: "Consultant or advisor",
          description: "Providing expert guidance across organizations based on extensive experience"
        }
      ],
      leadership: [
        {
          title: "Team Lead or Manager",
          description: "Leading teams and developing talent while ensuring project success"
        },
        {
          title: "Director or Department Head",
          description: "Setting strategy and direction for departments with significant responsibility"
        },
        {
          title: "Executive Leadership",
          description: "C-suite or senior leadership positions with company-wide decision-making authority"
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
