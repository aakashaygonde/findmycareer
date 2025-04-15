
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink } from 'lucide-react';
import { Skill } from '@/types';

// Mock data for skills
const existingSkills: Skill[] = [
  { id: '1', name: 'HTML', category: 'Frontend', level: 80, description: 'Markup language for web pages' },
  { id: '2', name: 'CSS', category: 'Frontend', level: 75, description: 'Style sheet language for web pages' },
  { id: '3', name: 'JavaScript', category: 'Frontend', level: 60, description: 'Programming language for web' },
  { id: '4', name: 'Git', category: 'Tools', level: 70, description: 'Version control system' },
];

const neededSkills: Skill[] = [
  { id: '5', name: 'React', category: 'Frontend', level: 30, description: 'JavaScript library for building UIs' },
  { id: '6', name: 'Node.js', category: 'Backend', level: 20, description: 'JavaScript runtime environment' },
  { id: '7', name: 'SQL', category: 'Database', level: 15, description: 'Query language for databases' },
  { id: '8', name: 'UI/UX Design', category: 'Design', level: 25, description: 'User interface and experience design' },
];

interface SkillCardProps {
  skill: Skill;
  existing?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, existing = false }) => {
  return (
    <Card className="p-4 h-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{skill.name}</h3>
          <p className="text-xs text-muted-foreground">{skill.category}</p>
        </div>
        {!existing && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookOpen className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Progress value={skill.level} className="h-2 mt-2" />
      
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-muted-foreground">
          {existing ? 'Current level' : 'Gap to fill'}
        </span>
        <span className="text-xs font-medium">{skill.level}%</span>
      </div>
      
      <p className="text-sm mt-3 text-muted-foreground">{skill.description}</p>
      
      {!existing && (
        <Button variant="outline" size="sm" className="w-full mt-4">
          Find Resources
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      )}
    </Card>
  );
};

const SkillGapAnalysis: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
        <Button variant="outline" size="sm">Refresh Analysis</Button>
      </div>
      
      <Tabs defaultValue="needed">
        <TabsList className="mb-6">
          <TabsTrigger value="existing">Your Skills</TabsTrigger>
          <TabsTrigger value="needed">Skills to Learn</TabsTrigger>
        </TabsList>
        
        <TabsContent value="existing" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} existing={true} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="needed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {neededSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} existing={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillGapAnalysis;
