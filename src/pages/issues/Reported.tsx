
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { MessageSquare, Share2, ThumbsUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for complaints
const initialComplaints = [
  {
    id: 1,
    description: "Power outage in downtown area since 3 hours",
    image: "https://placehold.co/600x400/png",
    location: { lat: 40.7128, lng: -74.0060 },
    user: "John Doe",
    date: "2023-07-10",
    likes: 42,
    comments: 18,
    risk: "high",
    category: "electricity",
  },
  {
    id: 2,
    description: "Large pothole on Main Street causing traffic issues",
    image: "https://placehold.co/600x400/png",
    location: { lat: 40.7129, lng: -74.0062 },
    user: "Jane Smith",
    date: "2023-07-09",
    likes: 28,
    comments: 7,
    risk: "high",
    category: "road",
  },
  {
    id: 3,
    description: "Garbage not collected for past week on Oak Avenue",
    image: "https://placehold.co/600x400/png",
    location: { lat: 40.7130, lng: -74.0058 },
    user: "Michael Brown",
    date: "2023-07-08",
    likes: 15,
    comments: 5,
    risk: "low",
    category: "cleanliness",
  },
];

const Reported = () => {
  // Sort complaints by likes (highest first)
  const [complaints, setComplaints] = useState([...initialComplaints].sort((a, b) => b.likes - a.likes));
  
  const handleLike = (id: number) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === id ? { ...complaint, likes: complaint.likes + 1 } : complaint
    ).sort((a, b) => b.likes - a.likes);
    
    setComplaints(updatedComplaints);
  };
  
  const shareComplaint = (id: number) => {
    // In a real application, this would use the Web Share API
    alert(`Sharing complaint #${id}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Reported Issues</h1>
            <Link to="/complaint">
              <Button className="bg-gradient-to-r from-civilink-purple to-civilink-red hover:opacity-90 transition-opacity">
                Report New Issue
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {complaints.map(complaint => (
              <Card key={complaint.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span>{complaint.user}</span>
                        <span>•</span>
                        <span>{complaint.date}</span>
                        <span>•</span>
                        <span className="capitalize">{complaint.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold line-clamp-1">{complaint.description}</h3>
                        {complaint.risk === "high" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                            <AlertTriangle className="h-3 w-3" />
                            High Risk
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3" />
                            Low Risk
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <p className="text-muted-foreground mb-4">{complaint.description}</p>
                  <div className="rounded-md overflow-hidden bg-muted mb-2">
                    <img 
                      src={complaint.image} 
                      alt="Complaint" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {`Location: ${complaint.location.lat.toFixed(4)}, ${complaint.location.lng.toFixed(4)}`}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground gap-2"
                    onClick={() => handleLike(complaint.id)}
                  >
                    <ThumbsUp className={cn(
                      "h-4 w-4",
                      complaint.likes > 20 ? "text-civilink-blue" : ""
                    )} />
                    <span>{complaint.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" className="text-muted-foreground gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{complaint.comments}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground"
                    onClick={() => shareComplaint(complaint.id)}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reported;
