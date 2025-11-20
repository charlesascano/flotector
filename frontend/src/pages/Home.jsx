import React from 'react';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import BriefOverview from '../components/BriefOverview';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <BriefOverview />
    </>
  );
}