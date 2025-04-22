import React, { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import CareerRoadmap from '@/components/CareerRoadmap';
import SkillGapAnalysis from '@/components/SkillGapAnalysis';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProgressCard from '@/components/dashboard/ProgressCard';
import LoadingState from '@/components/dashboard/LoadingState';
import EmptyState from '@/components/dashboard/EmptyState';

const LoadingFallback = () => (
  <LoadingState message="Loading component..." />
);

const Dashboard = () => {
  const { user } = useAuth();
  
  console.log("Dashboard rendered, user:", user?.email);

  return (
    <Layout className="py-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <EmptyState 
            title="Explore Career Roadmaps"
            description="Browse our library of career roadmaps to find your ideal career path."
            actionLabel="Explore Career Roadmaps"
            actionLink="/explore-roadmaps"
          />
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
