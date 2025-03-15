
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag, CheckCircle, Clock, Zap, Route, Trash2 } from 'lucide-react';

interface Complaint {
  id: number;
  category: "electricity" | "road" | "cleanliness";
  status?: "reported" | "resolved" | "in-progress";
}

const Dashboard = () => {
  const [counts, setCounts] = useState({
    reported: 0,
    resolved: 0,
    inProgress: 0,
    electricity: 0,
    road: 0,
    cleanliness: 0
  });

  useEffect(() => {
    // Get complaints from localStorage
    const storedComplaints = localStorage.getItem('complaints');
    if (storedComplaints) {
      const complaints = JSON.parse(storedComplaints);
      
      // Count by category
      const categoryCounts = complaints.reduce((acc: any, complaint: Complaint) => {
        acc[complaint.category] = (acc[complaint.category] || 0) + 1;
        return acc;
      }, {});
      
      // For this demo, all stored complaints are considered "reported"
      // In a real app, you'd have a status field to track progress
      
      setCounts({
        reported: complaints.length,
        resolved: 0, // In a real app, you'd count resolved issues
        inProgress: 0, // In a real app, you'd count in-progress issues
        electricity: categoryCounts.electricity || 0,
        road: categoryCounts.road || 0,
        cleanliness: categoryCounts.cleanliness || 0
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Status Cards */}
            <Link to="/issues/reported" className="block group">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Reported Issues</span>
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <Flag className="h-5 w-5 text-orange-600" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{counts.reported}</p>
                  <p className="text-sm text-muted-foreground">Issues reported by users</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/issues/in-progress" className="block group">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>In Progress</span>
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{counts.inProgress}</p>
                  <p className="text-sm text-muted-foreground">Issues currently being addressed</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/issues/resolved" className="block group">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Resolved Issues</span>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{counts.resolved}</p>
                  <p className="text-sm text-muted-foreground">Issues successfully resolved</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Issues by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Cards */}
            <Link to="/section/electricity" className="block group">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Electricity</span>
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{counts.electricity}</p>
                  <p className="text-sm text-muted-foreground">Electrical issues reported</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/section/road" className="block group">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Road</span>
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{counts.road}</p>
                  <p className="text-sm text-muted-foreground">Road-related issues reported</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/section/cleanliness" className="block group">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Cleanliness</span>
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                      <Trash2 className="h-5 w-5 text-teal-600" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{counts.cleanliness}</p>
                  <p className="text-sm text-muted-foreground">Cleanliness issues reported</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
