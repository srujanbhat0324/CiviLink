
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import PasswordStrength from '@/components/PasswordStrength';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    username: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOtp] = useState("");
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      // If user is already logged in, redirect to the home page
      navigate('/');
    }
  }, [navigate]);
  
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
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
      validatePassword(formData.password) &&
      formData.username.trim() !== '';
    
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
  
  const sendOTP = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate sending OTP to user's mobile
    setTimeout(() => {
      setIsLoading(false);
      setShowOTPVerification(true);
      
      toast({
        title: "OTP sent",
        description: `A verification code has been sent to ${formData.mobile}. Use "123456" for this demo.`,
      });
    }, 1500);
  };
  
  const verifyOTP = () => {
    if (otp !== "123456") {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter the correct OTP. Use '123456' for this demo.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to create account
    setTimeout(() => {
      setIsLoading(false);
      
      // Save user to localStorage (in a real app, this would be done by the server)
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email
      }));
      
      toast({
        title: "Account created successfully",
        description: "Welcome to CiviLink! You are now logged in.",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
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
      title={showOTPVerification ? "Verify your number" : "Create an account"}
      subtitle={showOTPVerification 
        ? `We've sent a verification code to ${formData.mobile}` 
        : "Enter your details to get started with CiviLink"}
      alternateActionText="Already have an account?"
      alternateActionLink="/login"
    >
      {!showOTPVerification ? (
        <form onSubmit={(e) => { e.preventDefault(); sendOTP(); }} className="space-y-6">
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "border-civilink-red" : ""}
                disabled={isLoading}
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-xs text-civilink-red">{errors.username}</p>
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
            {isLoading ? "Sending verification code..." : "Continue"}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-muted-foreground text-center mb-2">
              Enter the 6-digit code sent to your phone
            </p>
            
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <p className="text-xs text-muted-foreground mt-2">
              Use "123456" for this demo
            </p>
          </div>
          
          <Button 
            onClick={verifyOTP}
            className="w-full bg-gradient-to-r from-civilink-blue to-civilink-indigo hover:opacity-90 transition-opacity"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? "Verifying..." : "Verify & Create Account"}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Didn't receive the code?{" "}
            <button 
              type="button" 
              className="text-civilink-blue hover:underline"
              onClick={() => {
                toast({
                  title: "OTP sent again",
                  description: "A new verification code has been sent to your mobile.",
                });
              }}
            >
              Resend
            </button>
          </p>
        </div>
      )}
    </AuthLayout>
  );
};

export default Signup;
