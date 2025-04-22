import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ChevronRight, BookOpen, Award, Code, Calendar, Loader2 } from 'lucide-react';
import { Milestone, UserRoadmap } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { usePrimaryRoadmap } from '@/hooks/dashboard/usePrimaryRoadmap';

// This is mock data that will be used if no roadmap-specific data is available
const defaultMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Learn HTML & CSS Fundamentals',
    description: 'Master the basic building blocks of web development',
    type: 'skill',
    timeframe: 'short',
    completed: true,
    resources: [
      {
        id: '101',
        title: 'HTML & CSS Crash Course',
        type: 'course',
        url: '#',
        provider: 'Codecademy',
        duration: '10 hours'
      }
    ]
  },
  {
    id: '2',
    title: 'JavaScript Basics',
    description: 'Learn core JavaScript concepts and syntax',
    type: 'skill',
    timeframe: 'short',
    completed: false,
    resources: [
      {
        id: '102',
        title: 'JavaScript Fundamentals',
        type: 'course',
        url: '#',
        provider: 'freeCodeCamp',
        duration: '20 hours'
      }
    ]
  },
  {
    id: '3',
    title: 'Build Your First Web Application',
    description: 'Apply your skills by building a small project',
    type: 'project',
    timeframe: 'medium',
    completed: false
  },
  {
    id: '4',
    title: 'Learn React Framework',
    description: 'Master React for building modern user interfaces',
    type: 'skill',
    timeframe: 'medium',
    completed: false,
    resources: [
      {
        id: '103',
        title: 'React - The Complete Guide',
        type: 'course',
        url: '#',
        provider: 'Udemy',
        duration: '40 hours'
      }
    ]
  },
  {
    id: '5',
    title: 'Frontend Developer Certification',
    description: 'Get certified to validate your skills',
    type: 'certification',
    timeframe: 'long',
    completed: false
  }
];

// Generate milestones based on roadmap data
const generateMilestonesFromRoadmap = (roadmapKey: string): Milestone[] => {
  console.log(`Generating milestones for roadmap key: "${roadmapKey}"`);
  
  // Normalize the roadmap key to handle case-sensitivity issues
  const normalizedKey = roadmapKey.trim();
  
  // This would ideally come from an API or more detailed data source
  switch (normalizedKey) {
    case 'Software Development':
      console.log('Matched: Software Development roadmap');
      return [
        {
          id: 'sd1',
          title: 'Learn Programming Fundamentals',
          description: 'Master core concepts like variables, data types, and control structures',
          type: 'skill',
          timeframe: 'short',
          completed: false,
        },
        {
          id: 'sd2',
          title: 'Build a Simple Application',
          description: 'Create a small program to demonstrate basic programming skills',
          type: 'project',
          timeframe: 'short',
          completed: false,
        },
        {
          id: 'sd3',
          title: 'Learn Data Structures & Algorithms',
          description: 'Understand common data structures and algorithms for efficient problem solving',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'sd4',
          title: 'Version Control with Git',
          description: 'Learn to manage code changes and collaborate with others',
          type: 'skill',
          timeframe: 'short',
          completed: false,
        },
        {
          id: 'sd5',
          title: 'Online Coding Certification',
          description: 'Get certified in software development fundamentals',
          type: 'certification',
          timeframe: 'medium',
          completed: false,
        }
      ];
    case 'Full-Stack Developer':
    case 'Full Stack Developer':
      console.log('Matched: Full-Stack Developer roadmap');
      return [
        {
          id: 'fs1',
          title: 'HTML, CSS & JavaScript Fundamentals',
          description: 'Master the core building blocks of web development',
          type: 'skill',
          timeframe: 'short',
          completed: false,
        },
        {
          id: 'fs2',
          title: 'React Framework',
          description: 'Learn to build modern user interfaces with React',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'fs3',
          title: 'Node.js & Express',
          description: 'Build server-side applications and APIs',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'fs4',
          title: 'Database Management (MongoDB)',
          description: 'Learn to work with NoSQL databases',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'fs5',
          title: 'Build a MERN Stack Project',
          description: 'Create a full-stack application with MongoDB, Express, React and Node.js',
          type: 'project',
          timeframe: 'long',
          completed: false,
        }
      ];
    case 'Frontend Developer':
    case 'Front-end Developer':
    case 'Front End Developer':
      console.log('Matched: Frontend Developer roadmap');
      return defaultMilestones;
    case 'Backend Developer':
    case 'Back-end Developer':
    case 'Back End Developer':
      console.log('Matched: Backend Developer roadmap');
      return [
        {
          id: 'be1',
          title: 'Learn Server-Side Language',
          description: 'Master Node.js, Python, or another backend language',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'be2',
          title: 'Database Fundamentals',
          description: 'Learn SQL or NoSQL database systems',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'be3',
          title: 'RESTful API Development',
          description: 'Design and implement APIs following REST principles',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'be4',
          title: 'Authentication & Security',
          description: 'Implement secure user authentication and protect against common vulnerabilities',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'be5',
          title: 'Build a Complete Backend Service',
          description: 'Create a fully functional API with database integration and authentication',
          type: 'project',
          timeframe: 'long',
          completed: false,
        }
      ];
    case 'Data Science':
    case 'Data Scientist':
      console.log('Matched: Data Science roadmap');
      return [
        {
          id: 'ds1',
          title: 'Learn Python Programming',
          description: 'Master Python fundamentals for data science',
          type: 'skill',
          timeframe: 'short',
          completed: false,
        },
        {
          id: 'ds2',
          title: 'Data Analysis with Pandas',
          description: 'Learn to manipulate and analyze data with Pandas',
          type: 'skill',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'ds3',
          title: 'Data Visualization Project',
          description: 'Create a visualization dashboard with a real dataset',
          type: 'project',
          timeframe: 'medium',
          completed: false,
        },
        {
          id: 'ds4',
          title: 'Machine Learning Fundamentals',
          description: 'Learn basic ML algorithms and implementation',
          type: 'skill',
          timeframe: 'long',
          completed: false,
        },
        {
          id: 'ds5',
          title: 'Data Science Professional Certificate',
          description: 'Complete certification program in data science',
          type: 'certification',
          timeframe: 'long',
          completed: false,
        }
      ];
    default:
      console.log(`No exact match for "${normalizedKey}", using default milestones`);
      return defaultMilestones;
  }
};

const CareerRoadmap: React.FC = () => {
  const { user } = useAuth();
  const { primaryRoadmap, loading, error, refreshRoadmap } = usePrimaryRoadmap(user?.id);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add a timeout to prevent infinite loading state
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("CareerRoadmap - Loading timeout triggered, forcing state update");
        setIsLoading(false);
        setMilestones(defaultMilestones);
      }
    }, 8000); // 8 second timeout
    
    return () => clearTimeout(loadingTimeout);
  }, [isLoading]);

  useEffect(() => {
    console.log("CareerRoadmap - Primary Roadmap:", primaryRoadmap);
    console.log("CareerRoadmap - Loading state:", loading);
    console.log("CareerRoadmap - Error:", error);
    
    // Only set loading true if parent hook is loading
    if (loading) {
      setIsLoading(true);
      return;
    }

    try {
      // Even if primaryRoadmap is null, we should still render with defaults
      if (primaryRoadmap?.roadmap_key) {
        console.log("Generating milestones for roadmap key:", primaryRoadmap.roadmap_key);
        // Generate milestones based on the roadmap key
        const generatedMilestones = generateMilestonesFromRoadmap(primaryRoadmap.roadmap_key);
        setMilestones(generatedMilestones);
      } else {
        console.log("Using default milestones");
        setMilestones(defaultMilestones);
      }
    } catch (error) {
      console.error("Error processing roadmap data:", error);
      setMilestones(defaultMilestones);
    } finally {
      // Always exit the loading state
      setIsLoading(false);
    }
  }, [primaryRoadmap, loading, error]);

  // Add a manual refresh function
  const handleRefresh = () => {
    setIsLoading(true);
    refreshRoadmap();
  };

  const toggleMilestoneCompleted = (id: string) => {
    setMilestones(milestones.map(milestone => 
      milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone
    ));
  };

  const toggleExpandMilestone = (id: string) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'skill':
        return <Code className="h-4 w-4" />;
      case 'certification':
        return <Award className="h-4 w-4" />;
      case 'education':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case 'short':
        return '1-3 months';
      case 'medium':
        return '3-6 months';
      case 'long':
        return '6+ months';
      default:
        return 'Flexible';
    }
  };

  if (error) {
    return (
      <div className="glass-card p-6 flex flex-col justify-center items-center min-h-[300px]">
        <div className="text-center text-red-500">
          <p>Error loading roadmap data: {error.message}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={handleRefresh}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="glass-card p-6 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your career roadmap...</span>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Career Roadmap</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
          >
            <Loader2 className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            Export Roadmap
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-primary/20 z-0" />

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="relative z-10">
              <div 
                className="flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-accent/30 cursor-pointer"
                onClick={() => toggleExpandMilestone(milestone.id)}
              >
                <button 
                  className="mt-1 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMilestoneCompleted(milestone.id);
                  }}
                >
                  {milestone.completed ? (
                    <CheckCircle className="h-7 w-7 text-primary" />
                  ) : (
                    <Circle className="h-7 w-7 text-primary/40" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {milestone.title}
                    </h3>
                    <ChevronRight className={`h-5 w-5 transition-transform ${expandedMilestone === milestone.id ? 'rotate-90' : ''}`} />
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getIconForType(milestone.type)}
                      {milestone.type}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {getTimeframeLabel(milestone.timeframe)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Expanded details */}
              {expandedMilestone === milestone.id && (
                <div className="ml-11 mt-2 mb-4 pl-4 border-l-2 border-primary/20">
                  <p className="text-muted-foreground mb-3">{milestone.description}</p>
                  
                  {milestone.resources && milestone.resources.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recommended Resources</h4>
                      {milestone.resources.map(resource => (
                        <Card key={resource.id} className="p-3 bg-background/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {resource.provider} • {resource.duration}
                              </div>
                            </div>
                            <Button size="sm" variant="secondary">Open</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
