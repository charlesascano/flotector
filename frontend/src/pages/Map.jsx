import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Box, Spinner, HStack, Button, Select, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, 
  useDisclosure
} from "@chakra-ui/react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import useSupercluster from 'use-supercluster'; // <--- 1. IMPORT THIS
import { useNavigate, useLocation } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import Layout from '../components/Layout';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapPage() {
  // --- State ---
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  // --- Map State for Spiderfy ---
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    latitude: 14.3800,
    longitude: 120.9405,
    zoom: 12
  });

  // Modal State
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  
  const navigate = useNavigate();
  const location = useLocation(); 

  function getUrl() {
    return import.meta.env.VITE_FLOTECTOR_API || "http://localhost:5000";
  }

  // --- 1. HANDLE INCOMING NAVIGATION ---
  useEffect(() => {
    const incomingLocation = location.state;
    if (incomingLocation && incomingLocation.latitude && incomingLocation.longitude) {
        setViewState({
            latitude: incomingLocation.latitude,
            longitude: incomingLocation.longitude,
            zoom: 16
        });
    }
  }, [location.state]);

  // --- 2. DATA TRANSFORMATION FOR SUPERCLUSTER ---
  // The library needs GeoJSON format (FeatureCollection)
  const points = useMemo(() => {
    return locations.map(loc => ({
      type: "Feature",
      properties: {
        cluster: false,
        id: loc.id,
        count: loc.total_count,
        // Add any other data you need to pass to the marker here
        ...loc 
      },
      geometry: {
        type: "Point",
        coordinates: [loc.lng, loc.lat]
      }
    }));
  }, [locations]);

  // --- 3. SETUP SUPERCLUSTER ---
  // Get map bounds to know what to cluster
  const [bounds, setBounds] = useState(null);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewState.zoom,
    options: { radius: 75, maxZoom: 20 } // Radius: how close points must be to group
  });

  const filterOptions = ['All', 'Today', 'This Week', 'This Month', 'Custom'];

  // --- HELPER: Date Logic (Kept mostly same) ---
  const getDateRange = useCallback((filterInput) => {
    const formatDate = (d) => {
      if (!(d instanceof Date)) return '';
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (Array.isArray(filterInput) && filterInput.length > 0) {
      return {
        start: formatDate(filterInput[0]),
        end: formatDate(filterInput[1] || filterInput[0])
      };
    }

    const end = new Date();
    const start = new Date();
    const mode = typeof filterInput === 'string' ? filterInput.toLowerCase() : '';

    if (mode === 'today') start.setHours(0, 0, 0, 0);
    else if (mode === 'this week') start.setDate(end.getDate() - 7);
    else if (mode === 'this month') start.setDate(1); 
    else if (mode === 'all') start.setFullYear(1997, 0, 1); 
    
    return { start: formatDate(start), end: formatDate(end) };
  }, []);

  // --- FETCH API ---
  useEffect(() => {
    const fetchFromPython = async () => {
      setLoading(true);
      try {
        const { start, end } = getDateRange(filter);
        let url = `${getUrl()}/api/markers?start_date=${start}&end_date=${end}`;
        const response = await fetch(url);
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch markers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFromPython();
  }, [filter, getDateRange]);

  // --- SPIDERFY / EXPANSION LOGIC ---
  const handleClusterClick = (clusterId, latitude, longitude) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(clusterId),
      20
    );

    // If we are already zoomed in deep, this logic allows the "Spiderfy" visual
    // Note: To fully "Spiderfy" (spiral out), the easiest way in React is to 
    // simply zoom the user close enough that the points naturally separate 
    // or the cluster breaks apart.
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: expansionZoom,
      duration: 500
    });
  };

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

        {/* --- MOBILE VIEW --- */}
        <Box display={{ base: 'block', md: 'none' }}>
            <HStack spacing={2}>
                <Select 
                    value={isCustomActive ? 'custom' : filter} 
                    onChange={(e) => handleFilterClick(e.target.value)}
                    size="sm"
                >
                    {filterOptions.map((period) => (
                        <option key={period} value={period.toLowerCase()}>
                            {period}
                        </option>
                    ))}
                </Select>
                {/* ADDED: Edit button triggers modal if Custom is already selected */}
                {isCustomActive && (
                    <Button size="sm" onClick={onOpen} colorScheme="blue" variant="solid" px={4}>
                        Edit
                    </Button>
                )}
            </HStack>
        </Box>

        {/* --- DESKTOP VIEW --- */}
        <HStack spacing="2" display={{ base: 'none', md: 'flex' }}>
            {filterOptions.map((period) => {
                const val = period.toLowerCase();
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
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Date Range</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                    _hover: {
                      bgColor: '#648cbeff',
                      color: 'white'
                    }
                  },
                  selectedBtnProps: {
                    bgColor: '#053774',
                    color: 'white',
                    _hover: {
                      bgColor: '#053774'
                    }
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
                    wrapperProps: {
                      width: '100%'
                    },
                    contentProps: {
                      boxShadow: 'md',
                    },
                    dividerProps: {
                      display: "none",
                    },
                  },

                  dateHeadingProps: {
                    letterSpacing: '1px',
                  },

                  weekdayLabelProps: {
                    fontWeight: 'normal'
                  },

                  inputProps: {
                    letterSpacing: '1px'
                  },
              }}
            />
        </ModalBody>
        <ModalFooter>
            <Button variant='ghost' onClick={onClose}>Close</Button>
            <Button colorScheme='blue' onClick={() => { setFilter(selectedDates); onClose(); }}>Select</Button>
        </ModalFooter>
        </ModalContent>
      </Modal>

      <Box h="100vh" w="100%" position="relative">
      <FilterMenu />
      
      <Box position="absolute" top="0" left="0" right="0" bottom="0">
        <Map
          {...viewState}
          onMove={evt => {
            setViewState(evt.viewState);
            setBounds(evt.target.getBounds().toArray().flat());
          }}
          // --- ADD THIS SECTION ---
          onLoad={(evt) => {
             // This sets the bounds as soon as the map loads, 
             // triggering supercluster immediately without user interaction
             setBounds(evt.target.getBounds().toArray().flat());
          }}
          // ------------------------
          ref={mapRef}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="bottom-right" />

          {loading && (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%" position="absolute" top="0" w="100%" zIndex="1">
              <Spinner size="xl" color="#053774" />
            </Box>
          )}

          {/* --- RENDER CLUSTERS AND MARKERS --- */}
          {!loading && clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } = cluster.properties;

            // --- CASE A: IT IS A CLUSTER (Group of points) ---
            if (isCluster) {
                // Determine size based on count
                const size = pointCount < 10 ? 40 : pointCount < 50 ? 50 : 60;
                
                return (
                    <Marker 
                        key={`cluster-${cluster.id}`}
                        latitude={latitude} 
                        longitude={longitude}
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            handleClusterClick(cluster.id, latitude, longitude);
                        }}
                    >
                        <Box
                            bg="#053774"
                            color="white"
                            borderRadius="full"
                            width={`${size}px`}
                            height={`${size}px`}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontWeight="bold"
                            border="2px solid white"
                            cursor="pointer"
                            boxShadow="lg"
                            _hover={{ bg: "#032042", transform: "scale(1.1)" }}
                            transition="all 0.2s"
                        >
                            {pointCount}
                        </Box>
                    </Marker>
                );
            }

            // --- CASE B: IT IS A SINGLE MARKER (Leaf) ---
            return (
                <Marker
                    key={`marker-${cluster.properties.id}`}
                    longitude={longitude}
                    latitude={latitude}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        // Access original properties we passed in step 2
                        navigate(`/results/${cluster.properties.id}`, { 
                            state: { background: location } 
                        });
                    }}
                >
                     <svg 
                        height="30" 
                        viewBox="0 0 24 24" 
                        style={{
                          cursor: 'pointer',
                          // Use properties passed in Step 2
                          fill: cluster.properties.total_count === 0 ? '#A0AEC0' : '#E53E3E',
                          stroke: 'white',
                          strokeWidth: '1px'
                        }}
                      >
                        <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                      </svg>
                </Marker>
            );
          })}
        </Map>
      </Box>
    </Box>
    </Layout>
  );
}