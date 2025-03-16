import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Calendar, Rocket, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { useAssessmentChat } from '@/hooks/useAssessmentChat';

const CareerRoadmapDisplay: React.FC = memo(() => {
  const { careerRoadmap, assessmentStage } = useAssessmentChat();
  
  if (!careerRoadmap || assessmentStage < 4) {
    return null;
  }
  
  return (
    <Card className="mt-8 border-primary/20 shadow-md animate-fade-in">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Your Personalized Career Roadmap
            </CardTitle>
            <CardDescription>
              Based on our assessment, here's a tailored plan to help you achieve your career goals
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/20 text-primary px-3">
            {assessmentStage === 5 ? 'Final Plan' : 'Draft Plan'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="short-term" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="short-term" className="data-[state=active]:bg-primary/5">
              <Calendar className="h-4 w-4 mr-2" />
              Short-Term
            </TabsTrigger>
            <TabsTrigger value="medium-term" className="data-[state=active]:bg-primary/5">
              <Calendar className="h-4 w-4 mr-2" />
              Medium-Term
            </TabsTrigger>
            <TabsTrigger value="long-term" className="data-[state=active]:bg-primary/5">
              <Calendar className="h-4 w-4 mr-2" />
              Long-Term
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="short-term" className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Focus on these actions in the next 3-6 months to begin your career journey:
            </p>
            <div className="space-y-3">
              {careerRoadmap.shortTerm.map((item, index) => (
                <Card key={index} className="p-3 border-l-4 border-l-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medium-term" className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Plan these actions for the next 6 months to 2 years to build on your foundation:
            </p>
            <div className="space-y-3">
              {careerRoadmap.mediumTerm.map((item, index) => (
                <Card key={index} className="p-3 border-l-4 border-l-amber-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="long-term" className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Set these goals for 2+ years out to advance your career:
            </p>
            <div className="space-y-3">
              {careerRoadmap.longTerm.map((item, index) => (
                <Card key={index} className="p-3 border-l-4 border-l-emerald-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-4 border-t">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-primary" />
            Recommended Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {careerRoadmap.resources.map((resource, index) => (
              <a 
                key={index} 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-md border hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{resource.title}</h5>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CareerRoadmapDisplay.displayName = 'CareerRoadmapDisplay';

export default CareerRoadmapDisplay;
