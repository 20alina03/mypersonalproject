
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock function for actual map integration
const InteractiveMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Demo locations with coordinates and titles
  const demoLocations = [
    { lat: 48.8566, lng: 2.3522, title: 'Paris, France', color: '#2A9D8F' },
    { lat: 40.7128, lng: -74.0060, title: 'New York, USA', color: '#E76F51' },
    { lat: 35.6762, lng: 139.6503, title: 'Tokyo, Japan', color: '#E9C46A' },
    { lat: -33.8688, lng: 151.2093, title: 'Sydney, Australia', color: '#2A9D8F' },
  ];

  useEffect(() => {
    // Simulate map loading (in a real app, we would initialize a map library here)
    const timer = setTimeout(() => {
      if (mapContainerRef.current) {
        renderMapPlaceholder();
        setIsMapLoaded(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const renderMapPlaceholder = () => {
    if (!mapContainerRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = mapContainerRef.current.offsetWidth;
    canvas.height = mapContainerRef.current.offsetHeight;
    mapContainerRef.current.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw map background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some grid lines
    ctx.strokeStyle = '#d0d0d0';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // Vertical lines
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // Draw points for demo locations
    demoLocations.forEach(location => {
      // Convert lat/lng to x/y (simplified for demo)
      const x = ((location.lng + 180) / 360) * canvas.width;
      const y = ((90 - location.lat) / 180) * canvas.height;
      
      // Draw location marker
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = location.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw label
      ctx.font = '12px Inter';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(location.title, x, y - 15);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Interactive Travel Map</span>
        </CardTitle>
        <CardDescription>
          View and add locations you've visited around the world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="map-container relative">
          <div 
            ref={mapContainerRef} 
            className="absolute inset-0 bg-muted/30"
          />
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse">Loading map...</div>
            </div>
          )}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="bg-white p-2 rounded-md shadow-md">
              <p className="text-xs font-semibold">Your visited places: {demoLocations.length}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {demoLocations.map((location, index) => (
            <div 
              key={index}
              className="p-2 bg-muted/30 rounded-md flex items-center"
            >
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: location.color }}
              />
              <span className="text-xs font-medium truncate">{location.title}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
