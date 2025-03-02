
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, MessageSquare, LineChart, BookOpen, Lightbulb, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const animationDelay = `${index * 100}ms`;
  
  return (
    <Card className="p-6 neo-card h-full animate-scale-in" style={{ animationDelay }}>
      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "AI-Powered Guidance",
      description: "Our intelligent chatbot analyzes your skills and interests to provide personalized career recommendations."
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Skill Gap Analysis",
      description: "Discover which skills you already have and which ones you need to develop for your desired career path."
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Market Insights",
      description: "Access real-time data on job demand, salary ranges, and growth opportunities in various fields."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Learning Resources",
      description: "Get recommendations for courses, tutorials, and certifications tailored to your career goals."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Career Roadmap",
      description: "Visualize your career journey with short-term and long-term milestones to track your progress."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "Personalized Experience",
      description: "Create a profile to save your results, track your progress, and receive personalized updates."
    }
  ];

  return (
    <Layout>
      <Hero />
      
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover Your Career Path</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform combines AI-powered assessment, real-world job data, and personalized guidance to help you find your ideal career path.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold mb-1">Complete the Assessment</h3>
                    <p className="text-muted-foreground">Answer questions about your interests, skills, and career goals through our interactive chatbot.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold mb-1">Review Your Results</h3>
                    <p className="text-muted-foreground">Explore recommended career paths based on your assessment and current market demand.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold mb-1">Follow Your Roadmap</h3>
                    <p className="text-muted-foreground">Use your personalized career roadmap to develop the skills you need and track your progress.</p>
                  </div>
                </div>
              </div>
              
              <Button
                className="mt-8 group"
                onClick={() => navigate('/assessment')}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <Card className="overflow-hidden neo-card">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                  alt="Person working on skills development"
                  className="w-full h-96 object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Career?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your assessment today and discover career paths that align with your skills, interests, and goals.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/assessment')}
            className="animate-pulse-subtle"
          >
            Begin Your Assessment
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
