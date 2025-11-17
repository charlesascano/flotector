import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

import AboutHero from '../components/about/AboutHero';
import Purpose from '../components/about/AboutPurpose';
import Background from '../components/about/AboutBackground';
import Features from '../components/about/AboutFeatures';
import Who from '../components/about/AboutWho';
import AboutCTA from '../components/about/AboutCTA';

import Layout from '../components/Layout';

// --- Main Component ---

const AboutPage = () => {
  const bgGray = useColorModeValue('gray.50', 'gray.900');

  return (
    <Layout>
      <Box bg={bgGray} minH="100vh" overflow="hidden">
        <AboutHero />
        <Purpose />
        <Background />
        <Features />
        <Who />
        <AboutCTA />
      </Box>
    </Layout>
  );
};

export default AboutPage;