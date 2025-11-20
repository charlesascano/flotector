import React from 'react';
import { Box, Button, Heading, Text, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import img from '../assets/flotector-hero-bg.png';

const Hero = () => {
  return (
    <Box
      bgImage={`url(${img})`}
      bgSize="cover"
      bgPos="center"
      w="100%"
      minH={{ base: '400px', md: '450px', lg: '520px' }}
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      px={{ base: 6, md: 12 }}
      py={{ base: 10, md: 16 }}
    >
      <Flex direction="column" align="center" gap={4}>
        <Box>
          <Heading
            fontSize={{ base: '3xl', md: '5xl', lg: '64px' }}
            fontWeight="semibold"
            fontStyle="italic"
            lineHeight="1.1"
            display={{ base: 'block', md: 'inline' }}
          >
            SPOT
            <Box as="span" display={{ base: 'block', md: 'inline' }}>
              {' '}WASTE?
            </Box>
          </Heading>

          <Text fontSize={{ base: 'md', md: 'xl' }}>SNAP IT. REPORT IT.</Text>
        </Box>

        <Button
          as={RouterLink}
          to="/Submit"
          bg="#053774"
          color="white"
          fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
          borderRadius="md"
          px={{ base: 6, md: 10 }}
          py={{ base: 4, md: 6 }}
          _hover={{ bg: '#0645a0' }}
        >
          SUBMIT NOW!
        </Button>

        <Text
          mt={6}
          fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
          maxW="md"
          mx="auto"
        >
          Help monitor and manage river waste — One Photo at a Time.
        </Text>
      </Flex>
    </Box>
  );
};

export default Hero;
