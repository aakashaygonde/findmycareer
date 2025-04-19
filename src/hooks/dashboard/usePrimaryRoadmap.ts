
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRoadmap } from '@/types';

export const usePrimaryRoadmap = (userId: string | undefined) => {
  const [primaryRoadmap, setPrimaryRoadmap] = useState<UserRoadmap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrimaryRoadmap = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_roadmaps')
          .select('*')
          .eq('user_id', userId)
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
  }, [userId]);

  return { primaryRoadmap, loading };
};
