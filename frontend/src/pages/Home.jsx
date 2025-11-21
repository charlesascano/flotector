import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import BriefOverview from '../components/BriefOverview';
import Layout from '../components/Layout';

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