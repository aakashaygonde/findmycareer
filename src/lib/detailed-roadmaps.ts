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
    salaryTrend: "High Demand",
    timeline: {
      entryLevel: "1 year",
      midLevel: "2-3 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        {
          name: "HTML, CSS, JavaScript fundamentals",
          description: "Mastering the core building blocks of web development for creating structured, styled, and interactive websites"
        },
        {
          name: "Frontend framework (React, Angular, Vue)",
          description: "Learning a modern JavaScript framework for building dynamic user interfaces with component-based architecture"
        },
        {
          name: "Backend basics (Node.js, Express, Django, etc.)",
          description: "Understanding server-side programming to handle data processing, authentication, and business logic"
        },
        {
          name: "Database fundamentals (SQL, MongoDB)",
          description: "Working with both relational and NoSQL databases to store and query application data efficiently"
        },
        {
          name: "RESTful API development",
          description: "Creating and consuming APIs to enable communication between frontend and backend systems"
        },
        {
          name: "Version control with Git",
          description: "Using Git for collaborative development, tracking changes, and maintaining code history"
        }
      ],
      resources: [
        {
          name: "Scaler Academy, Newton School",
          description: "Structured full-stack bootcamps with placements and industry-oriented curriculum"
        },
        {
          name: "freeCodeCamp, The Odin Project",
          description: "Free comprehensive web development curriculum with hands-on projects and community support"
        },
        {
          name: "YouTube channels (Traversy Media, CodeWithHarry)",
          description: "Project-based learning videos covering various aspects of full-stack development"
        }
      ],
      projects: [
        {
          name: "Personal blog/portfolio",
          description: "Full-stack website with admin dashboard, content management, and responsive design"
        },
        {
          name: "E-commerce clone",
          description: "Building a shopping cart, user authentication, product listing, and payment integration"
        },
        {
          name: "Social media feed",
          description: "Creating a dynamic content feed with interactions like comments, likes, and sharing functionality"
        }
      ],
      outcomes: "At this stage, you should be able to build complete web applications from frontend to backend, understand database design, and deploy simple applications to production."
    },
    intermediate: {
      skills: [
        {
          name: "Advanced frontend (state management, performance optimization)",
          description: "Using libraries like Redux or Context API for state management and techniques to optimize application performance"
        },
        {
          name: "Microservices architecture",
          description: "Designing and implementing distributed systems with separate, specialized services"
        },
        {
          name: "Cloud deployment (AWS, Azure, GCP)",
          description: "Utilizing cloud platforms for hosting, scaling, and managing applications in production"
        },
        {
          name: "Authentication systems and security",
          description: "Implementing secure user authentication, authorization, and protecting against common web vulnerabilities"
        },
        {
          name: "Testing (unit, integration, E2E)",
          description: "Writing automated tests at different levels to ensure code quality and prevent regressions"
        },
        {
          name: "CI/CD pipelines",
          description: "Setting up continuous integration and deployment workflows for automated testing and deployment"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Developer",
          description: "Cloud skills for deploying and managing applications on Amazon Web Services"
        },
        {
          name: "MongoDB Certified Developer",
          description: "Database design and optimization skills for working with MongoDB"
        },
        {
          name: "Specialization certifications from edX, Coursera",
          description: "Deep dives into specific technologies like React, Node.js, or cloud platforms"
        }
      ],
      milestones: [
        {
          name: "Junior to Mid-level Developer",
          description: "Leading feature implementation independently and taking ownership of significant components"
        },
        {
          name: "Mentoring junior developers",
          description: "Providing technical guidance and code reviews to help less experienced team members grow"
        },
        {
          name: "Participating in system design",
          description: "Contributing to architectural decisions and planning for large-scale applications"
        }
      ],
      outcomes: "By this stage, you should be architecting complex applications, making technology stack decisions, and implementing best practices for security and performance. Expect to earn between ₹10,00,000 to ₹18,00,000 annually."
    },
    advanced: {
      specializations: [
        {
          name: "Technical Architect",
          description: "Designing large-scale distributed systems and making high-level technology decisions"
        },
        {
          name: "DevOps Engineer",
          description: "Focusing on deployment infrastructure, automation, and monitoring for optimal system performance"
        },
        {
          name: "Performance Engineer",
          description: "Specialized in optimizing application performance, scalability, and resource utilization"
        }
      ],
      leadership: [
        {
          title: "Technical Lead",
          description: "Leading development teams of 5-10 people and guiding technical implementation"
        },
        {
          title: "Engineering Manager",
          description: "Managing multiple teams and technical direction while balancing people management"
        },
        {
          title: "CTO",
          description: "Setting technical vision and strategy, especially in startups and growing companies"
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
  
  "DevOps Engineer": {
    salaryTrend: "High Demand",
    timeline: {
      entryLevel: "1-2 years",
      midLevel: "3-5 years",
      seniorLevel: "6+ years"
    },
    beginner: {
      skills: [
        {
          name: "Linux fundamentals",
          description: "Master Linux operating system basics, command line interface, and system administration tasks"
        },
        {
          name: "Version control with Git",
          description: "Learn advanced Git workflows, branching strategies, and repository management for collaborative development"
        },
        {
          name: "Basic programming/scripting",
          description: "Develop proficiency in scripting languages like Python, Bash, or PowerShell for automation tasks"
        },
        {
          name: "Cloud platforms",
          description: "Understand fundamental services and architecture in major cloud platforms like AWS, Azure, or GCP"
        },
        {
          name: "Basic networking",
          description: "Learn networking concepts including TCP/IP, DNS, HTTP/HTTPS, and network troubleshooting"
        },
        {
          name: "Containerization basics",
          description: "Understand Docker container concepts, image creation, and basic container orchestration"
        }
      ],
      resources: [
        {
          name: "Online courses and certifications",
          description: "Platform-specific training from AWS, Azure, Google Cloud, and DevOps-focused courses on platforms like Udemy and Coursera"
        },
        {
          name: "Open-source projects",
          description: "Contribute to DevOps tools and automation projects on GitHub to build practical experience"
        },
        {
          name: "DevOps communities",
          description: "Join communities like DevOps India, attend meetups, and participate in online forums like Stack Overflow and Reddit's r/devops"
        }
      ],
      projects: [
        {
          name: "Automated deployment pipeline",
          description: "Build a CI/CD pipeline for a simple application using tools like Jenkins, GitHub Actions, or GitLab CI"
        },
        {
          name: "Infrastructure as Code project",
          description: "Create cloud infrastructure using Terraform or AWS CloudFormation to deploy a multi-tier application"
        },
        {
          name: "Containerization project",
          description: "Containerize an application, create Docker Compose files, and implement basic orchestration"
        }
      ],
      outcomes: "Develop foundational DevOps skills, understand infrastructure automation basics, and gain experience with key DevOps tools to qualify for entry-level positions"
    },
    intermediate: {
      skills: [
        {
          name: "Container orchestration",
          description: "Master Kubernetes for container deployment, scaling, and management in production environments"
        },
        {
          name: "Infrastructure as Code (IaC)",
          description: "Develop expertise in tools like Terraform, AWS CloudFormation, or Azure Resource Manager for infrastructure provisioning"
        },
        {
          name: "CI/CD pipelines",
          description: "Design and implement advanced continuous integration and deployment pipelines with tools like Jenkins, GitHub Actions, or GitLab CI"
        },
        {
          name: "Configuration management",
          description: "Use tools like Ansible, Chef, or Puppet to automate configuration and management of servers at scale"
        },
        {
          name: "Monitoring and observability",
          description: "Implement comprehensive monitoring solutions using tools like Prometheus, Grafana, ELK stack, and distributed tracing"
        },
        {
          name: "Cloud architecture",
          description: "Design resilient, scalable cloud architectures following best practices for security, cost optimization, and performance"
        }
      ],
      certifications: [
        {
          name: "AWS Certified DevOps Engineer",
          description: "Professional certification validating expertise in continuous delivery and process automation on AWS"
        },
        {
          name: "Certified Kubernetes Administrator (CKA)",
          description: "Certification demonstrating ability to install, configure, and manage Kubernetes environments"
        },
        {
          name: "Microsoft Azure DevOps Solutions",
          description: "Certification for implementing DevOps practices, implementing CI/CD, and managing source control on Azure"
        }
      ],
      milestones: [
        {
          name: "Lead DevOps implementations",
          description: "Successfully implement DevOps practices across multiple teams or products, showing measurable improvements"
        },
        {
          name: "Infrastructure optimization",
          description: "Redesign infrastructure to improve reliability, performance, and cost-efficiency"
        },
        {
          name: "Automation champion",
          description: "Create automation solutions that significantly reduce manual operations and improve deployment frequency"
        }
      ],
      outcomes: "Function as a mid-level DevOps engineer capable of designing and implementing comprehensive automation strategies, infrastructure as code solutions, and deployment pipelines"
    },
    advanced: {
      specializations: [
        {
          name: "Platform Engineering",
          description: "Build and maintain internal developer platforms that improve productivity and standardize workflows"
        },
        {
          name: "Site Reliability Engineering (SRE)",
          description: "Focus on reliability, observability, and performance optimization of large-scale distributed systems"
        },
        {
          name: "DevSecOps",
          description: "Integrate security practices throughout the software development lifecycle and infrastructure management"
        }
      ],
      leadership: [
        {
          title: "DevOps Team Lead",
          description: "Lead a team of DevOps engineers, establish best practices, and drive continuous improvement initiatives"
        },
        {
          title: "Platform Engineering Manager",
          description: "Manage development and evolution of the company's internal platforms and infrastructure"
        },
        {
          title: "Director of Infrastructure",
          description: "Define strategic direction for infrastructure, automation, and operational excellence across the organization"
        }
      ],
      industryImpact: "Influence the broader DevOps community through open-source contributions, speaking at conferences like DevOpsDays India and AWS Community Days, and publishing technical content on modern infrastructure practices"
    },
    indianMarket: {
      topCompanies: [
        "Amazon", "Microsoft", "Google", 
        "Flipkart", "Swiggy", "Zomato", 
        "Freshworks", "Razorpay", "Ola", 
        "Infosys", "TCS", "Wipro"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Chennai", "Gurgaon/NCR", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹6,00,000 - ₹12,00,000",
        midSalary: "₹15,00,000 - ₹25,00,000",
        seniorSalary: "₹25,00,000 - ₹45,00,000",
        leadershipSalary: "₹45,00,000 - ₹85,00,000+"
      },
      outlook: "DevOps engineering roles are in high demand across India's tech sector, with both product and service companies investing heavily in automation and cloud infrastructure. Remote work options have expanded opportunities, with many engineers working for global companies while based in India"
    }
  },
  "Cybersecurity Analyst": {
    salaryTrend: "Rapidly Growing",
    timeline: {
      entryLevel: "1-2 years",
      midLevel: "3-5 years",
      seniorLevel: "6+ years"
    },
    beginner: {
      skills: [
        {
          name: "Networking fundamentals",
          description: "Understand network protocols, architecture, and common networking tools like Wireshark and tcpdump"
        },
        {
          name: "Operating system security",
          description: "Learn security principles for Windows, Linux, and other operating systems including access controls and hardening"
        },
        {
          name: "Security fundamentals",
          description: "Master core concepts like CIA triad, authentication, authorization, encryption, and common attack vectors"
        },
        {
          name: "Basic scripting",
          description: "Develop skills in Python, Bash, or PowerShell for security automation and tool development"
        },
        {
          name: "Security tools",
          description: "Learn to use common security tools like Nmap, Metasploit, Burp Suite, and vulnerability scanners"
        },
        {
          name: "Security compliance",
          description: "Understand basic regulatory frameworks like ISO 27001, GDPR, and industry-specific standards"
        }
      ],
      resources: [
        {
          name: "Cybersecurity courses",
          description: "Online training from platforms like SANS, Cybrary, TryHackMe, and HackTheBox for hands-on practice"
        },
        {
          name: "Security certifications",
          description: "Entry-level certifications like CompTIA Security+, CEH (Certified Ethical Hacker), or SSCP"
        },
        {
          name: "Cybersecurity communities",
          description: "Join OWASP chapters, Null Community meetups, and online forums like r/netsec and security StackExchange"
        }
      ],
      projects: [
        {
          name: "Vulnerability assessment",
          description: "Conduct security assessments of applications or systems and document findings with remediation plans"
        },
        {
          name: "Security monitoring setup",
          description: "Set up basic SIEM (Security Information and Event Management) systems to collect and analyze security logs"
        },
        {
          name: "CTF (Capture The Flag) challenges",
          description: "Participate in security competitions to practice identifying and exploiting vulnerabilities"
        }
      ],
      outcomes: "Develop foundational cybersecurity knowledge, understand common threats and vulnerabilities, and gain practical experience with security tools for entry-level security roles"
    },
    intermediate: {
      skills: [
        {
          name: "Threat detection and analysis",
          description: "Develop advanced skills in identifying suspicious activities, analyzing malware, and conducting incident response"
        },
        {
          name: "Security architecture",
          description: "Design secure systems and networks applying defense-in-depth principles and security best practices"
        },
        {
          name: "Cloud security",
          description: "Understand security controls and best practices for major cloud providers like AWS, Azure, and GCP"
        },
        {
          name: "Application security",
          description: "Conduct security code reviews, penetration testing, and implement secure coding practices"
        },
        {
          name: "Security automation",
          description: "Develop scripts and workflows to automate security tasks, scanning, and incident response"
        },
        {
          name: "Risk assessment",
          description: "Evaluate security risks, conduct threat modeling, and recommend proportionate security controls"
        }
      ],
      certifications: [
        {
          name: "CISSP (Certified Information Systems Security Professional)",
          description: "Comprehensive security certification covering multiple domains of cybersecurity"
        },
        {
          name: "OSCP (Offensive Security Certified Professional)",
          description: "Hands-on penetration testing certification focused on practical skills"
        },
        {
          name: "Cloud security certifications",
          description: "Platform-specific security certifications like AWS Security Specialty or Azure Security Engineer"
        }
      ],
      milestones: [
        {
          name: "Lead security assessments",
          description: "Independently conduct comprehensive security assessments and provide actionable recommendations"
        },
        {
          name: "Incident response handling",
          description: "Successfully manage security incidents from detection through containment and remediation"
        },
        {
          name: "Security program development",
          description: "Contribute to organizational security policies, standards, and procedures"
        }
      ],
      outcomes: "Function as a skilled cybersecurity professional capable of identifying advanced threats, implementing comprehensive security measures, and leading security initiatives across an organization"
    },
    advanced: {
      specializations: [
        {
          name: "Security Architecture",
          description: "Design secure systems and infrastructure with a focus on scalability, compliance, and defense-in-depth"
        },
        {
          name: "Penetration Testing",
          description: "Specialize in simulating advanced attacks to identify vulnerabilities before malicious actors"
        },
        {
          name: "Security Operations",
          description: "Focus on building and managing security operations centers (SOC) with advanced monitoring capabilities"
        }
      ],
      leadership: [
        {
          title: "Cybersecurity Team Lead",
          description: "Lead a team of security professionals, coordinate security initiatives, and develop team capabilities"
        },
        {
          title: "Security Director",
          description: "Oversee enterprise security programs, manage security teams, and align security with business objectives"
        },
        {
          title: "Chief Information Security Officer (CISO)",
          description: "Executive responsible for the organization's security strategy, governance, and risk management"
        }
      ],
      industryImpact: "Shape cybersecurity practices through participation in industry standards development, speaking at security conferences like NULLCON and c0c0n, and contributing to security research and knowledge sharing"
    },
    indianMarket: {
      topCompanies: [
        "IBM", "Cisco", "Microsoft", 
        "TCS", "Wipro", "HCL", 
        "Paytm", "Razorpay", "PhonePe", 
        "KPMG", "EY", "Deloitte"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Chennai", "Gurgaon/NCR", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹5,00,000 - ₹10,00,000",
        midSalary: "₹12,00,000 - ₹25,00,000",
        seniorSalary: "₹25,00,000 - ₹45,00,000",
        leadershipSalary: "₹50,00,000 - ₹90,00,000+"
      },
      outlook: "Cybersecurity is experiencing explosive growth in India driven by digital transformation, increasing cyber threats, and tightening regulatory requirements. The severe skills shortage means qualified professionals command premium salaries, with financial services, IT, and healthcare sectors having the highest demand"
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
  },
  "Product Management": {
    salaryTrend: "Highly Competitive",
    timeline: {
      entryLevel: "1-2 years",
      midLevel: "3-5 years",
      seniorLevel: "6+ years"
    },
    beginner: {
      skills: [
        {
          name: "User-centered design",
          description: "Understand user needs through research, personas, journey mapping, and usability testing methodologies"
        },
        {
          name: "Agile methodologies",
          description: "Learn Scrum, Kanban, and sprint planning practices for effective product development cycles"
        },
        {
          name: "Market research",
          description: "Master competitor analysis, market sizing, and identifying market opportunities and gaps"
        },
        {
          name: "Data analysis fundamentals",
          description: "Use tools like Excel, SQL basics, and Google Analytics to make data-driven decisions"
        },
        {
          name: "Communication skills",
          description: "Effectively present product ideas, write specifications, and facilitate discussions between stakeholders"
        }
      ],
      resources: [
        {
          name: "Product management courses",
          description: "Online courses from Coursera, Udemy, or specialized platforms like Product School and UpGrad"
        },
        {
          name: "Product management communities",
          description: "Join communities like Mind the Product, ProductHunt, and Indian Product Managers for networking and learning"
        },
        {
          name: "Books and podcasts",
          description: "Read 'Inspired' by Marty Cagan, 'The Lean Product Playbook', and listen to podcasts like 'Product Talk'"
        }
      ],
      projects: [
        {
          name: "Product requirement document (PRD)",
          description: "Create detailed PRDs for imaginary products with user stories, acceptance criteria, and wireframes"
        },
        {
          name: "Competitive analysis",
          description: "Conduct in-depth competitor research for an existing product with feature comparison and opportunity identification"
        },
        {
          name: "User research project",
          description: "Design and execute user interviews, surveys, and analyze findings to inform product decisions"
        }
      ],
      outcomes: "Develop fundamental product thinking skills, understand the product development process, and build a portfolio of sample product documents for entry-level product roles"
    },
    intermediate: {
      skills: [
        {
          name: "Product strategy",
          description: "Define product vision, roadmaps, and prioritization frameworks like RICE or KANO model"
        },
        {
          name: "Business acumen",
          description: "Understand business models, revenue streams, and translate business requirements into product features"
        },
        {
          name: "Technical fluency",
          description: "Gain sufficient technical knowledge to effectively communicate with engineering teams and understand technical constraints"
        },
        {
          name: "A/B testing and experimentation",
          description: "Design experiments, analyze results, and make data-driven product decisions"
        },
        {
          name: "Product analytics",
          description: "Use tools like Mixpanel, Amplitude, or custom analytics to track key product metrics and user behavior"
        }
      ],
      certifications: [
        {
          name: "Certified Product Manager (CPM)",
          description: "Recognized certification from Association of International Product Marketing & Management (AIPMM)"
        },
        {
          name: "Product School Certifications",
          description: "Specialized certifications like Product Manager Certificate (PMC) or Senior Product Manager Certificate (SPMC)"
        },
        {
          name: "Scrum Product Owner Certification",
          description: "Professional Scrum Product Owner certification to master the product owner role"
        }
      ],
      milestones: [
        {
          name: "Launch major product features",
          description: "Successfully take features from conception to launch, measuring impact and iterating based on feedback"
        },
        {
          name: "Cross-functional leadership",
          description: "Lead product initiatives involving multiple teams, balancing stakeholder needs and technical constraints"
        },
        {
          name: "Product growth metrics",
          description: "Demonstrate measurable product growth through key metrics like user acquisition, retention, and revenue"
        }
      ],
      outcomes: "Lead end-to-end product development, make strategic product decisions, and drive measurable business results through product innovations"
    },
    advanced: {
      specializations: [
        {
          name: "Product Growth",
          description: "Focus on user acquisition, activation, retention, referral, and revenue (AARRR) through experimentation and optimization"
        },
        {
          name: "Enterprise Product Management",
          description: "Specialize in complex B2B products with multiple stakeholders, long sales cycles, and high contract values"
        },
        {
          name: "AI/ML Product Management",
          description: "Lead AI-powered products, understanding machine learning development cycles and ethical considerations"
        }
      ],
      leadership: [
        {
          title: "Senior Product Manager",
          description: "Lead a product area with multiple features, mentor junior PMs, and influence product strategy"
        },
        {
          title: "Product Director",
          description: "Oversee a product line or category, manage a team of product managers, and set strategic direction"
        },
        {
          title: "Chief Product Officer",
          description: "Define overall product vision, build product organizations, and align product strategy with business objectives"
        }
      ],
      industryImpact: "Shape industry product standards, speak at conferences, publish thought leadership content, and influence the future direction of product management practices"
    },
    indianMarket: {
      topCompanies: [
        "Flipkart", "Amazon India", "Swiggy", 
        "Zomato", "PhonePe", "BYJU'S", 
        "Ola", "MakeMyTrip", "Paytm", 
        "Razorpay", "Unacademy", "Meesho"
      ],
      regions: [
        "Bangalore", "Gurgaon/NCR", "Mumbai", 
        "Hyderabad", "Pune", "Chennai"
      ],
      salaryByExperience: {
        entrySalary: "₹8-15 lakhs per annum",
        midSalary: "₹18-30 lakhs per annum",
        seniorSalary: "₹30-60 lakhs per annum",
        leadershipSalary: "₹70 lakhs - 1.5 crores+ per annum"
      },
      outlook: "Strong demand for product managers in India's growing startup ecosystem and established tech companies, with increasing specialization in fintech, edtech, and healthtech sectors"
    }
  },
  "Frontend Developer": {
    salaryTrend: "High Demand",
    timeline: {
      entryLevel: "6 months - 1 year",
      midLevel: "2-3 years",
      seniorLevel: "4+ years"
    },
    beginner: {
      skills: [
        {
          name: "HTML5 fundamentals",
          description: "Master semantic HTML elements, forms, media elements, and structure for accessible web pages"
        },
        {
          name: "CSS3 and responsive design",
          description: "Learn styling, layouts (Flexbox, Grid), responsive design principles, and media queries"
        },
        {
          name: "JavaScript core concepts",
          description: "Understand variables, data types, functions, DOM manipulation, events, and asynchronous programming"
        },
        {
          name: "Version control (Git)",
          description: "Learn repository management, branching, pull requests, and collaborative workflows"
        },
        {
          name: "Web design principles",
          description: "Understand UI/UX fundamentals, color theory, typography, and layout principles"
        },
        {
          name: "Browser developer tools",
          description: "Master debugging, performance analysis, and using console for troubleshooting"
        }
      ],
      resources: [
        {
          name: "freeCodeCamp and The Odin Project",
          description: "Free, structured learning paths with hands-on projects and supportive communities"
        },
        {
          name: "MDN Web Docs",
          description: "Comprehensive documentation for HTML, CSS, and JavaScript with examples and tutorials"
        },
        {
          name: "Frontend Masters and Udemy",
          description: "In-depth courses on frontend technologies taught by industry experts"
        },
        {
          name: "YouTube channels (Traversy Media, Web Dev Simplified)",
          description: "Free video tutorials covering all aspects of frontend development with practical examples"
        }
      ],
      projects: [
        {
          name: "Personal portfolio website",
          description: "Create a responsive portfolio showcasing your skills and projects using HTML, CSS, and JavaScript"
        },
        {
          name: "Interactive landing page",
          description: "Build a modern landing page with animations, responsive design, and interactive elements"
        },
        {
          name: "Simple JavaScript applications",
          description: "Develop small web apps like todo lists, calculators, or weather apps using vanilla JavaScript"
        },
        {
          name: "CSS art or animations",
          description: "Create visually impressive designs or animations using advanced CSS techniques"
        }
      ],
      outcomes: "At this stage, you should be comfortable with core web technologies, able to build responsive websites, implement basic interactivity, and understand fundamental design principles"
    },
    intermediate: {
      skills: [
        {
          name: "JavaScript frameworks (React, Vue, Angular)",
          description: "Master component architecture, state management, and routing in a major frontend framework"
        },
        {
          name: "Advanced CSS and preprocessors",
          description: "Learn Sass/SCSS, CSS-in-JS, CSS modules, and advanced layout techniques"
        },
        {
          name: "Modern JavaScript (ES6+)",
          description: "Implement arrow functions, destructuring, modules, async/await, and other modern JS features"
        },
        {
          name: "State management",
          description: "Master Redux, Context API, Vuex, or other state management solutions for complex applications"
        },
        {
          name: "API integration",
          description: "Work with RESTful APIs, GraphQL, and handle authentication, data fetching, and error handling"
        },
        {
          name: "Testing methodologies",
          description: "Implement unit tests, integration tests, and end-to-end tests using Jest, Cypress, or similar tools"
        },
        {
          name: "Performance optimization",
          description: "Apply code splitting, lazy loading, asset optimization, and performance monitoring techniques"
        }
      ],
      certifications: [
        {
          name: "Meta Frontend Developer Professional Certificate",
          description: "Comprehensive certification covering React and modern frontend development practices"
        },
        {
          name: "JavaScript framework certifications",
          description: "Official certifications for Angular, Vue.js, or React Native to validate specialized knowledge"
        },
        {
          name: "Google UX Design Professional Certificate",
          description: "Learn design thinking, wireframing, prototyping, and user research to enhance frontend skills"
        }
      ],
      milestones: [
        {
          name: "Complex single-page applications",
          description: "Build full-featured SPAs with routing, state management, and API integration"
        },
        {
          name: "Contributing to open source",
          description: "Make meaningful contributions to frontend libraries, frameworks, or tools"
        },
        {
          name: "Mentoring junior developers",
          description: "Help newer developers through code reviews, pair programming, and knowledge sharing"
        },
        {
          name: "Frontend technical blogs",
          description: "Share knowledge through writing articles about frontend development challenges and solutions"
        }
      ],
      outcomes: "Develop expertise in modern JavaScript frameworks, create complex interactive applications, implement best practices for performance and testing, and begin specializing in particular areas of frontend development"
    },
    advanced: {
      specializations: [
        {
          name: "Frontend Architecture",
          description: "Design scalable component systems, establish coding standards, and create design systems for large applications"
        },
        {
          name: "Performance Engineering",
          description: "Specialize in web vitals optimization, runtime performance, advanced rendering strategies, and bundle optimization"
        },
        {
          name: "Accessibility Expert",
          description: "Master WCAG guidelines, assistive technologies, and implement inclusive design patterns"
        },
        {
          name: "Interactive Experiences",
          description: "Create advanced animations, WebGL experiences, data visualizations, and interactive storytelling"
        },
        {
          name: "Cross-platform Development",
          description: "Build native-like applications using React Native, Flutter, or other cross-platform technologies"
        }
      ],
      leadership: [
        {
          title: "Frontend Lead",
          description: "Lead a team of frontend developers, establish technical direction, and ensure code quality"
        },
        {
          title: "UI/UX Engineering Manager",
          description: "Bridge the gap between design and development teams, manage implementation of design systems"
        },
        {
          title: "Principal Frontend Architect",
          description: "Define technical vision, make platform decisions, and architect large-scale frontend systems"
        }
      ],
      industryImpact: "Shape frontend development practices through conference speaking, open source contributions, technical writing, and mentoring the next generation of developers"
    },
    indianMarket: {
      topCompanies: [
        "Amazon", "Microsoft", "Google", 
        "Flipkart", "Swiggy", "Zomato", 
        "CRED", "Razorpay", "PhonePe", 
        "Meesho", "Urban Company"
      ],
      regions: [
        "Bangalore", "Hyderabad", "Pune", 
        "Chennai", "Gurgaon/NCR", "Mumbai"
      ],
      salaryByExperience: {
        entrySalary: "₹4,00,000 - ₹8,00,000",
        midSalary: "₹10,00,000 - ₹18,00,000",
        seniorSalary: "₹20,00,000 - ₹35,00,000",
        leadershipSalary: "₹40,00,000 - ₹70,00,000+"
      },
      outlook: "The frontend development market in India is experiencing rapid growth with expanding opportunities in startups, product companies, and enterprises. Remote work has opened global opportunities for Indian frontend developers. The demand for specialists in modern frameworks like React and responsive design experts continues to rise steadily."
    }
  }
};

export const getRoadmapForCareer = (careerName: string): RoadmapData => {
  return detailedRoadmaps[careerName] || detailedRoadmaps["default"];
};
