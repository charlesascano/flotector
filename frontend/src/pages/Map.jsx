import { useState, useEffect } from 'react';
import { Box, Spinner, HStack, Button, Select } from "@chakra-ui/react";
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import { useNavigate, useLocation } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Layout from '../components/Layout';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  const navigate = useNavigate();
  const location = useLocation(); 

  // Define options once to use in both Mobile and Desktop views
  const filterOptions = ['All', 'Today', 'This Week', 'This Month', 'Custom'];

  useEffect(() => {
    const fetchFromPython = async () => {
      setLoading(true);
      try {
        let url = `http://localhost:5000/api/markers?filter=${filter}`;
        const response = await fetch(url);
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch from map.py:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFromPython();
  }, [filter]);

  const FilterMenu = () => (
    <Box
      position="absolute"
      top="30px"
      right="20px" // Position top-right
      left="auto"  // Reset left
      transform="none" // Reset center transform
      zIndex="10"
      bg="white"
      p="2"
      borderRadius="md"
      boxShadow="lg"
      minW={{ base: "140px", md: "auto" }} // Ensure dropdown has width on mobile
    >
      {/* Mobile View: Dropdown (Visible on 'base', hidden on 'md') */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            size="sm"
        >
            {filterOptions.map((period) => (
                <option key={period} value={period.toLowerCase()}>
                    {period}
                </option>
            ))}
        </Select>
      </Box>

      {/* Desktop View: Buttons (Hidden on 'base', visible on 'md') */}
      <HStack spacing="2" display={{ base: 'none', md: 'flex' }}>
        {filterOptions.map((period) => (
          <Button
            key={period}
            size="sm"
            bg={filter === period.toLowerCase() ? "#053774" : "white"}
            color={filter === period.toLowerCase() ? "white" : "#5D5D5D"}
            onClick={() => setFilter(period.toLowerCase())}
          >
            {period}
          </Button>
        ))}
      </HStack>
    </Box>
  );

  return (
    <Layout>
      <Box h="100vh" w="100%" position="relative">
        <FilterMenu />
        
        <Box position="absolute" top="0" left="0" right="0" bottom="0">
          <Map
            initialViewState={{
              longitude: 120.9405,
              latitude: 14.3800,
              zoom: 12
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <NavigationControl position="bottom-right" />

            {loading && (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <Spinner size="xl" color="#053774" />
              </Box>
            )}

            {!loading && locations.map((entry) => (
              <Marker
                key={entry.id}
                longitude={entry.lng}
                latitude={entry.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  navigate(`/results/${entry.id}`, { 
                    state: { background: location } 
                  });
                }}
              >
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
      </Box>
    </Layout>
  );
}