import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRoadmap } from '@/types';

export const usePrimaryRoadmap = (userId: string | undefined) => {
  const [primaryRoadmap, setPrimaryRoadmap] = useState<UserRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true); // Reset loading state on userId change
    setError(null); // Reset error state on userId change
    
    const fetchPrimaryRoadmap = async () => {
      if (!userId) {
        if (isMounted) {
          setLoading(false);
          setPrimaryRoadmap(null);
        }
        return;
      }
      
      try {
        const { data, error: supabaseError } = await supabase
          .from('user_roadmaps')
          .select('*')
          .eq('user_id', userId)
          .eq('is_primary', true)
          .maybeSingle();
        
        if (supabaseError) throw supabaseError;
        
        if (isMounted) {
          setPrimaryRoadmap(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching primary roadmap:', error);
        if (isMounted) {
          setError(error as Error);
          setLoading(false);
        }
      }
    };
    
    fetchPrimaryRoadmap();
    
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { primaryRoadmap, loading, error };
};
