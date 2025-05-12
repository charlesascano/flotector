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
    
const WasteCard = ({ title, icon, description}) => {
  const { isOpen, onToggle } = useDisclosure();

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
      <CardHeader p={4}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Icon as={icon} boxSize={6} color="#053774" />
            <Text fontSize={{ base: "24px", sm: "24px", md: "24px" }} fontWeight="bold" color="#15A33D">
              {title.toUpperCase()}
            </Text>
          </Flex>
          <Icon as={InfoIcon} color="#053774" />
        </Flex>
      </CardHeader>

      <Collapse in={isOpen} animateOpacity>
        <CardBody bg="gray.50" borderTop="1px solid #0a2760" pt={2}>
          <Text fontSize="sm" color="gray.700">
            {description}
          </Text>
        </CardBody>
      </Collapse>
    </Card>
  );
};

export default WasteCard;