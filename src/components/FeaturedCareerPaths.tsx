
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCareerSalaryInRupees } from '@/hooks/assessment/assessmentUtils';

type CareerPathInfo = {
  title: string;
  description: string;
  growth: 'High' | 'Medium' | 'Low';
};

const careerPaths: CareerPathInfo[] = [
  {
    title: 'Full-Stack Developer',
    description: 'Build complete web applications with both front-end and back-end expertise.',
    growth: 'High',
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data and extract insights to drive business decisions.',
    growth: 'High',
  },
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive and engaging user experiences for digital products.',
    growth: 'High',
  },
  {
    title: 'DevOps Engineer',
    description: 'Streamline development processes and optimize deployment pipelines.',
    growth: 'High',
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from digital threats and security breaches.',
    growth: 'High',
  },
  {
    title: 'Product Manager',
    description: 'Lead product development from conception to launch and beyond.',
    growth: 'High',
  },
];

const FeaturedCareerPaths: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Career Paths</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore some of the most in-demand career paths in today's job market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careerPaths.map((career, index) => (
            <Card key={index} className="p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {career.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{getCareerSalaryInRupees(career.title)}</span>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {career.growth} Growth
                </Badge>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/assessment">
            <Button variant="outline" size="lg">
              Discover Your Ideal Career
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCareerPaths;
