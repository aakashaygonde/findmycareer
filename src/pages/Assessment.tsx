
import React from 'react';
import Layout from '@/components/Layout';
import AssessmentChat from '@/components/AssessmentChat';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, InfoIcon, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(20);

  // Simulate progress update
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 60) {
        setProgress(progress + 10);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <Layout className="py-8">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Career Assessment</h1>
            <p className="text-muted-foreground">Discover career paths aligned with your skills and interests</p>
          </div>
          
          <Card className="bg-accent/50 p-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Estimated time: 5-10 minutes</span>
          </Card>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Assessment Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AssessmentChat />
        </div>
        
        <div>
          <Card className="p-6 sticky top-24 neo-card">
            <div className="flex items-start gap-3 mb-4">
              <InfoIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-bold">How it works</h3>
                <p className="text-sm text-muted-foreground">Our AI assistant will ask you questions to understand your interests, skills, and career goals.</p>
              </div>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Be honest</h4>
                <p className="text-muted-foreground">There are no right or wrong answers. Your authentic responses lead to better recommendations.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Take your time</h4>
                <p className="text-muted-foreground">Consider each question carefully. You can always revisit the assessment later.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Explore options</h4>
                <p className="text-muted-foreground">Feel free to ask the AI assistant for clarification or more information about specific careers.</p>
              </div>
            </div>
            
            <div className="border-t border-border mt-6 pt-6">
              <h4 className="font-medium mb-2">Why we ask these questions</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your responses help us identify patterns in your interests and aptitudes that align with various career paths.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More About Our Methodology
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Assessment;
