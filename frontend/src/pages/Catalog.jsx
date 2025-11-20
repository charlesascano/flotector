import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Flex,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import HeroSection from "../components/catalog/catHero";
import FilterBar from "../components/catalog/CatFilter";
import CatalogCards from "../components/catalog/CatalogCards";
import { COLORS, CATALOG_DATA } from "../components/catalog/CatalogData";

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openCard, setOpenCard] = useState(null);

  const handleCardToggle = (title) => {
    setOpenCard((current) => (current === title ? null : title));
  };

  // Filtering Logic
  const filteredTypes = CATALOG_DATA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());

    const isResidualMatch =
      selectedCategory === "Residual" &&
      (item.category === "Residual" || item.category === "General");

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory ||
      isResidualMatch;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box bg={COLORS.bgGray} minH="100vh" w="100%" overflowX="hidden">
      <HeroSection />

      <Container
        maxW="6xl"
        mt={{ base: -10, md: -16 }}
        px={{ base: 4, md: 8 }}
        pb={20}
        position="relative"
        zIndex={2}
      >
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setOpenCard={setOpenCard}
        />

        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          gap={{ base: 4, md: 6 }}
          alignItems="start"
        >
          {filteredTypes.map((waste) => (
            <GridItem key={waste.title}>
              <CatalogCards
                type={waste.title}
                isOpen={openCard === waste.title}
                onToggle={() => handleCardToggle(waste.title)}
              />
            </GridItem>
          ))}
        </Grid>

        {filteredTypes.length === 0 && (
          <Flex direction="column" align="center" py={20} textAlign="center">
            <Icon as={SearchIcon} boxSize={10} color="gray.300" mb={4} />
            <Text fontWeight="bold" color="gray.500" fontSize="lg">
              No items found
            </Text>
            <Text color="gray.400">Try adjusting your search terms or filters.</Text>

            <Button
              mt={4}
              size="sm"
              colorScheme="green"
              bg={COLORS.green}
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </Flex>
        )}
      </Container>
    </Box>
  );
}