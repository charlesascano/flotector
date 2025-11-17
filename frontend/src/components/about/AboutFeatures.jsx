import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaCamera,
  FaRobot,
  FaMapMarkerAlt,
  FaDatabase,
} from 'react-icons/fa';

// --- Color Branding ---
const BRAND_GREEN = "#15A33D";
const BRAND_BLUE = "#053774";

// --- Feature Card ---
const FeatureCard = ({ title, text, icon }) => {
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <VStack
      bg={cardBg}
      p={{ base: 5, md: 6 }}
      rounded="xl"
      boxShadow="lg"
      align="start"
      borderTop={`4px solid ${BRAND_GREEN}`}
      transition="transform 0.3s ease"
      _hover={{ transform: 'translateY(-5px)' }}
      height="100%"
    >
      <HStack spacing={4} mb={2}>
        <Circle size={10} bg="gray.100" color={BRAND_BLUE}>
          <Icon as={icon} w={5} h={5} />
        </Circle>
        <Heading size="md" color={BRAND_BLUE}>
          {title}
        </Heading>
      </HStack>

      <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
        {text}
      </Text>
    </VStack>
  );
};

export const Features = () => {
  return (
    <Box py={{ base: 16, md: 20 }}>
      <Container maxW="6xl">
        {/* Header */}
        <VStack mb={12} textAlign="center">
          <Heading
            as="h2"
            size={{ base: 'lg', md: 'xl' }}
            color={BRAND_BLUE}
          >
            What Flotector Does
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.500">
            Everyone plays a part in cleaner rivers.
          </Text>
        </VStack>

        {/* Feature Cards */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <FeatureCard
            title="Capture & Submit"
            text="Users take a photo of floating waste using their phones."
            icon={FaCamera}
          />
          <FeatureCard
            title="AI Detection"
            text="The system uses the YOLOv11 model to identify the waste type and count."
            icon={FaRobot}
          />
          <FeatureCard
            title="Geotag Mapping"
            text="Detected waste is automatically pinned on a map."
            icon={FaMapMarkerAlt}
          />
          <FeatureCard
            title="Open Access Data"
            text="Local communities and authorities can use the insights for cleanup planning, research, and policy-making."
            icon={FaDatabase}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
