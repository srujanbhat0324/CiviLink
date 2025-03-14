
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md',
  withText = true
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'relative overflow-hidden rounded-lg bg-gradient-to-br from-civilink-blue to-civilink-indigo flex items-center justify-center animate-pulse-soft',
        sizeClasses[size]
      )}>
        <span className={cn(
          'font-bold text-white',
          size === 'sm' ? 'text-lg px-1.5' : size === 'md' ? 'text-xl px-2' : 'text-2xl px-3'
        )}>
          C
        </span>
      </div>
      {withText && (
        <span className={cn(
          'font-bold tracking-tight',
          size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'
        )}>
          <span className="text-civilink-blue">Civi</span>
          <span className="text-civilink-indigo">Link</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
