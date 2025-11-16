import {  Box, Flex, Text, Image, Heading, HStack, Button,  SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WasteCard from "../components/WasteCard";
import Layout from '../components/Layout';

export default function Results() {
  const { uuid } = useParams();

  const [imageUrl, setImageUrl] = useState(null);
  const [classCount, setClassCount] = useState({});
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!uuid) {
          throw new Error("No submission ID provided.");
        }

        // Fetch data from backend
        const response = await fetch(`http://72.60.194.14/api/results/${uuid}`);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Failed to fetch results from server.");
        }

        const data = await response.json();

        // Set results state with the data from backend
        setImageUrl(data.result_url);
        setClassCount(data.class_count || {});

      } catch (error) {
        console.error("Error loading results:", error.message);
        toast({
          title: "Error loading results",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [uuid, toast]);


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
        <Box w={{ base: "100%", md: "45%" }} display={"flex"} textAlign={"center"} alignItems={"center"} flexDirection={"column"} px={{ base: 4, md: 6 }}>
          <Heading fontSize={{ base: "40px", md: "calc(40px + 1.5vw)" }} color="#15A33D" mb={2} mt={2} whiteSpace={"nowrap"}>
            ALL DONE!
          </Heading>
          <Text fontSize={{ base: "14px", md: "calc(14px + 0.1vw)" }} color="#053774" mb={4} mt={-2}>
            Thanks for helping keep our waters clean.
          </Text>

          <Box mx="auto" mb={2} minH="200px" display="flex" alignItems="center" justifyContent="center">
            {loading ? (
              <Spinner size="xl" color="#15A33D" mx="auto" />
            ) : (
              <Image
                src={imageUrl}
                alt="FLOATING WASTE DETECTION OUTPUT"
                borderRadius="md"
                mx="auto"
                w={{ base: "100%", md: "120%" }}
                maxW="400px"
                fallback={<Spinner size="xl" color="#15A33D" />}
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
          flexShrink={0}
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
          <SimpleGrid spacing={4} w="100%" mb={3} justifyItems={"center"}>
            {loading ? (
              <Spinner size="xl" color="#064CA1" mx="auto" />
            ) : (
              renderWasteCards()
            )}
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