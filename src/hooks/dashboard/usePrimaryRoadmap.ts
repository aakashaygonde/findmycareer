
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UserRoadmap {
  id: string;
  user_id: string;
  career_name: string;
  category: string;
  roadmap_key: string;
  is_primary: boolean | null;
  created_at: string;
}

export const usePrimaryRoadmap = (userId: string | undefined) => {
  const [primaryRoadmap, setPrimaryRoadmap] = useState<UserRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPrimary = async () => {
      setLoading(true);
      setError(null);

      if (!userId) {
        setLoading(false);
        setPrimaryRoadmap(null);
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
      } catch (e: any) {
        if (isMounted) {
          setError(e);
          setLoading(false);
        }
      }
    };

    fetchPrimary();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { primaryRoadmap, loading, error };
};
