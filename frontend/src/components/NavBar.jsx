import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink} from "react-router-dom";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "GET INVOLVED", path: "/submit" },
    { name: "OPEN DATA", path: "/data" },
    { name: "WASTE MAP", path: "/map" },
    { name: "ABOUT", path: "/" },
  ];

  return (
    <>
      <Box 
      bg="#053774" 
      position="fixed"
      p={4}
      color="white" 
      top="0" 
      left="0" 
      right="0"
      >  
        <Flex justifyContent="space-between" align="center">
          <Box fontWeight="bold" fontSize="xl">
            FLOTECTOR
          </Box>
          <IconButton
            icon={<HamburgerIcon />}
            variant="ghost"
            color="white"
            fontSize="3xl"
            onClick={onOpen}
            aria-label="Open menu"
          />
        </Flex>
      </Box>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent bg="#053774" color="white">
          <DrawerCloseButton fontSize="lg"/>
          <DrawerBody>
            <VStack align="start" spacing={6} mt="80px">
              {navItems.map((item) => (
                <RouterLink key={item.name} to={item.path}>
                  <Link fontWeight="medium" fontSize="xl" onClick={onClose}>
                    {item.name}
                  </Link>
                </RouterLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
