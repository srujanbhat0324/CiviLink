
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Home, Flag, Battery, User, Trash2, LayoutDashboard, LogOut } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check login status on mount
  useEffect(() => {
    // In a real app, you'd check a token in localStorage or a cookie
    // For demo purposes, we'll create a simple login state
    const userLoggedIn = localStorage.getItem('user') !== null;
    setIsLoggedIn(userLoggedIn);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    // You would also navigate to home or login page in a real app
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border py-3 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Logo />
          
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home Link */}
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                    location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
                  )}>
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {/* Dashboard Link */}
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                    location.pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                  )}>
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              {/* Issues Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  <span>Issues</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-2 w-[180px]">
                    <Link to="/issues/reported" className="block">
                      <NavigationMenuLink className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                        location.pathname === "/issues/reported" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        <span>Reported</span>
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/issues/resolved" className="block">
                      <NavigationMenuLink className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                        location.pathname === "/issues/resolved" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        <span>Resolved</span>
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/issues/in-progress" className="block">
                      <NavigationMenuLink className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                        location.pathname === "/issues/in-progress" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        <span>In-Progress</span>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              {/* Section Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <span>Section</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-1 p-2 w-[180px]">
                    <Link to="/section/electricity" className="block">
                      <NavigationMenuLink className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                        location.pathname === "/section/electricity" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        <Battery className="h-4 w-4" />
                        <span>Electricity</span>
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/section/road" className="block">
                      <NavigationMenuLink className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                        location.pathname === "/section/road" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Road</span>
                      </NavigationMenuLink>
                    </Link>
                    <Link to="/section/cleanliness" className="block">
                      <NavigationMenuLink className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                        location.pathname === "/section/cleanliness" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        <Trash2 className="h-4 w-4" />
                        <span>Cleanliness</span>
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              {/* Profile Link */}
              <NavigationMenuItem>
                <Link to="/profile">
                  <NavigationMenuLink className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent",
                    location.pathname === "/profile" ? "text-foreground" : "text-muted-foreground"
                  )}>
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              className="rounded-full px-5 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="rounded-full px-5">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="rounded-full px-5 bg-gradient-to-r from-civilink-blue to-civilink-indigo hover:opacity-90 transition-opacity">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
