
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

// Demo users for testing purposes
const DEMO_USERS = [
  { username: 'user1', password: 'password123', name: 'John Doe', mobile: '1234567890' },
  { username: 'user2', password: 'password123', name: 'Jane Smith', mobile: '0987654321' }
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      // If user is already logged in, redirect to the home page
      navigate('/');
    }
  }, [navigate]);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Check if user exists in our demo data
    const user = DEMO_USERS.find(
      u => u.username === username && u.password === password
    );
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (user) {
        // Store user data in localStorage (in a real app, you'd store a token)
        localStorage.setItem('user', JSON.stringify({
          username: user.username,
          name: user.name,
          mobile: user.mobile
        }));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        // Redirect to dashboard or the page they came from
        const redirectTo = location.state?.from || '/dashboard';
        navigate(redirectTo);
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password. Try with 'user1' and 'password123'.",
        });
      }
    }, 1000);
  };
  
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
      alternateActionText="Don't have an account?"
      alternateActionLink="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? "border-civilink-red" : ""}
              disabled={isLoading}
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-xs text-civilink-red">{errors.username}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-civilink-red pr-10" : "pr-10"}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-civilink-red">{errors.password}</p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-civilink-blue to-civilink-indigo hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Demo credentials: username "user1", password "password123"
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
