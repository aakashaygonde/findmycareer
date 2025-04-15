
import React from 'react';
import Layout from '@/components/Layout';
import UserProfile from '@/components/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, DownloadCloud, Bell, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Profile: React.FC = () => {
  return (
    <Layout className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="animate-fade-in">
          <UserProfile />
        </TabsContent>
        
        <TabsContent value="preferences" className="animate-fade-in">
          <Card className="p-6 glass-card">
            <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Career Recommendations</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new career matches
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Learning Resources</Label>
                  <p className="text-sm text-muted-foreground">
                    Get updates on courses and tutorials relevant to your goals
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Market Trends</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about changes in the job market
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Milestone Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders about upcoming milestones on your roadmap
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive our monthly newsletter with tips and insights
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border flex justify-end">
              <Button className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="animate-fade-in">
          <div className="space-y-8">
            <Card className="p-6 glass-card">
              <h3 className="text-xl font-bold mb-6">Account Settings</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Control how your data is used to improve recommendations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Privacy Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Hide your profile from other users on the platform
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <Button className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Update Settings
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 glass-card">
              <h3 className="text-xl font-bold mb-6">Data Management</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Export Your Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Download all your profile data, assessments, and recommendations
                    </p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <DownloadCloud className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Account Deletion</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Profile;
