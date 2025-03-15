
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const HeroSection = () => {
  return (
    <section className="flex-grow flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 p-6 md:p-12 space-y-6 animate-fade-in-up">
        <div className="inline-block">
          <span className="bg-civilink-blue/10 text-civilink-blue text-xs font-medium px-3 py-1 rounded-full">
            Launching Soon
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Connect with your community <span className="text-gradient">seamlessly</span>
        </h1>
        
        <p className="text-muted-foreground max-w-lg">
          CiviLink empowers citizens to engage with local governance, connect with community initiatives, and collaborate for positive change.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto rounded-full px-8 bg-gradient-to-r from-civilink-blue to-civilink-indigo hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-6 md:p-12 flex justify-center items-center">
        <div className="relative w-full max-w-lg aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-civilink-blue/20 to-civilink-indigo/20 rounded-3xl blur-3xl animate-pulse-soft"></div>
          <div className="relative bg-white/70 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl overflow-hidden h-full flex items-center justify-center animate-float">
            <div className="text-center p-8">
              <div className="h-20 w-20 mx-auto mb-6">
                <Logo size="lg" withText={false} />
              </div>
              <h3 className="text-xl font-semibold mb-2">CiviLink Platform</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Bridging the gap between citizens and governance for a more connected community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
