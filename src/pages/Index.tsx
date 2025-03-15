
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
