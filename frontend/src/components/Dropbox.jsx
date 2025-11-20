import { Box } from "@chakra-ui/react";
import img from '../assets/add-image.svg';

const Dropzone = ({ inputRef, file, onFileChange }) => {
  return (
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
        hidden
        onChange={onFileChange}
      />

      <Box display="flex" flexDirection="column" alignItems="center" w="full" px={4}>
        {file ? (
          <Box w="full">
            <Box mb={2} fontWeight="bold" fontSize="xs" color="#2457C5">
              Selected file:
            </Box>
            <Box p={1} fontWeight="semibold" fontSize="xs" color="#2457C5"
              border="1px solid #2457C5" w="100%" textAlign="center">
              {file.name}
            </Box>
          </Box>
        ) : (
          <>
            <img src={img} width="36" height="36" alt="upload icon" />
            <Box mt={2} fontWeight="bold" fontSize="2xs" color="#2457C5">
              Upload your photo here
            </Box>
            <Box fontSize="2xs" color="#2457C5">
              .png, .jpg, .heic up to 50MB
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dropzone;