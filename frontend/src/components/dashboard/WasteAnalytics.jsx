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
} from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoOptionsOutline } from 'react-icons/io5';

import SubmissionsGraph from './SubmissionsGraph';
import WasteTypeChart from './WasteTypeChart';
import LocationHotspots from './LocationHotspots';

const WasteAnalytics = () => {
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
    <Box
      w="100%"
      p={{ base: 4, md: 8 }}
      bg="#F6F6F6"
      borderRadius="20px"
      borderBottom="1px solid #C2C2C2"
      minH="100vh"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align={{ base: 'flex-start', lg: 'center' }}
        mb={{ base: 6, md: 8 }}
        direction={{ base: 'column', lg: 'row' }}
        gap={4}
      >
        <Heading
          color="#053774"
          fontWeight="700"
          fontSize={{ base: '24px', md: '32px', lg: '40px' }}
          lineHeight="1.1"
        >
          Waste Analytics
        </Heading>
                
        {/* NOTE:
        - to be added functionality for changing the whole waste analytics data depending on the date range, the values and some functions are not active still and are placeholders only. 
        */}

        {/* Desktop filter buttons */}
        <Box w={{ base: '100%', lg: 'auto' }}>
          <Flex
            display={{ base: 'none', lg: 'flex' }}
            gap={2}
            justify="flex-end"
          >
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
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                {...baseBtnStyle}
                bg="#053774"
                color="white"
                _hover={{ bg: '#042d5e' }}
                _active={{ bg: '#042d5e' }}
              >
                {activeFilter}
              </MenuButton>
              <MenuList>
                {filterOptions.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    fontWeight="600"
                    color="#5D5D5D"
                  >
                    {option}
                  </MenuItem>
                ))}
                <MenuItem
                  fontWeight="600"
                  color="#5D5D5D"
                  icon={<Icon as={IoOptionsOutline} boxSize="16px" />}
                >
                  Custom Range
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Flex>

      {/* Main Grid */}
      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={{ base: 4, md: 6 }}>
        <GridItem>
          <SubmissionsGraph />
        </GridItem>

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
