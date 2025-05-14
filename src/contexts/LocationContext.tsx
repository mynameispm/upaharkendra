
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { LocationInfo } from '@/types';

interface LocationContextType {
  location: LocationInfo | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: (location: LocationInfo) => void;
  getCurrentLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Load location from localStorage
  useEffect(() => {
    const storedLocation = localStorage.getItem('upaharLocation');
    if (storedLocation) {
      try {
        setLocation(JSON.parse(storedLocation));
      } catch (error) {
        console.error('Failed to parse stored location:', error);
        localStorage.removeItem('upaharLocation');
      }
    }
  }, []);

  const updateLocation = (locationData: LocationInfo) => {
    setLocation(locationData);
    localStorage.setItem('upaharLocation', JSON.stringify(locationData));
    toast({
      title: "Location Updated",
      description: "Your delivery location has been updated.",
    });
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      // Use Google Maps Geocoding API to get the address
      const geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const newLocation: LocationInfo = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: results[0].formatted_address || "Current Location",
          };

          setLocation(newLocation);
          localStorage.setItem('upaharLocation', JSON.stringify(newLocation));
          
          toast({
            title: "Location Found",
            description: "Your current location has been detected.",
          });
        } else {
          // Fallback if geocoding fails
          const newLocation: LocationInfo = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Current Location", 
          };

          setLocation(newLocation);
          localStorage.setItem('upaharLocation', JSON.stringify(newLocation));
          
          toast({
            title: "Location Found",
            description: "Your coordinates have been detected, but address lookup failed.",
          });
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setError("Failed to get your current location");
      toast({
        title: "Location Error",
        description: "Failed to get your current location. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        updateLocation,
        getCurrentLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
