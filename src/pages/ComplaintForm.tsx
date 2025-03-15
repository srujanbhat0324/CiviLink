
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import Logo from '@/components/Logo';
import { ArrowLeft, Flag, Image, MapPin, Upload } from 'lucide-react';

const ComplaintForm = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLoadingLocation(false);
          toast({
            title: "Location detected",
            description: `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoadingLocation(false);
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Unable to retrieve your location. Please try again or enter it manually.",
          });
        }
      );
    } else {
      setLoadingLocation(false);
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation services.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.description.trim()) {
      toast({
        variant: "destructive",
        title: "Missing description",
        description: "Please provide a description of your complaint.",
      });
      return;
    }

    if (!selectedImage) {
      toast({
        variant: "destructive",
        title: "Missing image",
        description: "Please upload an image related to your complaint.",
      });
      return;
    }

    if (!location) {
      toast({
        variant: "destructive",
        title: "Missing location",
        description: "Please share your location to continue.",
      });
      return;
    }

    // Here you would typically submit the data to your backend
    // For now, we'll just show a success message
    
    toast({
      title: "Complaint submitted successfully!",
      description: "Your complaint has been recorded and will be reviewed by local authorities.",
    });

    // Reset form
    setFormData({ description: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setLocation(null);
    
    // Navigate back to home
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center animate-fade-in bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        <Logo />
      </header>

      {/* Form Content */}
      <div className="flex-grow p-6 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-2xl animate-fade-in-up">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-civilink-purple/20 to-civilink-red/20 flex items-center justify-center">
                <Flag className="h-4 w-4 text-civilink-purple" />
              </div>
              <CardTitle>Submit a Complaint</CardTitle>
            </div>
            <CardDescription>
              Please provide details about your complaint. Include a description, an image, and your location.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea 
                  id="description"
                  placeholder="Please describe your complaint in detail..."
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  rows={5}
                  className="resize-none"
                />
              </div>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">
                  Upload Image <span className="text-destructive">*</span>
                </Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors
                    ${imagePreview ? 'border-primary/50' : 'border-muted'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-60 rounded-md shadow-sm" 
                      />
                      <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                        <Image className="h-4 w-4" />
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="font-medium">Click to upload an image</p>
                      <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (max. 10MB)</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Label>
                  Your Location <span className="text-destructive">*</span>
                </Label>
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">
                        {location 
                          ? `Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(6)}` 
                          : "No location detected"}
                      </span>
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGetLocation}
                      disabled={loadingLocation}
                    >
                      {loadingLocation ? "Detecting..." : "Get Current Location"}
                    </Button>
                  </div>
                  {location && (
                    <div className="h-40 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Location data captured successfully
                      </p>
                      {/* A map would typically be displayed here */}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link to="/">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" className="bg-gradient-to-r from-civilink-purple to-civilink-red hover:opacity-90 transition-opacity">
                Submit Complaint
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintForm;
