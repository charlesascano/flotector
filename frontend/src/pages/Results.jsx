import { Box, Icon, Flex, Text, Image, Heading, HStack, Button, SimpleGrid, Spinner, useToast, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, color } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WasteCard from "../components/WasteCard";
import Layout from '../components/Layout';
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";

export default function Results({ isOverlay = false }) {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isFromSubmit = location.state?.from === 'submit'; // Check if user came from the submit page
  const hasHistory = location.key !== "default"; // Get navigation history (turns into overlay mode if navigated from other pages)

  // Drawer functions for overlay mode
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenMap = () => {
    if (resultsData) {
      navigate('/map', {
        state: { 
          latitude: resultsData.lat, // Make sure these exist in your DB response!
          longitude: resultsData.lng,
        }
      });
    }
  };

  const onDrawerCloseComplete = () => {
    navigate(-1);
  };

  const toggleView = () => {
    if (showDetections) setImageUrl(resultsData.image_url);
    else setImageUrl(resultsData.result_url);
    setShowDetections(!showDetections);
    setImageLoaded(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    const options = {
      month: 'short',   // 'Jan', 'Feb', etc.
      day: 'numeric',   // '5'
      year: 'numeric',  // '2025'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Fetch Results data
  const [imageUrl, setImageUrl] = useState(null);
  const [classCount, setClassCount] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [showDetections, setShowDetections] = useState(true);
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!uuid) throw new Error("No submission ID provided.");

        const response = await fetch(`http://localhost:5000/api/results/${uuid}`);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to fetch results from server.");
        }

        const data = await response.json();
        setResultsData(data);
        setImageUrl(data.result_url);
        setClassCount(data.class_count || {});

      } catch (error) {
        console.error("Error loading results:", error.message);
        toast({
          title: "Error loading results",
          description: error.message,
          status: "error",
          duration: 5000,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [uuid, toast]);

  // Render waste cards based on classCount
  const classOrder = ["plastic", "paper", "metal", "glass", "pile", "textile"];

  const renderWasteCards = () => {
    return classOrder
      .filter(type => {
        const normalizedType = type.toLowerCase().replace(/\s/g, '');
        return Object.keys(classCount).some(key =>
          key.toLowerCase().replace(/\s/g, '').includes(normalizedType)
        );
      })
      .map(type => {
        // 1. Re-calculate normalized type
        const normalizedType = type.toLowerCase().replace(/\s/g, '');
        
        // 2. Find the actual key from the API data that matched
        const matchedKey = Object.keys(classCount).find(key => 
          key.toLowerCase().replace(/\s/g, '').includes(normalizedType)
        );

        // 3. Get the count (default to 0 just in case)
        const countValue = matchedKey ? classCount[matchedKey] : 0;

        // 4. Pass 'count' as a prop
        return <WasteCard key={type} type={type} count={countValue} />;
      });
  };

  // Results Content
  const ResultsContent = () => (
    <Flex direction="column" bgColor={"#F6F6F6"} px={isOverlay ? 0 : 4} minH={isOverlay ? "100%" : "100vh"} position="relative">
      
      {/* If overlay mode: show back button to close the drawer */}
      {isOverlay && (
        <IconButton
          aria-label="Close overlay"
          icon={<ArrowBackIcon />} 
          fontSize="32px"
          onClick={handleClose}
          position="absolute"
          top={6}
          left={6}
          zIndex={20}
          variant="ghost"
          bg="transparent"
          _hover={{ bg: 'transparent', transform: 'scale(1.1)' }}
          _active={{ bg: 'transparent' }}
          color="gray.700"
        />
      )}

      <Flex
        direction={{ base: "column", md: "row" }}
        bgColor={"white"}
        boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
        borderRadius="35px"
        p={4}
        pb={8}
        gap={{ base: 8, md: 12 }}
        maxW="1200px"
        mx="auto"
        w="100%"
        align="flex-start"
        mt={isOverlay ? 12 : 8} // Add top margin to clear the back button
      >
        {/* Left Column: Image */}
        <Box w={{ base: "100%", md: "45%" }} display={"flex"} textAlign={"center"} alignItems={"center"} flexDirection={"column"} px={{ base: 4, md: 6 }}>
          <Heading fontSize={{ base: "40px", md: "calc(40px + 1.5vw)" }} color="#15A33D" mb={2} mt={2} whiteSpace={"nowrap"}>
            DETECTIONS
          </Heading>
          <Text fontSize={{ base: "14px", md: "calc(14px + 0.1vw)" }} color="#053774" mb={4} mt={-2}>
            Thanks for helping monitor our waters!
          </Text>

          <Box mx="auto" mb={2} minH="200px" display="flex" alignItems="center" justifyContent="center">
            {loading ? (
              <Spinner size="xl" color="#15A33D" mx="auto" />
            ) : (
              <Image
                src={imageUrl}
                alt="FLOATING WASTE DETECTION OUTPUT"
                borderRadius="md"
                mx="auto"
                w={{ base: "100%", md: "120%" }}
                maxW="400px"
                fallback={<Spinner size="xl" color="#15A33D" />}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </Box>
          { imageLoaded && (
            <Button 
              onClick={toggleView}
              variant="outline"
              rounded="xl"
              py='12px'
              h="50px"
            >
              {showDetections ? "Show Original" : "Show Detections" }
            </Button> 
          )}
        </Box>

        {/* Right Column: Cards */}
        <Box
          w={{ base: "100%", md: "55%" }}
          px={{ base: 2, md: 4 }}
          mt={{ base: 0, md: 2 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >

          <Heading
            fontSize={{ base: "16px", md: "lg" }}
            mt={{ base: "5px", md: "50px" }}
            mb={{ base: "15px", md: "30px" }}
            textAlign="center"
            color="#053774"
          >
            FLOATING WASTE DETECTED:
          </Heading>
          <SimpleGrid spacing={4} w="100%" mb={3} justifyItems={"center"}>
            {loading ? (
              <Spinner size="xl" color="#064CA1" mx="auto" />
            ) : (
              renderWasteCards()
            )}
          </SimpleGrid>


          <Box
            mt={12}
            variant="outline"
            borderColor="#0a2760"
            bgColor={"gray.100"}
            borderRadius="md"
            w="80%"
            p={4}
            position={"relative"}
          >
            <Text 
              fontSize={{base: 'calc(8px + 1vw)', sm: "lg"}}
              fontWeight={'bold'}
              py={2}
              px={4}
              borderRadius={4}
              color={'white'}
              position={"absolute"}
              top={{base: -6, sm: -8}}
              bgColor={"#15A33D"}
              boxShadow={'lg'}
            >
              Submission Details
            </Text>
            <Flex flexDirection={'column'} gap={6}>
              <Flex gap={4} alignItems={"center"}>
                <Icon as={FaCalendar} boxSize={6}></Icon>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'bold'}>Date Captured:</Text>
                  <Text>{formatDate(resultsData && resultsData.created_at)}</Text>
                </Flex>
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Icon as={FaCalendarCheck} boxSize={6}></Icon>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'bold'}>Upload Date:</Text>
                  <Text>{formatDate(resultsData && resultsData.uploaded_at)}</Text>
                </Flex>
              </Flex>
              <Flex onClick={handleOpenMap} gap={4} alignItems={'center'} cursor='pointer' _hover={{color: "blue.600", transition: "150ms"}}>
                <Icon as={FaLocationDot} boxSize={6}></Icon>
                <Flex flexDirection={'column'}>
                  <Text fontWeight={'bold'}>Location:</Text>
                  <Text >{resultsData && resultsData.barangay}, {resultsData && resultsData.city}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>

      {/* If coming from Submit page: show buttons section */}
      <Flex mt={10} mb={10} justify="center" align="center"> 
        {isFromSubmit ? (
          <HStack spacing={4}>
            <Button
              as={RouterLink}
              to="/Submit"
              bg="#15A33D"
              color="white"
              fontWeight="bold"
              variant="solid"
              rounded="xl"
              w="150px"
              h="50px"
            >
              UPLOAD AGAIN
            </Button>
            <Button
              as={RouterLink}
              to="/"
              bg="#064CA1"
              color="white"
              fontWeight="bold"
              variant="outline"
              rounded="xl"
              w="150px"
              h="50px"
            >
              HOME
            </Button>
          </HStack>
        ) : null}
      </Flex>
    </Flex>
  );

  // Render decision (overlay mode or standard page)
  if (isOverlay) {
    return (
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={handleClose}
        onCloseComplete={onDrawerCloseComplete}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent overflowY="auto">
          <DrawerBody p={0}> 
            <ResultsContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Layout>
      <ResultsContent />
    </Layout>
  );
}