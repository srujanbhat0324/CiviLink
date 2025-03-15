
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';

const InProgress = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">In-Progress Issues</h1>
            <Link to="/complaint">
              <Button className="bg-gradient-to-r from-civilink-purple to-civilink-red hover:opacity-90 transition-opacity">
                Report New Issue
              </Button>
            </Link>
          </div>
          
          <div className="text-center py-12">
            <p className="text-muted-foreground">No in-progress issues yet.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InProgress;
