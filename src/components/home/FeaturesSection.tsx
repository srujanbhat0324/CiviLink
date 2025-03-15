
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import FeatureCard from '@/components/FeatureCard';

const FeaturesSection = () => {
  return (
    <section className="px-6 md:px-12 py-16 bg-gradient-to-b from-transparent to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose CiviLink?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Designed with simplicity and effectiveness in mind, our platform brings communities together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            title="Seamless Connectivity" 
            description="Connect with local officials and community members effortlessly."
            icon={<svg className="w-6 h-6 text-civilink-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 12.2H16M8 16.2H13.5M10 3.2V7.2M14 3.2V7.2M7.8 21.2H16.2C17.8802 21.2 18.7202 21.2 19.362 20.891C19.9265 20.6216 20.3836 20.1645 20.653 19.6C20.962 18.9582 20.962 18.1182 20.962 16.438V9.962C20.962 8.28182 20.962 7.44182 20.653 6.8C20.3836 6.23546 19.9265 5.77837 19.362 5.50901C18.7202 5.2 17.8802 5.2 16.2 5.2H7.8C6.11984 5.2 5.27976 5.2 4.63803 5.50901C4.07354 5.77837 3.6164 6.23546 3.34701 6.8C3.038 7.44182 3.038 8.28182 3.038 9.962V16.438C3.038 18.1182 3.038 18.9582 3.34701 19.6C3.6164 20.1645 4.07354 20.6216 4.63803 20.891C5.27976 21.2 6.11984 21.2 7.8 21.2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            delay="animate-delay-100"
          />
          
          <FeatureCard 
            title="Civic Engagement" 
            description="Participate in local decision-making processes with ease."
            icon={<svg className="w-6 h-6 text-civilink-indigo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 14L12 18L3 14M21 10L12 14L3 10M21 6L12 10L3 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            delay="animate-delay-200"
          />
          
          <FeatureCard 
            title="Community Initiatives" 
            description="Discover and support local projects that matter to you."
            icon={<svg className="w-6 h-6 text-civilink-purple" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 5L21 9M3 9V10M3 9L3 15L12 19L21 15V9M21 9V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            delay="animate-delay-300"
          />
          
          <FeatureCard 
            title="Secure Communication" 
            description="Exchange ideas in a safe and secure environment."
            icon={<svg className="w-6 h-6 text-civilink-green" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.5H12.01M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21ZM12 12.5V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            delay="animate-delay-400"
          />
          
          <FeatureCard 
            title="Real-Time Updates" 
            description="Stay informed with instant notifications on important issues."
            icon={<svg className="w-6 h-6 text-civilink-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 17.5228 6.47715 22 12 22C13.6569 22 15 20.6569 15 19V18.5C15 18.0356 15 17.8034 15.0257 17.6084C15.2029 16.2622 16.2622 15.2029 17.6084 15.0257C17.8034 15 18.0356 15 18.5 15H19C20.6569 15 22 13.6569 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 9H13M11 17L7 13H11L11 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            delay="animate-delay-500"
          />
          
          <FeatureCard 
            title="Data Transparency" 
            description="Access clear and transparent information on public matters."
            icon={<svg className="w-6 h-6 text-civilink-red" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H7C5.89543 21 5 20.1046 5 19V16.2C5 15.3872 5 14.9808 4.87868 14.6442C4.77276 14.3492 4.60237 14.0899 4.38197 13.8828C4.12937 13.645 3.80373 13.5144 3.15244 13.2531L2.66798 13.0576C2.0229 12.8 1.70037 12.6712 1.52209 12.4049C1.36425 12.1698 1.28382 11.887 1.29389 11.5992C1.30527 11.2791 1.47466 10.9716 1.81344 10.3565L1.91281 10.1823C2.21853 9.62707 2.37139 9.34946 2.56168 9.12822C2.73159 8.93223 2.93356 8.77363 3.15949 8.65834C3.41261 8.52759 3.70841 8.4808 4.3 8.3872C4.57827 8.34807 4.71741 8.3285 4.83208 8.28052C4.93208 8.23915 5.02165 8.17877 5.09623 8.1025C5.17941 8.01757 5.23947 7.90422 5.35959 7.67749C5.38396 7.63151 5.41218 7.57957 5.44749 7.51563M14.75 2.25L17.25 4.75M7.5 15.5C8.32843 15.5 9 14.8284 9 14C9 13.1716 8.32843 12.5 7.5 12.5C6.67157 12.5 6 13.1716 6 14C6 14.8284 6.67157 15.5 7.5 15.5ZM19.25 7.75L5.44749 7.51563M19.25 7.75L21.75 10.25M19.25 7.75L14.75 2.25M5.44749 7.51563C5.44749 7.51563 6.82162 4.27065 8.575 3.375C10.3284 2.47935 14.75 2.25 14.75 2.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
            delay="animate-delay-100"
          />
        </div>
        
        {/* Post a Complaint Card */}
        <div className="mt-12 flex justify-center">
          <div className={cn(
            "bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-sm w-full max-w-md",
            "hover:shadow-md hover:bg-white transition-all duration-300 animate-fade-in-up animate-delay-300"
          )}>
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-civilink-red/20 to-civilink-purple/20 flex items-center justify-center mb-4">
                <Flag className="w-7 h-7 text-civilink-purple" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Submit a Complaint</h3>
              <p className="text-muted-foreground mb-6">
                Have an issue in your community? Report it directly to local authorities with our easy-to-use complaint system.
              </p>
              <Link to="/complaint">
                <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-civilink-purple to-civilink-red hover:opacity-90 transition-opacity">
                  Post a Complaint
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
