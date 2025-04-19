
import React, { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import CareerRoadmap from '@/components/CareerRoadmap';
import SkillGapAnalysis from '@/components/SkillGapAnalysis';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PrimaryRoadmapCard from '@/components/dashboard/PrimaryRoadmapCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import LoadingState from '@/components/dashboard/LoadingState';
import EmptyState from '@/components/dashboard/EmptyState';
import { usePrimaryRoadmap } from '@/hooks/dashboard/usePrimaryRoadmap';

const LoadingFallback = () => (
  <LoadingState message="Loading component..." />
);

const Dashboard = () => {
  const { user } = useAuth();
  const { primaryRoadmap, loading } = usePrimaryRoadmap(user?.id);
  
  console.log("Dashboard rendered, user:", user?.email);

  const categoryKey = primaryRoadmap?.category as keyof typeof careerAdvice;
  const categoryData = primaryRoadmap ? careerAdvice[categoryKey] : null;
  const careerPath = categoryData?.paths.find(path => path.name === primaryRoadmap?.career_name);
  
  const roadmapKey = primaryRoadmap?.roadmap_key || 'Software Development';
  const roadmapData = detailedRoadmaps[roadmapKey as keyof typeof detailedRoadmaps] || detailedRoadmaps.default;

  return (
    <Layout className="py-8">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {loading ? (
          <LoadingState message="Loading your roadmap..." />
        ) : primaryRoadmap && careerPath ? (
          <>
            <PrimaryRoadmapCard 
              primaryRoadmap={primaryRoadmap}
              categoryData={categoryData}
              careerPath={careerPath}
              roadmapData={roadmapData}
            />
            <ProgressCard />
          </>
        ) : (
          <EmptyState 
            title="No Primary Roadmap Selected"
            description="Select a primary roadmap from the Career Roadmaps section to personalize your dashboard experience."
            actionLabel="Explore Career Roadmaps"
            actionLink="/explore-roadmaps"
          />
        )}
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
