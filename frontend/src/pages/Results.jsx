import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import WasteCard from "../components/WasteCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Layout from '../components/Layout';

export default function Results() {
  const location = useLocation();
  const { uuid } = location.state || {};

  const [imageUrl, setImageUrl] = useState(null);
  const [classCount, setClassCount] = useState({});
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchResults = async () => {
    try {
      if (!uuid) return;

      const uuidStr = String(uuid);
      const { data: urlData } = supabase
        .storage
        .from("flotector-media")
        .getPublicUrl(`Detections/${uuidStr}-Annotated.jpg`);

      setImageUrl(urlData.publicUrl);

      const { data } = await supabase
        .from("flotector-data")
        .select("class_count")
        .eq("id", uuid)
        .single();

      setClassCount(data.class_count || {});
    } catch (error) {
      console.error("Error loading results:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchResults();
}, [uuid]);


  const classOrder = ["plastic", "paper" ,"metal", "glass", "pile", "textile"];

  const renderWasteCards = () => {
    return classOrder
      .filter(type => {
        const normalizedType = type.toLowerCase().replace(/\s/g, '');
        return Object.keys(classCount).some(key =>
          key.toLowerCase().replace(/\s/g, '').includes(normalizedType)
        );
      })
      .map(type => <WasteCard key={type} type={type} />);
  };

  return (
    <Layout>
    <Flex direction="column" pt="72px" px={4} minH="100vh">
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 8, md: 12 }}
        maxW="1200px"
        mx="auto"
        w="100%"
        align="flex-start"
        mt={5}
      >
        {/* Left Column */}
        <Box w={{ base: "100%", md: "45%" }} textAlign="center" px={{ base: 4, md: 6 }}>
          <Heading fontSize={{ base: "40px", md: "60px" }} color="#15A33D" mb={2} mt={2}>
            ALL DONE!
          </Heading>
          <Text fontSize={{ base: "14px", md: "md" }} color="#053774" mb={4} mt={-2}>
            Thanks for helping keep our waters clean.
          </Text>

          <Box mx="auto" mb={2}>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              <Image
                src={imageUrl}
                alt="FLOATING WASTE DETECTION OUTPUT"
                borderRadius="md"
                mx="auto"
                w={{ base: "100%", md: "120%" }}
                maxW="400px"
              />
            )}
          </Box>
          <Text fontSize="sm" color="black">
            Here's what we found in your image!
          </Text>
        </Box>

        {/* Right Column */}
        <Box
          w={{ base: "100%", md: "55%" }}
          px={{ base: 2, md: 4 }}
          mt={{ base: 0, md: 2 }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            fontSize={{ base: "16px", md: "lg" }}
            mt={{ base: "5px", md: "50px" }}
            mb={{ base: "15px", md: "30px" }}
            textAlign="center"
            color="#053774"
          >
            FLOATING WASTE DETECTED:
          </Heading>
          <SimpleGrid minChildWidth="250px" spacing={4} w="100%" mb={3}>
            {loading ? <Spinner /> : renderWasteCards()}
          </SimpleGrid>
        </Box>
      </Flex>

      {/* Buttons Section */}
      <Flex mt={10} mb={10} justify="center" align="center">
        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/Submit"
            bg="#15A33D"
            color="white"
            fontWeight="bold"
            variant="solid"
            rounded="xl"
            w="150px"
            h="50px"
          >
            UPLOAD AGAIN
          </Button>
          <Button
            as={RouterLink}
            to="/"
            bg="#064CA1"
            color="white"
            fontWeight="bold"
            variant="outline"
            rounded="xl"
            w="150px"
            h="50px"
          >
            HOME
          </Button>
        </HStack>
      </Flex>
    </Flex>
    </Layout>
  );
}
