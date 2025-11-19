import { 
    Box, 
    Heading, 
    Text,
    Image,
    Grid,
    GridItem,
    Button
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import img from '../assets/watershed-cropped.webp';

const BriefOverview = () => (
  <Box py={{ base: 12, md: 16, lg: 20 }} px={{ base: 4, md: 8, lg: 12 }} mx="auto" bg="white" overflow="hidden">
    <Heading
      fontWeight="600"
      fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
      textAlign="center"
      color="#053774"
      mb={{ base: 4, md: 6, lg: 8 }}
    >
      Imus River
    </Heading>

    <Text
      fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
      textAlign="center"
      mb={{ base: 8, md: 10, lg: 12 }}
      color="#053774"
      maxW="2xl"
      mx="auto"
    >
      From Highlands to Manila Bay
    </Text>

    <Grid 
      templateColumns={{ base: "1fr", md: "1fr 1fr" }} 
      gap={{ base: 6, md: 10, lg: 16 }} 
      justifyContent="center" 
      alignItems="start"
    >
        <GridItem display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Image 
              src={img} 
              alt="Map of Cities and Municipalities Within Imus River Watershed" 
              borderRadius="md"
              w={{ base: "100%", md: "90%", lg: "100%" }}
            />
            <Text 
              as="a" 
              target="_blank" 
              fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
              href='https://www.pemsea.org/sites/default/files/2023-12/ASEANO_Project_Report_Mapping_of_Imus_River_Watershed_20220318.pdf' 
              textAlign="center"
              _hover={{ color: "blue.700", textDecoration: "underline" }}
            >
              ASEANO: Cities and Municipalities Within Imus River Watershed
            </Text>
        </GridItem>

        <GridItem 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          gap={4} 
          textAlign={{ base: "center", md: "left" }}
        >
            <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                Spanning a total length of 36.7 kilometers, the Imus River serves as a 
                primary drainage channel for the province of Cavite. The river originates 
                in the highlands of Tagaytay City and flows northward through the 
                municipality of Silang. As it moves downstream, it traverses the densely 
                populated urban centers of Dasmariñas City and Imus City. Finally, the 
                river passes through Bacoor City and the Municipality of Kawit before discharging 
                into Bacoor Bay, a vital inlet of Manila Bay.
            </Text>

          <Button
            bg="#053774"
            color="white"
            size="md"
            as={Link}
            to="/about"
            px={{ base: 6, md: 8 }} 
            py={{ base: 4, md: 4 }} 
            alignSelf={{ base: "center", md: "start" }} 
            whiteSpace="nowrap" 
            rightIcon={<ArrowForwardIcon />} 
          >
            LEARN MORE ABOUT FLOTECTOR
          </Button>
        </GridItem>
    </Grid>
  </Box>
);

export default BriefOverview;
