
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getCareerSalaryInRupees } from '@/hooks/assessment/assessmentUtils';
import { careerAdvice } from '@/lib/career-advisor';

type CareerPathInfo = {
  title: string;
  description: string;
  growth: 'High' | 'Medium' | 'Low';
  category: string;
};

const careerPaths: CareerPathInfo[] = [
  { 
    title: 'Full-Stack Developer',
    description: 'Build complete web applications with both front-end and back-end expertise.',
    growth: 'High',
    category: 'technology'
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data and extract insights to drive business decisions.',
    growth: 'High',
    category: 'technology'
  },
  {
    title: 'UX/UI Designer',
    description: 'Create intuitive and engaging user experiences for digital products.',
    growth: 'High',
    category: 'creativeArts'
  },
  {
    title: 'DevOps Engineer',
    description: 'Streamline development processes and optimize deployment pipelines.',
    growth: 'High',
    category: 'technology'
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from digital threats and security breaches.',
    growth: 'High',
    category: 'technology'
  },
  {
    title: 'Product Manager',
    description: 'Lead product development from conception to launch and beyond.',
    growth: 'High',
    category: 'business'
  },
];

const FeaturedCareerPaths = () => {

  const allPaths = Object.values(careerAdvice).flatMap(category => category.paths);
  
    const { category: urlCategory } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Default to first category if none specified
    const defaultCategory = Object.keys(careerAdvice)[0];
    const [selectedCategory, setSelectedCategory] = useState(urlCategory || defaultCategory);
    const categories = Object.keys(careerAdvice);
    
    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      navigate(`/explore-roadmaps/${category}`);
    };
    
    // Filter paths based on search term
    const filteredPaths = searchTerm 
      ? allPaths.filter(path => 
          path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          path.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : careerAdvice[selectedCategory as keyof typeof careerAdvice]?.paths || [];

      console.log(filteredPaths)
  
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
        {filteredPaths.map((path, index) => (
  <Card key={index} className="p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
    <Link to={`/explore-roadmaps/${path.category}/${encodeURIComponent(path.name)}`} className="block h-full">
      <h3 className="text-xl font-bold mb-2">{path.name}</h3>
      <p className="text-muted-foreground mb-4">
        {path.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{getCareerSalaryInRupees(path.name)}</span>
        <Badge
          variant={'outline' }
          className={'High'}
        >
          {'High'} Growth
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
