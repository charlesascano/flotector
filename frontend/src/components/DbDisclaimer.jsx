import { 
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

const DbDisclaimer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Sticky Disclaimer Button */}
      <Button
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={1000}
        colorScheme="blue"
        leftIcon={<InfoIcon />}
        onClick={onOpen}
      >
        Disclaimer
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW={{ base: "90%", sm: "600px" }} 
        >
          <ModalHeader>Disclaimer</ModalHeader>
          
          <ModalBody>
            <VStack align="start" spacing={3} fontSize="sm" color="blue.900">
              <Box>
                <Text fontWeight="semibold">1. Participation Coverage</Text>
                <Text opacity={0.9}>
                  Data comes from voluntary user submissions, so some areas may have more reports simply because more users visit them. Fewer submissions don’t necessarily mean less waste. The system still provides useful coverage across locations.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold">2. Visibility Bias</Text>
                <Text opacity={0.9}>
                  Data reflects what citizens notice and care about, not the full waste distribution. Easily visible or accessible areas may be overrepresented, while hidden or less frequented locations may be underreported.
                </Text>
              </Box>

              <Box>
                <Text fontWeight="semibold">3. Impact Dependency</Text>
                <Text opacity={0.9}>
                  The platform collects citizen inputs to raise awareness of floating waste but cannot guarantee institutional action. Actual cleanup depends on authorities or community follow-up. The system still provides actionable insights for monitoring and advocacy.
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="flex-end">
            <Button colorScheme="blue" onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DbDisclaimer;
