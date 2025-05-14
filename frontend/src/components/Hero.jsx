import React from 'react';
import { Box, Button, Heading, Text, Flex } from '@chakra-ui/react';
import { Link as RouterLink} from "react-router-dom";
import img from '../assets/hero-bg.png';

const Hero = () => {
  return (
    <Box
      bgImage={img}
      backgroundSize="cover"
      backgroundPosition="center"
      width="100%"
      height="265px"
      color="white"
      p={8}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
 
      <Flex justify="space-between" align="center">
        <Box maxW="lg">
          <Heading
            size="2xl"
            fontWeight="semibold"
            fontStyle="italic"
            lineHeight="1.2"
          >
            SPOT <br /> WASTE?
          </Heading>
          <Text>SNAP IT. REPORT IT.</Text>
        </Box>

        <Button
          as={RouterLink}
          to="/Submit"
          bg="#053774"
          color="white"
          fontSize="lg"
          borderRadius="md"
          p={3}
          py={7}
        >
          SUBMIT NOW!
        </Button>
      </Flex>

      <Box textAlign="center">
        <Text mt={8} fontSize="xs">
          Help monitor and manage river waste — One Photo at a Time.
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;
