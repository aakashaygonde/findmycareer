
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type CareerPathInfo = {
  title: string;
  description: string;
  growth: 'High' | 'Medium' | 'Low';
  category: string;
  salaryRange: string;
};

const careerPaths: CareerPathInfo[] = [
  {
    title: 'Full-Stack Developer',
    description: 'Build complete web applications with both front-end and back-end expertise.',
    growth: 'High',
    category: 'technology',
    salaryRange: '₹6,00,000 - ₹20,00,000'
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data and extract insights to drive business decisions.',
    growth: 'High',
    category: 'technology',
    salaryRange: '₹8,00,000 - ₹22,00,000'
  },
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive and engaging user experiences for digital products.',
    growth: 'High',
    category: 'creativeArts',
    salaryRange: '₹5,00,000 - ₹18,00,000'
  },
  {
    title: 'DevOps Engineer',
    description: 'Streamline development processes and optimize deployment pipelines.',
    growth: 'High',
    category: 'technology',
    salaryRange: '₹8,00,000 - ₹25,00,000'
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from digital threats and security breaches.',
    growth: 'High',
    category: 'technology',
    salaryRange: '₹7,00,000 - ₹20,00,000'
  },
  {
    title: 'Product Manager',
    description: 'Lead product development from conception to launch and beyond.',
    growth: 'High',
    category: 'business',
    salaryRange: '₹10,00,000 - ₹25,00,000'
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
            <Card key={index} className="p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
              <Link to={`/explore-roadmaps/${career.category}/${encodeURIComponent(career.title)}`} className="block h-full">
                <h3 className="text-xl font-bold mb-2">{career.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {career.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{career.salaryRange}</span>
                  <Badge variant={career.growth === 'High' ? 'default' : 'outline'} className={career.growth === 'High' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}>
                    {career.growth} Growth
                  </Badge>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/explore-roadmaps">
            <Button size="lg" className="gap-2">
              Explore All Career Roadmaps
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCareerPaths;
