
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Share2, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: number;
  text: string;
  user: string;
  date: string;
}

interface Complaint {
  id: number;
  description: string;
  image: string;
  location: { lat: number; lng: number };
  user: string;
  date: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  risk: "high" | "low";
  category: "electricity" | "road" | "cleanliness";
  showComments?: boolean;
}

const Electricity = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const { toast } = useToast();
  const currentUser = "Current User"; // In a real app, this would come from authentication
  
  useEffect(() => {
    // Get complaints from localStorage
    const storedComplaints = localStorage.getItem('complaints');
    if (storedComplaints) {
      const allComplaints = JSON.parse(storedComplaints);
      // Filter only electricity complaints and sort by likes
      const electricityComplaints = allComplaints
        .filter((complaint: Complaint) => complaint.category === 'electricity')
        .sort((a: Complaint, b: Complaint) => b.likes - a.likes);
      setComplaints(electricityComplaints);
    }
  }, []);

  const handleLike = (id: number) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        // Check if user already liked
        if (complaint.likedBy.includes(currentUser)) {
          toast({
            title: "Already liked",
            description: "You can only like a complaint once.",
          });
          return complaint;
        }
        
        // Add like
        return { 
          ...complaint, 
          likes: complaint.likes + 1,
          likedBy: [...complaint.likedBy, currentUser]
        };
      }
      return complaint;
    }).sort((a, b) => b.likes - a.likes);
    
    setComplaints(updatedComplaints);
    
    // Update in localStorage
    const storedComplaints = localStorage.getItem('complaints');
    if (storedComplaints) {
      const allComplaints = JSON.parse(storedComplaints);
      const updatedAllComplaints = allComplaints.map((c: Complaint) => {
        if (c.id === id) {
          if (!c.likedBy.includes(currentUser)) {
            return { 
              ...c, 
              likes: c.likes + 1,
              likedBy: [...c.likedBy, currentUser]
            };
          }
        }
        return c;
      });
      localStorage.setItem('complaints', JSON.stringify(updatedAllComplaints));
    }
    
    toast({
      title: "Liked",
      description: "Your like has been recorded.",
    });
  };
  
  const toggleComments = (id: number) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, showComments: !complaint.showComments } 
        : complaint
    ));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Electricity Issues</h1>
            <Link to="/complaint">
              <Button className="bg-gradient-to-r from-civilink-purple to-civilink-red hover:opacity-90 transition-opacity">
                Report New Issue
              </Button>
            </Link>
          </div>
          
          {complaints.length > 0 ? (
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
                  
                  <CardFooter className="flex flex-col pt-4">
                    <div className="flex justify-between w-full border-t pt-4">
                      <Button 
                        variant="ghost" 
                        className="text-muted-foreground gap-2"
                        onClick={() => handleLike(complaint.id)}
                        disabled={complaint.likedBy.includes(currentUser)}
                      >
                        <ThumbsUp className={cn(
                          "h-4 w-4",
                          complaint.likes > 20 ? "text-civilink-blue" : "",
                          complaint.likedBy.includes(currentUser) ? "fill-civilink-blue text-civilink-blue" : ""
                        )} />
                        <span>{complaint.likes}</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="text-muted-foreground gap-2"
                        onClick={() => toggleComments(complaint.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{complaint.comments.length}</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        className="text-muted-foreground"
                        onClick={() => {}}
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                    
                    {complaint.showComments && (
                      <div className="w-full pt-4 border-t mt-4">
                        <div className="mb-4 space-y-3">
                          {complaint.comments.length > 0 ? (
                            complaint.comments.map(comment => (
                              <div key={comment.id} className="bg-accent/50 p-3 rounded-md">
                                <div className="flex justify-between mb-1">
                                  <span className="font-medium text-sm">{comment.user}</span>
                                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                                </div>
                                <p className="text-sm">{comment.text}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-2">No comments yet.</p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No electricity issues reported yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Electricity;
