import React, { useState } from 'react';
import {
  Flex,
  Button,
  ButtonGroup,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter,
  useDisclosure
} from '@chakra-ui/react';
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { IoOptionsOutline } from 'react-icons/io5';

// 1. Added default values to props to prevent crashes
const DateFilter = ({ 
  currentFilter = 'Today', 
  onFilterChange = (val) => console.log("Filter clicked:", val) 
}) => {
  
  const filterOptions = ['Today', 'Last 7 days', 'This Month'];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  
  const isCustomActive = Array.isArray(currentFilter);

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
                  _hover={currentFilter !== option ? { bg: 'gray.50' } : {bg: '#053774'}}
                  borderLeftRadius={idx === 0 ? '8px' : 0}
                  borderRightRadius={idx === filterOptions.length - 1 ? '8px' : 0}
                  onClick={() => onFilterChange(option) } // Call Parent Function
                >
                  {option}
                </Button>
              ))}
            </ButtonGroup>
            
            {/* Custom Range Button (Placeholder) */}
            {/* Custom Range Button */}
            <Button
              {...baseBtnStyle}
              {...outline}
              // FIXED: Dynamic styling based on isCustomActive state
              bg={isCustomActive ? '#053774' : 'white'}
              color={isCustomActive ? 'white' : '#5D5D5D'}
              _hover={{ bg: isCustomActive ? '#042d5e' : 'gray.50' }}
              borderRadius="8px"
              boxShadow="sm"
              minWidth={{ base: 'auto', md: '136px' }}
              leftIcon={<Icon as={IoOptionsOutline} boxSize="16px" />}
              onClick={onOpen}
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
                {/* FIXED: Show "Custom Range" text if array is selected */}
                {isCustomActive ? "Custom Range" : currentFilter}
              </MenuButton>
              <MenuList>
                {filterOptions.map((option) => (
                  <MenuItem key={option} onClick={() => onFilterChange(option)} fontWeight="600" color="#5D5D5D">
                    {option}
                  </MenuItem>
                ))}
                <MenuItem fontWeight="600" color="#5D5D5D" onClick={onOpen} icon={<Icon as={IoOptionsOutline} boxSize="16px" />}>
                  Custom Range
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Date Range </ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <RangeDatepicker
              selectedDates={selectedDates}
              onDateChange={setSelectedDates}
              // removed maxDate because it auto closes (ask for more info)
              // maxDate={new Date()}
              
              propsConfigs={{
                dateNavBtnProps: {
                  padding: 0,
                  fontWeight:'normal'
                },

                dayOfMonthBtnProps: {
                  defaultBtnProps: {
                    fontWeight: 'normal',
                    _hover: {
                      bgColor: '#648cbeff',
                      color: 'white'
                    }
                  },
                  selectedBtnProps: {
                    bgColor: '#053774',
                    color: 'white',
                    _hover: {
                      bgColor: '#053774'
                    }
                  },
                  isInRangeBtnProps: {
                    bgColor: '#d9eaffff',
                    color: 'black !important'
                  },
                  todayBtnProps: {
                    background: "#15A33D",
                    fontWeight: 'bold'
                  }
                },
                popoverCompProps: {
                  popoverContentProps: {
                    padding: {base: 0, md: 2},
                    width: {base: '100vw', sm: '100%'}
                  },
                },
                  calendarPanelProps: {
                    wrapperProps: {
                      width: '100%'
                    },
                    contentProps: {
                      boxShadow: 'md',
                    },
                    dividerProps: {
                      display: "none",
                    },
                  },

                  dateHeadingProps: {
                    letterSpacing: '1px',
                  },

                  weekdayLabelProps: {
                    fontWeight: 'normal'
                  },

                  inputProps: {
                    letterSpacing: '1px'
                  },
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' colorScheme='blue' mr={3} onClick={() => {onClose(); setSelectedDates([new Date(), new Date()])}}>
              Close
            </Button>
            <Button colorScheme='blue' 
              onClick={() => {
                onClose();
                onFilterChange(selectedDates);
              }}>
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
  );
};

export default DateFilter;