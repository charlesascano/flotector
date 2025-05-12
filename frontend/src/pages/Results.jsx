import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Stack,
  HStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FaRecycle,
  FaBoxOpen,
  FaSmoking,
  FaCog,
  FaWineBottle,
} from "react-icons/fa";
import { Link as RouterLink} from "react-router-dom";
import WasteCard from "../components/WasteCard";
import img from "../assets/hero-bg.png";

const resultslist = [
  {
    title: "Plastic Bottle",
    icon: FaRecycle,
    description:
      "Plastic bottles harm the environment by polluting oceans and wildlife. Ensure they are empty, clean, and dry before recycling to prevent contamination.",
  },
  {
    title: "Cardboard",
    icon: FaBoxOpen,
    description:
      "Cardboard takes up significant space in landfills and contributes to waste. Flatten and keep it dry before recycling to conserve resources and avoid contamination.",
  },
  {
    title: "Cigarette Butts",
    icon: FaSmoking,
    description:
      "Cigarette butts contain toxic chemicals that pollute water and soil. Dispose of them in designated waste containers to prevent harm to the environment.",
  },
  {
    title: "Metal",
    icon: FaCog,
    description:
      "Metal objects can be recycled, reducing the need for raw materials and energy. Clean and sort metal items before recycling to ensure efficiency.",
  },
  {
    title: "Glass",
    icon: FaWineBottle,
    description:
      "Glass takes thousands of years to break down in landfills. Recycling glass reduces waste and conserves resources. Ensure it is clean and free from contaminants before recycling.",
  },
];

export default function Results() {
  return (
    <Flex direction="column" pt="72px" px={4} minH="100vh">
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 8, md: 12 }}
        maxW="1200px"
        mx="auto"
        w="100%"
        align="flex-start"
        mt={4}
      >
        {/* Left Column */}
        <Box 
          w={{ base: "100%", md: "45%" }}
          textAlign="center"
          px={{ base: 4, md: 6 }}
          >
          <Heading
            fontSize={{ base: "6xl", sm: "52px", md: "64px" }}
            color="#15A33D"
            mb={2}
            mt={2}
          >
            ALL DONE!
          </Heading>
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            color="#053774"
            mb={4}
            mt={-2}
          >
            Thanks for helping keep our waters clean.
          </Text>
          {/* IMAGE OUTPUT PLACEHOLDER */}
          <Box mx="auto" mb={2}>
            <Image
              src={img}
              alt="FLOATING WASTE DETECTION OUTPUT"
              borderRadius="md"
              mx="auto"
              w={{ base: "100%", md: "120%" }}
              maxW="400px"
            />
          </Box>
          <Text fontSize="sm" color="black" mb={2}>
            Here's what we found in your image!
          </Text>
        </Box>

        {/* Right Column */}
        <Box 
          w={{ base: "100%", md: "55%" }}
          px={{ base: 2, md: 4 }}
          mt={{ base: 0, md: 4 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            fontSize={{ base: "12px", sm: "14px", md: "24px" }}
            mb={4}
            textAlign="center"
            color="#053774"
          >
            FLOATING WASTE DETECTED:
          </Heading>
          <SimpleGrid minChildWidth="250px" spacing={4} w="100%">
            {resultslist.map((item, index) => (
              <Box key={index} h="100%">
                <WasteCard
                  title={item.title}
                  icon={item.icon}
                  description={item.description}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Buttons Section */}
      <Flex mt={4} mb={8} justify="center" align="center">
        <HStack spacing={4}>
          <Button 
            as={RouterLink}
            to="/Submit"
            bg="#15A33D" 
            color="white" 
            fontWeight="bold" 
            variant="solid" 
            rounded="xl">
            UPLOAD ANOTHER
          </Button>
          <Button
            as={RouterLink}
            to="/" 
            bg="#064CA1" 
            color="white" 
            fontWeight="bold" 
            variant="outline" 
            rounded="xl">
            DOCK AT HOME
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}
