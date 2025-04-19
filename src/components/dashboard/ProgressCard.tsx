
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart3, TrendingUp, Briefcase } from 'lucide-react';

const ProgressCard = () => {
  return (
    <Card className="p-6 glass-card col-span-full lg:col-span-1 animate-fade-in animate-delay-100">
      <h3 className="font-bold text-lg mb-4">Your Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Assessment Completion</span>
            <span className="text-sm font-medium">100%</span>
          </div>
          <div className="h-2 bg-accent rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Skill Development</span>
            <span className="text-sm font-medium">0%</span>
          </div>
          <div className="h-2 bg-accent rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Roadmap Milestones</span>
            <span className="text-sm font-medium">0%</span>
          </div>
          <div className="h-2 bg-accent rounded-full">
            <div className="h-full bg-primary rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium mb-3">Quick Actions</h4>
        <div className="flex flex-col space-y-2">
          <Button variant="outline" size="sm" className="justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            Update Skills
          </Button>
          <Link to="/explore-roadmaps" className="w-full">
            <Button variant="outline" size="sm" className="justify-start w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              Explore More Roadmaps
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="justify-start">
            <Briefcase className="h-4 w-4 mr-2" />
            Explore Job Listings
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProgressCard;
