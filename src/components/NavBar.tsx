import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, User, BarChart, MessageSquare, Home, LogOut, ChartNoAxesGantt } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, signOut } = useAuth();

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
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" />, requiresAuth: false },
    { name: 'Roadmaps', path: '/explore-roadmaps', icon: <ChartNoAxesGantt className="w-4 h-4 mr-2" />, requiresAuth: false },
    { name: 'Assessment', path: '/assessment', icon: <MessageSquare className="w-4 h-4 mr-2" />, requiresAuth: true },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart className="w-4 h-4 mr-2" />, requiresAuth: true },
    { name: 'Profile', path: '/profile', icon: <User className="w-4 h-4 mr-2" />, requiresAuth: true }
  ];

  // Filter nav links based on auth status
  const filteredNavLinks = navLinks.filter(link => !link.requiresAuth || user);

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
              <span className="font-display font-bold text-xl">Find My Career</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {filteredNavLinks.map((link) => (
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
              
              <ThemeToggle />
              
              {!user ? (
                <Link to="/auth">
                  <Button>Get Started</Button>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-500 focus:text-red-500"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-1">
              <ThemeToggle />
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
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg animate-slide-down">
          <div className="container px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {filteredNavLinks.map((link) => (
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
              
              {!user ? (
                <div className="pt-2">
                  <Link to="/auth" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              ) : (
                <div className="border-t mt-2 pt-2">
                  <div className="px-4 py-2 text-sm">
                    Signed in as: <span className="font-semibold">{user.email}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
