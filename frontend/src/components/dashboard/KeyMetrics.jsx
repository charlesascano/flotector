import { Box, 
        Flex,
        Heading, 
        Text, 
        Button, 
        Icon, 
        Grid, 
        GridItem} from "@chakra-ui/react";

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
// h={{base: "300px", md: "400px"}}
const KeyMetrics = ({ overallDetection, totalSubmissions, wasteType, topHotspot, icons }) => (
  <Box w="100%" p={{ base: 4, md: 8 }} bg="#F6F6F6" borderRadius="20px" borderBottom="1px solid #C2C2C2">

    {/* Section Heading */}
    <Heading color="#053774" fontWeight="700" mb={6} fontSize={{ base: "2xl", sm: "3xl", md: "40px" }}>
      Key Metrics
    </Heading>

    <Grid gap={3} templateColumns={{base: "repeat(4, 1fr)", md: "repeat(5, 1fr)"}} spacing={{ base: 4, md: 6 }}>
      {/* BIG CARD: Overall Detection */}
      <GridItem
        p={{ base: 6, sm: 7, md: 8 }}
        bgGradient="linear(330deg, white -220%, #053774 100%)"
        boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
        borderRadius="35px"
        color="white"
        rowSpan={{base: 1, md: 2}}
        colSpan={{base: 4,md: 1}}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Text fontWeight="700" fontSize={{ base: "calc(16px + 0.7vw)"}}>OVERALL DETECTION</Text>
        <Text fontWeight="700" fontSize={{ base:"calc(64px + 1vw)" }} textAlign="right" lineHeight="1.1" mt={{ base: 4, md: 2 }}>

          {/* overall detection value: REPLACE with dynamic value */}
          {overallDetection || 0}
        </Text>
      </GridItem>

        {/* CARD 2: Total Image Submissions */}
        <GridItem
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
          p={{ base: 4, sm: 5, md: 6 }}
          bgGradient="linear(158deg, #15A33D 0%, #EFEFEF 200%)"
          boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
          borderRadius="35px"
          color="white"
          gap={1}
          flexWrap={"wrap"}
          colSpan={2}
        >
          <Text fontWeight="700" fontSize={{ base: "calc(8px + 1vw)" }} lineHeight="1.2" >
            TOTAL IMAGE<br/>SUBMISSIONS
          </Text>

          <Text fontWeight="700" fontSize={{ base: "3.5rem", sm: "4rem", md: "64px" }} lineHeight="1" textAlign={"right"} w={{base: "100%", lg:"fit-content"}}>
            {/* total image submissions value: REPLACE with dynamic value */}
            {totalSubmissions || 0}
          </Text>
        </GridItem>

        {/* CARD 3: Top Waste Type */}
        <GridItem
          display={"flex"}
          p={{ base: 4, sm: 5, md: 6 }}
          bgGradient="linear(149deg, #15A33D 0%, #EFEFEF 200%)"
          boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
          borderRadius="35px"
          color="white"
          justifyContent={{base: "center", md:"space-between"}}
          gap={2}
          alignItems={"center"}
          colSpan={2}
          flexWrap={{base: "wrap", md: "nowrap"}}
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems={{base: "center",md:"start"}}
            textAlign={{base: "center", md:"left"}}
            h={{base:"fit-content", md:"100%"}}
          >
            <Text fontSize={{ base: "calc(6px + 0.5vw)" }} fontWeight="500" >TOP WASTE TYPE</Text>

            <Box>
            <Text fontWeight="700" fontSize={{ base: "calc(16px + 1vw)" }} lineHeight="1.1">

              {/* top waste type text: REPLACE with dynamic waste type */}
              {wasteType?.toUpperCase() || "PLASTIC"}
            </Text>
            <Text fontSize={{ base: "10px", sm: "xs" }} pt={1} lineHeight="1.1">
              represents <Text as="span" fontWeight="700">{/* top waste type percentage: REPLACE Dynamic percentage */}80%</Text> of detections
            </Text>
            </Box>
          </Flex>
          {/* top waste type icon: PLACE icon dynamically from icons object using wasteType (or however you do) */}
          {icons?.[wasteType] || <BottleIcon boxSize={{ base: 10, sm: 12, md: 16, lg:24 }}/>}


        </GridItem>

        {/* BOTTOM WIDE CARD: Top Hotspot */}
        <GridItem
          display={"flex"}
          alignItems="center"
          p={{ base: 5, sm: 6, md: 6 }}
          w="100%"
          bgGradient="linear(150deg, white 24%, #053774 270%)"
          boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
          borderRadius="35px"
          border="1px solid #DCDCDC"
          textAlign="center"
          colSpan={4}
          gap={4}
          flexWrap={"wrap"}
        >
          <Flex direction={"column"} textAlign={"left"} flex="1" minW={"200px"}>
            <Text color="#5D5D5D" fontSize={{ base: "calc(8px + 0.3vw)" }} fontWeight="500">
              TOP HOTSPOT
            </Text>
            <Box>
              <Text fontWeight="700" fontSize={{ base: "calc(16px + 0.5vw)" }} color="#053774">
                {/* top hotspot text: REPLACE with dynamic value */}
                {topHotspot?.name || "BRGY. NAME"}
              </Text>

              {/* top hotspots total reports value: REPLACE with dynamic value */}
              <Text fontSize={{ base: "calc(8px + 0.5vw)" }} color="#053774">
                is the most reported area with <Text as="span" fontWeight="700">{topHotspot?.reports || 0}</Text> reports
              </Text>
            </Box>
          </Flex>

          <Button
            bg="#053774"
            color="white"
            fontWeight="700"
            borderRadius="6px"
            fontSize={{ base: "calc(8px + 0.7vw)" }}
            p={{ base: 4, md: 5 }}
            px={{ base: 6, sm: 8 }}
            _hover={{ bg: "#042e61" }}
            marginLeft={"auto"}
          >
            View Details
          </Button>
        </GridItem>
    </Grid>
  </Box>
);

export default KeyMetrics;
