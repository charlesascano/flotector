import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoOptionsOutline } from 'react-icons/io5';

import WasteTypeChart from './WasteTypeChart';
import LocationHotspots from './LocationHotspots';

// BottleIcon Definition
const BottleIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M18,2H6C4.9,2,4,2.9,4,4V9.3C3.4,9.8,3,10.6,3,11.5V20c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V11.5
         c0-0.9-0.4-1.7-1-2.2V4C20,2.9,19.1,2,18,2z M6,4h12v5H6V4z M19,20H5V11.5C5,11.8,5.2,12,5.5,12h13c0.3,0,0.5-0.2,0.5-0.5V20z"
    />
  </Icon>
);

const WasteAnalytics = ({ overallDetection = 0, wasteType = 'PLASTIC', topHotspot = {}, icons }) => {
  const [activeFilter, setActiveFilter] = useState('Last 7 days');
  const filterOptions = ['Today', 'Last 7 days', 'This Month'];

  const baseBtnStyle = {
    fontWeight: '700',
    fontSize: { base: 'xs', md: 'sm' },
    height: '30px',
  };

  const outline = {
    borderColor: '#053774',
    borderWidth: '0.25px',
  };

  return (
    <Box w="100%" p={{ base: 4, md: 8 }} bg="#F6F6F6" borderRadius="20px" borderBottom="1px solid #C2C2C2" minH="100vh">
      {/* Header */}
      <Flex justify="space-between" align={{ base: 'flex-start', lg: 'center' }} mb={{ base: 6, md: 8 }} direction={{ base: 'column', lg: 'row' }} gap={4}>
        <Heading color="#053774" fontWeight="700" fontSize={{ base: '24px', md: '32px', lg: '40px' }} lineHeight="1.1">
          Waste Analytics
        </Heading>

        {/* Filter Controls */}
        <Box w={{ base: '100%', lg: 'auto' }}>
          <Flex display={{ base: 'none', lg: 'flex' }} gap={2} justify="flex-end">
            <ButtonGroup isAttached variant="outline" bg="white" borderRadius="8px" boxShadow="sm">
              {filterOptions.map((option, idx) => (
                <Button
                  key={option}
                  {...baseBtnStyle}
                  {...outline}
                  bg={activeFilter === option ? '#053774' : 'white'}
                  color={activeFilter === option ? 'white' : '#5D5D5D'}
                  _hover={activeFilter !== option ? { bg: 'gray.50' } : undefined}
                  borderLeftRadius={idx === 0 ? '8px' : 0}
                  borderRightRadius={idx === filterOptions.length - 1 ? '8px' : 0}
                  onClick={() => setActiveFilter(option)}
                >
                  {option}
                </Button>
              ))}
            </ButtonGroup>
            <Button
              {...baseBtnStyle}
              {...outline}
              bg="white"
              color="#5D5D5D"
              _hover={{ bg: 'gray.50' }}
              borderRadius="8px"
              boxShadow="sm"
              minWidth={{ base: 'auto', md: '136px' }}
              leftIcon={<Icon as={IoOptionsOutline} boxSize="16px" />}
            >
              Custom Range
            </Button>
          </Flex>

          {/* Mobile dropdown filter */}
          <Flex display={{ base: 'flex', lg: 'none' }} w="100%">
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} {...baseBtnStyle} bg="#053774" color="white" _hover={{ bg: '#042d5e' }} _active={{ bg: '#042d5e' }}>
                {activeFilter}
              </MenuButton>
              <MenuList>
                {filterOptions.map((option) => (
                  <MenuItem key={option} onClick={() => setActiveFilter(option)} fontWeight="600" color="#5D5D5D">
                    {option}
                  </MenuItem>
                ))}
                <MenuItem fontWeight="600" color="#5D5D5D" icon={<Icon as={IoOptionsOutline} boxSize="16px" />}>
                  Custom Range
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>

      {/* Main Grid */}
      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={{ base: 4, md: 6 }}>
        {/* Cards */}
        <GridItem>
          <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 3, md: 4 }}>
            {/* Overall Detection */}
            <GridItem colSpan={1} display="flex" flexDirection="column" justifyContent="space-between" p={{ base: 4, sm: 5 }} bgGradient="linear(330deg, white -220%, #053774 100%)" boxShadow="0px 4px 4px rgba(0,0,0,0.25)" borderRadius="35px" color="white" minH="150px">
              <Text fontWeight="700" fontSize={{ base: 'calc(8px + 0.6vw)' }} lineHeight="1.2" mb={2}>
                OVERALL <br /> DETECTION
              </Text>
              <Text fontWeight="700" fontSize={{ base: '2rem', md: '2.5rem' }} lineHeight="1" textAlign="right">
                {overallDetection}
              </Text>
            </GridItem>

            {/* Top Waste Type */}
            <GridItem colSpan={1} display="flex" flexDirection={{ base: 'column', md: 'row' }} p={{ base: 4, sm: 5 }} bgGradient="linear(149deg, #15A33D 0%, #EFEFEF 200%)" boxShadow="0px 4px 4px rgba(0,0,0,0.25)" borderRadius="35px" color="white" justifyContent={{ base: 'center', md: 'space-between' }} alignItems="center" textAlign={{ base: 'center', md: 'left' }} minH="150px" gap={2}>
              <Flex flexDirection="column" justifyContent="center" alignItems={{ base: 'center', md: 'start' }} textAlign={{ base: 'center', md: 'left' }}>
                <Text fontSize={{ base: 'calc(6px + 0.4vw)' }} fontWeight="500">TOP WASTE TYPE</Text>
                <Box mt={{ base: 2, md: 'auto' }}>
                  <Text fontWeight="700" fontSize={{ base: 'calc(16px + 1vw)' }} lineHeight="1.1">{wasteType.toUpperCase()}</Text>
                  <Text fontSize={{ base: '10px', sm: 'xs' }} pt={1} lineHeight="1.1">
                    represents <Text as="span" fontWeight="700">80%</Text> of detections
                  </Text>
                </Box>
              </Flex>
              <Box boxSize={{ base: 10, sm: 12, md: 16, lg: 24 }}>
                {icons?.[wasteType] || <BottleIcon w="100%" h="100%" />}
              </Box>
            </GridItem>

            {/* Top Hotspot */}
            <GridItem colSpan={2} display="flex" alignItems="center" p={{ base: 4, sm: 5 }} bgGradient="linear(150deg, white 24%, #053774 270%)" boxShadow="0px 4px 4px rgba(0,0,0,0.25)" borderRadius="35px" border="1px solid #DCDCDC" gap={4}>
              <Flex direction="column" textAlign="left" flex="1">
                <Text color="#5D5D5D" fontSize={{ base: 'xs' }} fontWeight="500">TOP HOTSPOT</Text>
                <Box>
                  <Text fontWeight="700" fontSize={{ base: 'md', md: 'lg' }} color="#053774">{topHotspot.name || 'BRGY. NAME'}</Text>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="#053774">
                    is the most reported area with <Text as="span" fontWeight="700">{topHotspot.reports || 0}</Text> reports
                  </Text>
                </Box>
              </Flex>
              <Button size="sm" bg="#053774" color="white" fontWeight="700" borderRadius="6px" _hover={{ bg: '#042e61' }}>
                View
              </Button>
            </GridItem>
          </Grid>
        </GridItem>

        {/* Charts */}
        <GridItem>
          <WasteTypeChart />
        </GridItem>

        <GridItem colSpan={{ base: 1, xl: 2 }}>
          <LocationHotspots />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default WasteAnalytics;
