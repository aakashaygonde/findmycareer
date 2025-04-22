import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { full_name: string, username: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider initializing");
    
    // Set up an auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Initial session check
    checkUser();

    return () => {
      console.log("AuthProvider cleanup");
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      console.log("Checking user session");
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      console.log("Current session:", currentSession?.user?.email);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await fetchUserProfile(currentSession.user.id);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        console.log("Profile data fetched:", data);
        // Convert the data from the DB to match the UserProfile type
        const userProfile: UserProfile = {
          id: data.id,
          name: data.full_name || '',
          email: user?.email || '',
          skills: [],
          interests: [],
          education: {
            level: data.education_level || '',
            field: data.education_field || '',
          },
          careerGoals: [],
          savedCareers: [],
          completedMilestones: [],
        };
        
        setProfile(userProfile);
      } else {
        console.log("No profile data found");
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name: string, username: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            username: userData.username,
          }
        }
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        toast({
          title: "Account Created",
          description: "Please check your email to confirm your account.",
        });
        navigate('/auth', { state: { message: 'Please check your email to confirm your account before logging in.' } });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        title: "An error occurred",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "An error occurred",
        description: "There was a problem logging into your account.",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      
      // Clear user and session state manually
      setUser(null);
      setSession(null);
      setProfile(null);
      
      console.log("Successfully signed out, redirecting to home");
      navigate('/');
      
      toast({
        title: "Signed out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "An error occurred",
        description: "There was a problem signing out.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      // Map UserProfile updates to the database schema
      const dbUpdates: any = {
        full_name: updates.name,
        education_level: updates.education?.level,
        education_field: updates.education?.field,
      };

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update the local profile state
      if (profile) {
        setProfile({
          ...profile,
          ...updates,
        });
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
