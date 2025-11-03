import React from 'react';
import {VStack} from "@chakra-ui/react";
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
    <Layout>
      <VStack spacing={0} pt="72px" align="stretch">
        <Hero />
        <HowItWorks />
      </VStack>
    </Layout>
    </>
  );
}