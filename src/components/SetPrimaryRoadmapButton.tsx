
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
      // Set all existing user_roadmaps for this user to is_primary=false
      await supabase
        .from('user_roadmaps')
        .update({ is_primary: false })
        .eq('user_id', userId);

      // Set this roadmap to primary (insert or update)
      const { error: upsertError } = await supabase
        .from('user_roadmaps')
        .upsert(
          {
            user_id: userId,
            career_name: careerName,
            category,
            is_primary: true,
            roadmap_key: careerName, // this assumes roadmap_key == careerName, adjust if needed
            created_at: new Date().toISOString(),
          },
          { onConflict: ['user_id', 'career_name', 'category'] }
        );

      if (upsertError) throw upsertError;
      toast({ title: "Primary Roadmap Set", description: "This roadmap is now your primary roadmap!" });
    } catch (err: any) {
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
