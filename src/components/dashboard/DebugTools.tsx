import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, AlarmClock } from "lucide-react";
import { debugUserRoadmaps, resetPrimaryRoadmap, repairPrimaryRoadmaps, recreateRoadmap } from "@/utils/debugUtils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface DebugToolsProps {
  onReload?: () => void;
}

const DebugTools: React.FC<DebugToolsProps> = ({ onReload }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRepairing, setIsRepairing] = useState(false);
  const [isRecreating, setIsRecreating] = useState(false);
  
  const handleDebugRoadmaps = async () => {
    if (user?.id) {
      await debugUserRoadmaps(user.id);
    } else {
      console.error("DEBUG: No user ID available");
    }
  };
  
  const handleResetPrimary = async () => {
    if (user?.id) {
      const success = await resetPrimaryRoadmap(user.id);
      if (success && onReload) {
        onReload();
      }
    } else {
      console.error("DEBUG: No user ID available for reset");
    }
  };
  
  const handleRepairRoadmaps = async () => {
    if (!user?.id) {
      console.error("DEBUG: No user ID available for repair");
      return;
    }
    
    setIsRepairing(true);
    
    try {
      const result = await repairPrimaryRoadmaps(user.id);
      
      toast({
        title: result.success ? "Repair Successful" : "Repair Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      });
      
      if (result.success && onReload) {
        onReload();
      }
    } catch (error) {
      console.error("Error during repair:", error);
      toast({
        title: "Repair Error",
        description: "An unexpected error occurred during repair.",
        variant: "destructive"
      });
    } finally {
      setIsRepairing(false);
    }
  };
  
  const handleRecreateRoadmap = async () => {
    if (!user?.id) {
      console.error("DEBUG: No user ID available for recreation");
      return;
    }
    
    setIsRecreating(true);
    
    try {
      // Example roadmap data - in a real app, you'd have a form or dialog to input this
      const roadmapData = {
        careerName: "Full-Stack Developer",
        category: "Development",
        roadmapKey: "Full-Stack Developer"
      };
      
      const result = await recreateRoadmap(user.id, roadmapData);
      
      toast({
        title: result.success ? "Recreation Successful" : "Recreation Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive"
      });
      
      if (result.success && onReload) {
        onReload();
      }
    } catch (error) {
      console.error("Error during roadmap recreation:", error);
      toast({
        title: "Recreation Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsRecreating(false);
    }
  };
  
  const handleForceReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="p-3 mt-4 border border-gray-300 rounded">
      <h3 className="text-sm font-bold mb-2">Debug Tools</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleDebugRoadmaps}
        >
          Check Roadmaps
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleResetPrimary}
        >
          Reset Primary
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleForceReload}
        >
          Force Reload
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleRepairRoadmaps}
          disabled={isRepairing}
        >
          {isRepairing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Repairing...
            </>
          ) : (
            "Repair Roadmaps"
          )}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleRecreateRoadmap}
          disabled={isRecreating}
        >
          {isRecreating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Default"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DebugTools; 