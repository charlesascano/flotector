import { useState, useEffect, useMemo, useCallback } from 'react'; // Added useMemo
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

  function getUrl() {
    return import.meta.env.VITE_FLOTECTOR_API || "http://localhost:5000";
  }

  // 1. GET COORDINATES FROM NAVIGATION STATE
  // If location.state exists (user clicked "View on Map"), use those coords.
  // Otherwise, default to the Imus/Cavite area.
  const incomingLocation = location.state;

  

  const initialView = useMemo(() => {
    if (incomingLocation && incomingLocation.latitude && incomingLocation.longitude) {
      return {
        latitude: incomingLocation.latitude,
        longitude: incomingLocation.longitude,
        zoom: 16 // Zoom in close if looking at a specific item
      };
    }
    return {
      latitude: 14.3800,
      longitude: 120.9405,
      zoom: 12 // Default wide view
    };
  }, [incomingLocation]); // Only recalculate if incomingLocation changes

  const filterOptions = ['All', 'Today', 'This Week', 'This Month', 'Custom'];

  // 2. ADDED: Helper to Calculate Date Range (Same logic as Dashboard)
  const getDateRange = useCallback((filterInput) => {
    // Helper to format date as YYYY-MM-DD for Local Time
    const formatDate = (d) => {
      if (!(d instanceof Date)) return '';
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Check if 'filterInput' is a Custom Range Array [start, end]
    if (Array.isArray(filterInput) && filterInput.length > 0) {
      return {
        start: formatDate(filterInput[0]),
        end: formatDate(filterInput[1] || filterInput[0])
      };
    }

    const end = new Date();
    const start = new Date();
    
    // Normalize string to match your UI values (which use toLowerCase)
    const mode = typeof filterInput === 'string' ? filterInput.toLowerCase() : '';

    if (mode === 'today') {
      start.setHours(0, 0, 0, 0);
    } else if (mode === 'this week') {
      start.setDate(end.getDate() - 7);
    } else if (mode === 'this month') {
      start.setDate(1); 
    } else if (mode === 'all') {
      // Set a far past date to fetch "All" history
      start.setFullYear(1997, 0, 1); 
    }
    
    return {
      start: formatDate(start),
      end: formatDate(end)
    };
  }, []);

  useEffect(() => {
    const fetchFromPython = async () => {
      
      setLoading(true);
      try {
        // 3. CHANGED: Get dates and use start_date/end_date params
        const { start, end } = getDateRange(filter);
        
        console.log(`Map Fetching range: ${start} to ${end}`);

        // Matches Dashboard API structure
        let url = `${getUrl()}/api/markers?start_date=${start}&end_date=${end}`;
        
        const response = await fetch(url);
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch from map.py:", error);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0); 
    fetchFromPython();
  }, [filter, getDateRange]);

  const FilterMenu = () => (
    <Box
      position="absolute"
      top="30px"
      right="20px"
      left="auto"
      transform="none"
      zIndex="10"
      bg="white"
      p="2"
      borderRadius="md"
      boxShadow="lg"
      minW={{ base: "140px", md: "auto" }}
    >
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
          // 2. USE THE DYNAMIC INITIAL VIEW
          initialViewState={initialView}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="bottom-right" />

          {/* 3. (OPTIONAL) RENDER THE SELECTED MARKER IMMEDIATELY 
              This ensures the pin shows up even if the API is still loading 
              or if the 'filter' would normally hide it.
          */}
          {incomingLocation && (
              <Marker
              latitude={incomingLocation.latitude}
              longitude={incomingLocation.longitude}
              anchor="bottom"
            >
              {/* A Distinct Pin Color (e.g. Blue) for the selected item */}
              <svg height="40" viewBox="0 0 24 24" style={{ fill: '#3182ce', stroke: 'white', strokeWidth: '2px', filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.3))' }}>
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
              </svg>
            </Marker>
          )}

          {/* LOADING STATE */}
          {loading && (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%" position="absolute" top="0" w="100%" zIndex="1">
              <Spinner size="xl" color="#053774" />
            </Box>
          )}

          {/* REGULAR API MARKERS */}
          {!loading && locations.map((entry) => (
            <Marker
              key={entry.id}
              longitude={entry.lng}
              latitude={entry.lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                // Prevent navigating if we are already on this result to avoid loops
                navigate(`/results/${entry.id}`, { 
                  state: { background: location } 
                });
              }}
            >
              {/* Dynamic Pin Color Logic */}
              <svg 
                height="30" 
                viewBox="0 0 24 24" 
                // Change fill color based on entry.total_count
                style={{
                  cursor: 'pointer',
                  fill: entry.total_count === 0 ? '#A0AEC0' : '#E53E3E',
                  stroke: 'white',
                  strokeWidth: '1px'
                }}
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