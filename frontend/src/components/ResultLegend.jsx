import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Flex,
  Card,
  CardHeader,
  extendTheme,
} from "@chakra-ui/react";

import { InfoIcon } from "@chakra-ui/icons";
import { MdCenterFocusWeak, MdFormatListNumbered } from "react-icons/md";
import { FaRecycle } from "react-icons/fa";

const COLORS = {
  green: "green.400",
  blue: "blue.600",
};

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
});

// MOCK BOUNDING BOX 
const MockBoundingBox = () => {
  return (
    <Box
      position="relative"
      w="100%"
      h="200px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="gray.100"
      backgroundImage="radial-gradient(circle, #d1d5db 1px, transparent 1px)"
      backgroundSize="20px 20px"
    >
      {/* The Bounding Box */}
      <Box
        position="absolute"
        top="25%"
        left="30%"
        w="40%"
        h="50%"
        border="3px solid"
        borderColor={COLORS.green}
        bg="rgba(72, 187, 120, 0.15)"
        borderRadius="md"
        zIndex={2}
      >
        {/* The Label */}
        <Box
          position="absolute"
          top="-28px"
          left="-3px"
          bg={COLORS.green}
          color="white"
          px={2}
          py={0.5}
          borderRadius="sm"
          display="flex"
          alignItems="center"
          shadow="sm"
        >
          <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">
            Plastic
          </Text>
          <Box mx={1.5} h="10px" w="1px" bg="whiteAlpha.600" /> {/* Divider */}
          <Text fontSize="xs" fontFamily="mono" fontWeight="bold">
            0.86
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default function DetectionLegend({ ...props }) {
  return (
    <VStack
      {...props}
      w="100%"
      maxW="600px"
      mx="auto"
      py={{ base: 6, md: 8 }}
      px={{ base: 5, md: 6 }}
      align="stretch"
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
    >
      {/* --- HEADER TITLE --- */}
      <VStack spacing={2} mb={4}>
        <Text
          color="#053774"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="700"
          textAlign="center"
        >
          Understanding your Results
        </Text>
        <Text
          color="gray.600"
          fontSize="sm"
          textAlign="center"
          maxW="md"
          alignSelf="center"
        >
          A guide to reading the bounding boxes and detection counts.
        </Text>
      </VStack>

      {/* --- ACCORDION START --- */}
      <Accordion allowToggle w="100%" defaultIndex={[0]}>
        <AccordionItem border="none">
          <h2>
            <AccordionButton
              py={4}
              bg="white"
              borderBottom="1px solid"
              borderColor="gray.100"
              _hover={{ bg: "gray.50" }}
              roundedTop="lg"
            >
              <HStack flex="1" spacing={3}>
                <Flex
                  align="center"
                  justify="center"
                  bg="blue.50"
                  w="32px"
                  h="32px"
                  borderRadius="full"
                >
                  <Icon as={InfoIcon} color="#053774" w={4} h={4} />
                </Flex>
                <Text
                  color="#053774"
                  fontWeight="700"
                  fontSize="md"
                  textAlign="left"
                >
                  Quick Guide
                </Text>
              </HStack>
              <AccordionIcon color="#053774" />
            </AccordionButton>
          </h2>

          <AccordionPanel p={5} bg="#F9FAFB" borderBottomRadius="lg">
            <VStack spacing={6} align="stretch">
              {/* --- SECTION 1: THE BOUNDING BOX --- */}
              <Box>
                <HStack mb={3} spacing={2}>
                  <Icon as={MdCenterFocusWeak} color={COLORS.green} />
                  <Text
                    fontSize="sm"
                    fontWeight="800"
                    textTransform="uppercase"
                    color="gray.600"
                  >
                    1. The Bounding Box
                  </Text>
                </HStack>

                {/* The Visual Simulation */}
                <MockBoundingBox />

                <Box
                  mt={3}
                  p={3}
                  bg="white"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" color="gray.700" lineHeight="tall">
                    <Text as="span" fontWeight="bold" color="#053774">
                      The Box:
                    </Text>{" "}
                    Shows exactly where the waste is located in the frame.
                    <br />
                    <Text as="span" fontWeight="bold" color="#053774">
                      The Label:
                    </Text>{" "}
                    Consists of the <strong>Waste Type</strong> (e.g., Plastic)
                    and the <strong>Confidence Score</strong>.
                  </Text>
                </Box>

                {/* Confidence Score Specific Explanation */}
                <Flex
                  mt={2}
                  gap={3}
                  align="start"
                  p={3}
                  bg="blue.50"
                  borderRadius="md"
                >
                  <Box>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="blue.700"
                      mb={1}
                      textTransform="uppercase"
                    >
                      What is the number? (e.g. 0.86)
                    </Text>
                    <Text fontSize="sm" color="blue.800" lineHeight="tall">
                      The <strong>Confidence Score</strong> tells you how "sure"
                      the model is.
                      <br />
                      <Text
                        as="span"
                        fontFamily="mono"
                        bg="white"
                        px={1}
                        rounded="sm"
                      >
                        0.86
                      </Text>{" "}
                      means the system is <strong>86% certain</strong> that the
                      object is Plastic.
                    </Text>
                  </Box>
                </Flex>
              </Box>

              <Box h="1px" bg="gray.200" />

              {/* --- SECTION 2: TOTAL DETECTED --- */}
              <Box>
                <HStack mb={3} spacing={2}>
                  <Icon as={MdFormatListNumbered} color={COLORS.green} />
                  <Text
                    fontSize="sm"
                    fontWeight="800"
                    textTransform="uppercase"
                    color="gray.600"
                  >
                    2. Total Detected Count
                  </Text>
                </HStack>

                <HStack
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  justify="center"
                >
                  <Card
                    variant="outline"
                    borderColor="#0a2760"
                    borderRadius="md"
                    w="100%"
                  >
                    <CardHeader p={3}>
                      <Flex align="center" justify="space-between">
                        <Flex align="center" gap={4}>
                          <Icon as={FaRecycle} boxSize={6} color="#053774" />
                          <Box position={"relative"}>
                            <Text
                              fontSize={{ base: "20px", sm: "20px", md: "20px" }}
                              fontWeight="bold"
                              color="#15A33D"
                            >
                              PLASTIC - 4
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </CardHeader>
                  </Card>
                </HStack>

                <Text fontSize="sm" color="gray.600" mt={2} px={1}>
                  This number represents the total amount of a specific waste
                  type found in the image.
                </Text>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}