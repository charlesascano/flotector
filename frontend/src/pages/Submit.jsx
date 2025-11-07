import { Box, Heading, Button, Text, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import exifr from 'exifr';
import Dropbox from '../components/Dropbox';
import Loading from "../components/Loading";
import Layout from '../components/Layout';

export default function Submit() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleClear = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = null;
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select an image file to submit.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return; // Stop the function if no file
    }

    setLoading(true); // Show loading

    try {
      // 1. Extract EXIF metadata
      const exifData = await exifr.parse(file, { gps: true });
      const lat = exifData?.latitude || null;
      const lng = exifData?.longitude || null;
      const createdAt = exifData?.DateTimeOriginal?.toISOString() || null;

      // Handle error if no GPS data
      if (!lat || !lng) {
        throw new Error("Image has no location data. Please turn on location tags in your device's camera settings.");
      }
      
      // Handle error if no date
      if (!createdAt) {
        throw new Error("Image has no creation date. Please ensure your device's date and time are set correctly.");
      }
      
      // 2. Create FormData to send file and metadata to backend
      const formData = new FormData();
      formData.append('file', file);
      formData.append('createdAt', createdAt);
      formData.append('lat', lat);
      formData.append('lng', lng);
      formData.append('fileName', file.name);

      // 3. Send FormData to the backend
      const response = await fetch(`http://localhost:5000/api/submit`, {
        method: 'POST',
        body: formData, 
      });

      // Handle backend logic errors
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `Server responded with status: ${response.status}`);
      }

      // 4. Get final results from the backend
      const result = await response.json();
      const newUuid = result.uuid;

      // 5. Navigate to results page with UUID of the submission
      handleClear();
      toast({
        title: "Upload Successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate(`/results/${newUuid}`);

    } catch (err) {
      console.error("Upload failed:", err); 
      
      let errorMessage = err.message;

      // Handle network errors (cannot reach backend server)
      if (err instanceof TypeError) {
        errorMessage = "Network error: Could not reach the server. Please check your connection.";
      }
      
      // Toast for errors
      toast({
        title: "Upload Failed",
        description: errorMessage,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false); // Hide loading screen
    }
  };

  if (loading) return <Loading />;

  return (
    <Layout>
    <Box mt="72px" mb="100px">
      <VStack spacing={6} w="full" maxW={{ base: "90%", md: "600px" }} mx="auto" textAlign="center">
        <Heading fontSize={{ base:"40px", sm: "50px", md: "60px" }} color="#15A33D" lineHeight="1" mt={10}>
          GET INVOLVED!
        </Heading>

        <Text fontSize={{ base: "16px", sm: "md", md: "lg" }} color="#053774" mt={-5}>
          SPOT WASTE. SNAP IT. SUBMIT IT.
        </Text>
        
        {/* Dropzone */}
        <Dropbox
          inputRef={inputRef}
          file={file}
          onFileChange={handleFileChange}
        />

        {/* Clear Btn */}
        <Button
          mt={-4}
          alignSelf="flex-end"
          size="sm"
          bg="#C33737"
          color="white"
          onClick={handleClear}
        >
          CLEAR
        </Button>

        <Text fontSize={{ base: "xs", sm: "sm", md: "md" }}
          color="#053774"
          px={2}>
          Your photo drives real action — upload your sighting of floating waste
          in waterways now and make a difference.
        </Text>
        
        {/* Submit Btn */}
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
    </Box>
    </Layout>
  );
}