import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

// --- Color Branding ---
const BRAND_GREEN = "#15A33D";
const BRAND_BLUE = "#053774";

export const Purpose = () => {
  const bgWhite = useColorModeValue('white', 'gray.800');

  return (
    <Container
      maxW="5xl"
      mt={-16}
      mb={16}
      position="relative"
      zIndex={1}
    >
      <Box
        bg={bgWhite}
        p={{ base: 6, sm: 8, md: 10 }}
        rounded="2xl"
        shadow="xl"
        textAlign="center"
      >
        <Heading
          as="h2"
          size={{ base: 'lg', md: 'xl' }}
          color={BRAND_BLUE}
          mb={6}
        >
          Why We Built Flotector
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="gray.700"
          mb={4}
          lineHeight="relaxed"
        >
          We believe environmental protection starts with involvement. Flotector was designed to
          encourage people to take part—even in small ways—by reporting waste when they see it.
          Each submission contributes to a bigger picture of the river’s condition, supporting
          cleanup efforts and long-term sustainability.
        </Text>

        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          fontWeight="bold"
          color={BRAND_GREEN}
          lineHeight="relaxed"
        >
          Flotector aims to make monitoring easier, faster, and accessible to everyone.
        </Text>
      </Box>
    </Container>
  );
};

export default Purpose;
