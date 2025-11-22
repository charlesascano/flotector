import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Box, Spinner, HStack, Button, Select, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, 
  useDisclosure 
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import { useNavigate, useLocation } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Layout from '../components/Layout';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapPage() {
  // --- State ---
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter can be a string ('today', 'all') OR an array [Date, Date]
  const [filter, setFilter] = useState('all');
  
  // Modal State
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  
  const navigate = useNavigate();
  const location = useLocation(); 

  function getUrl() {
    return import.meta.env.VITE_FLOTECTOR_API || "http://localhost:5000";
  }

  // --- 1. GET COORDINATES FROM NAVIGATION STATE ---
  const incomingLocation = location.state;

  const initialView = useMemo(() => {
    if (incomingLocation && incomingLocation.latitude && incomingLocation.longitude) {
      return {
        latitude: incomingLocation.latitude,
        longitude: incomingLocation.longitude,
        zoom: 16 
      };
    }
    return {
      latitude: 14.3800,
      longitude: 120.9405,
      zoom: 12 
    };
  }, [incomingLocation]);

  const filterOptions = ['All', 'Today', 'This Week', 'This Month', 'Custom'];

  // --- 2. HELPER: Calculate Date Range ---
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
    
    // Normalize string to match your UI values
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

  // --- 3. FETCH API ---
  useEffect(() => {
    const fetchFromPython = async () => {
      
      setLoading(true);
      try {
        const { start, end } = getDateRange(filter);
        
        console.log(`Map Fetching range: ${start} to ${end}`);

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
    
    // Only fetch when filter changes
    fetchFromPython();
  }, [filter, getDateRange]);

  // --- 4. FILTER MENU COMPONENT ---
  // Defined inside to access state easily
  const FilterMenu = () => {
    
    const handleFilterClick = (period) => {
        const val = period.toLowerCase();
        if (val === 'custom') {
            onOpen(); // Open Modal
        } else {
            setFilter(val); // Set Standard Filter
        }
    };

    // Check if Custom is active (filter is an array)
    const isCustomActive = Array.isArray(filter);

    return (
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
                value={Array.isArray(filter) ? 'custom' : filter} 
                onChange={(e) => handleFilterClick(e.target.value)}
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
            {filterOptions.map((period) => {
                const val = period.toLowerCase();
                // Logic: Active if strings match OR if it's 'Custom' and filter is an array
                const isActive = (filter === val) || (val === 'custom' && isCustomActive);

                return (
                    <Button
                        key={period}
                        size="sm"
                        bg={isActive ? "#053774" : "white"}
                        color={isActive ? "white" : "#5D5D5D"}
                        onClick={() => handleFilterClick(period)}
                    >
                        {period}
                    </Button>
                )
            })}
        </HStack>
        </Box>
    );
  };

  return (
    <Layout>
      {/* --- MODAL FOR CUSTOM DATE RANGE --- */}
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Date Range </ModalHeader>
        <ModalCloseButton />
        <ModalBody >
            <RangeDatepicker
            selectedDates={selectedDates}
            onDateChange={setSelectedDates}
            propsConfigs={{
                dateNavBtnProps: {
                    padding: 0,
                    fontWeight:'normal'
                },
                dayOfMonthBtnProps: {
                    defaultBtnProps: {
                        fontWeight: 'normal',
                        _hover: { bgColor: '#648cbeff', color: 'white' }
                    },
                    selectedBtnProps: {
                        bgColor: '#053774',
                        color: 'white',
                        _hover: { bgColor: '#053774' }
                    },
                    isInRangeBtnProps: {
                        bgColor: '#d9eaffff',
                        color: 'black !important'
                    },
                    todayBtnProps: {
                        background: "#15A33D",
                        fontWeight: 'bold'
                    }
                },
                popoverCompProps: {
                    popoverContentProps: {
                        padding: {base: 0, md: 2},
                        width: {base: '100vw', sm: '100%'}
                    },
                },
                calendarPanelProps: {
                    wrapperProps: { width: '100%' },
                    contentProps: { boxShadow: 'md' },
                    dividerProps: { display: "none" },
                },
                dateHeadingProps: { letterSpacing: '1px' },
                weekdayLabelProps: { fontWeight: 'normal' },
                inputProps: { letterSpacing: '1px' },
            }}
            />
        </ModalBody>

        <ModalFooter>
            <Button variant='ghost' colorScheme='blue' mr={3} onClick={() => {
                onClose(); 
                // Optional: Reset to today on close, or keep previous selection
                setSelectedDates([new Date(), new Date()]);
            }}>
            Close
            </Button>
            <Button colorScheme='blue' 
            onClick={() => {
                // IMPORTANT: Set the main filter to the array of dates
                setFilter(selectedDates);
                onClose();
            }}>
            Select
            </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>

      <Box h="100vh" w="100%" position="relative">
      <FilterMenu />
      <Box position="absolute" top="0" left="0" right="0" bottom="0">
        <Map
          initialViewState={initialView}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="bottom-right" />

          {incomingLocation && (
              <Marker
              latitude={incomingLocation.latitude}
              longitude={incomingLocation.longitude}
              anchor="bottom"
            >
              <svg height="40" viewBox="0 0 24 24" style={{ fill: '#3182ce', stroke: 'white', strokeWidth: '2px', filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.3))' }}>
                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
              </svg>
            </Marker>
          )}

          {loading && (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%" position="absolute" top="0" w="100%" zIndex="1">
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