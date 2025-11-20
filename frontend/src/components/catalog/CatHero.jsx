import React from "react";
import { Box, Heading, Container, Text } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Box
      bgGradient="linear(to-b, #053774, #042c5c)"
      color="white"
      textAlign="center"
      px={4}
      pt={{ base: 12, md: 20, lg: 24 }}
      pb={{ base: 16, md: 24, lg: 28 }}
    >
      <Heading
        as="h1"
        fontWeight="bold"
        size={{ base: "xl", md: "2xl" }}
        mb={4}
      >
        What's Detected
      </Heading>

      <Container maxW="3xl" p={0}>
        <Text
          fontWeight="light"
          opacity={0.9}
          lineHeight="tall"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
        >
          A guide to detected waste and proper disposal practices.
        </Text>
      </Container>
    </Box>
  );
}
