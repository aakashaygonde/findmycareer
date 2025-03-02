
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ChevronRight, BookOpen, Award, Code, Calendar } from 'lucide-react';
import { Milestone } from '@/types';

// Mock data for milestones
const mockMilestones: Milestone[] = [
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

const CareerRoadmap: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null);

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

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Career Roadmap</h2>
        <Button variant="outline" size="sm">
          Export Roadmap
        </Button>
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
