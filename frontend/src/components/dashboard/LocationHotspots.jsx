import React, { useState } from 'react';
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

/* ---------------- Data ---------------- */
const locationData = [
  {
    name: 'Imus',
    value: 214,
    topBarangays: [
      { name: 'Malagasang I-D', reports: 22 },
      { name: 'Anabu II-F', reports: 12 },
      { name: 'Alapan I-A', reports: 12 },
      { name: 'Medicion I-A', reports: 12 },
      { name: 'Pag-asa III', reports: 7 },
    ],
  },
  {
    name: 'Bacoor',
    value: 120,
    topBarangays: [
      { name: 'Molino III', reports: 30 },
      { name: 'Molino IV', reports: 25 },
      { name: 'Zapote V', reports: 20 },
      { name: 'Talaba IV', reports: 18 },
      { name: 'Niog II', reports: 15 },
    ],
  },
  {
    name: 'Dasmarinas',
    value: 65,
    topBarangays: [
      { name: 'Salitran I', reports: 15 },
      { name: 'Burol Main', reports: 12 },
      { name: 'Paliparan II', reports: 10 },
      { name: 'San Agustin I', reports: 8 },
      { name: 'Langkaan II', reports: 7 },
    ],
  },
  {
    name: 'Silang',
    value: 32,
    topBarangays: [
      { name: 'Biga I', reports: 9 },
      { name: 'Poblacion I', reports: 7 },
      { name: 'Biluso', reports: 5 },
      { name: 'Mataas na Burol', reports: 4 },
      { name: 'Kabigting', reports: 3 },
    ],
  },
  {
    name: 'Tagaytay',
    value: 12,
    topBarangays: [
      { name: 'Mendez Crossing', reports: 5 },
      { name: 'Maharlika East', reports: 3 },
      { name: 'Kaybagal South', reports: 2 },
      { name: 'Asisan', reports: 1 },
      { name: 'Tolentino West', reports: 1 },
    ],
  },
  {
    name: 'Amadeo',
    value: 8,
    topBarangays: [
      { name: 'Poblacion I', reports: 3 },
      { name: 'Poblacion II', reports: 2 },
      { name: 'Poblacion III', reports: 1 },
      { name: 'Poblacion IV', reports: 1 },
      { name: 'Maymangga', reports: 1 },
    ],
  },
  {
    name: 'Kawit',
    value: 5,
    topBarangays: [
      { name: 'Poblacion', reports: 2 },
      { name: 'Kaingen', reports: 1 },
      { name: 'Marulas', reports: 1 },
      { name: 'Panamitan', reports: 1 },
      { name: 'Wakas II', reports: 1 },
    ],
  },
];

const sortedLocationData = [...locationData].sort((a, b) => b.value - a.value);

/* ---------------- Colors ---------------- */
const COLOR_SELECTED = '#15A33D';
const COLOR_LIGHT = '#A3A3A3';
const COLOR_DARK = '#5D5D5D';

/* ---------------- Barangay List ---------------- */
function TopBarangayList({ city }) {
  const rows = [...city.topBarangays].sort((a, b) => b.reports - a.reports);

  return (
    <Box
      borderLeft="12px solid #15A33D"
      borderRadius="8px"
      outline="1px solid rgba(0, 0, 0, 0.2)"
      p="12px 24px 12px 12px"
    >
      <Box mb="10px">
        <Text
          as="span"
          color="#5D5D5D"
          fontSize="20px"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="1px"
          mr="0.5em"
        >
          Top 5 Barangays
        </Text>
        <Text
          as="span"
          color="#15A33D"
          fontSize="20px"
          fontWeight="700"
          textTransform="uppercase"
        >
          in {city.name}
        </Text>
      </Box>

      <TableContainer>
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr borderBottom="1px solid" borderColor="gray.200">
              <Th color="#737373" fontSize="14px" fontWeight="700" pl="0">
                Barangay
              </Th>
              <Th
                color="#737373"
                fontSize="14px"
                fontWeight="700"
                textAlign="right"
                pr="0"
              >
                Reports
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {rows.map((b) => (
              <Tr key={b.name}>
                <Td color="#404040" fontSize="14px" pl="0">
                  {b.name}
                </Td>
                <Td color="#0A0A0A" fontSize="14px" fontWeight="700" textAlign="right">
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
export default function LocationHotspots() {
  const [selectedCity, setSelectedCity] = useState(sortedLocationData[0]);
  const chartHeight = sortedLocationData.length * 40;

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
      <p className="chart-subtitle">
        Click a city to view its top barangays.
      </p>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="flex-start" mt={4}>
        {/* Left Chart */}
        <Box
          w={{ base: '100%', md: '60%' }}
          borderRadius="8px"
          outline="1px solid #C2C2C2"
          py={4}
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
                width={80}
              />

              <Bar dataKey="value" barSize={24} radius={4} onClick={setSelectedCity}>
                <LabelList
                  dataKey="value"
                  position="right"
                  fill="#5D5D5D"
                  fontSize={10}
                  fontWeight="700"
                />
                {sortedLocationData.map((entry, i) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === selectedCity.name
                        ? COLOR_SELECTED
                        : i % 2
                        ? COLOR_DARK
                        : COLOR_LIGHT
                    }
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Right List */}
        <Box w={{ base: '100%', md: '40%' }}>
          <TopBarangayList city={selectedCity} />
        </Box>
      </Flex>
    </div>
  );
}
