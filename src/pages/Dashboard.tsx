import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import CareerRoadmap from '@/components/CareerRoadmap';
import SkillGapAnalysis from '@/components/SkillGapAnalysis';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PrimaryRoadmapCard from '@/components/dashboard/PrimaryRoadmapCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import LoadingState from '@/components/dashboard/LoadingState';
import EmptyState from '@/components/dashboard/EmptyState';
import DebugTools from '@/components/dashboard/DebugTools';
import { usePrimaryRoadmap } from '@/hooks/dashboard/usePrimaryRoadmap';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';

const LoadingFallback = () => (
  <LoadingState message="Loading component..." />
);

const Dashboard = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const { primaryRoadmap, loading, error, refreshRoadmap } = usePrimaryRoadmap(user?.id);
  
  console.log("Dashboard rendered, user:", user?.email);
  console.log("Dashboard - Primary Roadmap:", primaryRoadmap);
  console.log("Dashboard - Loading state:", loading);
  console.log("Dashboard - Error:", error);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (loading) {
      timeoutId = setTimeout(() => {
        console.log("Dashboard - Loading timeout triggered, forcing refresh");
        refreshRoadmap();
      }, 10000); // 10 second timeout
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading, refreshRoadmap]);

  const handleRefresh = useCallback(() => {
    console.log("Dashboard - Forcing refresh");
    refreshRoadmap();
    setRefreshKey(prev => prev + 1);
  }, [refreshRoadmap]);

  const categoryKey = primaryRoadmap?.category as keyof typeof careerAdvice;
  const categoryData = primaryRoadmap ? careerAdvice[categoryKey] : null;
  const careerPath = categoryData?.paths.find(path => path.name === primaryRoadmap?.career_name);
  
  const roadmapKey = primaryRoadmap?.roadmap_key || 'Software Development';
  const roadmapData = detailedRoadmaps[roadmapKey as keyof typeof detailedRoadmaps] || detailedRoadmaps.default;

  return (
    <Layout className="py-8">
      <DashboardHeader />

      {/* Temporary debug tools */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mb-4">
          <DebugTools onReload={handleRefresh} />
        </div>
      )}

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
          <div className="col-span-2">
            <EmptyState 
              title="No Primary Roadmap Selected"
              description="Select a primary roadmap from the Career Roadmaps section to personalize your dashboard experience."
              actionLabel="Explore Career Roadmaps"
              actionLink="/explore-roadmaps"
            />
          </div>
        )}
        {!loading && !primaryRoadmap && <ProgressCard />}
      </div>

      <Tabs defaultValue="roadmap" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="roadmap">Career Roadmap</TabsTrigger>
          <TabsTrigger value="skills">Skill Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roadmap" className="animate-fade-in">
          {primaryRoadmap ? (
            <CareerRoadmap key={`roadmap-${refreshKey}`} />
          ) : (
            <EmptyState 
              title="No Roadmap Available"
              description="Select a primary roadmap to view your career progression path."
              actionLabel="Explore Career Roadmaps"
              actionLink="/explore-roadmaps"
            />
          )}
        </TabsContent>
        
        <TabsContent value="skills" className="animate-fade-in">
          {primaryRoadmap ? (
            <SkillGapAnalysis key={`skills-${refreshKey}`} />
          ) : (
            <EmptyState 
              title="Skill Analysis"
              description="Select a primary roadmap to analyze your skills gap."
              actionLabel="Explore Career Roadmaps"
              actionLink="/explore-roadmaps"
            />
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
