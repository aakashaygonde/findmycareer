import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRoadmap } from '@/types';

export const usePrimaryRoadmap = (userId: string | undefined) => {
  const [primaryRoadmap, setPrimaryRoadmap] = useState<UserRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Create a fetchPrimaryRoadmap function that can be called to refresh data
  const fetchPrimaryRoadmap = useCallback(async (uid: string) => {
    console.log("usePrimaryRoadmap - Fetching roadmap for user:", uid);
    
    try {
      // Make sure we're getting the most up-to-date data by bypassing cache
      const { data, error: supabaseError } = await supabase
        .from('user_roadmaps')
        .select('*')
        .eq('user_id', uid)
        .eq('is_primary', true)
        .limit(1)
        .order('created_at', { ascending: false }) // Get the most recent in case there are duplicates
        .maybeSingle();
      
      if (supabaseError) {
        console.error("usePrimaryRoadmap - Supabase error:", supabaseError);
        throw supabaseError;
      }
      
      console.log("usePrimaryRoadmap - Data returned:", data);
      
      return { data };
    } catch (err: any) {
      console.error('Error fetching primary roadmap:', err);
      return { error: err instanceof Error ? err : new Error(err?.message || 'Unknown error fetching roadmap') };
    }
  }, []);

  // Setup effect to load data when userId changes
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    
    // Set the loading state and clear any previous error
    setLoading(true);
    setError(null);
    
    console.log("usePrimaryRoadmap - userId effect triggered:", userId);
    
    const loadRoadmap = async () => {
      if (!userId) {
        console.log("usePrimaryRoadmap - No userId provided");
        if (isMounted) {
          setLoading(false);
          setPrimaryRoadmap(null);
        }
        return;
      }
      
      try {
        const { data, error: fetchError } = await fetchPrimaryRoadmap(userId);
        
        if (fetchError) {
          // If there's an error and we haven't exceeded retries, try again
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`usePrimaryRoadmap - Retry attempt ${retryCount}/${maxRetries}`);
            // Wait a bit before retrying
            setTimeout(loadRoadmap, 1000);
            return;
          }
          
          throw fetchError;
        }
        
        if (isMounted) {
          setPrimaryRoadmap(data);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error in loadRoadmap:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
          setLoading(false);
        }
      }
    };
    
    loadRoadmap();
    
    return () => {
      isMounted = false;
    };
  }, [userId, fetchPrimaryRoadmap]);

  // Expose a function to manually refresh the data
  const refreshRoadmap = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await fetchPrimaryRoadmap(userId);
      
      if (fetchError) throw fetchError;
      
      setPrimaryRoadmap(data);
    } catch (err: any) {
      console.error('Error refreshing roadmap:', err);
      setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error refreshing roadmap'));
    } finally {
      setLoading(false);
    }
  }, [userId, fetchPrimaryRoadmap]);

  return { primaryRoadmap, loading, error, refreshRoadmap };
};
