import { Box, Flex, Stack, Image, Link, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import FlotectorLogo from '../assets/header-logo-svg/flotector_logo_horizontal_white.svg';

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "SUBMIT PHOTO", path: "/submit" },
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "OPEN DATA", path: "/data" },
    { name: "WASTE MAP", path: "/map" },
    { name: "CATALOG", path: "/catalog" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <Box bg="#053774" color="white" py={10} px={5}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        maxW="6xl"
        mx="auto"
        gap={6}
      >
        {/* Logo and Title */}
        <Flex align="center" mb={{ base: 4, md: 0 }}>
          <Image 
            src={FlotectorLogo} 
            alt="Flotector Logo" 
            h="65px"
            objectFit="contain" 
          />
        </Flex>

        {/* Navigation Links */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 2, md: 6 }}
          align="center"
        >
          {navItems.map((item) => (
            <Link
              as={RouterLink}     
              to={item.path}
              key={item.name}
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              {item.name}
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;