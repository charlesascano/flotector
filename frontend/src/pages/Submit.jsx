import {
  Box,
  Flex,
  Heading,
  Button,
  Center,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import FileUpload from "../components/FileUpload";

const Submission = () => {
  
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
    toast({
      title: 'Submitted!',
      description: 'Thank you for your report.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt="72px">
    <Center minH="40px" pt={{ base: "100px", md: "20px" }} bg="gray.50" p={4}>
      <VStack spacing={6} w="full" maxW={{ base: "90%", md: "600px" }} mx="auto" textAlign="center">
        
        <Heading as="h1" fontSize={{ base:"43px", sm: "43px", md: "64px" }} color="#15A33D">GET INVOLVED!</Heading>
        
        <Text
        fontSize={{ base: "16px", sm: "md", md: "lg" }}
        color="#053774" mt={-8}
        >
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
            {/* Upload from device */}
            <FileUpload onFileSelect={(file) => console.log("Uploaded file:", file)} />

            {/* Capture from camera */}
            <FileUpload
              onFileSelect={(file) => console.log("Camera file:", file)}
              camera
            />
          </HStack>
        </Box>

        {/* Clear Btn */}
        <Button
          mt={-4}
          alignSelf="flex-end"
          size="sm"
          colorScheme="red"
          onClick={handleClear}
        >
          CLEAR
        </Button>

        
        <Text fontSize={{ base: "xs", sm: "sm", md: "md" }}
          color="#053774"
          px={2}>
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
          _hover={{ bg: '#128B34' }}
        >
          SUBMIT NOW!
        </Button>
      </VStack>
    </Center>
    </Box>
  );
};

export default Submission;