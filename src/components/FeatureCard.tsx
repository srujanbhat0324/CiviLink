
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => (
  <div className={cn(
    "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm",
    "hover:shadow-md hover:bg-white transition-all duration-300",
    "animate-fade-in-up",
    delay
  )}>
    <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-civilink-blue/10 to-civilink-indigo/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default FeatureCard;
