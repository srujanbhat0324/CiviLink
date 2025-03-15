
import React from 'react';
import NavBar from '@/components/NavBar';

const Road = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Road Issues</h1>
          
          <div className="text-center py-12">
            <p className="text-muted-foreground">No road issues available yet.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Road;
