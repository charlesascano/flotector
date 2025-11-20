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
function TopBarangayList({ selected_city, brgy_list=[] }) {
  // 1. Safety Check: If no nested barangays, show placeholder
  if (!brgy_list || brgy_list.length === 0) {
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
            {selected_city.city}
          </Text>
        </Box>
        <Text fontSize="sm" color="gray.500" fontStyle="italic">
          Detailed barangay breakdown is not currently available for this city.
        </Text>
        <Text fontSize="xs" color="gray.400" mt={2}>
          (Total Detections: {selected_city.total_count})
        </Text>
      </Box>
    );
  }

  // 2. If data exists, sort and render
  // const rows = [...city.topBarangays].sort((a, b) => b.reports - a.reports);

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
          in {selected_city.city}
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
                Reports
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {brgy_list.map((b) => (
              <Tr key={b.barangay}>
                <Td sx={brgyTable} color="#404040" pl="0">
                  {b.barangay}
                </Td>
                <Td sx={brgyTable} color="#0A0A0A" fontWeight="700" textAlign="right">
                  {b.total_detections}
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
export default function LocationHotspots({ brgy_per_city=[], city_totals=[] }) {

  
  const [selectedCity, setSelectedCity] = useState(null);
  // 1. DEFINE YOUR TARGET CITIES
  const TARGET_CITIES = [
    "Dasmariñas", 
    "Imus", 
    "Bacoor", 
    "Tagaytay City", 
    "Amadeo", 
    "Kawit", 
    "Silang"
  ];

  // 2. NORMALIZE DATA (Merge fixed list with API data)
  const chartData = TARGET_CITIES.map(cityName => {
    // Check if this city exists in the props data
    const existingData = city_totals.find(item => item.city === cityName);
    
    // If it exists, use it. If not, create a 0 count object.
    return existingData || { city: cityName, total_count: 0 };
  });

  // 4. Auto-select the first city when data loads
  useEffect(() => {
    if (chartData.length > 0 && !selectedCity) {
      setSelectedCity(chartData[0]);
    } else if (chartData.length > 0 && selectedCity) {
        const stillExists = chartData.find(c => c.city === selectedCity.city);
        if (!stillExists) setSelectedCity(chartData[0]);
    }
  }, [selectedCity, chartData]); // Dependency updated

  // Dynamic chart height based on number of cities
  const chartHeight = Math.max(chartData.length * 50, 300);

  // Calculate filtered barangays for the Right Panel
  const selectedCityBarangays = selectedCity 
  ? brgy_per_city.filter(b => b.city === selectedCity.city)
  : [];
  // If absolutely no data, show empty state
  if (city_totals.length === 0) {
      return (
        <Box p={4} textAlign="center" color="gray.500">
            <Heading as="h3" size="md" mb={2}>Location Hotspots</Heading>
            <Text>No location data available for this period.</Text>
        </Box>
      );
  }

  return (
    <div className="chart-card-container">
      {/* ... Headings ... */}

      <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="flex-start" mt={4}>
        <Box w={{ base: '100%', md: '60%' }} borderRadius="8px" outline="1px solid #C2C2C2" py={4} bg="white">
          
          <ResponsiveContainer width="100%" height={chartHeight}>
            {/* 5. PASS 'chartData' TO THE CHART */}
            <BarChart
              data={chartData} 
              layout="vertical"
              margin={{ top: 0, right: 40, left: 20, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="city"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#5D5D5D', fontSize: 12, fontWeight: 700 }}
                width={100}
              />
              <Bar 
                dataKey="total_count" 
                barSize={24} 
                radius={4} 
                onClick={(data) => setSelectedCity(data)}
                style={{ cursor: 'pointer' }}
              >
                <LabelList
                  dataKey="total_count"
                  position="right"
                  fill="#5D5D5D"
                  fontSize={10}
                  fontWeight="700"
                />
                {/* 6. ITERATE OVER 'chartData' FOR CELLS */}
                {chartData.map((entry, i) => (
                  <Cell
                    key={`cell-${i}`}
                    fill={
                      selectedCity && entry.city === selectedCity.city
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

        <Box w={{ base: '100%', md: '40%' }}>
          {selectedCity && <TopBarangayList selected_city={selectedCity} brgy_list={selectedCityBarangays} />}
        </Box>
      </Flex>
    </div>
  );
}