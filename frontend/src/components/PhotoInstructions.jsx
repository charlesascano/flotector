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
  Image,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { FcOldTimeCamera } from "react-icons/fc";
import { FaLongArrowAltRight } from "react-icons/fa";
import suboptimal from "../assets/exmpl.webp";
import optimal from "../assets/exmpl-crp.webp";
import { HiCheck } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

function PhotoInstructions({ ...props }) {
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
          How to Take the Best Photos for Our AI Model
        </Text>
        <Text
          color="#053774"
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="400"
          lineHeight="tall"
          textAlign="center"
        >
            Clear photos help us detect floating waste better. While <Text as="span" fontWeight="700">optional</Text>, we highly 
            recommend following these <Text as="span" fontWeight="700">three simple tips</Text> when 
            taking a picture for the best results.
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
                <Icon as={FcOldTimeCamera} w="24px" h="24px" color="#1D1D1F" />
                <Text
                  flex="1"
                  textAlign="left"
                  color="#053774"
                  fontSize={{ base: "xs", md: "sm", lg: "lg" }}
                  fontWeight="700"
                >
                  A Quick Guide for Better Photos
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
              {/* --- STEPS --- */}
                <OrderedList
                fontWeight="400"
                lineHeight="tall"
                color="black"
                spacing={3}
                px={6} // Optional: Adds padding to align with accordion text
                >
                    <ListItem>
                        <Text as="span" fontWeight="700">
                        Fill the Frame with the Waste.
                        </Text>
                        {" "}
                        From a safe distance, zoom in so the object (like a bottle, can, or bag) 
                        takes up most of the picture and avoid too much background.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="700">
                        Keep Your Subject in Focus.
                        </Text>
                        {" "}
                        Make sure your photo is sharp and clear, not blurry. Before you
                        take the picture, tap on the waste item on your phone's screen to
                        focus on it.
                    </ListItem>
                    <ListItem>
                        <Text as="span" fontWeight="700">
                        Use the 1:1 (Square) Ratio.
                        </Text>
                        {" "}
                        For the best results, switch your camera to a 1:1 or "Square"
                        setting. Our AI model is optimized for square images, and this ratio
                        improves its accuracy.
                    </ListItem>
                </OrderedList>
              
              {/* --- Example image ---*/}
              <Grid templateColumns={"repeat(7, 1fr)"} alignItems={"center"} justifyItems={"center"} rowGap={2}>
                <GridItem colSpan={3} position={'relative'}>
                    <Image src={suboptimal} alt="Example of a suboptimal photo" borderRadius={4}/>
                </GridItem>

                <Box >
                    <FaLongArrowAltRight size={40}/>
                </Box>
                

                <GridItem colSpan={3} rowSpan={1} position={'relative'} height={"100%"} display={"flex"}>
                  <Image src={suboptimal} alt="Example of a suboptimal photo" opacity={0.25} position={"absolute"} borderRadius={4}/>
                  <Image src={optimal} alt="Example of an optimal photo" borderRadius={4} zIndex={2} alignSelf={"center"} borderWidth={"2px"} borderStyle={"dashed"} borderColor={"blackAlpha.700"}/>
                </GridItem>
                
                <GridItem colSpan={3} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={2} width={"100%"}>
                  <Box
                    padding={1.5}
                    borderRadius={8}
                    bgColor={'red.600'}
                    >
                        <RxCross1 color={"white"} strokeWidth={"2px"} />
                    </Box>
                </GridItem>

                <GridItem>
                    {/* spacer */}
                </GridItem>

                <GridItem colSpan={3} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={2} width={"100%"}>
                  <Box
                    padding={1.5}
                    borderRadius={8}
                    bgColor={'green.600'}
                    >
                        <HiCheck color={"white"} strokeWidth={"3px"} />
                    </Box>
                </GridItem>
              </Grid>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        
      </Accordion>
    </VStack>
  );
}

export default PhotoInstructions;