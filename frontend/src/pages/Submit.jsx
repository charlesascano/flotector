import {
  Box,
  Heading,
  Button,
  Center,
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import FileUpload from "../components/FileUpload";
import Loading from "../components/Loading";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';


const Submission = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a photo before submitting.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Start loading
    setIsLoading(true);

    // Simulate a process
    setTimeout(() => {
      setIsLoading(false); // Hide overlay
      navigate('/results', {
        state: { filename: file.name }, // Pass filename via state
      });
      setFile(null);
    }, 1000); // Simulated delay
  };

  return (
    <Layout>
      <Box pt="72px" position="relative">
        {/* Loading Overlay */}
        {isLoading && (
            <Loading
              heading="Almost there!"
              message="We're diving into your image to spot any floating waste and will have results for you in just a moment!"
            />
        )}

        {/* Main UI */}
        <Center minH="40px" pt={{ base: "100px", md: "20px" }} bg="gray.50" p={4}>
          <VStack spacing={6} w="full" maxW={{ base: "90%", md: "600px" }} mx="auto" textAlign="center">
            <Heading as="h1" fontSize={{ base: "40px", sm: "43px", md: "64px" }} color="#15A33D">
              GET INVOLVED!
            </Heading>

            <Text fontSize={{ base: "16px", sm: "md", md: "lg" }}fontWeight="medium" color="#053774" mt={-8}>
              SPOT WASTE. SNAP IT. REPORT IT.
            </Text>

            {/* Dropzone */}
            <Box
              w="full"
              border="2px dashed #0D0088"
              borderRadius="md"
              p={8}
              bg="white"
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <HStack spacing={4}>
                <FileUpload onFileSelect={(f) => setFile(f)} />
                <FileUpload onFileSelect={(f) => setFile(f)} camera />
              </HStack>
            </Box>

            <Button mt={-4} alignSelf="flex-end" size="sm" colorScheme="red" onClick={handleClear}>
              CLEAR
            </Button>

            <Text fontSize={{ base: "xs", sm: "sm", md: "md" }} color="#053774" px={2} align="center">
              Your photo drives real action—upload your sighting of floating waste
              in waterways now and make a difference.
            </Text>

            <Button
              color="white"
              w="204px"
              h="65px"
              bg="#15A33D"
              fontSize="24px"
              fontWeight="bold"
              onClick={handleSubmit}
              _hover={{ bg: "#128B34" }}
            >
              SUBMIT NOW!
            </Button>
          </VStack>
        </Center>
      </Box>
    </Layout>  
  );
};

export default Submission;
