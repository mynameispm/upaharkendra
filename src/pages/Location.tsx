
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { useLocation } from '@/contexts/LocationContext';
import { LocationInfo } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapComponent from '@/components/MapComponent';

const Location = () => {
  const { location, setLocation, getCurrentLocation } = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a location",
        description: "Enter an area or address to search",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Mock search results for demonstration
    setTimeout(() => {
      const mockResults: LocationInfo[] = [
        {
          address: `${searchQuery}, Main Street`,
          coordinates: {
            lat: 12.9716 + Math.random() * 0.01,
            lng: 77.5946 + Math.random() * 0.01,
          }
        },
        {
          address: `${searchQuery}, Downtown`,
          coordinates: {
            lat: 12.9716 + Math.random() * 0.01,
            lng: 77.5946 + Math.random() * 0.01,
          }
        },
        {
          address: `${searchQuery}, College Road`,
          coordinates: {
            lat: 12.9716 + Math.random() * 0.01,
            lng: 77.5946 + Math.random() * 0.01,
          }
        },
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };
  
  const handleSelectLocation = (selectedLocation: LocationInfo) => {
    setLocation(selectedLocation);
    
    toast({
      title: "Location Updated",
      description: "Your delivery location has been updated",
    });
    
    setTimeout(() => {
      navigate(-1); // Go back to previous page
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center text-brand-primary hover:underline"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </button>
            <h1 className="text-3xl font-bold mt-2">Set Your Location</h1>
            <p className="text-muted-foreground">
              We'll use this for delivery and to show relevant items
            </p>
          </div>
          
          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                className="pl-10 bg-background border-muted focus-visible:ring-brand-primary"
                placeholder="Search for your location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={getCurrentLocation}
              >
                <Navigation size={16} className="mr-2" />
                Use Current Location
              </Button>
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
              >
                Search
              </Button>
            </div>
          </div>
          
          {/* Map Component */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Location</h2>
            
            <MapComponent height="300px" />
            
            {location && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start">
                  <MapPin size={18} className="mr-2 text-brand-primary mt-1" />
                  <div>
                    <p className="font-medium">{location.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">Lat: {location.coordinates.lat.toFixed(6)}, Lng: {location.coordinates.lng.toFixed(6)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <div className="space-y-3">
                {searchResults.map((result, index) => (
                  <div 
                    key={index}
                    className="p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => handleSelectLocation(result)}
                  >
                    <div className="flex items-start">
                      <MapPin size={18} className="mr-2 text-brand-primary mt-1" />
                      <div>
                        <p className="font-medium">{result.address}</p>
                        <p className="text-xs text-muted-foreground mt-1">Click to select this location</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Location;
