
import React from 'react';
import { BookOpen, Briefcase, Award, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type RoadmapStagesProps = {
  roadmapData: any;
};

const RoadmapStages: React.FC<RoadmapStagesProps> = ({ roadmapData }) => {
  return (
    <Tabs defaultValue="beginner">
      <TabsList className="grid grid-cols-3 mb-6">
        <TabsTrigger value="beginner">Beginner</TabsTrigger>
        <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>

      <TabsContent value="beginner" className="space-y-4">
        <h3 className="font-medium text-lg mb-2 flex items-center">
          <BookOpen className="h-4 w-4 mr-2" /> Foundational Stage (0-1 years)
        </h3>
        
        <div className="space-y-4">
          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Essential Skills to Develop</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.beginner.skills.map((skill: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Key Learning Resources</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.beginner.resources.map((resource: any, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{resource.name}</span>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Projects to Build</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.beginner.projects.map((project: any, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{project.name}</span>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Expected Outcomes</h4>
            <p className="mt-2 text-sm">{roadmapData.beginner.outcomes}</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="intermediate" className="space-y-4">
        <h3 className="font-medium text-lg mb-2 flex items-center">
          <Briefcase className="h-4 w-4 mr-2" /> Professional Growth Stage (1-3 years)
        </h3>
        
        <div className="space-y-4">
          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Advanced Skills to Develop</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.intermediate.skills.map((skill: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Professional Development</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.intermediate.certifications.map((cert: any, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{cert.name}</span>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Career Milestones</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.intermediate.milestones.map((milestone: any, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{milestone.name}</span>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Expected Outcomes</h4>
            <p className="mt-2 text-sm">{roadmapData.intermediate.outcomes}</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="advanced" className="space-y-4">
        <h3 className="font-medium text-lg mb-2 flex items-center">
          <Award className="h-4 w-4 mr-2" /> Expert/Leadership Stage (3+ years)
        </h3>
        
        <div className="space-y-4">
          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Specialized Expertise</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.advanced.specializations.map((specialization: any, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{specialization.name}</span>
                    <p className="text-sm text-muted-foreground">{specialization.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Leadership Opportunities</h4>
            <ul className="mt-2 space-y-2">
              {roadmapData.advanced.leadership.map((role: any, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">{role.title}</span>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
            <h4 className="font-semibold text-base">Industry Impact</h4>
            <p className="mt-2 text-sm">{roadmapData.advanced.industryImpact}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default RoadmapStages;
