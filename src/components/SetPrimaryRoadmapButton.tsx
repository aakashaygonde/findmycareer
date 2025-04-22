
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SetPrimaryRoadmapButtonProps {
  userId: string;
  careerName: string;
  category: string;
}

const SetPrimaryRoadmapButton: React.FC<SetPrimaryRoadmapButtonProps> = ({
  userId,
  careerName,
  category,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSetPrimary = async () => {
    setLoading(true);
    
    try {
      console.log('Setting primary roadmap for user:', userId);
      
      // First, let's check if the user has any roadmaps
      const { data: existingRoadmaps, error: checkError } = await supabase
        .from('user_roadmaps')
        .select('*')
        .eq('user_id', userId);
      
      if (checkError) {
        console.error('Error checking existing roadmaps:', checkError);
        throw checkError;
      }
      
      console.log('Existing roadmaps:', existingRoadmaps);
      
      // Set all existing user_roadmaps for this user to is_primary=false
      const { error: updateError } = await supabase
        .from('user_roadmaps')
        .update({ is_primary: false })
        .eq('user_id', userId);
      
      if (updateError) {
        console.error('Error updating existing roadmaps:', updateError);
        throw updateError;
      }
      
      console.log('Reset all primary flags to false');

      // Now upsert the current roadmap as primary
      const roadmapData = {
        user_id: userId,
        career_name: careerName,
        category,
        is_primary: true,
        roadmap_key: careerName, // this assumes roadmap_key == careerName, adjust if needed
        created_at: new Date().toISOString(),
      };
      
      console.log('Upserting roadmap with data:', roadmapData);
      
      const { error: upsertError } = await supabase
        .from('user_roadmaps')
        .upsert(
          roadmapData,
          { onConflict: 'user_id,career_name,category' }
        );

      if (upsertError) {
        console.error('Error upserting roadmap:', upsertError);
        throw upsertError;
      }
      
      console.log('Primary roadmap set successfully');
      toast({ 
        title: "Primary Roadmap Set", 
        description: "This roadmap is now your primary roadmap!" 
      });
    } catch (err: any) {
      console.error('Error in handleSetPrimary:', err);
      toast({
        title: "Error",
        description: err?.message || "Failed to set primary roadmap.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSetPrimary}
      disabled={loading}
      variant="default"
      size="sm"
    >
      {loading ? "Setting..." : "Set as Primary Roadmap"}
    </Button>
  );
};

export default SetPrimaryRoadmapButton;
