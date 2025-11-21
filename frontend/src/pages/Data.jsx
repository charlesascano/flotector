import { useEffect, useState } from 'react';
import { 
  Table, Thead, Tbody, Tr, Th, Td, 
  Box, Flex, Heading, Text, Button, 
  useToast, Menu, MenuButton, MenuList, MenuItem, IconButton,
  VStack, Stack, Divider, Badge 
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, ExternalLinkIcon } from '@chakra-ui/icons';
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
    py: "calc(4px + 0.5vw)",
    border: "1px solid",
    borderColor: "gray.100"
  }

  const headerText = {
    fontSize: {base: "calc(10px + 1vw)", lg: "calc(10px + 0.5vw)"},
    letterSpacing: "0px",
    textAlign: "center",
    py: "calc(2px + 0.5vw)",
    border: "1px solid",
    borderColor: "#15A33D",
    bgColor: "#15A33D",
    textColor: "white" 
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

        <Box w="100%" maxW="100vw" p={{ base: 2, md: 5 }}>
          
          {/* --- DESKTOP VIEW (TABLE) --- */}
          <Box display={{ base: "none", md: "block" }}>
            <Table
              variant="simple"
              size={{base: "md", lg: "lg"}}
              w="100%"
              sx={{ tableLayout: "fixed" }}
            >
              <Thead>
                <Tr>
                  <Th width="30%" sx={headerText}>Detected Wastes</Th>
                  <Th width="20%" sx={headerText}>Upload Date</Th>
                  <Th width="25%" sx={headerText}>Location</Th>
                  <Th width="25%" sx={headerText}>Results</Th>
                </Tr>
              </Thead>
              <Tbody>
                {flotectorData.map((entry) => (
                  <Tr key={entry.id} bg="even:gray.100">
                    <Td sx={textStyles} whiteSpace="normal" wordBreak="break-word">
                        {formatClassCount(entry.class_count)}
                    </Td>
                    <Td sx={textStyles} whiteSpace="normal" textAlign={"right"}>
                        {new Date(entry.uploaded_at).toLocaleDateString()}
                    </Td>
                    <Td sx={textStyles} whiteSpace="normal">
                        {`${entry.barangay}, ${entry.city}`}
                    </Td>
                    <Td sx={textStyles} textAlign={"center"}>
                      <Text
                        as={RouterLink}
                        to={`/results/${entry.id}`}
                        state={{ background: location }}
                        color="teal.500"
                        fontWeight="bold"
                      >
                        View Results
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* --- MOBILE VIEW (CARDS) --- */}
          <Box display={{ base: "block", md: "none" }} textAlign="left">
            <VStack spacing={4} align="stretch">
              {flotectorData.map((entry) => (
                <Box 
                  key={entry.id} 
                  borderWidth="1px" 
                  borderRadius="lg" 
                  overflow="hidden" 
                  p={4} 
                  boxShadow="sm"
                  bg="white"
                  borderColor="#15A33D"
                >
                  <Flex justifyContent="space-between" alignItems="center" mb={2}>
                    <Badge colorScheme="green" fontSize="0.8em" px={3} py={1} borderRadius={8}>
                      {new Date(entry.uploaded_at).toLocaleDateString()}
                    </Badge>
                    <Text fontSize="xs" color="gray.500">
                      {entry.city}
                    </Text>
                  </Flex>
                  
                  <Divider mb={2} />

                  <Box mb={3}>
                    <Text fontWeight="bold" fontSize="sm" color="#053774">Detected Wastes:</Text>
                    <Text fontSize="sm" pl={2}>
                      {formatClassCount(entry.class_count)}
                    </Text>
                  </Box>

                  <Box mb={4}>
                    <Text fontWeight="bold" fontSize="sm" color="#053774">Location:</Text>
                    <Text fontSize="sm" pl={2}>
                      {`${entry.barangay}, ${entry.city}`}
                    </Text>
                  </Box>

                  <Button 
                    as={RouterLink}
                    to={`/results/${entry.id}`}
                    state={{ background: location }}
                    size="sm"
                    width="100%"
                    colorScheme="teal"
                    variant="outline"
                    _hover={{cursor: "pointer"}}
                  >
                    View Results
                  </Button>
                </Box>
              ))}
            </VStack>
          </Box>

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