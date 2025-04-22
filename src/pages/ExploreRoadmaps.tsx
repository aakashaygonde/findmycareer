import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useParams, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { ArrowLeft, Compass, BookOpen, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { careerAdvice } from '@/lib/career-advisor';
import { Badge } from '@/components/ui/badge';
import DetailedCareerRoadmap from '@/components/DetailedCareerRoadmap';
// import NavMenu from '@/components/NavMenu';

// All paths in a single array for easy filtering
const allPaths = Object.values(careerAdvice).flatMap(category => category.paths);

const CareerList: React.FC = () => {
  const { category: urlCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Default to first category if none specified
  const defaultCategory = Object.keys(careerAdvice)[0];
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || defaultCategory);
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <div className="flex justify-center mb-8">
        <NavMenu />
      </div> */}
      
      <div className="flex items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Career Roadmaps</h1>
      </div>
      
      <div className="mb-8">
        <p className="text-muted-foreground mb-4">
          Explore detailed roadmaps for various career paths. These roadmaps provide guidance on skills, education, 
          and milestones required for success in different professional fields.
        </p>
        
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for careers by name, description, or skills..."
            className="w-full p-3 border rounded-lg pl-4 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-3 text-gray-400">
            <Compass className="h-5 w-5" />
          </span>
        </div>
        
        {!searchTerm && (
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mb-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
              {Object.keys(careerAdvice).map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path, index) => (
          <Card key={index} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{path.name}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-1" /> Key Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {path.skills.slice(0, 5).map((skill, idx) => (
                    <Badge key={idx} variant="outline">{skill}</Badge>
                  ))}
                  {path.skills.length > 5 && (
                    <Badge variant="outline">+{path.skills.length - 5} more</Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" /> Education Paths
                </h4>
                <ul className="list-disc ml-5 text-sm">
                  {path.education.slice(0, 2).map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                  {path.education.length > 2 && (
                    <li className="text-muted-foreground">+{path.education.length - 2} more options</li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {path.name === 'Frontend Developer' && '₹4,00,000 - ₹18,00,000'}
                  {path.name === 'Full-Stack Developer' && '₹6,00,000 - ₹20,00,000'}
                  {path.name === 'Full Stack Developer' && '₹6,00,000 - ₹20,00,000'}
                  {path.name === 'Data Scientist' && '₹8,00,000 - ₹22,00,000'}
                  {path.name === 'UX/UI Designer' && '₹5,00,000 - ₹18,00,000'}
                  {path.name === 'DevOps Engineer' && '₹8,00,000 - ₹25,00,000'}
                  {path.name === 'Cybersecurity Analyst' && '₹7,00,000 - ₹20,00,000'}
                  {path.name === 'Product Manager' && '₹10,00,000 - ₹25,00,000'}
                </span>
              </div>
              <Link to={`/explore-roadmaps/${selectedCategory}/${encodeURIComponent(path.name)}`}>
                <Button size="sm">
                  View Detailed Roadmap
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredPaths.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Compass className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No matching career paths</h3>
          <p className="text-muted-foreground">Try adjusting your search or explore another category</p>
        </div>
      )}
    </div>
  );
};

const ExploreRoadmaps: React.FC = () => {
  const { careerName } = useParams<{ careerName?: string }>();
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CareerList />} />
        <Route path="/:category" element={<CareerList />} />
        <Route path="/:category/:careerName" element={<DetailedCareerRoadmap />} />
      </Routes>
    </Layout>
  );
};

export default ExploreRoadmaps;
