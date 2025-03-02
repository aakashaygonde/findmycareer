
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, PlusCircle, Save, User } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>(['Web Development', 'User Interface Design', 'Problem Solving']);

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
                <Input id="name" defaultValue="Alex Johnson" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" defaultValue="Self-taught developer with a passion for creating intuitive user experiences. Looking to transition into a full-time web development role." />
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
            <Input id="education" defaultValue="Bachelor's Degree in Computer Science" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goals">Career Goals</Label>
            <Textarea id="goals" defaultValue="Become a full-stack developer within the next 2 years. Eventually, I'd like to lead a development team and mentor junior developers." />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
