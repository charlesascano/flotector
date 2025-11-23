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
import { ChevronDownIcon, QuestionIcon } from '@chakra-ui/icons';
import { IoOptionsOutline } from 'react-icons/io5';

import { CATALOG_DATA } from '../catalog/CatalogData';
import WasteTypeChart from './WasteTypeChart';
import LocationHotspots from './LocationHotspots';
import DateFilter from '../DateFilter';

const WasteAnalytics = ({ 
  data=null,
  currentFilter,
  onFilterChange
}) => {

  // Safety check for wasteType to avoid crashes if undefined
  const safeWasteType = data?.highest_class_count || 'N/A';

  // Helper function to get dynamic icon
  const getDynamicIcon = (type) => {
      if (!type || type === 'N/A') return QuestionIcon;
      
      // Find the object in your catalog where title matches the type (case-insensitive)
      const found = CATALOG_DATA.find(
        (item) => item.title.toLowerCase() === type.toLowerCase()
      );

      // Return the icon component found, or fallback to default icon
      return found ? found.icon : QuestionIcon;
    };

    // Determines what icon to render depending on top waste type
  const ActiveIcon = getDynamicIcon(safeWasteType);

  return (
    <Box w="100%" p={{ base: 4, md: 8 }} bg="#F6F6F6" borderRadius="20px" borderBottom="1px solid #C2C2C2" >
      {/* Header */}
      <Flex justify="space-between" align={{ base: 'flex-start', lg: 'center' }} mb={{ base: 6, md: 8 }} direction={{ base: 'column', lg: 'row' }} gap={4}>
        <Heading color="#053774" fontWeight="700" fontSize={{ base: '24px', md: '32px', lg: '40px' }} lineHeight="1.1">
          Waste Analytics
        </Heading>

        <DateFilter currentFilter={currentFilter} onFilterChange={onFilterChange} />
      </Flex>

      {/* Main Grid */}
      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, 1fr)' }} gap={{ base: 4, md: 6 }}>
        {/* Cards */}
        <GridItem>
          <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 3, md: 4 }}>
            
            {/* Overall Detection Card */}
            <GridItem colSpan={1} display="flex" flexDirection="column" justifyContent="space-between" p={{ base: 4, sm: 5 }} bgGradient="linear(330deg, white -220%, #053774 100%)" boxShadow="0px 4px 4px rgba(0,0,0,0.25)" borderRadius="35px" color="white" minH="150px">
              <Text fontWeight="700" fontSize={{ base: 'calc(8px + 0.6vw)' }} lineHeight="1.2" mb={2}>
                ALL-TIME <br /> DETECTIONS
              </Text>
              <Text fontWeight="700" fontSize={{ base: '2rem', md: '2.5rem' }} lineHeight="1" textAlign="right">
                {data ? data?.total_detections_all_time: 0}
              </Text>
            </GridItem>

            {/* Top Waste Type Card */}
            <GridItem colSpan={1} display="flex" flexDirection={{ base: 'column', md: 'row' }} p={{ base: 4, sm: 5 }} bgGradient="linear(149deg, #15A33D 0%, #EFEFEF 200%)" boxShadow="0px 4px 4px rgba(0,0,0,0.25)" borderRadius="35px" color="white" justifyContent={{ base: 'center', md: 'space-between' }} alignItems="center" textAlign={{ base: 'center', md: 'left' }} minH="150px" gap={2}>
              <Flex flexDirection="column" justifyContent="center" alignItems={{ base: 'center', md: 'start' }} textAlign={{ base: 'center', md: 'left' }}>
                <Text fontSize={{ base: 'calc(6px + 0.4vw)' }} fontWeight="500">TOP WASTE TYPE</Text>
                <Box mt={{ base: 2, md: 'auto' }}>
                  <Text fontWeight="700" fontSize={{ base: 'calc(16px + 1vw)' }} lineHeight="1.1">{safeWasteType.toUpperCase()}</Text>
                </Box>
              </Flex>
              
              {/* Icon render */}
              <Box boxSize={{ base: 10, sm: 12, md: 12, lg: 16 }}>
                 <Icon as={ActiveIcon} w="100%" h="100%" />
              </Box>

            </GridItem>

            {/* Top Hotspot Card */}
            <GridItem colSpan={2} display="flex" alignItems="center" p={{ base: 4, sm: 5 }} bgGradient="linear(150deg, white 24%, #053774 270%)" boxShadow="0px 4px 4px rgba(0,0,0,0.25)" borderRadius="35px" border="1px solid #DCDCDC" gap={4}>
              <Flex direction="column" textAlign="left" flex="1">
                <Text color="#5D5D5D" fontSize={{ base: 'xs' }} fontWeight="500">TOP HOTSPOT</Text>
                <Box>
                  <Text fontWeight="700" fontSize={{ base: 'md', md: 'lg' }} color="#053774">
                    {data?.highest_barangay_total?.total_count ? `${data.highest_barangay_total.barangay}, ${data.highest_barangay_total.city} ` : 'N/A'}
                  </Text>

                  <Text fontSize={{ base: 'xs', md: 'sm' }} color="#053774">
                    {data?.highest_barangay_total?.total_count > 0 ? (
                      <>
                        is the most reported area with{' '}
                        <Text as="span" fontWeight="700">{data?.highest_barangay_total?.total_count}</Text> detections
                      </>
                    ) : (
                      "No reported detections yet"
                    )}
                  </Text>

                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>

        {/* Donut Chart */}
        <GridItem>
          <WasteTypeChart data={data?.all_class_counts} />
        </GridItem>

        {/* Location Hotspots Chart (We'll fix this file next!) */}
        <GridItem colSpan={{ base: 1, xl: 2 }}>
          <LocationHotspots brgy_per_city={data?.top_barangays_per_city} city_totals={data?.totals_per_city} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default WasteAnalytics;