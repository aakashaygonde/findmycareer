
import React from 'react';
import { Award, GraduationCap, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCareerSalaryInRupees } from '@/hooks/assessment/assessmentUtils';

type CareerInfoSidebarProps = {
  careerPath: any;
  roadmapData: any;
};

const CareerInfoSidebar: React.FC<CareerInfoSidebarProps> = ({ careerPath, roadmapData }) => {
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-2xl">{careerPath.name}</CardTitle>
        <CardDescription className="text-base">{careerPath.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Award className="h-4 w-4 mr-2 text-blue-500" /> Key Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {careerPath.skills.map((skill: string, idx: number) => (
              <Badge key={idx} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <GraduationCap className="h-4 w-4 mr-2 text-blue-500" /> Education Paths
          </h3>
          <ul className="space-y-1 list-disc list-inside text-sm">
            {careerPath.education.map((edu: string, idx: number) => (
              <li key={idx}>{edu}</li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-500" /> Salary Range (India)
            </h3>
            <Badge className="bg-green-100 text-green-800">
              {roadmapData.salaryTrend}
            </Badge>
          </div>
          <p className="text-lg font-bold">{getCareerSalaryInRupees(careerPath.name)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Varies based on experience, location, and company size
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" /> Time to Proficiency
          </h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Entry Level</span>
                <span className="text-xs">{roadmapData.timeline.entryLevel}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Mid Level</span>
                <span className="text-xs">{roadmapData.timeline.midLevel}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Senior Level</span>
                <span className="text-xs">{roadmapData.timeline.seniorLevel}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerInfoSidebar;
