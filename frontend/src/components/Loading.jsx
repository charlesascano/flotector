// components/LoadingOverlay.jsx
import { Box, Spinner, Heading, Text, Skeleton } from "@chakra-ui/react";

const Loading = ({ 
    heading = "Making Waves...", 
    message = "Hang tight! We're navigating through the waves to your next destination!", 
    showSkeleton = true 
  }) => (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="rgba(255, 255, 255, 0.9)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Spinner size="xl" color="#053774" thickness="8px" />
      <Heading mt={4} fontSize={{ base: "36px", sm: "36px", md: "48px" }} color="#053774">
        {heading}
      </Heading>
      <Text fontSize={{ base: "12px", sm: "12px", md: "16px" }} color="#053774" fontWeight="medium" fontStyle="italic" align="center" mx="12">
        {message}
      </Text>
      {showSkeleton && (
        <Skeleton
          mt={4}
          width="100%"
          maxW="300px"
          height="20px"
          borderRadius="md"
          startColor="#053774"
          endColor="#128B34"
        />
      )}
    </Box>
  );

export default Loading;
