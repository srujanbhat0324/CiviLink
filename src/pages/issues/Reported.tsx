
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Share2, 
  ThumbsUp, 
  AlertTriangle, 
  CheckCircle, 
  Send 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Enhanced complaint type
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

// Mock data for complaints
const initialComplaints: Complaint[] = [
  {
    id: 1,
    description: "Power outage in downtown area since 3 hours",
    image: "https://placehold.co/600x400/png",
    location: { lat: 40.7128, lng: -74.0060 },
    user: "John Doe",
    date: "2023-07-10",
    likes: 42,
    likedBy: [],
    comments: [
      { id: 1, text: "I'm experiencing this too!", user: "Jane Smith", date: "2023-07-10" },
      { id: 2, text: "Any update from the utility company?", user: "Robert Johnson", date: "2023-07-10" }
    ],
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
    likedBy: [],
    comments: [
      { id: 1, text: "Almost damaged my car there yesterday", user: "Michael Brown", date: "2023-07-09" }
    ],
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
    likedBy: [],
    comments: [],
    risk: "low",
    category: "cleanliness",
  },
];

// Get complaints from localStorage or use initial data
const getStoredComplaints = (): Complaint[] => {
  const storedComplaints = localStorage.getItem('complaints');
  return storedComplaints ? JSON.parse(storedComplaints) : initialComplaints;
};

const Reported = () => {
  // State for complaints, sorted by likes
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const { toast } = useToast();
  const currentUser = "Current User"; // In a real app, this would come from authentication
  
  // Load complaints on initial render
  useEffect(() => {
    const loadedComplaints = getStoredComplaints();
    setComplaints([...loadedComplaints].sort((a, b) => b.likes - a.likes));
  }, []);
  
  // Update localStorage whenever complaints change
  useEffect(() => {
    localStorage.setItem('complaints', JSON.stringify(complaints));
  }, [complaints]);
  
  const handleLike = (id: number) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        // Check if user already liked this complaint
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
    toast({
      title: "Liked",
      description: "Your like has been recorded.",
    });
  };
  
  const shareComplaint = (id: number) => {
    // In a real application, this would use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: 'View this complaint',
        text: complaints.find(c => c.id === id)?.description || '',
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared successfully",
          description: "The complaint has been shared.",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        toast({
          variant: "destructive",
          title: "Error sharing",
          description: "There was an error sharing the complaint.",
        });
      });
    } else {
      toast({
        title: "Share feature not supported",
        description: "Your browser doesn't support the Web Share API.",
      });
    }
  };
  
  const toggleComments = (id: number) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, showComments: !complaint.showComments } 
        : complaint
    ));
  };
  
  const handleCommentChange = (id: number, value: string) => {
    setCommentInputs({
      ...commentInputs,
      [id]: value
    });
  };
  
  const addComment = (id: number) => {
    if (!commentInputs[id] || commentInputs[id].trim() === '') {
      toast({
        variant: "destructive",
        title: "Empty comment",
        description: "Please write something before posting a comment.",
      });
      return;
    }
    
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        const newComment = {
          id: complaint.comments.length + 1,
          text: commentInputs[id],
          user: currentUser,
          date: new Date().toISOString().split('T')[0]
        };
        
        return {
          ...complaint,
          comments: [...complaint.comments, newComment]
        };
      }
      return complaint;
    });
    
    setComplaints(updatedComplaints);
    setCommentInputs({
      ...commentInputs,
      [id]: ''
    });
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted.",
    });
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
                      onClick={() => shareComplaint(complaint.id)}
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
                          <p className="text-sm text-muted-foreground text-center py-2">No comments yet. Be the first to comment!</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Write a comment..." 
                          value={commentInputs[complaint.id] || ''}
                          onChange={(e) => handleCommentChange(complaint.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              addComment(complaint.id);
                            }
                          }}
                        />
                        <Button 
                          variant="default" 
                          size="icon"
                          onClick={() => addComment(complaint.id)}
                          className="bg-civilink-blue hover:bg-civilink-blue/90"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
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
