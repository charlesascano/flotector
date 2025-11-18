import { Box, 
        Flex,
        Heading, 
        Text, 
        Button, 
        Icon, 
        Grid, 
        GridItem} from "@chakra-ui/react";
import SubmissionsGraph from "./SubmissionsGraph";

// Bottle Icon (example static icon, you can map dynamically later)
// Current waste types (on Results.jsx): const classOrder = ["plastic", "paper" ,"metal", "glass", "pile", "textile"];

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

    <Grid 
      gap={3} 
      templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} 
      templateRows={{base: "repeat(3, 1fr)", md: "1fr"}} 
      spacing={{ base: 4, md: 6 }}
    >
      
      <GridItem
        p={{ base: 4, sm: 5, md: 6 }}
        bgGradient="linear(158deg, #15A33D 0%, #EFEFEF 200%)"
        boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
        borderRadius="35px"
        color="white"
        flexWrap={"wrap"}
        rowSpan={{base: 1}}
        colSpan={{base: 1}}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Text fontWeight="700" fontSize={{ base: "calc(8px + 1vw)" }} lineHeight="1.2" >
          TOTAL IMAGE<br/>SUBMISSIONS
        </Text>

        <Text fontWeight="700" fontSize={{ base: "calc(42px + 0.8vw)" }} lineHeight="1" textAlign={"right"} w="100%">
          {/* total image submissions value: REPLACE with dynamic value */}
          {totalSubmissions || 0}
        </Text>
      </GridItem>

      <GridItem
        colSpan={{base: 1, md: 3}}
        rowSpan={{base: 2, md: 1}}
        borderRadius={"12px"}
        bgColor={"white"}
        padding={"1.5rem"}
        pb={"3rem"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        border={"1px solid #C2C2C2"}
        height={{md:"400px"}}
      >
        <SubmissionsGraph />
      </GridItem>
    </Grid>
  </Box>
);

export default KeyMetrics;
