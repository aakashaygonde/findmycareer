import { supabase } from "@/integrations/supabase/client";

export const debugUserRoadmaps = async (userId: string) => {
  if (!userId) {
    console.error("DEBUG: No userId provided");
    return;
  }

  console.log("DEBUG: Checking user_roadmaps table for user:", userId);
  
  try {
    // Get all user roadmaps
    const { data: allRoadmaps, error: allError } = await supabase
      .from('user_roadmaps')
      .select('*')
      .eq('user_id', userId);
    
    if (allError) {
      console.error("DEBUG: Error fetching all roadmaps:", allError);
    } else {
      console.log("DEBUG: All user roadmaps:", allRoadmaps);
    }
    
    // Get primary roadmap
    const { data: primaryRoadmap, error: primaryError } = await supabase
      .from('user_roadmaps')
      .select('*')
      .eq('user_id', userId)
      .eq('is_primary', true)
      .maybeSingle();
      
    if (primaryError) {
      console.error("DEBUG: Error fetching primary roadmap:", primaryError);
    } else {
      console.log("DEBUG: Primary roadmap:", primaryRoadmap);
    }
    
    return { allRoadmaps, primaryRoadmap };
  } catch (error) {
    console.error("DEBUG: Unexpected error:", error);
    return null;
  }
};

export const resetPrimaryRoadmap = async (userId: string) => {
  if (!userId) {
    console.error("DEBUG: No userId provided for reset");
    return false;
  }
  
  try {
    // Clear all primary flags
    const { error } = await supabase
      .from('user_roadmaps')
      .update({ is_primary: false })
      .eq('user_id', userId);
      
    if (error) {
      console.error("DEBUG: Error resetting primary roadmaps:", error);
      return false;
    }
    
    console.log("DEBUG: Successfully reset primary roadmaps for user:", userId);
    return true;
  } catch (error) {
    console.error("DEBUG: Unexpected error during reset:", error);
    return false;
  }
};

export const repairPrimaryRoadmaps = async (userId: string) => {
  if (!userId) {
    console.error("REPAIR: No userId provided");
    return { success: false, message: "No user ID provided" };
  }
  
  console.log("REPAIR: Starting primary roadmap repair for user:", userId);
  
  try {
    // Step 1: Get all user roadmaps
    const { data: roadmaps, error: fetchError } = await supabase
      .from('user_roadmaps')
      .select('*')
      .eq('user_id', userId);
      
    if (fetchError) {
      console.error("REPAIR: Error fetching roadmaps:", fetchError);
      return { success: false, message: fetchError.message };
    }
    
    console.log("REPAIR: Found roadmaps:", roadmaps?.length || 0);
    
    if (!roadmaps || roadmaps.length === 0) {
      return { success: true, message: "No roadmaps found to repair" };
    }
    
    // Step 2: First set all roadmaps to non-primary
    const { error: resetError } = await supabase
      .from('user_roadmaps')
      .update({ is_primary: false })
      .eq('user_id', userId);
      
    if (resetError) {
      console.error("REPAIR: Error resetting roadmaps:", resetError);
      return { success: false, message: resetError.message };
    }
    
    // Step 3: Find the most recent roadmap and set it as primary
    const mostRecent = roadmaps.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    
    console.log("REPAIR: Setting roadmap as primary:", mostRecent);
    
    const { error: updateError } = await supabase
      .from('user_roadmaps')
      .update({ is_primary: true })
      .eq('id', mostRecent.id);
      
    if (updateError) {
      console.error("REPAIR: Error setting primary roadmap:", updateError);
      return { success: false, message: updateError.message };
    }
    
    console.log("REPAIR: Successfully repaired roadmaps for user:", userId);
    return { 
      success: true, 
      message: `Repair complete. Set "${mostRecent.career_name}" as primary roadmap.` 
    };
  } catch (error: any) {
    console.error("REPAIR: Unexpected error:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
};

// Add a function to completely clear and recreate a roadmap entry
export const recreateRoadmap = async (userId: string, roadmapData: any) => {
  if (!userId || !roadmapData) {
    console.error("RECREATE: Missing user ID or roadmap data");
    return { success: false, message: "Missing required data" };
  }
  
  console.log("RECREATE: Recreating roadmap with data:", roadmapData);
  
  try {
    // Step 1: Delete all existing primary roadmaps
    const { error: deleteError } = await supabase
      .from('user_roadmaps')
      .delete()
      .eq('user_id', userId)
      .eq('is_primary', true);
      
    if (deleteError) {
      console.error("RECREATE: Error deleting existing roadmaps:", deleteError);
      return { success: false, message: deleteError.message };
    }
    
    // Step 2: Create a new roadmap entry
    const { data, error: insertError } = await supabase
      .from('user_roadmaps')
      .insert({
        user_id: userId,
        career_name: roadmapData.careerName,
        category: roadmapData.category || "",
        roadmap_key: roadmapData.roadmapKey,
        is_primary: true
      })
      .select();
      
    if (insertError) {
      console.error("RECREATE: Error creating new roadmap:", insertError);
      return { success: false, message: insertError.message };
    }
    
    console.log("RECREATE: Successfully created new roadmap:", data);
    return { success: true, message: "Roadmap recreated successfully", data };
  } catch (error: any) {
    console.error("RECREATE: Unexpected error:", error);
    return { success: false, message: error.message || "Unknown error" };
  }
}; 