import { Box, Image, Text, VStack, Stack, Center } from "@chakra-ui/react";
import img from "../assets/add-image.svg";
import { useEffect, useState } from "react";

const Dropbox = ({ inputRef, file, onFileChange}) => {
  const [preview, setPreview] = useState(null);

  // Generate preview URL
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const units = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
  };

// Helper to check if the file is actually an image
  const isImage = file && file.type.startsWith("image/");

  return (
    <Box
      w="full"
      h={{ base: "auto", md: "200px" }}
      py={{ base: 6, md: 0 }}
      border="2px dashed"
      borderColor={file ? "blue.400" : "#0D0088"}
      borderRadius="2xl"
      bg={file ? "blue.50" : "white"}
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      onClick={() => inputRef.current?.click()}
      transition="0.2s"
      _hover={{ borderColor: "blue.500", bg: file ? "blue.100" : "gray.50" }}
      overflow="hidden"
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        id="fileInput"
        type="file"
        hidden
        onChange={onFileChange}
      />

      {/* FILE PREVIEW */}
      {file ? (
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 4, md: 6 }}
          w="full"
          px={{ base: 4, md: 6 }}
          align="center"
        >
          {/* Thumbnail */}
          <Box
            boxSize={{ base: "100px", md: "80px" }}
            borderRadius="md"
            overflow="hidden"
            bg="white"
            flexShrink={0}
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.200"
          >
            {isImage ? (
              /* Show Image if it is an image */
              <Image src={preview} objectFit="cover" w="full" h="full" />
            ) : (
              /* Generic Placeholder if other file type */
              <Center w="full" h="full" bg="gray.100" flexDirection="column">
                <Text fontSize="xs" fontWeight="bold" color="gray.500">
                  FILE
                </Text>
                <Text fontSize="xs" color="gray.400">
                  {file.name.split('.').pop().toUpperCase()}
                </Text>
              </Center>
            )}
          </Box>

          {/* File Details */}
          <VStack
            align={{ base: "center", md: "start" }}
            textAlign={{ base: "center", md: "left" }}
            flex={1}
            spacing={0}
            w="full"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", md: "sm" }}
              color="#2457C5"
              noOfLines={2}
              wordBreak="break-word"
            >
              {file.name}
            </Text>

            <Text fontSize="xs" color="gray.500">
              {formatFileSize(file.size)}
            </Text>
          </VStack>
        </Stack>
      ) : (
        /* EMPTY STATE */
        <VStack spacing={2} px={4}>
          <Image src={img} boxSize="42px" alt="upload icon" />
          <Text fontWeight="bold" fontSize="sm" color="#2457C5">
            Upload your photo here
          </Text>
          <Text fontSize="xs" color="gray.500">
            .png, .jpg, .heic up to 50MB
          </Text>
        </VStack>
      )}
    </Box>
  );
};

export default Dropbox;
