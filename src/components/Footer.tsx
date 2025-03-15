
import React from 'react';
import Logo from '@/components/Logo';

const Footer = () => {
  return (
    <footer className="px-6 md:px-12 py-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
          <span className="text-sm text-muted-foreground">© 2023 CiviLink. All rights reserved.</span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
