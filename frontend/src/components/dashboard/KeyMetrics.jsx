import { Box, 
        Flex,
        Heading, 
        Text, 
        SimpleGrid, 
        Button, 
        Icon, 
        VStack } from "@chakra-ui/react";

// Bottle Icon (example static icon, you can map dynamically later)
// Current waste types (on Results.jsx): const classOrder = ["plastic", "paper" ,"metal", "glass", "pile", "textile"];
const BottleIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M18,2H6C4.9,2,4,2.9,4,4V9.3C3.4,9.8,3,10.6,3,11.5V20c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V11.5
         c0-0.9-0.4-1.7-1-2.2V4C20,2.9,19.1,2,18,2z M6,4h12v5H6V4z M19,20H5V11.5C5,11.8,5.2,12,5.5,12h13c0.3,0,0.5-0.2,0.5-0.5V20z"
    />
  </Icon>
);
{/* 
  TODO: Texts that needs dynamic values (I've marked it, so you can search it to find it quickly):
  - overall detection value
  - total image submissions value
  - top waste type text
  - top waste type icon
  - top waste type percentage
  - top hotspot text
  - top hotspots total reports value
  */}

const KeyMetrics = ({ overallDetection, totalSubmissions, wasteType, topHotspot, icons }) => (
  <Box w="100%" p={{ base: 4, md: 8 }} bg="#F6F6F6" borderRadius="20px" borderBottom="1px solid #C2C2C2">

    {/* Section Heading */}
    <Heading color="#053774" fontWeight="700" mb={6} fontSize={{ base: "2xl", sm: "3xl", md: "40px" }}>
      Key Metrics
    </Heading>

    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>

      {/* BIG CARD: Overall Detection */}
      <Flex
        direction="column"
        justify="center"
        align="center"
        p={{ base: 6, sm: 7, md: 8 }}
        bgGradient="linear(330deg, white -220%, #053774 100%)"
        boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
        borderRadius="35px"
        color="white"
        w="100%"
        minH={{ base: "200px", md: "auto" }}
      >
        <Text fontWeight="700" fontSize={{ base: "lg", sm: "xl", md: "24px" }}>OVERALL DETECTION</Text>
        <Text fontWeight="700" fontSize={{ base: "5rem", sm: "6rem", md: "180px" }} textAlign="center" lineHeight="1.1" mt={{ base: 4, md: 2 }}>


          {/* overall detection value: REPLACE with dynamic value */}
          {overallDetection || 0}
        </Text>
      </Flex>

      {/* RIGHT SIDE CARDS */}
      <VStack spacing={{ base: 4, md: 6 }} w="100%">
        <SimpleGrid columns={{ base: 2, md: 2 }} spacing={{ base: 3, md: 6 }} w="100%">
          {/* CARD 2: Total Image Submissions */}
          <Flex
            direction="column"
            justify="center"
            align="center"
            p={{ base: 4, sm: 5, md: 6 }}
            bgGradient="linear(158deg, #15A33D 0%, #EFEFEF 200%)"
            boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
            borderRadius="35px"
            color="white"
            minH={{ base: "170px", md: "auto" }}
            textAlign="center"
          >
            <Text fontWeight="700" fontSize={{ base: "sm", sm: "md", md: "xl" }} lineHeight="1.2" mb={2}>
              TOTAL IMAGE SUBMISSIONS
            </Text>

            <Text fontWeight="700" fontSize={{ base: "3.5rem", sm: "4rem", md: "128px" }} lineHeight="1">
              {/* total image submissions value: REPLACE with dynamic value */}
              {totalSubmissions || 0}
            </Text>
          </Flex>

          {/* CARD 3: Top Waste Type */}
          <Flex
            direction="column"
            justify="center"
            align="center"
            p={{ base: 4, sm: 5, md: 6 }}
            bgGradient="linear(149deg, #15A33D 0%, #EFEFEF 200%)"
            boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
            borderRadius="35px"
            color="white"
            minH={{ base: "170px", md: "auto" }}
            textAlign="center"
          >
            <Text fontSize={{ base: "sm", sm: "md", md: "lg" }} fontWeight="500">TOP WASTE TYPE</Text>

            {/* top waste type icon: PLACE icon dynamically from icons object using wasteType (or however you do) */}
            {icons?.[wasteType] || <BottleIcon boxSize={{ base: 10, sm: 12, md: 24 }} my={1} />}

            <Text fontWeight="700" fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} lineHeight="1.1">

              {/* top waste type text: REPLACE with dynamic waste type */}
              {wasteType?.toUpperCase() || "PLASTIC"}
            </Text>

            <Text fontSize={{ base: "10px", sm: "xs" }} pt={1} lineHeight="1.1">
              represents <Text as="span" fontWeight="700">{/* top waste type percentage: REPLACE Dynamic percentage */}80%</Text> of detections
            </Text>
          </Flex>
        </SimpleGrid>

        {/* BOTTOM WIDE CARD: Top Hotspot */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          p={{ base: 5, sm: 6, md: 6 }}
          w="100%"
          bgGradient="linear(150deg, white 24%, #053774 270%)"
          boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
          borderRadius="35px"
          border="1px solid #DCDCDC"
          textAlign="center"
        >
          <VStack align="center" spacing={1} flex="1">
            <Text color="#5D5D5D" fontSize={{ base: "sm", sm: "md", md: "lg" }} fontWeight="500">
              TOP HOTSPOT
            </Text>
            <Text fontWeight="700" fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} color="#053774" lineHeight="1.1">
              {/* top hotspot text: REPLACE with dynamic value */}
              {topHotspot?.name || "BRGY. NAME"}
            </Text>

            {/* top hotspots total reports value: REPLACE with dynamic value */}
            <Text fontSize={{ base: "xs", sm: "sm" }} pt={1} color="#053774">
              is the most reported area with <Text as="span" fontWeight="700">{topHotspot?.reports || 0}</Text> reports
            </Text>
          </VStack>

          <Button
            bg="#053774"
            color="white"
            fontWeight="700"
            borderRadius="6px"
            fontSize={{ base: "sm", md: "md" }}
            p={{ base: 4, md: 5 }}
            px={{ base: 6, sm: 8 }}
            mt={4}
            _hover={{ bg: "#042e61" }}
          >
            View Details
          </Button>
        </Flex>
      </VStack>
    </SimpleGrid>
  </Box>
);

export default KeyMetrics;
