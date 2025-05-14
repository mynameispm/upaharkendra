
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/contexts/LocationContext';

interface MapComponentProps {
  height?: string;
  interactive?: boolean;
}

const MapComponent = ({ height = '300px', interactive = true }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { location, getCurrentLocation } = useLocation();
  
  useEffect(() => {
    // This is where we would initialize the Google Maps
    // Since we're mocking this functionality for now, we'll just add a placeholder
    // In a real implementation, we would use the Google Maps JavaScript API
    if (mapRef.current) {
      const mapPlaceholder = document.createElement('div');
      mapPlaceholder.className = 'flex items-center justify-center h-full bg-muted rounded-lg';
      
      if (location) {
        mapPlaceholder.innerHTML = `
          <div class="text-center">
            <div class="text-muted-foreground">Location: ${location.address}</div>
            <div class="text-xs text-muted-foreground mt-1">Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(6)}</div>
          </div>
        `;
      } else {
        mapPlaceholder.innerHTML = `
          <div class="text-center text-muted-foreground">
            Map will appear here once location is set
          </div>
        `;
      }
      
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(mapPlaceholder);
    }
  }, [location]);
  
  if (!interactive) {
    return (
      <div 
        ref={mapRef} 
        className="rounded-lg overflow-hidden border" 
        style={{ height }}
      />
    );
  }
  
  return (
    <div className="space-y-4">
      <div 
        ref={mapRef} 
        className="rounded-lg overflow-hidden border" 
        style={{ height }}
      />
      <div className="flex justify-center">
        <Button onClick={getCurrentLocation} className="w-full md:w-auto">
          Use My Current Location
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Allow location access to automatically detect your delivery address
      </p>
    </div>
  );
};

export default MapComponent;
