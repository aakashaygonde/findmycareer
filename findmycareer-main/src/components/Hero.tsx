
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          <span className="text-sm font-medium text-primary">Discover your ideal career path</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 animate-slide-up">
          Find the <span className="text-primary">perfect career</span> based on your skills and interests
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance animate-slide-up animate-delay-100">
          Our AI-powered platform helps you discover career paths tailored to your unique strengths, interests, and market demand.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animate-delay-200">
          <Button 
            size="lg" 
            onClick={() => navigate('/assessment')}
            className="group"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/dashboard')}
          >
            Explore Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
