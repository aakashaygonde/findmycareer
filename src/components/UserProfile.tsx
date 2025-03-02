
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, PlusCircle, Save, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const UserProfile: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [education, setEducation] = useState('');
  const [goals, setGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setInterests(profile.interests || []);
      setEducation(profile.education?.level && profile.education?.field
        ? `${profile.education.level} in ${profile.education.field}`
        : '');
      setGoals(profile.careerGoals?.join('\n') || '');
    }
  }, [profile]);

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Parse education field into level and field
      let educationLevel = '';
      let educationField = '';
      
      if (education) {
        const parts = education.split(' in ');
        educationLevel = parts[0];
        educationField = parts.length > 1 ? parts[1] : '';
      }
      
      // Parse goals from textarea
      const careerGoals = goals
        .split('\n')
        .map(goal => goal.trim())
        .filter(Boolean);
      
      await updateProfile({
        name,
        interests,
        education: {
          level: educationLevel,
          field: educationField
        },
        careerGoals
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 glass-card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 glass-card">
        <h3 className="text-xl font-bold mb-4">Interests & Skills</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="interests" className="mb-2 block">Interests</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="pl-2 pr-1 py-1.5">
                  {interest}
                  <button 
                    onClick={() => handleRemoveInterest(interest)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            
            <form onSubmit={handleAddInterest} className="flex gap-2">
              <Input
                id="interests"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add an interest"
                className="flex-1"
              />
              <Button type="submit" size="sm" variant="outline">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add
              </Button>
            </form>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Input 
              id="education" 
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g., Bachelor's Degree in Computer Science"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goals">Career Goals</Label>
            <Textarea 
              id="goals" 
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Enter your career goals, one per line"
              rows={4}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button 
            className="flex items-center gap-2"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
