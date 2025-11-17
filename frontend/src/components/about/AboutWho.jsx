import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  HStack,
  Icon,
  Circle,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaUsers, FaLandmark, FaLeaf } from 'react-icons/fa';

const BRAND_GREEN = "#15A33D";
const BRAND_BLUE = "#053774";

// --- Reusable Card Component ---
const WhoItemCard = ({ icon, title, text }) => {
  const bgCard = useColorModeValue("white", "gray.800");

  return (
    <HStack
      align="start"
      spacing={4}
      bg={bgCard}
      p={{ base: 4, md: 5 }}
      rounded="lg"
      boxShadow="md"
    >
      <Circle size={12} bg={`${BRAND_GREEN}1A`} color={BRAND_GREEN} flexShrink={0}>
        <Icon as={icon} w={6} h={6} />
      </Circle>

      <Box>
        <Text fontSize={{ base: "md", lg: "lg" }} color={BRAND_BLUE} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {text}
        </Text>
      </Box>
    </HStack>
  );
};

export const Who = () => {
  const bgSection = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgSection} py={{ base: 16, md: 20 }}>
      <Container maxW="6xl">
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: 12, lg: 20 }}
          align="center"
        >
          {/* Left: Title + Description */}
          <Box flex={1} textAlign={{ base: "center", lg: "left" }}>
            <Heading
              as="h3"
              size={{ base: "lg", md: "xl" }}
              mb={6}
              color={BRAND_BLUE}
            >
              Who It’s For
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              maxW={{ base: "full", lg: "md" }}
            >
              Flotector is a tool for everyone who shares a stake in the Imus River Watershed.
              It connects the community with the data needed to make a real difference.
            </Text>
          </Box>

          {/* Right: Cards */}
          <Box flex={1.5}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <WhoItemCard
                icon={FaUsers}
                title="Citizens"
                text="Local residents who want cleaner waterways."
              />
              <WhoItemCard
                icon={FaLandmark}
                title="Local Government (LGUs)"
                text="Planning efficient cleanup operations and policies."
              />
              <WhoItemCard
                icon={FaLeaf}
                title="Environmental Groups"
                text="Identifying pollution hotspots for advocacy."
              />
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Who;
