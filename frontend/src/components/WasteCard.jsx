import {
  Card,
  CardBody,
  Flex,
  Text,
  Icon,
  Collapse,
  useDisclosure,
  CardHeader,
} from '@chakra-ui/react';
import { InfoIcon } from "@chakra-ui/icons";
import { FaRecycle, FaBoxOpen, FaSmoking, FaCog, FaWineBottle } from 'react-icons/fa';

// Waste type definitions
const wasteTypes = [
  {
    title: "Plastic",
    icon: FaRecycle,
    description:
      "Plastic wastes harm the environment by polluting oceans and harming wildlife. Recycle only accepted types, and make sure items are clean and dry to avoid contamination.",
  },
  {
    title: "Cardboard",
    icon: FaBoxOpen,
    description:
      "Cardboard takes up significant space in landfills and contributes to waste. Flatten and keep it dry before recycling to conserve resources and avoid contamination.",
  },
  {
    title: "Cigarette",
    icon: FaSmoking,
    description:
      "Cigarette butts contain toxic chemicals that pollute water and soil. Dispose of them in designated waste containers to prevent harm to the environment.",
  },
  {
    title: "Metal",
    icon: FaCog,
    description:
      "Metal objects can be recycled, reducing the need for raw materials and energy. Clean and sort metal items before recycling to ensure efficiency.",
  },
  {
    title: "Glass",
    icon: FaWineBottle,
    description:
      "Glass takes thousands of years to break down in landfills. Recycling glass reduces waste and conserves resources. Ensure it is clean and free from contaminants before recycling.",
  },
];

const WasteCard = ({ type }) => {
  const { isOpen, onToggle } = useDisclosure();

  const data = wasteTypes.find(waste => waste.title.toLowerCase() === type.toLowerCase());

  if (!data) return null;

  return (
    <Card
      variant="outline"
      borderColor="#0a2760"
      borderRadius="md"
      w="100%"
      onClick={onToggle}
      cursor="pointer"
      _hover={{ boxShadow: "md" }}
    >
      <CardHeader p={3}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Icon as={data.icon} boxSize={6} color="#053774" />
            <Text fontSize={{ base: "20px", sm: "20px", md: "20px" }} fontWeight="bold" color="#15A33D">
              {data.title.toUpperCase()}
            </Text>
          </Flex>
          <Icon as={InfoIcon} color="#053774" />
        </Flex>
      </CardHeader>

      <Collapse in={isOpen} animateOpacity>
        <CardBody bg="gray.50" borderTop="1px solid #0a2760" pt={2}>
          <Text fontSize="sm" color="gray.700">
            {data.description}
          </Text>
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default WasteCard;