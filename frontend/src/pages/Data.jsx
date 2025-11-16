import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex, Heading, Text, Button, useToast, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';

export default function OpenData() {
  const [flotectorData, setFlotectorData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const toast = useToast();
  const location = useLocation();
  
  const LIMIT = 10; // Entry limit per page
  const totalPages = Math.ceil(totalCount / LIMIT);

  const textStyles = {
    fontSize: "calc(8px + 0.5vw)",
  }
  const headerText = {
    fontSize: "calc(6px + 1vw)",
    letterSpacing: "0px",
    textAlign: "center"
  }

  useEffect(() => {
    async function fetchData() {
      try {
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
  }, [currentPage, toast]);

  const formatClassCount = (classCount) => {
    if (!classCount || Object.keys(classCount).length === 0) {
      return "None";
    }
    return Object.entries(classCount)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  const formatLocation = (lat, lng) => {
    if (lat == null || lng == null) {
      return "No location";
    }
    return `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
  };

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

          <Box w="100%" maxW="100vw" p={{ base: 1, md: 5 }}>
            <Table
              variant="simple"
              size="sm"
              w="100%"
              sx={{ tableLayout: "fixed" }} 
            >
              <Thead>
                <Tr>
                  <Th width="30%" border="1px solid" borderColor="gray.300" bgColor="#15A33D" textColor="white" sx={headerText}>
                    Detected Wastes
                  </Th>
                  <Th width="20%" border="1px solid" borderColor="gray.300" bgColor="#15A33D" textColor="white" sx={headerText}>
                    Date
                  </Th>
                  <Th width="25%" border="1px solid" borderColor="gray.300" bgColor="#15A33D" textColor="white" sx={headerText}>
                    Location
                  </Th>
                  <Th width="25%" border="1px solid" borderColor="gray.300" bgColor="#15A33D" textColor="white" sx={headerText}>
                    Results
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {flotectorData.map((entry) => (
                  <Tr key={entry.id} bg="even:gray.100">
                    <Td 
                        border="1px solid" 
                        borderColor="gray.300" 
                        sx={textStyles}
                        whiteSpace="normal" 
                        wordBreak="break-word"
                    >
                        {formatClassCount(entry.class_count)}
                    </Td>
                    <Td border="1px solid" borderColor="gray.300" sx={textStyles} whiteSpace="normal" textAlign={"right"}>
                        {new Date(entry.uploaded_at).toLocaleDateString()}
                    </Td>
                    <Td border="1px solid" borderColor="gray.300" sx={textStyles} whiteSpace="normal">
                        {formatLocation(entry.lat, entry.lng)}
                    </Td>
                    <Td border="1px solid" borderColor="gray.300" sx={textStyles} textAlign={"center"}>
                      <Text
                        as={RouterLink}
                        to={`/results/${entry.id}`}
                        state={{ background: location }}
                        color="teal.500"
                        // fontSize={{ base: "xs", md: "md" }}
                      >
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
              
              {/* Previous Button */}
              <IconButton
                  icon={<ArrowBackIcon />}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  isDisabled={currentPage === 1}
                  aria-label="Previous Page"
                  variant="outline"
                  mr={2}
              />

              {/* Page Selector Dropdown */}
              <Menu>
                <MenuButton 
                  as={Button}
                  variant="outline"
                  minW="120px"
                >
                  Page {currentPage} of {totalPages}
                </MenuButton>
                <MenuList maxH="200px" overflowY="auto">
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                    <MenuItem 
                      key={page} 
                      onClick={() => setCurrentPage(page)}
                      bg={currentPage === page ? 'gray.100' : 'transparent'}
                      fontWeight={currentPage === page ? 'bold' : 'normal'}
                    >
                      Page {page}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              {/* Next Button */}
              <IconButton
                  icon={<ArrowForwardIcon />}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  isDisabled={currentPage === totalPages || totalCount === 0}
                  aria-label="Next Page"
                  variant="outline"
                  ml={2}
              />
          </Flex>
          {/* --- END PAGINATION UI --- */}

        </Box>
      </Flex>
    </Box>
    </Layout>
  );
}