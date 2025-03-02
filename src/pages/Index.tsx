
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout fullWidth>
      <Hero />
      
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to discover your perfect career path?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Take our comprehensive skills assessment and get personalized recommendations for your career journey.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <Link to="/assessment">
                <Button size="lg" className="px-8">Start Assessment</Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="px-8">Sign Up Now</Button>
              </Link>
            )}
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="px-8">Explore Dashboard</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform uses advanced algorithms to match your skills and interests with in-demand careers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Complete Assessment</h3>
              <p className="text-muted-foreground text-center">
                Answer questions about your skills, interests, and educational background.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Get Recommendations</h3>
              <p className="text-muted-foreground text-center">
                Receive personalized career recommendations based on your unique profile.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Follow Your Roadmap</h3>
              <p className="text-muted-foreground text-center">
                Use your personalized roadmap to develop skills and achieve your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Career Paths</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore some of the most in-demand career paths in today's job market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Full-Stack Developer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Build complete web applications with both front-end and back-end expertise.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$75k - $120k</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">High Growth</span>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Data Scientist</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Analyze complex data and extract insights to drive business decisions.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$90k - $140k</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">High Growth</span>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">UX/UI Designer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create intuitive and engaging user experiences for digital products.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$65k - $110k</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">High Growth</span>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">DevOps Engineer</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Streamline development processes and optimize deployment pipelines.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$85k - $130k</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">High Growth</span>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Cybersecurity Analyst</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Protect organizations from digital threats and security breaches.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$80k - $125k</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">High Growth</span>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Product Manager</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lead product development from conception to launch and beyond.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">$85k - $140k</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">High Growth</span>
              </div>
            </div>
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
      
      {!user && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Join Thousands of Successful Professionals</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Our platform has helped people from all backgrounds find fulfilling careers that match their skills and passions.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth">
                  <Button size="lg" className="px-8">Get Started for Free</Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;

