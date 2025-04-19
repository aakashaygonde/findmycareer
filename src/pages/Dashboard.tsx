
import React, { Suspense, useEffect, useState } from 'react';
import { Loader2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import CareerRoadmap from '@/components/CareerRoadmap';
import SkillGapAnalysis from '@/components/SkillGapAnalysis';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PrimaryRoadmapCard from '@/components/dashboard/PrimaryRoadmapCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import { UserRoadmap } from '@/types';

const LoadingFallback = () => (
  <div className="flex justify-center items-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2">Loading component...</span>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [primaryRoadmap, setPrimaryRoadmap] = useState<UserRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log("Dashboard rendered, user:", user?.email);
    
    const fetchPrimaryRoadmap = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_roadmaps')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_primary', true)
          .maybeSingle();
        
        if (error) throw error;
        
        setPrimaryRoadmap(data);
      } catch (error) {
        console.error('Error fetching primary roadmap:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrimaryRoadmap();
  }, [user]);

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
          <Card className="p-6 col-span-full flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading your roadmap...</span>
          </Card>
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
          <Card className="p-6 glass-card col-span-full lg:col-span-2 animate-fade-in">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <Compass className="h-16 w-16 text-primary/50 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Primary Roadmap Selected</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Select a primary roadmap from the Career Roadmaps section to personalize your dashboard experience.
              </p>
              <Link to="/explore-roadmaps">
                <Button className="flex items-center gap-2">
                  <Compass className="h-4 w-4" />
                  Explore Career Roadmaps
                </Button>
              </Link>
            </div>
          </Card>
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
