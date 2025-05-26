
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LocationInfo } from '@/types';

interface LocationContextType {
  location: LocationInfo | null;
  setLocation: (location: LocationInfo) => void;
  getCurrentLocation: () => Promise<void>;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<LocationInfo | null>(null);

  const setLocation = (newLocation: LocationInfo) => {
    setLocationState(newLocation);
    // Store in localStorage for persistence
    localStorage.setItem('userLocation', JSON.stringify(newLocation));
  };

  const getCurrentLocation = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use reverse geocoding to get address
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            
            if (response.ok) {
              const data = await response.json();
              const address = data.results[0]?.formatted || `${latitude}, ${longitude}`;
              
              const locationInfo: LocationInfo = {
                address,
                coordinates: {
                  lat: latitude,
                  lng: longitude
                }
              };
              
              setLocation(locationInfo);
            } else {
              // Fallback if geocoding fails
              const locationInfo: LocationInfo = {
                address: `${latitude}, ${longitude}`,
                coordinates: {
                  lat: latitude,
                  lng: longitude
                }
              };
              
              setLocation(locationInfo);
            }
            
            resolve();
          } catch (error) {
            // Fallback if geocoding fails
            const locationInfo: LocationInfo = {
              address: `${latitude}, ${longitude}`,
              coordinates: {
                lat: latitude,
                lng: longitude
              }
            };
            
            setLocation(locationInfo);
            resolve();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const clearLocation = () => {
    setLocationState(null);
    localStorage.removeItem('userLocation');
  };

  // Load location from localStorage on mount
  React.useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        setLocationState(parsedLocation);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        getCurrentLocation,
        clearLocation
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
