import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

export default function OpenData() {
  const [flotectorData, setFlotectorData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('flotector-data')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        // Fetch location names for each entry
        const dataWithLocations = await Promise.all(
          data.map(async (entry) => {
            const location = await getLocationName(entry.lat, entry.lng);
            return { ...entry, location };
          })
        );
        setFlotectorData(dataWithLocations);
      }
    }

    fetchData();
  }, []);

  async function getLocationName(lat, lng) {
    const API_KEY = "AIzaSyAGZSYlxM6plLsSAI2lsXpYlw-ZvxMPvTk";
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const result = data.results[0];
      return result ? result.formatted_address : "Unknown location";
    } catch (err) {
      console.error("Google reverse geocoding error:", err);
      return "Unknown location";
    }
  }

  return (
    <Layout>
    <Box mt="72px">
      <Flex textAlign="center">
        <Box pt={8} pb={3}>
          <Heading
            fontSize={{ base: "40px", sm: "50px", md: "60px" }}
            color="#15A33D">
            OPEN DATA
          </Heading>
          <Text
            fontSize={{ base: "16px", sm: "md", md: "lg" }}
            color="#053774" mt={-0.5}>
            ALL UPLOADS ({flotectorData.length})
          </Text>

          <Box w="100vw" overflowX="auto" p={5}>
            <Table variant="simple" size="sm" w="100%"
              sx={{
                th: { border: "1px solid", borderColor: "gray.300", bgColor: "#15A33D", textColor: "white", p: 3 },
                td: { border: "1px solid", borderColor: "gray.300", p: 3 },
                "tr:nth-of-type(even)": { bg: "gray.100" },
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
                {flotectorData.map((entry, index) => (
                  <Tr key={index}>
                    <Td>{Object.keys(entry.class_count || {}).join(', ')}</Td>
                    <Td>{new Date(entry.uploaded_at).toLocaleDateString()}</Td>
                    <Td>{entry.location}</Td>
                    <Td>
                      <Link href={entry.result_url} isExternal color="teal.500">
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
    </Layout>
  );
}
