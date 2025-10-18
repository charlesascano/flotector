import React from 'react';
import {Box,Flex} from "@chakra-ui/react";
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
    <Layout>
      <Box pt="72px">
        <Hero />
        <HowItWorks />
      </Box>
    </Layout>
    </>
  );
}