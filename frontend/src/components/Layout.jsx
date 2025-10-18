import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <NavBar />
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  );
};

export default Layout;