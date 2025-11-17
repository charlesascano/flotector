import React from 'react';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

const AboutHero = () => {
  return (
    <Box
      bgGradient="linear(to-b, #053774, #042c5c)"
      color="white"
      pt={{ base: 16, md: 24 }}
      pb={{ base: 24, md: 32 }}
      px={4}
      textAlign="center"
    >
      <Container maxW="4xl">
        <Heading as="h1" size={{ base: 'xl', md: '2xl' }} mb={4}>
          About Flotector
        </Heading>

        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="light">
          A community-powered system for detecting floating waste in the Imus River Watershed using AI and crowdsourced photos.
        </Text>
      </Container>
    </Box>
  );
};

export default AboutHero;
