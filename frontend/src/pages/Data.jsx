import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'

const detectionData = [
  {
    tags: ['plastic', 'bottle'],
    date: '2025-05-08',
    location: 'Manila Bay, PH',
    imageUrl: 'https://qgfkmpqawsqbiljkeqij.supabase.co/storage/v1/object/sign/flotector-media/Detections/hero-bg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzM4NDEzOTYwLTA1YmEtNDQ4MS04NmIyLTNlNmIxZDc4NGNiMCJ9.eyJ1cmwiOiJmbG90ZWN0b3ItbWVkaWEvRGV0ZWN0aW9ucy9oZXJvLWJnLnBuZyIsImlhdCI6MTc0Njg3NTczNiwiZXhwIjoxNzc4NDExNzM2fQ.LLmZFUo0xV5chVl5sB9aR_rtqquofBWLcYjANG44ywY',
  },
  {
    tags: ['styrofoam', 'wrapper'],
    date: '2025-05-07',
    location: 'Jakarta Harbor, ID',
    imageUrl: 'https://your-supabase-url/path/to/image2.jpg',
  },
  {
    tags: ['styrofoam', 'wrapper'],
    date: '2025-05-07',
    location: 'Jakarta Harbor, ID',
    imageUrl: 'https://your-supabase-url/path/to/image2.jpg',
  },
  // Add more entries...
]

export default function OpenData() {
  return (
    <>
      <Box mt="72px">
        <Flex textAlign="center">
          <Box pt={5} pb={3}>
            <Heading
            fontSize={{ base:"40px", sm: "50px", md: "60px" }} 
            color="#15A33D">
              OPEN DATA
            </Heading>
            <Text
            fontSize={{ base: "16px", sm: "md", md: "lg" }}
            color="#053774" mt={-0.5}>
              ALL UPLOADS (69)
            </Text>
            
            <Box w="100vw" overflowX="auto" p={5}>
              <Table variant="simple" size="sm" w="100%"
                sx={{
                  th: { border: "1px solid", borderColor: "gray.300", bgColor: "#15A33D", textColor: "white", p: 3},
                  td: { border: "1px solid", borderColor: "gray.300", p: 3},
                  "tr:nth-child(even)": { bg: "gray.100" },
                }}>
                <Thead>
                  <Tr>
                    <Th>Detected Tags</Th>
                    <Th>Date</Th>
                    <Th>Location</Th>
                    <Th>Image URL</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {detectionData.map((entry, index) => (
                    <Tr key={index}>
                      <Td>{entry.tags.join(', ')}</Td>
                      <Td>{entry.date}</Td>
                      <Td>{entry.location}</Td>
                      <Td>
                        <Link href={entry.imageUrl} isExternal color="teal.500">
                          View Image
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
         </Box>
        </Flex>
      </Box>
    </>
  );
}