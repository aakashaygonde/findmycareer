
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const NavMenu: React.FC = () => {
  const location = useLocation();
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink 
              className={cn(navigationMenuTriggerStyle(), {
                'bg-accent/50': location.pathname === '/',
              })}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/explore-roadmaps">
            <NavigationMenuLink 
              className={cn(navigationMenuTriggerStyle(), {
                'bg-accent/50': location.pathname.includes('/explore-roadmaps'),
              })}
            >
              Career Roadmaps
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
