import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const RecentSubmissions = () => {
  const [recentData, setRecentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const location = useLocation();

  useEffect(() => {
    const fetchRecentData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/data?page=1&limit=5");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        setRecentData(result.data);
      } catch (error) {
        toast({
          title: "Error fetching recent data",
          description: error.message || "Could not fetch data.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentData();
  }, [toast]);

  const formatClassCount = (classCount) =>
    !classCount || Object.keys(classCount).length === 0
      ? "None"
      : Object.entries(classCount)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

  const formatLocation = (lat, lng) =>
    lat == null || lng == null
      ? "No location"
      : `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;

  const textStyles = {
    fontSize: "calc(8px + 0.5vw)",
  };

  const headerText = {
    fontSize: "calc(6px + 1vw)",
    letterSpacing: "0px",
    textAlign: "center",
  };

  const headerCell = {
    border: "1px solid",
    borderColor: "gray.300",
    bgColor: "#15A33D",
    textColor: "white",
    p: 3,
    sx: headerText,
  };

  const cell = {
    border: "1px solid",
    borderColor: "gray.300",
    p: { base: 1, md: 3 },
    sx: textStyles,
  };

  return (
    <Box
      w="100%"
      p={{ base: 4, md: 8 }}
      bg="#F6F6F6"
      borderRadius="20px"
      borderBottom="1px solid #C2C2C2"
    >
      <Flex direction="column">
        <Heading
          color="#053774"
          fontWeight="700"
          mb={2}
          fontSize={{ base: "2xl", sm: "3xl", md: "40px" }}
        >
          Recent Submissions
        </Heading>

        <Text color="gray.600" mb={6} fontSize={{ base: "sm", md: "md" }}>
          A quick look at the top 5 most recent waste submissions from all users.
        </Text>

        <Box w="100%" maxW="100vw" p={{ base: 1, md: 5 }}>
          <Table variant="simple" size="sm" w="100%" sx={{ tableLayout: "fixed" }}>
            <Thead>
              <Tr>
                <Th width="30%" {...headerCell}>
                  Detected Wastes
                </Th>
                <Th width="20%" {...headerCell}>
                  Date
                </Th>
                <Th width="25%" {...headerCell}>
                  Location
                </Th>
                <Th width="25%" {...headerCell}>
                  Results
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    <Spinner size="xl" color="green.500" my={4} />
                    <Text>Loading Recent Submissions...</Text>
                  </Td>
                </Tr>
              ) : recentData.length === 0 ? (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    <Text fontWeight="medium" color="gray.600" my={4}>
                      No recent submissions found.
                    </Text>
                  </Td>
                </Tr>
              ) : (
                recentData.map((entry, index) => (
                  <Tr key={entry.id} bg={index % 2 ? "gray.100" : "white"}>
                    <Td {...cell} whiteSpace="normal" wordBreak="break-word">
                      {formatClassCount(entry.class_count)}
                    </Td>
                    <Td {...cell} whiteSpace="normal" textAlign="right">
                      {new Date(entry.uploaded_at).toLocaleDateString()}
                    </Td>
                    <Td {...cell} whiteSpace="normal">
                      {`${entry.barangay}, ${entry.city}`}
                    </Td>
                    <Td {...cell} textAlign="center">
                      <Text
                        as={RouterLink}
                        to={`/results/${entry.id}`}
                        state={{ background: location }}
                        color="teal.500"
                      >
                        View Results
                      </Text>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
};

export default RecentSubmissions;