import React from 'react';
import {VStack} from "@chakra-ui/react";
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Layout from '../components/Layout';
import BriefOverview from '../components/BriefOverview';

export default function Home() {
  return (
    <>
    <Layout>
      <Hero />
      <HowItWorks />
      <BriefOverview />
    </Layout>
    </>
  );
}