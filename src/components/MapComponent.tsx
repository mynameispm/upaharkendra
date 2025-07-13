
import { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/contexts/LocationContext';
import { useToast } from '@/hooks/use-toast';

interface MapComponentProps {
  height?: string;
  interactive?: boolean;
}

const MapComponent = ({ height = '300px', interactive = true }: MapComponentProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const { location, getCurrentLocation } = useLocation();
  const { toast } = useToast();
  const [mapCenter, setMapCenter] = useState({
    lat: location?.coordinates?.lat || 12.9716,
    lng: location?.coordinates?.lng || 77.5946,
  });
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBHOoIw3TvC9ZAApfaclywOeXNRCWxeI3A',
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Update map when location changes
  useEffect(() => {
    if (location?.coordinates && mapRef.current) {
      const newCenter = { lat: location.coordinates.lat, lng: location.coordinates.lng };
      mapRef.current.panTo(newCenter);
      setMapCenter(newCenter);
    }
  }, [location]);

  // Handle loading error
  useEffect(() => {
    if (loadError) {
      toast({
        title: "Map Error",
        description: "Failed to load Google Maps. Please try again later.",
        variant: "destructive",
      });
    }
  }, [loadError, toast]);

  const renderMap = () => (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height, borderRadius: '0.5rem' }}
      center={mapCenter}
      zoom={14}
      options={{
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      }}
      onLoad={onMapLoad}
      onUnmount={onMapUnmount}
    >
      {location?.coordinates && <Marker position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }} />}
    </GoogleMap>
  );

  if (!interactive) {
    return (
      <div className="rounded-lg overflow-hidden border" style={{ height }}>
        {isLoaded ? renderMap() : (
          <div className="flex items-center justify-center h-full bg-muted rounded-lg">
            <div className="text-center text-muted-foreground">
              Loading map...
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border" style={{ height }}>
        {isLoaded ? renderMap() : (
          <div className="flex items-center justify-center h-full bg-muted rounded-lg">
            <div className="text-center text-muted-foreground">
              Loading map...
            </div>
          </div>
        )}
      </div>
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
