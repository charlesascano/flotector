import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Icon,
  Circle,
} from '@chakra-ui/react';
import { FaGraduationCap } from 'react-icons/fa';

// --- Color Branding ---
const BRAND_GREEN = "#15A33D";
const BRAND_BLUE = "#053774";

export const Background = () => {
  return (
    <Box py={{ base: 16, md: 20 }} bg={`${BRAND_BLUE}08`}>
      <Container maxW="6xl">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: 10, lg: 16 }}
          align="center"
        >
          {/* Left Icon (Hidden on Mobile) */}
          <Box
            flex={1.5}
            display={{ base: 'none', lg: 'flex' }}
            justifyContent="center"
          >
            <Circle
              size={{ base: '200px', md: '250px' }}
              bg={`${BRAND_BLUE}10`}
              color={BRAND_BLUE}
            >
              <Icon as={FaGraduationCap} w={{ base: 24, md: 32 }} h={{ base: 24, md: 32 }} />
            </Circle>
          </Box>

          {/* Text Content */}
          <Box flex={2} textAlign={{ base: 'center', lg: 'left' }}>
            <Heading as="h3" size="lg" mb={4} color={BRAND_BLUE}>
              Project Background
            </Heading>

            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Floating waste in rivers is a growing problem in rapidly developing areas of Cavite,
              such as Imus, Bacoor, and Dasmariñas.
            </Text>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              lineHeight="tall"
              mt={4}
            >
              Flotector, developed by Computer Science students as an undergraduate thesis project,
              is a community-driven AI tool that helps citizens and local authorities monitor waste
              in the Imus River Watershed — showcasing how technology and community action can drive
              cleaner waterways and data-informed environmental solutions.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Background;
