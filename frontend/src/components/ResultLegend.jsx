import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  Flex,
  Card,
  CardHeader,
} from "@chakra-ui/react";

import { MdCenterFocusWeak, MdFormatListNumbered } from "react-icons/md";
import { FaRecycle } from "react-icons/fa";

const COLORS = {
  green: "green.400",
  blue: "blue.600",
};

// --- MOCK BOUNDING BOX ---
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

// --- MAIN MODAL COMPONENT ---
export default function DetectionLegend({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent borderRadius="xl" maxW={{base:"90%", sm:'600px'}}>
        {/* 1. Header Area */}
        <ModalHeader color="#053774" fontSize={{base:"lg", sm: 'xl'}}>
          Understanding your Results
        </ModalHeader>
        <ModalCloseButton />

        {/* 2. Scrollable Body Area */}
        <ModalBody>
          {/* Subtitle */}
          <Text
            color="gray.600"
            fontSize="sm"
            mb={8}
          >
            A guide to reading the bounding boxes and detection counts.
          </Text>

          {/* --- MAIN CONTENT (Formerly inside Accordion) --- */}
          <VStack spacing={8} align="stretch">
            {/* --- SECTION 1: THE BOUNDING BOX --- */}
            <Box>
              <HStack mb={3} spacing={2}>
                <Icon as={MdCenterFocusWeak} color={COLORS.green} boxSize={5} />
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
                <Icon
                  as={MdFormatListNumbered}
                  color={COLORS.green}
                  boxSize={5}
                />
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
                            fontSize={{
                              base: "20px",
                              sm: "20px",
                              md: "20px",
                            }}
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
                This number represents the total amount of a specific waste type
                found in the image.
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        {/* 3. Footer Area */}
        <ModalFooter bg="gray.50" borderBottomRadius="xl">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close Guide
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}