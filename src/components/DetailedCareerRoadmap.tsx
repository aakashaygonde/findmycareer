
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';
import CareerInfoSidebar from './roadmap/CareerInfoSidebar';
import RoadmapStages from './roadmap/RoadmapStages';
import IndianMarketInsights from './roadmap/IndianMarketInsights';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const DetailedCareerRoadmap: React.FC = () => {
  const { category, careerName } = useParams<{ category?: string; careerName?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const decodedCareerName = careerName ? decodeURIComponent(careerName) : '';

  // Find the career in the category
  const categoryData = category ? careerAdvice[category as keyof typeof careerAdvice] : null;
  const careerPath = categoryData?.paths.find(path => path.name === decodedCareerName);
  
  // Map between common career names and detailed roadmap keys
  const careerToRoadmapMap: Record<string, string> = {
    'Full-Stack Developer': 'Full-Stack Developer',
    'Data Scientist': 'Data Science',
    'UX/UI Designer': 'UX/UI Design',
    'DevOps Engineer': 'Software Development',
    'Cybersecurity Analyst': 'Software Development',
    'Product Manager': 'UX/UI Design',
    // Add more mappings as needed
  };
  
  // Look up the roadmap key or use the career name directly
  const roadmapKey = careerToRoadmapMap[decodedCareerName] || 'Software Development';
  
  // Get roadmap data with fallback to default
  const roadmapData = detailedRoadmaps[roadmapKey] || detailedRoadmaps.default;

  // Check if this roadmap is bookmarked
  useEffect(() => {
    if (!user) return;
    
    const checkBookmarkStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('user_roadmaps')
          .select('*')
          .eq('user_id', user.id)
          .eq('career_name', decodedCareerName)
          .eq('category', category)
          .eq('is_primary', true)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking bookmark status:', error);
          return;
        }
        
        setIsBookmarked(!!data);
      } catch (error) {
        console.error('Error checking bookmark status:', error);
      }
    };
    
    checkBookmarkStatus();
  }, [user, decodedCareerName, category]);

  const handleToggleBookmark = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to bookmark roadmaps",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('user_roadmaps')
          .delete()
          .eq('user_id', user.id)
          .eq('career_name', decodedCareerName)
          .eq('category', category)
          .eq('is_primary', true);
        
        if (error) throw error;
        
        setIsBookmarked(false);
        toast({
          title: "Roadmap removed",
          description: "This roadmap is no longer your primary roadmap",
        });
      } else {
        // First, remove any existing primary roadmaps
        await supabase
          .from('user_roadmaps')
          .update({ is_primary: false })
          .eq('user_id', user.id)
          .eq('is_primary', true);
        
        // Add new bookmark as primary
        const { error } = await supabase
          .from('user_roadmaps')
          .insert({
            user_id: user.id,
            career_name: decodedCareerName,
            category: category,
            roadmap_key: roadmapKey,
            is_primary: true
          });
        
        if (error) throw error;
        
        setIsBookmarked(true);
        toast({
          title: "Roadmap set as primary",
          description: "This roadmap will now appear on your dashboard",
        });
      }
    } catch (error: any) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update roadmap status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!careerPath) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Career not found</h2>
        <p className="mb-6">Sorry, we couldn't find detailed information for this career path.</p>
        <Button onClick={() => navigate('/explore-roadmaps')}>
          Return to All Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/explore-roadmaps/${category}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </Link>
        
        <Button 
          variant={isBookmarked ? "default" : "outline"}
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleToggleBookmark}
          disabled={isLoading}
        >
          {isBookmarked ? (
            <>
              <BookmarkCheck className="h-4 w-4" />
              Primary Roadmap
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" />
              Set as Primary Roadmap
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CareerInfoSidebar careerPath={careerPath} roadmapData={roadmapData} />
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Detailed Career Roadmap</CardTitle>
              <CardDescription>
                Follow this path to build your career in {careerPath.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoadmapStages roadmapData={roadmapData} />
            </CardContent>
          </Card>

          <IndianMarketInsights marketData={roadmapData.indianMarket} />
        </div>
      </div>
    </div>
  );
};

export default DetailedCareerRoadmap;
