import { Box, Flex, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack, Link, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink} from "react-router-dom";
import FlotectorLogo from '../assets/header-logo-svg/flotector_logo_horizontal_white.svg';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "SUBMIT PHOTO", path: "/submit" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "OPEN DATA", path: "/data" },
    { name: "WASTE MAP", path: "/map" },
    { name: "ABOUT", path: "/about" },
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
      zIndex={100}
      >  
        <Flex justifyContent="space-between" align="center">
          <RouterLink to="/">
            <Image 
              src={FlotectorLogo} 
              alt="Flotector Logo" 
              h="45px"
              objectFit="contain" 
            />
          </RouterLink>    
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
                <Link
                  as={RouterLink}
                  key={item.name}
                  to={item.path}
                  fontWeight="medium"
                  fontSize="xl"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
