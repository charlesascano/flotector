import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

import { Link as RouterLink } from 'react-router-dom';

const BRAND_GREEN = "#15A33D";
const BRAND_BLUE = "#053774";

export const AboutCTA = () => {
  return (
    <Box py={{ base: 16, md: 24 }} textAlign="center">
      <Container maxW="3xl">
        <Heading
          as="h2"
          size={{ base: "lg", md: "xl" }}
          mb={6}
          color={BRAND_BLUE}
        >
          SPOT WASTE?
        </Heading>

        <Text
          fontSize={{ base: "md", md: "xl" }}
          color="gray.500"
          mb={10}
        >
          Snap it and report it now! Every photo submitted helps map the problem—and move us closer to real solutions.
        </Text>

        <Button
          as={RouterLink}
          to="/Submit"
          size="lg"
          bg={BRAND_GREEN}
          color="white"
          _hover={{ bg: "#128a33", transform: "scale(1.05)" }}
          _active={{ bg: "#0f752b" }}
          h={{ base: "50px", md: "60px" }}
          px={{ base: 8, md: 10 }}
          fontSize={{ base: "lg", md: "xl" }}
          rightIcon={<Icon as={FaArrowRight} />}
          boxShadow="xl"
        >
          SUBMIT NOW!
        </Button>
      </Container>
    </Box>
  );
};

export default AboutCTA;