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
      height={{ base: "265px", md: "400px" }}
      color="white"
      p={8}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
 
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        gap={4}
      >
        <Box>
          <Heading
            fontSize={{ base: "4xl", md: "64px" }}
            fontWeight="semibold"
            fontStyle="italic"
            lineHeight="1.1"
            // this removes <br /> on desktop
            display={{ base: "block", md: "inline" }}
          >
            SPOT 
            <Box as="span" display={{ base: "block", md: "inline" }}>
              {" "}WASTE?
            </Box>
          </Heading>
          <Text fontSize={{ base: "16px", md: "24px" }}>SNAP IT. REPORT IT.</Text>
        </Box>

        <Button
          as={RouterLink}
          to="/Submit"
          bg="#053774"
          color="white"
          fontSize={["sm", "md", "xl"]}
          borderRadius="md"
          px={[6, 8, 10]}
          py={[4, 5, 6]}
          _hover={{ bg: "#0645a0" }}
        >
          SUBMIT NOW!
        </Button>
      </Flex>

      <Box textAlign="center">
        <Text mt={8} fontSize={{ base: "10px", sm: "10px", md: "15px" }}>
          Help monitor and manage river waste — One Photo at a Time.
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;