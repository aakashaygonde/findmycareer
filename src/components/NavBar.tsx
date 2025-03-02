
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, User, BarChart, MessageSquare, Home } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Assessment', path: '/assessment', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart className="w-4 h-4 mr-2" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4 mr-2" /> }
  ];

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="bg-primary text-primary-foreground rounded-md p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </span>
              <span className="font-display font-bold text-xl">Find My Skills</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <span className="flex items-center">
                    {link.icon}
                    {link.name}
                  </span>
                </Link>
              ))}
              <div className="ml-4">
                <Button>Get Started</Button>
              </div>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg animate-slide-down">
          <div className="container px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-md text-sm font-medium ${
                    location.pathname === link.path
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <span className="flex items-center">
                    {link.icon}
                    {link.name}
                  </span>
                </Link>
              ))}
              <div className="pt-2">
                <Button className="w-full">Get Started</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
