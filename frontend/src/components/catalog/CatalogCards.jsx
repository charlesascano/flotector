import React from "react";
import {
  Box,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  TagLabel,
  Icon,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { FaTrashAlt, FaLeaf, FaLightbulb } from "react-icons/fa";
import { COLORS, CATALOG_DATA } from "./CatalogData";

const SectionBox = ({ icon, title, children }) => (
  <Box
    bg="white"
    p={{ base: 3, md: 4 }}
    borderRadius="lg"
    shadow="sm"
    border="1px solid"
    borderColor="gray.200"
  >
    <HStack mb={2}>
      <Icon as={icon} boxSize={4} color="green.500" />
      <Text fontSize="xs" fontWeight="bold" color="gray.600" textTransform="uppercase">
        {title}
      </Text>
    </HStack>
    <Text fontSize="sm" color="gray.600">{children}</Text>
  </Box>
);

export default function CatalogCards({ type, isOpen, onToggle }) {
  const data = CATALOG_DATA.find((w) => w.title.toLowerCase() === type.toLowerCase());
  if (!data) return null;

  return (
    <Card
      variant="outline"
      borderColor={isOpen ? COLORS.green : "gray.200"}
      borderWidth="1px"
      borderRadius="xl"
      cursor="pointer"
      onClick={onToggle}
      transition="all 0.2s"
      bg="white"
      _hover={{ boxShadow: "lg", borderColor: COLORS.green, transform: "translateY(-2px)" }}
    >
      <CardHeader p={{ base: 3, md: 5 }}>
        <Flex align="center" justify="space-between">
          <Flex flex="1" gap={{ base: 2, md: 4 }} minW="0" align="center">
            <Flex
              align="center"
              justify="center"
              bg={isOpen ? "green.50" : "gray.50"}
              p={2}
              borderRadius="full"
              w={{ base: "42px", md: "60px" }}
              h={{ base: "42px", md: "60px" }}
              minW={{ base: "42px", md: "60px" }}
            >
              <Icon
                as={data.icon}
                boxSize={{ base: 4, md: 7 }}
                color={isOpen ? COLORS.green : COLORS.darkBlue}
              />
            </Flex>

            <Box>
              <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold" color={COLORS.green} noOfLines={1}>
                {data.title.toUpperCase()}
              </Text>
              <Text fontSize="xs" fontWeight="600" color="gray.500">
                {data.category.toUpperCase()}
              </Text>
            </Box>
          </Flex>

          <Icon as={InfoIcon} boxSize={{ base: 5, md: 6 }} color={COLORS.darkBlue} />
        </Flex>
      </CardHeader>

      <Collapse in={isOpen} animateOpacity>
        <CardBody
          bg="gray.50"
          borderTopWidth="1px"
          borderColor="gray.200"
          p={{ base: 3, md: 6 }}
          pt={2}
          onClick={(e) => e.stopPropagation()}
        >
          <Tabs variant="soft-rounded" colorScheme="green" size="sm" isFitted mt={2}>
            <TabList mb={4} bg="gray.200" p={1} borderRadius="full">
              <Tab _selected={{ bg: COLORS.green, color: "white" }}>Disposal</Tab>
              <Tab _selected={{ bg: COLORS.darkBlue, color: "white" }}>Impact</Tab>
            </TabList>

            <TabPanels>
              {/* DISPOSAL TAB */}
              <TabPanel p={0}>
                <VStack align="stretch" spacing={4}>
                  <Text fontSize="sm" color="gray.700" fontStyle="italic">
                    {data.description}
                  </Text>

                  <Box
                    p={{ base: 3, md: 4 }}
                    borderRadius="lg"
                    bg="green.50"
                    borderWidth="1px"
                    borderColor="green.200"
                  >
                    <HStack align="start" spacing={3}>
                      <Flex
                        align="center"
                        justify="center"
                        minW="32px"
                        h="32px"
                        bg="white"
                        borderRadius="full"
                        shadow="sm"
                        border="1px solid"
                        borderColor="green.200"
                      >
                        <Icon as={FaTrashAlt} w={3} h={3} color="green.600" />
                      </Flex>
                      <Text fontSize="sm" fontWeight="600" color="gray.700">
                        {data.disposal}
                      </Text>
                    </HStack>
                  </Box>

                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={2} textTransform="uppercase">
                      Common Examples
                    </Text>
                    <Flex flexWrap="wrap" gap={2}>
                      {data.examples.map((ex, i) => (
                        <Tag key={i} size="sm" borderRadius="full" variant="subtle">
                          <TagLabel>{ex}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Box>
                </VStack>
              </TabPanel>

              {/* IMPACT TAB */}
              <TabPanel p={0}>
                <VStack align="stretch" spacing={4}>
                  <SectionBox icon={FaLeaf} title="Environmental Impact">
                    {data.impact}
                  </SectionBox>

                  <SectionBox icon={FaLightbulb} title="Tip">
                    {data.tips}
                  </SectionBox>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Collapse>
    </Card>
  );
}
