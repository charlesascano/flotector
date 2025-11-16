import { 
    Box, 
    Heading, 
    Text,
    Image,
    Grid,
    GridItem
} from '@chakra-ui/react';

import img from '../assets/watershed-cropped.webp';


const BriefOverview = () => (
  <Box py={{ base: 16, md: 20 }} px={{ base: 6, md: 12 }} mx={{base: 8}} bg="white">
    <Heading
      fontWeight="600"
      fontSize={{ base: '3xl', md: '5xl', lg: '64px' }}
      textAlign="center"
      color="#053774"
      mb={6}
    >
      Imus River Overview
    </Heading>

    <Text
      fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
      textAlign="center"
      mb={12}
      color="#053774"
      maxW="2xl"
      mx="auto"
    >
      From Highlands to Manila Bay
    </Text>

    <Grid justifyContent={"center"} alignItems={"center"} gap={{base:4, lg: 16}} templateColumns={{base: "1fr", lg: "1fr 1fr"}}>
        <GridItem display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Image src={img} alt="Map of Cities and Municipalities Within Imus River Watershed"/>
            <Text as="a" target="_blank" fontSize={"calc(8px + 0.5vw)"}
            href='https://www.pemsea.org/sites/default/files/2023-12/ASEANO_Project_Report_Mapping_of_Imus_River_Watershed_20220318.pdf' 
            textAlign={"center"} _hover={{color: "blue.700", textDecoration: "underline"}}
            >ASEANO: Cities and Municipalities Within Imus River Watershed</Text>
        </GridItem>
    <GridItem textIndent={"42px"} fontSize={"calc(12px + 0.5vw)"}>
        Spanning a total length of 36.7 kilometers, the Imus River serves as a 
        primary drainage channel for the province of Cavite. The river originates 
        in the highlands of Tagaytay City and flows northward through the 
        municipality of Silang. As it moves downstream, it traverses the densely 
        populated urban centers of Dasmariñas City and Imus City. Finally, the 
        river passes through Bacoor City and the Municipality of Kawit before discharging 
        into Bacoor Bay, a vital inlet of Manila Bay.
    </GridItem>
    </Grid>
  </Box>
);

export default BriefOverview;
