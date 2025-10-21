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
import { FaRecycle, FaBoxOpen, FaSmoking, FaCog, FaWineBottle, FaTshirt, FaTrash } from 'react-icons/fa';

// Waste type definitions
/*
==== NEW WASTE TYPES (to be updated) ====
Plastic
Paper (kasama na dito cardboard)
Metal
Glass
Pile
Textile
*/

/*
Plastics can harm marine life and take centuries to decompose. Always clean and dry them before recycling, and check if your local facility accepts that type.",
  },

*/
const wasteTypes = [
  {
    title: "Plastic",
    icon: FaRecycle,
    description:
      "Includes bottles, sachets, and containers. Rinse, dry, and place in recycling bins to reduce pollution.",
  },
  {
    title: "Paper",
    icon: FaBoxOpen,
    description:
      "Includes papers, boxes, and cartons. Keep them dry and flattened before paper recycling.",
  },
    {
    title: "Metal",
    icon: FaCog,
    description:
      "Includes cans, aluminum containers, and metal scraps. Clean and separate before sending for recycling.",
  },
    {
    title: "Glass",
    icon: FaWineBottle,
    description:
      "Includes bottles, jars, and broken glass items. Clean them carefully and put them in glass-only bins. Handle with care to avoid injuries.",
  },
    {
    title: "Pile",
    icon: FaTrash,
    description:
      "A mix of different kinds of trash, such as plastics, papers, and food waste. Sort and segregate properly before disposal.",
  },
    {
    title: "Textile",
    icon: FaTshirt,
    description:
      "Includes old clothes and fabrics. Donate or recycle instead of throwing away.",
  }
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