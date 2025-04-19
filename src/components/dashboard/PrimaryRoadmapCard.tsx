
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import DashboardStats from './DashboardStats';

interface PrimaryRoadmapCardProps {
  primaryRoadmap: any;
  categoryData: any;
  careerPath: any;
  roadmapData: any;
}

const PrimaryRoadmapCard = ({ primaryRoadmap, categoryData, careerPath, roadmapData }: PrimaryRoadmapCardProps) => {
  if (!careerPath) return null;

  return (
    <Card className="p-6 glass-card col-span-full lg:col-span-2 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5">Primary Roadmap</Badge>
            <Badge variant="outline" className="px-2 py-0.5">{primaryRoadmap.category} Industry</Badge>
          </div>
          <h2 className="text-2xl font-bold">{careerPath.name}</h2>
          <p className="text-muted-foreground mt-1">{careerPath.description}</p>
        </div>
        <Link to={`/explore-roadmaps/${primaryRoadmap.category}/${encodeURIComponent(primaryRoadmap.career_name)}`}>
          <Button variant="outline" size="sm" className="flex items-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Full Roadmap
          </Button>
        </Link>
      </div>

      <DashboardStats roadmapData={roadmapData} careerPath={careerPath} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="font-medium text-sm mb-2">Top Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {careerPath.skills.slice(0, 6).map((skill: string, index: number) => (
              <Badge key={index}>{skill}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-2">Related Careers</h3>
          <div className="space-y-2">
            {categoryData.paths
              .filter((path: any) => path.name !== careerPath.name)
              .slice(0, 2)
              .map((path: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{path.name}</span>
                  <Link to={`/explore-roadmaps/${primaryRoadmap.category}/${encodeURIComponent(path.name)}`}>
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrimaryRoadmapCard;
