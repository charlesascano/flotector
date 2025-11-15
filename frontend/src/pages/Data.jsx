import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex, Heading, Text, Button, HStack, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';

export default function OpenData() {
  const [flotectorData, setFlotectorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const toast = useToast(); // Initialize the toast hook
  
  const LIMIT = 10; // Number of items per page

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch from your new backend endpoint
        const response = await fetch(
          `http://localhost:5000/api/data?page=${currentPage}&limit=${LIMIT}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        setFlotectorData(result.data);
        setTotalCount(result.totalCount);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Toast error notification
        toast({
          title: "Error fetching data",
          description: error.message || "Could not fetch data from the server.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      }
    }

    fetchData();
  }, [currentPage, toast]); // Add toast to dependency array

  // Helper function to format the class_count object
  const formatClassCount = (classCount) => {
    if (!classCount || Object.keys(classCount).length === 0) {
      return "None";
    }
    return Object.entries(classCount)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  // Helper function to format lat/lng
  const formatLocation = (lat, lng) => {
    if (lat == null || lng == null) {
      return "No location";
    }
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
  };

  const totalPages = Math.ceil(totalCount / LIMIT);

  // --- PAGINATION RENDER LOGIC ---
  const renderPageNumbers = () => {
    const pageButtons = [];

    // Case 1: Total pages 5 or less
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            variant={currentPage === i ? 'solid' : 'outline'}
            bg={currentPage === i ? '#15A33D' : 'transparent'}
            color={currentPage === i ? 'white' : 'gray.700'}
            _hover={{ bg: currentPage === i ? '#129836' : '#E2E8F0' }}
          >
            {i}
          </Button>
        );
      }
      return pageButtons;
    }

    // Case 2: Total pages more than 5 (truncated style)
    const pagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    // Adjust if we are near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      pageButtons.push(
        <Button key={1} onClick={() => setCurrentPage(1)} variant="outline">
          1
        </Button>
      );
    }
    
    // Show ellipsis if there's a gap
    if (startPage > 2) {
      pageButtons.push(<Text key="start-ellipsis">...</Text>);
    }

    // Show the dynamic window of pages
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          variant={currentPage === i ? 'solid' : 'outline'}
          bg={currentPage === i ? '#15A33D' : 'transparent'}
          color={currentPage === i ? 'white' : 'gray.700'}
          _hover={{ bg: currentPage === i ? '#129836' : '#E2E8F0' }}
        >
          {i}
        </Button>
      );
    }

    // Show ellipsis if there's a gap
    if (endPage < totalPages - 1) {
      pageButtons.push(<Text key="end-ellipsis">...</Text>);
    }
    
    // Always show last page
    if (endPage < totalPages) {
      pageButtons.push(
        <Button key={totalPages} onClick={() => setCurrentPage(totalPages)} variant="outline">
          {totalPages}
        </Button>
      );
    }

    return pageButtons;
  };
  // --- END NEW PAGINATION LOGIC ---

  return (
    <Layout>
    <Box>
      <Flex textAlign="center" direction="column">
        <Box pt={8} pb={3}>
          <Heading fontSize={{ base: "40px", sm: "50px", md: "60px" }} color="#15A33D">
            OPEN DATA
          </Heading>
          <Text fontSize={{ base: "16px", sm: "md", md: "lg" }} color="#053774" mt={-0.5}>
            ALL SUBMISSIONS ({totalCount})
          </Text>

          <Box w="100vw" overflowX="auto" p={5}>
            <Table
              variant="simple"
              size="sm"
              w="100%"
              sx={{
                th: { border: "1px solid", borderColor: "gray.300", bgColor: "#15A33D", textColor: "white", p: 3 },
                td: { border: "1px solid", borderColor: "gray.300", p: 3 },
                "tr:nth-of-type(even)": { bg: "gray.100" },
              }}
            >
              <Thead>
                <Tr>
                  <Th>Detected Wastes</Th>
                  <Th>Date</Th>
                  <Th>Location</Th>
                  <Th>Results</Th>
                </Tr>
              </Thead>
              <Tbody>
                {flotectorData.map((entry) => (
                  <Tr key={entry.id}>
                    <Td>{formatClassCount(entry.class_count)}</Td>
                    <Td>{new Date(entry.uploaded_at).toLocaleDateString()}</Td>
                    <Td>{formatLocation(entry.lat, entry.lng)}</Td>
                    <Td>
                      <Text as={RouterLink} to={`/results/${entry.id}`} color="teal.500" fontWeight="bold">
                        View Results
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* --- PAGINATION UI --- */}
          <Flex justify="center" align="center" mt={4} pb={8}>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              mr={2}
            >
              Previous
            </Button>
            <HStack>
              {renderPageNumbers()}
            </HStack>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages || totalCount === 0}
              ml={2}
            >
              Next
            </Button>
          </Flex>
          {/* --- END PAGINATION UI --- */}

        </Box>
      </Flex>
    </Box>
    </Layout>
  );
}