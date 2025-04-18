import React, { Suspense, useEffect } from 'react';
import Layout from '@/components/Layout';
import CareerRoadmap from '@/components/CareerRoadmap';
import SkillGapAnalysis from '@/components/SkillGapAnalysis';
import { Card } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  Briefcase, 
  TrendingUp, 
  IndianRupee, 
  BarChart3, 
  ExternalLink, 
  Users,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const LoadingFallback = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2">Loading component...</span>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Dashboard rendered, user:", user?.email);
  }, [user]);

  return (
    <Layout className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Career Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and explore recommended career paths</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="p-6 glass-card col-span-full lg:col-span-2 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5">Top Match</Badge>
                <Badge variant="outline" className="px-2 py-0.5">Tech Industry</Badge>
              </div>
              <h2 className="text-2xl font-bold">Frontend Developer</h2>
              <p className="text-muted-foreground mt-1">
                Create responsive websites and web applications with modern frameworks and libraries.
              </p>
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Explore
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-md bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Growth Rate</p>
                <p className="font-medium">+13% / year</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-md bg-primary/10">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Salary</p>
                <p className="font-medium">₹8,00,000 / year</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-md bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Job Openings</p>
                <p className="font-medium">5,400+ jobs</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="font-medium text-sm mb-2">Top Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>HTML/CSS</Badge>
                <Badge>JavaScript</Badge>
                <Badge>React</Badge>
                <Badge>UI/UX</Badge>
                <Badge>Git</Badge>
                <Badge>Responsive Design</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-2">Related Careers</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">UI/UX Designer</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Full Stack Developer</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="h-2 bg-accent rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Roadmap Milestones</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="h-2 bg-accent rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
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
              <Button variant="outline" size="sm" className="justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Market Trends
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Explore Job Listings
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="roadmap" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roadmap" className="animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <CareerRoadmap />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="skills" className="animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <SkillGapAnalysis />
          </Suspense>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
