
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';
import CareerInfoSidebar from './roadmap/CareerInfoSidebar';
import RoadmapStages from './roadmap/RoadmapStages';
import IndianMarketInsights from './roadmap/IndianMarketInsights';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import SetPrimaryRoadmapButton from './SetPrimaryRoadmapButton';

const DetailedCareerRoadmap: React.FC = () => {
  const { category, careerName } = useParams<{ category?: string; careerName?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const decodedCareerName = careerName ? decodeURIComponent(careerName) : '';
  const categoryData = category ? careerAdvice[category as keyof typeof careerAdvice] : null;
  const careerPath = categoryData?.paths.find(path => path.name === decodedCareerName);

  const careerToRoadmapMap: Record<string, string> = {
    'Full-Stack Developer': 'Full-Stack Developer',
    'Frontend Developer': 'Frontend Developer',
    'Backend Developer': 'Backend Developer',
    'Data Scientist': 'Data Science',
    'UX/UI Designer': 'UX/UI Design',
    'DevOps Engineer': 'Software Development',
    'Cybersecurity Analyst': 'Software Development',
    'Product Manager': 'UX/UI Design',
  };
  const roadmapKey = careerToRoadmapMap[decodedCareerName] || 'Software Development';
  const roadmapData = detailedRoadmaps[roadmapKey] || detailedRoadmaps.default;

  if (!careerPath) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Career not found</h2>
        <p className="mb-6">Sorry, we couldn't find detailed information for this career path.</p>
        <Button onClick={() => navigate('/explore-roadmaps')}>
          Return to All Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/explore-roadmaps/${category}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </Link>
        {user && (
          <SetPrimaryRoadmapButton
            userId={user.id}
            careerName={careerPath.name}
            category={category as string}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CareerInfoSidebar careerPath={careerPath} roadmapData={roadmapData} />
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Detailed Career Roadmap</CardTitle>
              <CardDescription>
                Follow this path to build your career in {careerPath.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoadmapStages roadmapData={roadmapData} />
            </CardContent>
          </Card>
          <IndianMarketInsights marketData={roadmapData.indianMarket} />
        </div>
      </div>
    </div>
  );
};

export default DetailedCareerRoadmap;
