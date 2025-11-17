import { useState, useEffect } from 'react';
import { Box, Spinner } from "@chakra-ui/react";
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import { useNavigate, useLocation } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Layout from '../components/Layout';

// Ensure this is in your .env file
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Router hooks for navigation
  const navigate = useNavigate();
  const location = useLocation(); // Capture current background state

  useEffect(() => {
    const fetchFromPython = async () => {
      try {
        // Calling your new Python script
        const response = await fetch('http://localhost:5000/api/markers');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch from map.py:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFromPython();
  }, []);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Layout>
      <Box h="100vh" w="100%">
        <Map
          initialViewState={{
            longitude: 120.9405, // Your previous center
            latitude: 14.3800,
            zoom: 12
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="top-right" />

          {locations.map((entry) => (
            <Marker
              key={entry.id}
              longitude={entry.lng}
              latitude={entry.lat}
              anchor="bottom"
              onClick={(e) => {
                // Stop the map from registering a click on the map itself
                e.originalEvent.stopPropagation();
                
                // Your requested navigation logic
                navigate(`/results/${entry.id}`, { 
                  state: { background: location } 
                });
              }}
            >
              {/* Simple Red Pin Marker */}
              <svg 
                height="30" 
                viewBox="0 0 24 24" 
                style={{cursor: 'pointer', fill: '#E53E3E', stroke: 'white', strokeWidth: '1px'}}
              >
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
              </svg>
            </Marker>
          ))}
        </Map>
      </Box>
    </Layout>
  );
}