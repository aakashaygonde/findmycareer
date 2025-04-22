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
import { UserRoadmap } from '@/types';

const DetailedCareerRoadmap: React.FC = () => {
  const { category, careerName } = useParams<{ category?: string; careerName?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const decodedCareerName = careerName ? decodeURIComponent(careerName) : '';

  console.log("DetailedCareerRoadmap - Params:", { category, careerName: decodedCareerName });
  console.log("DetailedCareerRoadmap - User:", user?.id);

  // Find the career in the category
  const categoryData = category ? careerAdvice[category as keyof typeof careerAdvice] : null;
  const careerPath = categoryData?.paths.find(path => path.name === decodedCareerName);
  
  // Map between common career names and detailed roadmap keys
  const careerToRoadmapMap: Record<string, string> = {
    'Full-Stack Developer': 'Full-Stack Developer',
    'Frontend Developer': 'Frontend Developer',
    'Backend Developer': 'Backend Developer',
    'Data Scientist': 'Data Science',
    'UX/UI Designer': 'UX/UI Design',
    'DevOps Engineer': 'Software Development',
    'Cybersecurity Analyst': 'Software Development',
    'Product Manager': 'UX/UI Design',
    // Add more mappings as needed
  };
  
  // Look up the roadmap key or use the career name directly
  const roadmapKey = careerToRoadmapMap[decodedCareerName] || 'Software Development';
  
  console.log("DetailedCareerRoadmap - Roadmap Key:", roadmapKey);
  
  // Get roadmap data with fallback to default
  const roadmapData = detailedRoadmaps[roadmapKey] || detailedRoadmaps.default;

  // Check if this roadmap is bookmarked
  useEffect(() => {
    if (!user) return;
    
    const checkBookmarkStatus = async () => {
      try {
        console.log("DetailedCareerRoadmap - Checking bookmark status for:", {
          userId: user.id,
          careerName: decodedCareerName,
          category
        });
        
        const { data, error } = await supabase
          .from('user_roadmaps')
          .select('*')
          .eq('user_id', user.id)
          .eq('career_name', decodedCareerName)
          .eq('category', category)
          .eq('is_primary', true)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking bookmark status:', error);
          return;
        }
        
        console.log("DetailedCareerRoadmap - Bookmark status result:", data);
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
      console.log("DetailedCareerRoadmap - Toggling bookmark:", {
        current: isBookmarked,
        userId: user.id,
        careerName: decodedCareerName,
        category,
        roadmapKey
      });
      
      if (isBookmarked) {
        // Remove bookmark
        console.log("DetailedCareerRoadmap - Removing bookmark");
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
        // First, check if the record already exists but is not primary
        console.log("DetailedCareerRoadmap - Checking for existing roadmap record");
        const { data: existingRecord, error: checkError } = await supabase
          .from('user_roadmaps')
          .select('*')
          .eq('user_id', user.id)
          .eq('career_name', decodedCareerName)
          .eq('category', category || "")
          .maybeSingle();
        
        if (checkError) {
          console.error("Error checking existing roadmap:", checkError);
        }
        
        // Reset all existing primary roadmaps
        console.log("DetailedCareerRoadmap - Resetting all primary roadmaps");
        const { error: resetError } = await supabase
          .from('user_roadmaps')
          .update({ is_primary: false })
          .eq('user_id', user.id);
        
        if (resetError) {
          console.error("Error resetting primary roadmaps:", resetError);
          // Continue anyway
        }
        
        let result;
        
        if (existingRecord) {
          // Update existing record to be primary
          console.log("DetailedCareerRoadmap - Updating existing record to primary");
          result = await supabase
            .from('user_roadmaps')
            .update({ 
              is_primary: true,
              roadmap_key: roadmapKey // Ensure roadmap key is updated
            })
            .eq('id', existingRecord.id)
            .select();
        } else {
          // Insert new record
          console.log("DetailedCareerRoadmap - Creating new primary roadmap record");
          result = await supabase
            .from('user_roadmaps')
            .insert({
              user_id: user.id,
              career_name: decodedCareerName,
              category: category || "",
              roadmap_key: roadmapKey,
              is_primary: true
            })
            .select();
        }
        
        if (result.error) throw result.error;
        
        console.log("DetailedCareerRoadmap - Primary roadmap set:", result.data);
        
        // Force update of isBookmarked state
        setIsBookmarked(true);
        
        toast({
          title: "Roadmap set as primary",
          description: "This roadmap will now appear on your dashboard",
        });
        
        // Optional: Reload the page to ensure all states are refreshed
        setTimeout(() => {
          // Force page refresh to ensure state is consistent
          window.location.reload();
        }, 1500);
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
