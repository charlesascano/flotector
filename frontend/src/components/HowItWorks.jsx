import { Box, Heading, Text, VStack, HStack, Icon, useBreakpointValue } from '@chakra-ui/react';
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

const HowItWorks = () => {
  const isStacked = useBreakpointValue({ base: true, md: false });

  const StepCard = ({ icon, title, subtitle, description }) => (
    <VStack textAlign="center" spacing={1} maxW="250px">
      <Icon as={icon} boxSize={{ base: '90px', sm: '100px', md: '120px' }} color="#15A33D;" />
      <Text fontWeight="bold" fontSize={{ base: '32px', md: '36px' }} color="#0D0088" lineHeight="shorter">{title}</Text>
      <Text fontWeight="700" fontSize={{ base: '16px', md: '18px' }} color="#0D0088">{subtitle}</Text>
      <Text fontSize={{ base: '10px', md: '14px' }} color="#0D0088">{description}</Text>
    </VStack>
  );

  return (
    <Box py={10} px={5} bg="white">
      <Heading fontWeight="600" fontSize={{ base: "4xl", sm: "4xl", md: "64px" }} textAlign="center" color="#053774">
        HOW IT WORKS
      </Heading>
      <Text fontSize={{ base: "14px", sm: "14px", md: "20px" }} textAlign="center" mb={10} color="#053774">
        Follow these simple steps to keep our waters clean and make an impact.
      </Text>
      {isStacked ? (
        <VStack spacing={10}>
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </VStack>
      ) : (
        <HStack spacing={10} justify="center">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </HStack>
      )}
    </Box>
  );
};

export default HowItWorks;