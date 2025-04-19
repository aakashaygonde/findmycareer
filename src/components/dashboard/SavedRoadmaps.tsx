import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserRoadmap } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkX, ChevronRight, Loader2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SavedRoadmaps: React.FC = () => {
  const { user } = useAuth();
  const [savedRoadmaps, setSavedRoadmaps] = useState<UserRoadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  const fetchSavedRoadmaps = async () => {
    if (!user) return;
    
    try {
      console.log("Fetching saved roadmaps for user:", user.id);
      
      const { data, error, status, statusText } = await supabase
        .from('user_roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      console.log("Fetch response:", { data, error, status, statusText });
      
      if (error) throw error;
      
      console.log("Saved roadmaps count:", data?.length || 0);
      setSavedRoadmaps(data || []);
    } catch (error) {
      console.error('Error fetching saved roadmaps:', error);
      toast({
        title: "Error",
        description: "Failed to load saved roadmaps",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("SavedRoadmaps component mounted, user:", user?.id);
    fetchSavedRoadmaps();
    
    // Set up real-time subscription for changes
    if (user) {
      console.log("Setting up real-time subscription");
      const subscription = supabase
        .channel('user_roadmaps_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'user_roadmaps',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            console.log('Real-time update received:', payload);
            fetchSavedRoadmaps();
          }
        )
        .subscribe((status) => {
          console.log('Subscription status:', status);
        });
        
      return () => {
        console.log("Cleaning up subscription");
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const handleRemoveRoadmap = async (roadmapId: string) => {
    if (actionLoading) return;
    
    console.log("Removing roadmap with ID:", roadmapId);
    setActionLoading(true);
    
    try {
      const { error, status, statusText } = await supabase
        .from('user_roadmaps')
        .delete()
        .eq('id', roadmapId);
      
      console.log("Delete response:", { error, status, statusText });
      
      if (error) throw error;
      
      // Update local state
      setSavedRoadmaps(savedRoadmaps.filter(roadmap => roadmap.id !== roadmapId));
      
      toast({
        title: "Roadmap removed",
        description: "The roadmap has been removed from your saved roadmaps",
      });
    } catch (error) {
      console.error('Error removing roadmap:', error);
      toast({
        title: "Error",
        description: "There was a problem removing the roadmap",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetPrimary = async (roadmapId: string) => {
    if (actionLoading) return;
    
    console.log("Setting roadmap as primary. ID:", roadmapId);
    setActionLoading(true);
    
    try {
      // First set all to non-primary
      console.log("Clearing existing primary roadmaps");
      const { error: clearError, status: clearStatus } = await supabase
        .from('user_roadmaps')
        .update({ is_primary: false })
        .eq('user_id', user?.id)
        .eq('is_primary', true);
      
      console.log("Clear primary response:", { clearError, clearStatus });
      
      if (clearError) throw clearError;
      
      // Now set this one to primary
      console.log("Setting new primary roadmap");
      const { error, status, statusText } = await supabase
        .from('user_roadmaps')
        .update({ is_primary: true })
        .eq('id', roadmapId);
      
      console.log("Set primary response:", { error, status, statusText });
      
      if (error) throw error;
      
      // Update local state - refresh data from database to ensure consistency
      await fetchSavedRoadmaps();
      
      toast({
        title: "Primary roadmap updated",
        description: "The selected roadmap is now set as your primary roadmap",
      });
    } catch (error) {
      console.error('Error setting primary roadmap:', error);
      toast({
        title: "Error",
        description: "There was a problem updating your primary roadmap",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Roadmaps</CardTitle>
          <CardDescription>View and manage your saved career roadmaps</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (savedRoadmaps.length === 0) {
    console.log("No saved roadmaps found");
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Roadmaps</CardTitle>
          <CardDescription>View and manage your saved career roadmaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">You haven't saved any roadmaps yet</p>
            <Link to="/explore-roadmaps">
              <Button variant="outline">Explore Roadmaps</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  console.log("Rendering saved roadmaps:", savedRoadmaps);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Roadmaps</CardTitle>
        <CardDescription>View and manage your saved career roadmaps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedRoadmaps.map((roadmap) => (
            <div 
              key={roadmap.id} 
              className={`border rounded-lg p-4 ${roadmap.is_primary ? 'bg-accent/30 border-primary/30' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{roadmap.career_name}</h3>
                  <p className="text-sm text-muted-foreground">{roadmap.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveRoadmap(roadmap.id)}
                    title="Remove roadmap"
                    disabled={actionLoading}
                  >
                    <BookmarkX className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                {!roadmap.is_primary ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSetPrimary(roadmap.id)}
                    disabled={actionLoading}
                    className="flex items-center gap-1"
                  >
                    <Star className="h-4 w-4" />
                    Set as Primary
                  </Button>
                ) : (
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Primary Roadmap
                  </span>
                )}
                
                <Link 
                  to={`/explore-roadmaps/${roadmap.category}/${encodeURIComponent(roadmap.career_name)}`}
                  className="flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedRoadmaps; 