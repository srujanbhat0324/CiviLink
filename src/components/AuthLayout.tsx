
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  alternateActionText: string;
  alternateActionLink: string;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  alternateActionText,
  alternateActionLink,
  className
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Branding area */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-civilink-blue/10 to-civilink-indigo/10 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="max-w-md w-full">
          <div className="space-y-6 animate-fade-in-up">
            <Logo size="lg" />
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Connect with your community
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Empowering civic engagement through seamless connection and collaboration.
              </p>
            </div>
            
            <div className="glass-morphism rounded-2xl p-6 space-y-4 animate-float">
              <blockquote className="italic text-sm md:text-base">
                "CiviLink has transformed how we engage with our local government. 
                It's intuitive, responsive, and beautifully designed."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-civilink-blue to-civilink-indigo flex items-center justify-center">
                  <span className="text-white font-medium">JD</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">Community Leader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="max-w-md w-full animate-fade-in">
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </div>
            
            <div className={cn("space-y-4", className)}>
              {children}
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                {alternateActionText}{" "}
                <Link 
                  to={alternateActionLink}
                  className="text-civilink-blue font-medium hover:text-civilink-indigo transition-colors underline-offset-4 hover:underline"
                >
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
