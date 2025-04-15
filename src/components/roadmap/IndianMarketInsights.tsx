
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type IndianMarketInsightsProps = {
  marketData: any;
};

const IndianMarketInsights: React.FC<IndianMarketInsightsProps> = ({ marketData }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl">Indian Market Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-base mb-2">Top Companies Hiring in India</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {marketData.topCompanies.map((company: string, index: number) => (
                <Badge key={index} variant="outline" className="justify-center py-1">
                  {company}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base mb-2">Regional Hotspots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {marketData.regions.map((region: string, index: number) => (
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
                    {marketData.salaryByExperience.entrySalary}
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
                    {marketData.salaryByExperience.midSalary}
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
                    {marketData.salaryByExperience.seniorSalary}
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
                    {marketData.salaryByExperience.leadershipSalary}
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
            <p className="text-sm">{marketData.outlook}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndianMarketInsights;
