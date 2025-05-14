import {
  Box,
  Heading,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import img from '../assets/add-image.svg';
import { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import exifr from 'exifr';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Submit() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleClear = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = null;
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please select a file.");

    setLoading(true); // Show loading

    try {
      // Generate UUID and get file name
      const fileName = file.name;
      const uuid = uuidv4();
      const uploadPath = `Submissions/${uuid}`;

      // Extract EXIF metadata
      const exifData = await exifr.gps(file);
      const createdAt = exifData?.DateTimeOriginal || new Date().toISOString();
      const lat = exifData?.latitude || null;
      const lng = exifData?.longitude || null;

      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('flotector-media')
        .upload(uploadPath, file);

      if (uploadError) throw uploadError;

      // Get image URL from Supabase Storage to insert into the database
      const { data: publicUrlData } = supabase
        .storage
        .from('flotector-media')
        .getPublicUrl(uploadPath);

      const imageUrl = publicUrlData?.publicUrl;

      // Insert metadata into Supabase table
      const { error: insertError } = await supabase
        .from('flotector-data')
        .insert([{
          id: uuid,
          created_at: createdAt,
          uploaded_at: new Date().toISOString(),
          lat,
          lng,
          file_name: fileName,
          image_url: imageUrl,
          result_url: null
        }]);

      if (insertError) throw insertError;

      const backendResponse = await fetch(`http://localhost:5000/process/${uuid}`, {
        method: 'POST'
      });

      if (!backendResponse.ok) throw new Error("Backend processing failed");

      const backendResult = await backendResponse.json();
      console.log("Backend Response:", backendResult);

      handleClear();
      navigate("/results", { state: { uuid } }); // Navigate to results

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check the console for details.");
      setLoading(false); // Remove loading
    }
  };

  if (loading) return <Loading />;

  return (
    <Box mt="72px">
      <VStack spacing={6} w="full" maxW={{ base: "90%", md: "600px" }} mx="auto" textAlign="center">
        <Heading fontSize={{ base:"40px", sm: "50px", md: "60px" }} color="#15A33D" lineHeight="1" mt={7}>
          GET INVOLVED!
        </Heading>

        <Text fontSize={{ base: "16px", sm: "md", md: "lg" }} color="#053774" mt={-5}>
          SPOT WASTE. SNAP IT. SUBMIT IT.
        </Text>
        
        {/* Dropzone */}
        <Box
          w="full"
          border="2px dashed #0D0088"
          borderRadius="2xl"
          pt="50px" pb="50px"
          bg="white"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            ref={inputRef}
            id="fileInput"
            type="file"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleFileChange}
          />

          <Box display="flex" flexDirection="column" alignItems="center" w="full" px={4}>
            {file ? (
              <Box p={1} fontWeight="semibold" fontSize="xs" color="#2457C5"
              border="1px solid #2457C5" w="100%" textAlign="center">
                {file.name}
              </Box>
            ) : (
              <>
                <img src={img} width="36" height="36" alt="upload icon" />
                <Box mt={2} fontWeight="bold" fontSize="2xs" color="#2457C5">
                  Upload your photo here
                </Box>
                <Box fontSize="2xs" color="#2457C5">
                  .png, .jpg up to 50MB
                </Box>
              </>
            )}
          </Box>
        </Box>

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
  );
}
