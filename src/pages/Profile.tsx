
import React from 'react';
import NavBar from '@/components/NavBar';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">User Profile</h1>
          
          <div className="text-center py-12">
            <p className="text-muted-foreground">Please log in to view your profile.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
