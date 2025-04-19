
import React from 'react';
import { TrendingUp, IndianRupee, Briefcase, Users } from 'lucide-react';
import { getCareerSalaryInRupees } from '@/hooks/assessment/assessmentUtils';
import { RoadmapData } from '@/types';

interface DashboardStatsProps {
  roadmapData: RoadmapData;
  careerPath: any;
}

const DashboardStats = ({ roadmapData, careerPath }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-md bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Growth Rate</p>
          <p className="font-medium">{roadmapData.growthRate}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-md bg-primary/10">
          <IndianRupee className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg. Salary</p>
          <p className="font-medium">{getCareerSalaryInRupees(careerPath.name)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-md bg-primary/10">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Job Openings</p>
          <p className="font-medium">{roadmapData.jobOpenings}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-md bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Match Score</p>
          <p className="font-medium">87% match</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
