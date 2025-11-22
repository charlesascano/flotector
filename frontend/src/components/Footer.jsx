import { Box, Flex, Stack, HStack, Image, Link, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import FlotectorLogo from '../assets/header-logo-svg/flotector_logo_horizontal_white.svg';
import { EmailIcon } from '@chakra-ui/icons';

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
    <Box bgGradient="linear(to-b, #053774, #042c5c)" color="white" py={10} px={5}>
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

      {/* Contact */}
      <Flex justify="center" mt={6}>
        <Stack spacing={1} textAlign="center">
          <Box fontSize="sm" opacity={0.9}>
            Have any questions? Email us:
          </Box>

          <HStack justify="center" spacing={2}>
            <EmailIcon boxSize={4} />
            <Link
              href="mailto:flotector.team@gmail.com"
              fontSize="sm"
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >
              flotector.team@gmail.com 
            </Link>
          </HStack>
        </Stack>
      </Flex>
      
    </Box>
  );
};

export default Footer;