import React from 'react';
import {
  Flex,
  Button,
  ButtonGroup,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoOptionsOutline } from 'react-icons/io5';

// 1. Added default values to props to prevent crashes
const DateFilter = ({ 
  currentFilter = 'Today', 
  onFilterChange = (val) => console.log("Filter clicked:", val) 
}) => {
  
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
    <>
    {/* Filter Controls */}
        <Box w={{ base: '100%', lg: 'auto' }}>
          <Flex display={{ base: 'none', lg: 'flex' }} gap={2} justify="flex-end">
            <ButtonGroup isAttached variant="outline" bg="white" borderRadius="8px" boxShadow="sm">
              {filterOptions.map((option, idx) => (
                <Button
                  key={option}
                  {...baseBtnStyle}
                  {...outline}
                  // Use Props to determine active state
                  bg={currentFilter === option ? '#053774' : 'white'}
                  color={currentFilter === option ? 'white' : '#5D5D5D'}
                  _hover={currentFilter !== option ? { bg: 'gray.50' } : undefined}
                  borderLeftRadius={idx === 0 ? '8px' : 0}
                  borderRightRadius={idx === filterOptions.length - 1 ? '8px' : 0}
                  onClick={() => onFilterChange(option)} // Call Parent Function
                >
                  {option}
                </Button>
              ))}
            </ButtonGroup>
            
            {/* Custom Range Button (Placeholder) */}
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
                {currentFilter}
              </MenuButton>
              <MenuList>
                {filterOptions.map((option) => (
                  <MenuItem key={option} onClick={() => onFilterChange(option)} fontWeight="600" color="#5D5D5D">
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
        </>
  );
};

export default DateFilter;