import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  VStack,
  HStack,
  Icon,
  Button,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Circle,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { 
  FaCamera, 
  FaRobot, 
  FaMapMarkerAlt, 
  FaFire, 
  FaDatabase, 
  FaCheckCircle, 
  FaArrowRight 
} from 'react-icons/fa';
import { MdWaterDrop } from 'react-icons/md';
import Layout from '../components/Layout';

// --- Color Constants ---
const BRAND_GREEN = "#15A33D";
const BRAND_BLUE = "#053774";

// --- Helper Components ---

const FeatureCard = ({ title, text, icon }) => {
  return (
    <VStack
      bg={useColorModeValue('white', 'gray.700')}
      p={6}
      rounded={'xl'}
      boxShadow={'lg'}
      align={'start'}
      borderTop={`4px solid ${BRAND_GREEN}`}
      transition={'transform 0.3s ease'}
      _hover={{ transform: 'translateY(-5px)' }}
      height="100%"
    >
      <HStack spacing={4} mb={2}>
        <Circle size={10} bg={'gray.100'} color={BRAND_BLUE}>
          <Icon as={icon} w={5} h={5} />
        </Circle>
        <Heading size={'md'} color={BRAND_BLUE}>{title}</Heading>
      </HStack>
      <Text color={'gray.600'}>{text}</Text>
    </VStack>
  );
};

const StepItem = ({ number, title }) => {
  return (
    <HStack spacing={4} align={'center'} w="full">
      <Circle 
        size={10} 
        bg={BRAND_BLUE} 
        color={'white'} 
        fontWeight={'bold'}
        fontSize={'lg'}
        flexShrink={0}
      >
        {number}
      </Circle>
      <Text fontSize={'lg'} fontWeight={'medium'} color={'gray.700'}>
        {title}
      </Text>
    </HStack>
  );
};

// --- Main Component ---

const About = () => {
  const bgGray = useColorModeValue('gray.50', 'gray.900');
  const bgWhite = useColorModeValue('white', 'gray.800');

  return (
    <Layout>
      <Box bg={bgGray} minH="100vh">
        
        {/* --- Hero Section --- */}
        <Box bg={BRAND_BLUE} color={'white'} pt={{ base: 16, md: 24 }} pb={{ base: 24, md: 32 }} px={4} textAlign={'center'}>
          <Container maxW={'4xl'}>
            <Heading as="h1" size="2xl" mb={4}>
              About Flotector
            </Heading>
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight={'light'} mb={6}>
              A community-powered system for detecting floating waste in the Imus River Watershed using AI and participatory sensing.
            </Text>
            <Text fontSize={'lg'} opacity={0.8} maxW={'2xl'} mx={'auto'}>
              Flotector helps citizens and local authorities monitor river pollution through crowdsourced photos and real-time AI detection. Together, we build cleaner waterways—one report at a time.
            </Text>
          </Container>
        </Box>

        {/* --- Section 1: Our Purpose --- */}
        <Container maxW={'6xl'} mt={-16} mb={20} position="relative" zIndex={1} px={{ base: 4, md: 8 }}>
          <Box bg={bgWhite} p={{ base: 6, md: 10 }} rounded={'2xl'} shadow={'xl'}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 10, md: 16 }} align={'center'}>
              <Box flex={1}>
                <Heading as="h2" size="xl" mb={4} color={BRAND_BLUE}>
                  Why We Built Flotector
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'} mb={4} lineHeight="tall">
                  Floating waste in rivers is a growing problem, especially in rapidly developing areas like <strong>Imus, Bacoor, and Dasmariñas</strong>. Traditional monitoring tools are costly and hard to scale, so communities often rely on manual reporting.
                </Text>
                <Text fontSize={'lg'} fontWeight={'bold'} color={BRAND_GREEN}>
                  Flotector aims to make monitoring easier, faster, and accessible to everyone.
                </Text>
              </Box>
              <Box flex={1} display={'flex'} justifyContent={'center'}>
                 {/* Visual Graphic Icon */}
                 <Circle size={{ base: '150px', md: '200px' }} bg={`${BRAND_BLUE}10`}>
                    <Icon as={MdWaterDrop} w={{ base: 20, md: 24 }} h={{ base: 20, md: 24 }} color={BRAND_BLUE} />
                 </Circle>
              </Box>
            </Stack>
          </Box>
        </Container>

        {/* --- Section 2: What Flotector Does --- */}
        <Box py={10} px={4}>
          <Container maxW={'6xl'}>
            <VStack mb={12} textAlign={'center'}>
              <Heading as="h2" size="xl" color={BRAND_BLUE}>What Flotector Does</Heading>
              <Text fontSize={'lg'} color={'gray.500'}>A simple tool with a big impact</Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              <FeatureCard 
                title="Capture & Submit" 
                text="Users take a photo of floating waste using their phones."
                icon={FaCamera}
              />
              <FeatureCard 
                title="AI Detection" 
                text="The system uses the YOLOv11 model to identify the waste type and count."
                icon={FaRobot}
              />
              <FeatureCard 
                title="Geotag Mapping" 
                text="Detected waste is automatically pinned on a map."
                icon={FaMapMarkerAlt}
              />
              <FeatureCard 
                title="Heatmap View" 
                text="Shows hotspots where pollution is most severe."
                icon={FaFire}
              />
              <FeatureCard 
                title="Open Access Data" 
                text="Local communities and authorities can use the insights for cleanup planning, research, and policies."
                icon={FaDatabase}
              />
            </SimpleGrid>
          </Container>
        </Box>

        <Divider my={10} maxW="6xl" mx="auto" borderColor="gray.300" />

        {/* --- Section 3: How It Works --- */}
        <Container maxW={'4xl'} py={10} px={4}>
          <Heading as="h2" size="xl" mb={10} textAlign={'center'} color={BRAND_BLUE}>
            How It Works
          </Heading>
          <Stack spacing={6} bg={bgWhite} p={{ base: 6, md: 10 }} rounded={'xl'} shadow={'sm'} borderLeft={`5px solid ${BRAND_BLUE}`}>
            <StepItem number="1" title="User submits a photo through the web app." />
            <StepItem number="2" title="System extracts metadata such as location and date." />
            <StepItem number="3" title="AI model analyzes the image and identifies the waste." />
            <StepItem number="4" title="Results are saved into the database." />
            <StepItem number="5" title="Waste location appears on the heatmap, updating the community view in real time." />
          </Stack>
        </Container>

        {/* --- Section 4 & 5: Who It's For & Vision --- */}
        <Box bg={`${BRAND_BLUE}08`} py={20} px={4}>
          <Container maxW={'6xl'}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20}>
              
              {/* Who It's For */}
              <Box>
                <Heading as="h3" size="lg" mb={6} color={BRAND_BLUE}>
                  Who It’s For
                </Heading>
                <List spacing={5}>
                  <ListItem display={'flex'} alignItems={'start'}>
                    <ListIcon as={FaCheckCircle} color={BRAND_GREEN} mt={1} />
                    <Text fontSize={'lg'} color="gray.700">Concerned citizens who want cleaner waterways</Text>
                  </ListItem>
                  <ListItem display={'flex'} alignItems={'start'}>
                    <ListIcon as={FaCheckCircle} color={BRAND_GREEN} mt={1} />
                    <Text fontSize={'lg'} color="gray.700">Students and researchers studying waste patterns</Text>
                  </ListItem>
                  <ListItem display={'flex'} alignItems={'start'}>
                    <ListIcon as={FaCheckCircle} color={BRAND_GREEN} mt={1} />
                    <Text fontSize={'lg'} color="gray.700">Local government units (LGUs) planning cleanup operations</Text>
                  </ListItem>
                  <ListItem display={'flex'} alignItems={'start'}>
                    <ListIcon as={FaCheckCircle} color={BRAND_GREEN} mt={1} />
                    <Text fontSize={'lg'} color="gray.700">Environmental organizations identifying pollution hotspots</Text>
                  </ListItem>
                </List>
              </Box>

              {/* Our Vision */}
              <Box>
                <Heading as="h3" size="lg" mb={6} color={BRAND_BLUE}>
                  Our Vision
                </Heading>
                <Text fontSize={'xl'} fontStyle={'italic'} mb={6} color="gray.600" borderLeft={`4px solid ${BRAND_GREEN}`} pl={4}>
                  "We believe in a future where communities take part in caring for their environment."
                </Text>
                <Text fontSize={'lg'} color={'gray.700'}>
                  Flotector aims to encourage active environmental participation, provide transparent and accessible data, support evidence-based planning for cleanup, and strengthen collaboration between citizens and local authorities.
                </Text>
              </Box>

            </SimpleGrid>
          </Container>
        </Box>

        {/* --- Section 6: Call to Action --- */}
        <Box py={24} textAlign={'center'} px={4}>
          <Container maxW={'3xl'}>
            <Heading as="h2" size="xl" mb={6} color={BRAND_BLUE}>
              Join us in keeping our rivers clean.
            </Heading>
            <Text fontSize={'xl'} color={'gray.500'} mb={10}>
              Every photo submitted helps map the problem—and move us closer to real solutions.
            </Text>
            <Button
              size={'lg'}
              bg={BRAND_GREEN}
              color={'white'}
              _hover={{ bg: '#128a33', transform: 'scale(1.05)' }}
              _active={{ bg: '#0f752b' }}
              height={'60px'}
              px={10}
              fontSize={'xl'}
              rightIcon={<FaArrowRight />}
              boxShadow={'xl'}
            >
              Start Reporting Waste Now
            </Button>
          </Container>
        </Box>

      </Box>
    </Layout>
  );
};

export default About;