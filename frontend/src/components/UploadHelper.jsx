import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Text,
  HStack,
  Icon,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { IoLogoApple, IoLogoAndroid } from "react-icons/io5";

function UploadHelper({ ...props }) {
  return (
    <VStack
      {...props} //Styles from parent
      w="100%"
      py={{ base: 6, md: 8 }}
      px={{ base: 5, md: 6 }}
      spacing={{ base: 4, md: 5 }}
      align="stretch"
      fontSize={{ base: "xs", md: "sm", lg: "md" }}
    >
      {/* --- Header --- */}
      <VStack spacing="2">
        <Text
          color="#053774"
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="700"
          textAlign="center"
        >
          Before You Upload
        </Text>
        <Text
          color="#053774"
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="400"
          lineHeight="tall"
          textAlign="center"
        >
          Before submitting, make sure your photo includes location data
          (metadata) so our system can accurately detect and map the waste. Follow
          these quick steps to <Text as="span" fontWeight="700">check your camera settings.</Text>
        </Text>
      </VStack>
      
      {/* --- Accordion --- */}
      <Accordion allowToggle w="100%">
        {/* --- iOS Item --- */}
        <AccordionItem border="none">
          <h2>
            <AccordionButton
              py="3"
              borderBottom="1px solid"
              borderColor="rgba(0, 0, 0, 0.09)"
              _hover={{ bg: "gray.50" }}
            >
              <HStack flex="1" spacing="8px">
                <Icon as={IoLogoApple} w="27px" h="26px" color="#1D1D1F" />
                <Text
                  flex="1"
                  textAlign="left"
                  color="#053774"
                  fontSize={{ base: "xs", md: "sm", lg: "lg" }}
                  fontWeight="700"
                >
                  For iOS Users (iPhone & iPad)
                </Text>
              </HStack>
              <AccordionIcon color="#053774" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            p="4"
            bg="#F6F6F6"
            borderBottomRadius="6px"
          >
            <VStack align="stretch" spacing="4">
              <Text
                fontWeight="400"
                color="black"
              >
                Allow the Camera app to use your{" "}
                <Text as="span" fontWeight="700">
                  Location Services
                </Text>
                .
              </Text>

              {/* --- STEPS --- */}
              <OrderedList
                fontWeight="400"
                lineHeight="tall"
                color="black"
                spacing={1}
                pl="1.25rem"
              >
                <ListItem>Open Settings → Privacy & Security → Location Services.</ListItem>
                <ListItem>Make sure Location Services is ON.</ListItem>
                <ListItem>Find and Tap Camera → Allow Location Access.</ListItem>
                <ListItem>
                  Under Allow Location Access, choose “
                  <Text as="span" fontStyle="italic">
                    While Using
                  </Text>
                  ”
                </ListItem>
              </OrderedList>
              
              {/* --- TIP TEXT ---*/}
              <Text
                fontWeight="400"
                lineHeight="tall"
                color="black"
              >
                <Text as="span" fontStyle="italic" fontWeight="700">
                  Tip
                </Text>
                <Text as="span" fontStyle="italic">
                  : You can check if a photo has location data by swiping up on it
                  or tapping the info (ⓘ) in your Photos app — you’ll see
                  location details and a small map if it’s enabled.
                </Text>
              </Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* --- Android Item --- */}
        <AccordionItem border="none">
          <h2>
            <AccordionButton
              py="3"
              borderBottom="1px solid"
              borderColor="rgba(0, 0, 0, 0.09)"
              _hover={{ bg: "gray.50" }}
            >
              <HStack flex="1" spacing="8px">
                <Icon as={IoLogoAndroid} w="20px" h="22px" color="#A4C639" />
                <Text
                  flex="1"
                  textAlign="left"
                  color="#053774"
                  fontSize={{ base: "xs", md: "sm", lg: "lg" }}
                  fontWeight="700"
                >
                  For Android Users
                </Text>
              </HStack>
              <AccordionIcon color="#053774" />
            </AccordionButton>
          </h2>
          <AccordionPanel
            p="4"
            bg="#F6F6F6"
            borderBottomRadius="6px"
          >
            <VStack align="stretch" spacing="4">
              {/* Section a */}
              <Box>
                <Text
                  fontWeight="400"
                  color="black"
                >
                  a. Enable location tagging{" "}
                  <Text as="span" fontWeight="700">
                    via Camera app.
                  </Text>
                </Text>
                <OrderedList
                  fontWeight="400"
                  lineHeight="tall"
                  color="black"
                  spacing={1}
                  pl="1.25rem"
                  mt="2"
                >
                  <ListItem>
                    Open your Camera app → Settings
                    <OrderedList pt={1} pl="1.25rem" listStyleType="lower-alpha">
                      <ListItem>Look for a gear icon or a "Settings" menu option.</ListItem>
                    </OrderedList>
                  </ListItem>
                  <ListItem>
                    Find Location toggle, commonly labeled "Location tags", "Save
                    location”, or "GPS tag".
                  </ListItem>
                  <ListItem>
                    Toggle the switch to ‘On’.
                    <OrderedList pt={1} pl="1.25rem" listStyleType="lower-alpha">
                      <ListItem>If this setting is disabled, the phone’s location service might be off, or you may need to follow Method B (under
                    Permissions) to grant the permission first.</ListItem>
                    </OrderedList>
                  </ListItem>
                </OrderedList>
              </Box>

              {/* Section b */}
              <Box>
                <Text
                  fontWeight="400"
                  color="black"
                >
                  b. Allow the Camera app to enable location tagging{" "}
                  <Text as="span" fontWeight="700">
                    under Permissions.
                  </Text>
                </Text>
                <OrderedList
                  fontWeight="400"
                  lineHeight="tall"
                  color="black"
                  spacing={1}
                  pl="1.25rem"
                  mt="2"
                >
                  <ListItem>Open Settings → Applications → See all apps / App list.
                    <OrderedList pt={1} pl="1.25rem" listStyleType="lower-alpha">
                      <ListItem>It is called 
                        <Text as="span" fontStyle="italic"> Apps or Application Management</Text>{" "}
                     on some phones.</ListItem>
                    </OrderedList>
                  </ListItem>
                  <ListItem>Camera → Permissions → Location.</ListItem>
                  <ListItem>
                    To enable geotagging, select "
                    <Text as="span" fontStyle="italic">
                      Allow only while using the app
                    </Text>
                    ".
                  </ListItem>
                </OrderedList>
              </Box>
              
              {/* --- TIP TEXT ---*/}
              <Text
                fontWeight="400"
                lineHeight="tall"
                color="black"
              >
                <Text as="span" fontStyle="italic" fontWeight="700">
                  Tip
                </Text>
                <Text as="span" fontStyle="italic">
                  : You can confirm if a photo has location data by tapping
                  Info (ⓘ) or Details in your Gallery.
                </Text>
              </Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}

export default UploadHelper;