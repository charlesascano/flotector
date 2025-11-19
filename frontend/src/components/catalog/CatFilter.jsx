import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { COLORS, CATEGORIES } from "./CatalogData";

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  setOpenCard,
}) {
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setOpenCard(null);
  };

  return (
    <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="2xl" shadow="lg" mb={8}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 4, lg: 6 }}
        justify="space-between"
        align="center"
      >
        {/* Mobile Dropdown */}
        <Box w="100%" display={{ base: "block", md: "none" }}>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={1} ml={1}>
            FILTER BY CATEGORY
          </Text>

          <Menu matchWidth>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              w="100%"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              fontWeight="bold"
              fontSize="sm"
              color={COLORS.darkBlue}
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.100" }}
            >
              {selectedCategory}
            </MenuButton>

            <MenuList p={1} boxShadow="lg" borderRadius="lg" borderColor="gray.200">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <MenuItem
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    fontSize="sm"
                    fontWeight={isSelected ? "bold" : "normal"}
                    bg={isSelected ? COLORS.darkBlue : "transparent"}
                    color={isSelected ? "white" : "gray.600"}
                    borderRadius="md"
                    _hover={{ bg: isSelected ? COLORS.darkBlue : "gray.100" }}
                  >
                    {cat}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Box>

        {/* Desktop Buttons */}
        <Box display={{ base: "none", md: "block" }}>
          <HStack spacing={2}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Button
                  key={cat}
                  size="sm"
                  borderRadius="lg"
                  px={{ base: 4, md: 6 }}
                  bg={isSelected ? COLORS.darkBlue : "gray.100"}
                  color={isSelected ? "white" : "gray.600"}
                  fontWeight="bold"
                  fontSize="sm"
                  onClick={() => handleCategoryChange(cat)}
                  _hover={{ bg: isSelected ? COLORS.darkBlue : "gray.200" }}
                >
                  {cat}
                </Button>
              );
            })}
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}
