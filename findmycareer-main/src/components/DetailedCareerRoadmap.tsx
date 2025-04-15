
import React from 'react';
import { ArrowLeft, BookOpen, Briefcase, GraduationCap, Award, Clock, ChevronRight, DollarSign } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { careerAdvice } from '@/lib/career-advisor';
import { detailedRoadmaps } from '@/lib/detailed-roadmaps';
import { getCareerSalaryInRupees } from '@/hooks/assessment/assessmentUtils';

const DetailedCareerRoadmap: React.FC = () => {
  const { category, careerName } = useParams<{ category?: string; careerName?: string }>();
  const navigate = useNavigate();
  const decodedCareerName = careerName ? decodeURIComponent(careerName) : '';

  // Find the career in the category
  const categoryData = category ? careerAdvice[category as keyof typeof careerAdvice] : null;
  const careerPath = categoryData?.paths.find(path => path.name === decodedCareerName);
  
  // Get roadmap data
  const roadmapData = detailedRoadmaps[decodedCareerName] || detailedRoadmaps.default;

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
      <div className="flex items-center mb-6">
        <Link to={`/explore-roadmaps/${category}`}>
          <Button variant="ghost" size="sm" className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl">{careerPath.name}</CardTitle>
              <CardDescription className="text-base">{careerPath.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-blue-500" /> Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {careerPath.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-2 text-blue-500" /> Education Paths
                </h3>
                <ul className="space-y-1 list-disc list-inside text-sm">
                  {careerPath.education.map((edu, idx) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" /> Salary Range (India)
                  </h3>
                  <Badge className="bg-green-100 text-green-800">
                    {roadmapData.salaryTrend}
                  </Badge>
                </div>
                <p className="text-lg font-bold">{getCareerSalaryInRupees(careerPath.name)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Varies based on experience, location, and company size
                </p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" /> Time to Proficiency
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Entry Level</span>
                      <span className="text-xs">{roadmapData.timeline.entryLevel}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Mid Level</span>
                      <span className="text-xs">{roadmapData.timeline.midLevel}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs">Senior Level</span>
                      <span className="text-xs">{roadmapData.timeline.seniorLevel}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <Tabs defaultValue="beginner">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="beginner" className="space-y-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" /> Foundational Stage (0-1 years)
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Essential Skills to Develop</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.beginner.skills.map((skill, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Key Learning Resources</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.beginner.resources.map((resource, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{resource.name}</span>
                              <p className="text-sm text-muted-foreground">{resource.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Projects to Build</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.beginner.projects.map((project, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{project.name}</span>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Expected Outcomes</h4>
                      <p className="mt-2 text-sm">{roadmapData.beginner.outcomes}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="intermediate" className="space-y-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" /> Professional Growth Stage (1-3 years)
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Advanced Skills to Develop</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.intermediate.skills.map((skill, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Professional Development</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.intermediate.certifications.map((cert, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{cert.name}</span>
                              <p className="text-sm text-muted-foreground">{cert.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Career Milestones</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.intermediate.milestones.map((milestone, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{milestone.name}</span>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Expected Outcomes</h4>
                      <p className="mt-2 text-sm">{roadmapData.intermediate.outcomes}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4">
                  <h3 className="font-medium text-lg mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" /> Expert/Leadership Stage (3+ years)
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Specialized Expertise</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.advanced.specializations.map((specialization, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{specialization.name}</span>
                              <p className="text-sm text-muted-foreground">{specialization.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6 before:absolute before:left-0 before:top-[7px] before:h-full before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Leadership Opportunities</h4>
                      <ul className="mt-2 space-y-2">
                        {roadmapData.advanced.leadership.map((role, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{role.title}</span>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="font-semibold text-base">Industry Impact</h4>
                      <p className="mt-2 text-sm">{roadmapData.advanced.industryImpact}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">Indian Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-base mb-2">Top Companies Hiring in India</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {roadmapData.indianMarket.topCompanies.map((company, index) => (
                      <Badge key={index} variant="outline" className="justify-center py-1">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-base mb-2">Regional Hotspots</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {roadmapData.indianMarket.regions.map((region, index) => (
                      <div key={index} className="flex items-center">
                        <Badge variant="outline" className="mr-2 w-2 h-2 p-0"></Badge>
                        <span className="text-sm">{region}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-base mb-2">Salary Trends by Experience (Annual in ₹)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Entry Level</span>
                        <span className="text-sm font-medium">
                          {roadmapData.indianMarket.salaryByExperience.entrySalary}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Mid Level (3-5 years)</span>
                        <span className="text-sm font-medium">
                          {roadmapData.indianMarket.salaryByExperience.midSalary}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Senior Level (5-8 years)</span>
                        <span className="text-sm font-medium">
                          {roadmapData.indianMarket.salaryByExperience.seniorSalary}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Leadership (8+ years)</span>
                        <span className="text-sm font-medium">
                          {roadmapData.indianMarket.salaryByExperience.leadershipSalary}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-base mb-2">Market Outlook</h3>
                  <p className="text-sm">{roadmapData.indianMarket.outlook}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailedCareerRoadmap;
