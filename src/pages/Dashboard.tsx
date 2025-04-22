
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProgressCard from '@/components/dashboard/ProgressCard';
import EmptyState from '@/components/dashboard/EmptyState';
import { usePrimaryRoadmap } from '@/hooks/dashboard/usePrimaryRoadmap';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const { primaryRoadmap, loading } = usePrimaryRoadmap(userId);

  // Helper to fetch categoryData and careerPath info if primary exists
  let categoryData, careerPath, roadmapData;
  if (primaryRoadmap) {
    categoryData = careerAdvice[primaryRoadmap.category as keyof typeof careerAdvice];
    careerPath = categoryData?.paths.find(
      (path: any) => path.name === primaryRoadmap.career_name
    );
    // key can vary, could be career_name or mapped, adjust as necessary
    const roadmapKey = careerPath?.name || 'Software Development';
    roadmapData = detailedRoadmaps[roadmapKey] || detailedRoadmaps.default;
  }

  return (
    <Layout className="py-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          {loading ? (
            <Card className="animate-pulse flex items-center justify-center h-36"><span>Loading...</span></Card>
          ) : primaryRoadmap && careerPath && roadmapData ? (
            <Card className="glass-card p-6">
              <CardHeader>
                <CardTitle>Your Chosen Roadmap</CardTitle>
                <CardDescription>
                  You have selected <span className="font-semibold">{careerPath.name}</span> as your primary roadmap.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-muted-foreground">{careerPath.description}</div>
                <Link to={`/explore-roadmaps/${primaryRoadmap.category}/${encodeURIComponent(primaryRoadmap.career_name)}`}>
                  <span className="inline-block text-blue-600 hover:underline mt-2">View Full Roadmap</span>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <EmptyState
              title="No Primary Roadmap"
              description="Select a career roadmap to get started."
              actionLabel="Explore Career Roadmaps"
              actionLink="/explore-roadmaps"
            />
          )}
        </div>
        <ProgressCard />
      </div>

      <Tabs defaultValue="roadmap" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="animate-fade-in">
          <EmptyState
            title="Explore Career Roadmaps"
            description="Explore different career roadmaps to find the path that's right for you."
            actionLabel="Explore Career Roadmaps"
            actionLink="/explore-roadmaps"
          />
        </TabsContent>

        <TabsContent value="skills" className="animate-fade-in">
          <EmptyState
            title="Skill Analysis"
            description="Explore different careers to analyze required skills and identify opportunities for growth."
            actionLabel="Explore Career Roadmaps"
            actionLink="/explore-roadmaps"
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
