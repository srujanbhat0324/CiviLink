
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import PasswordStrength from '@/components/PasswordStrength';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const hasMinLength = password.length >= 8;
    
    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar && hasMinLength;
  };
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile);
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  useEffect(() => {
    // Check form validity whenever formData changes
    const isValid = 
      formData.name.trim() !== '' && 
      validateEmail(formData.email) && 
      validateMobile(formData.mobile) && 
      validatePassword(formData.password);
    
    setIsFormValid(isValid);
  }, [formData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
        description: "Welcome to CiviLink! You can now login with your credentials.",
      });
      navigate('/login');
    }, 1500);
  };
  
  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits
    const value = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    e.target.value = value.slice(0, 10);
    handleChange(e);
  };
  
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your details to get started with CiviLink"
      alternateActionText="Already have an account?"
      alternateActionLink="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-civilink-red" : ""}
              disabled={isLoading}
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-xs text-civilink-red">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-civilink-red" : ""}
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-civilink-red">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="Enter your 10-digit mobile number"
              value={formData.mobile}
              onChange={handleMobileInput}
              className={errors.mobile ? "border-civilink-red" : ""}
              disabled={isLoading}
              autoComplete="tel"
            />
            {errors.mobile && (
              <p className="text-xs text-civilink-red">{errors.mobile}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-civilink-red pr-10" : "pr-10"}
                disabled={isLoading}
                autoComplete="new-password"
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
            
            <PasswordStrength password={formData.password} />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-civilink-blue to-civilink-indigo hover:opacity-90 transition-opacity"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
