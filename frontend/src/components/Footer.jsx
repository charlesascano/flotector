import { Box, Flex, Stack, Image, Link, Text, useBreakpointValue } from '@chakra-ui/react';

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

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
          <Text fontSize="lg" fontWeight="bold">FLOTECTOR</Text>
        </Flex>

        {/* Navigation Links */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 2, md: 6 }}
          align="center"
        >
          {['HOME', 'GET INVOLVED', 'OPEN DATA', 'WASTE MAP', 'ANALYTICS', 'ABOUT', 'HELP'].map((link) => (
            <Link
              key={link}
              href={`${link.toLowerCase().replace(' ', '-')}`}
              fontSize="sm"
              _hover={{ textDecoration: 'underline' }}
            >
              {link}
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;