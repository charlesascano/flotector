import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem
} from "@chakra-ui/react";
import SubmissionsGraph from "./SubmissionsGraph";

const SubmissionsAnalytics = ({ totalSubmissions, graphData, data=null }) => (
  <Box w="100%" p={{ base: 4, md: 8 }} bg="#F6F6F6" borderRadius="20px" borderBottom="1px solid #C2C2C2">

    {/* Section Heading */}
    <Heading color="#053774" fontWeight="700" mb={6} fontSize={{ base: "2xl", sm: "3xl", md: "40px" }}>
      Submissions Analytics
    </Heading>

    <Grid
      gap={3}
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      templateRows={{ base: "repeat(3, 1fr)", md: "1fr" }}
      spacing={{ base: 4, md: 6 }}
    >

      {/* Total Count Card */}
      <GridItem
        p={{ base: 4, sm: 5, md: 6 }}
        bgGradient="linear(158deg, #15A33D 0%, #EFEFEF 200%)"
        boxShadow="0px 4px 4px rgba(0,0,0,0.25)"
        borderRadius="35px"
        color="white"
        rowSpan={{ base: 1 }}
        colSpan={{ base: 1 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        maxH={"200px"}
      >
        <Text fontWeight="700" fontSize={{ base: "calc(8px + 1vw)" }} lineHeight="1.2" >
          TOTAL IMAGE<br />SUBMISSIONS
        </Text>

        <Text fontWeight="700" fontSize={{ base: "calc(42px + 0.8vw)" }} lineHeight="1" textAlign={"right"} w="100%">
          {/* Ensure we show 0 if null/undefined */}
          {totalSubmissions !== undefined ? totalSubmissions : 0}
        </Text>
      </GridItem>

      {/* Graph Container */}
      <GridItem
        colSpan={{ base: 1, md: 3 }}
        rowSpan={{ base: 2, md: 1 }}
        borderRadius={"12px"}
        bgColor={"white"}
        padding={"1.5rem"}
        pb={{ base: "calc(1.5rem + 2.5vw)" }}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
        border={"1px solid #C2C2C2"}
        height={{ md: "400px" }}
      >
        {/* Pass the real data down */}
        <SubmissionsGraph data={graphData} />
      </GridItem>
    </Grid>
  </Box>
);

export default SubmissionsAnalytics;