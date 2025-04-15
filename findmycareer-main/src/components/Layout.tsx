
import React from 'react';
import NavBar from './NavBar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  fullWidth = false 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-dot-pattern">
      <NavBar />
      <main className={cn(
        "flex-1 flex flex-col",
        fullWidth ? "w-full" : "container mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}>
        {children}
      </main>
      <footer className="py-6 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Find My Skills. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
