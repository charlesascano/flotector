import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Heading,
} from '@chakra-ui/react';

/* ---------------- Colors ---------------- */
const COLOR_SELECTED = '#15A33D';
const COLOR_LIGHT = '#A3A3A3';
const COLOR_DARK = '#5D5D5D';

/* ---------------- Barangay List Styles ---------------- */
const brgyHeader = {
  fontSize: { base: "calc(10px + 1vw)", md: "calc(14px + 0.5vw)" },
  fontWeight: 700,
  textTransform: 'uppercase',
  as: 'span'
};

const brgyTable = {
  fontSize: { base: "calc(6px + 1vw)", md: "calc(8px + 0.5vw)" }
};

/* ---------------- Barangay List Component ---------------- */
function TopBarangayList({ city }) {
  // 1. Safety Check: If no nested barangays, show placeholder
  if (!city.topBarangays || city.topBarangays.length === 0) {
    return (
      <Box
        borderLeft="12px solid #15A33D"
        borderRadius="8px"
        outline="1px solid rgba(0, 0, 0, 0.2)"
        p="24px"
        bg="white"
      >
        <Box mb="10px">
          <Text sx={brgyHeader} color="#5D5D5D" letterSpacing="1px" mr="0.5em">
            {city.name}
          </Text>
        </Box>
        <Text fontSize="sm" color="gray.500" fontStyle="italic">
          Detailed barangay breakdown is not currently available for this city.
        </Text>
        <Text fontSize="xs" color="gray.400" mt={2}>
          (Total Detections: {city.value})
        </Text>
      </Box>
    );
  }

  // 2. If data exists, sort and render
  const rows = [...city.topBarangays].sort((a, b) => b.reports - a.reports);

  return (
    <Box
      borderLeft="12px solid #15A33D"
      borderRadius="8px"
      outline="1px solid rgba(0, 0, 0, 0.2)"
      p="12px 24px 12px 12px"
      bg="white"
    >
      <Box mb="10px">
        <Text sx={brgyHeader} color="#5D5D5D" letterSpacing="1px" mr="0.5em">
          Top 5 Barangays
        </Text>
        <Text sx={brgyHeader} color="#15A33D">
          in {city.name}
        </Text>
      </Box>

      <TableContainer>
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr borderBottom="1px solid" borderColor="gray.200">
              <Th sx={brgyTable} color="#737373" fontWeight="700" pl="0">
                Barangay
              </Th>
              <Th
                sx={brgyTable}
                color="#737373"
                fontWeight="700"
                textAlign="right"
                pr="0"
              >
                Detections
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {rows.map((b) => (
              <Tr key={b.name}>
                <Td sx={brgyTable} color="#404040" pl="0">
                  {b.name}
                </Td>
                <Td sx={brgyTable} color="#0A0A0A" fontWeight="700" textAlign="right">
                  {b.reports}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

/* ---------------- Main Component ---------------- */
export default function LocationHotspots({ data }) {
  // 1. Handle incoming data (Prop from Parent)
  // Ensure we always have an array to prevent crashes
  const safeData = data || [];
  
  // 2. Sort data descending by value
  const sortedLocationData = [...safeData].sort((a, b) => b.value - a.value);

  // 3. State for the selected city (Right Panel)
  const [selectedCity, setSelectedCity] = useState(null);

  // 4. Auto-select the first city when data loads
  useEffect(() => {
    if (sortedLocationData.length > 0 && !selectedCity) {
      setSelectedCity(sortedLocationData[0]);
    } else if (sortedLocationData.length > 0 && selectedCity) {
        // If data refreshes, check if selectedCity is still valid, else reset
        const stillExists = sortedLocationData.find(c => c.name === selectedCity.name);
        if (!stillExists) setSelectedCity(sortedLocationData[0]);
    }
  }, [sortedLocationData, selectedCity]);

  // Dynamic chart height based on number of cities
  const chartHeight = Math.max(sortedLocationData.length * 50, 300);

  // If absolutely no data, show empty state
  if (sortedLocationData.length === 0) {
      return (
        <Box p={4} textAlign="center" color="gray.500">
            <Heading as="h3" size="md" mb={2}>Location Hotspots</Heading>
            <Text>No location data available for this period.</Text>
        </Box>
      );
  }

  return (
    <div className="chart-card-container">
      <Heading
        as="h2"
        color="#053774"
        fontSize="32px"
        fontWeight="600"
        letterSpacing="1px"
        mb={4}
      >
        LOCATION HOTSPOTS
      </Heading>

      {/* Subheading */}
      <h3 className="chart-title" style={{ marginBottom: '0.25rem', fontSize: '16px' }}>
        By City / Municipality
      </h3>

      {/* Description */}
      <Text
        as="p"
        fontSize="sm"
        fontStyle="italic"
        color="#053774"
        mb="2"
        className="chart-subtitle"
      >
        Click a city to view details.
      </Text>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="flex-start" mt={4}>
        {/* Left Chart */}
        <Box
          w={{ base: '100%', md: '60%' }}
          borderRadius="8px"
          outline="1px solid #C2C2C2"
          py={4}
          bg="white"
        >
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              data={sortedLocationData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 20, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#5D5D5D', fontSize: 12, fontWeight: 700 }}
                width={100} // Increased width for longer city names
              />

              <Bar 
                dataKey="value" 
                barSize={24} 
                radius={4} 
                onClick={(data) => setSelectedCity(data)}
                style={{ cursor: 'pointer' }}
              >
                <LabelList
                  dataKey="value"
                  position="right"
                  fill="#5D5D5D"
                  fontSize={10}
                  fontWeight="700"
                />
                {sortedLocationData.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={
                      selectedCity && entry.name === selectedCity.name
                        ? COLOR_SELECTED
                        : i % 2
                        ? COLOR_DARK
                        : COLOR_LIGHT
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Right List */}
        <Box w={{ base: '100%', md: '40%' }}>
          {selectedCity && <TopBarangayList city={selectedCity} />}
        </Box>
      </Flex>
    </div>
  );
}