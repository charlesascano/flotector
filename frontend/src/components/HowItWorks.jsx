import { Box, Heading, Text, VStack, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaEye, FaCamera, FaUpload, FaChartLine } from 'react-icons/fa';

const steps = [
  {
    icon: FaEye,
    title: 'STEP 1',
    subtitle: 'SPOT WASTE IN WATERWAYS',
    description: 'If you see floating waste in rivers, canals, streams, or creeks—take notice.',
  },
  {
    icon: FaCamera,
    title: 'STEP 2',
    subtitle: 'SNAP A CLEAR PHOTO',
    description: 'Use your phone to capture the scene. Make sure the waste in the water body is visible.',
  },
  {
    icon: FaUpload,
    title: 'STEP 3',
    subtitle: 'SUBMIT YOUR PHOTO',
    description: 'Upload the photo through our system and provide the necessary information if possible.',
  },
  {
    icon: FaChartLine,
    title: 'STEP 4',
    subtitle: 'WE ANALYZE AND ACT',
    description: 'Your report helps map pollution, track hotspots, and guide cleanup efforts.',
  },
];

const StepCard = ({ icon, title, subtitle, description }) => (
  <VStack textAlign="center" spacing={3} maxW="260px" mx="auto">
    <Icon as={icon} boxSize={{ base: '70px', md: '100px', lg: '120px' }} color="#15A33D" />
    <Text fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }} color="#0D0088">
      {title}
    </Text>
    <Text fontWeight="700" fontSize={{ base: 'md', md: 'lg' }} color="#0D0088">
      {subtitle}
    </Text>
    <Text fontSize={{ base: 'sm', md: 'md' }} color="#0D0088">
      {description}
    </Text>
  </VStack>
);

const HowItWorks = () => (
  <Box py={{ base: 16, md: 20 }} px={{ base: 6, md: 12 }} bg="white">
    <Heading
      fontWeight="600"
      fontSize={{ base: '3xl', md: '5xl', lg: '64px' }}
      textAlign="center"
      color="#053774"
      mb={6}
    >
      HOW IT WORKS
    </Heading>

    <Text
      fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
      textAlign="center"
      mb={12}
      color="#053774"
      maxW="2xl"
      mx="auto"
    >
      Follow these simple steps to keep our waters clean and make an impact.
    </Text>

    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 4 }}
      spacing={{ base: 10, md: 14 }}
      justifyItems="center"
    >
      {steps.map((step, i) => (
        <StepCard key={i} {...step} />
      ))}
    </SimpleGrid>
  </Box>
);

export default HowItWorks;
