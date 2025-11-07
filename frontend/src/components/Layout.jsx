import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <NavBar />

      {/* Spacer to push content below fixed navbar */}
      <Box h={{ base: '64px', md: '72px' }} flexShrink={0} />

      <Box as="main" flex="1">
        {children}
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
