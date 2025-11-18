import React, { useState } from 'react';
import { VStack, HStack, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import Layout from '../components/Layout';
import SubmissionsAnalytics from '../components/dashboard/SubmissionsAnalytics';
import WasteAnalytics from '../components/dashboard/WasteAnalytics';
import RecentSubmissions  from '../components/dashboard/RecentSubmissions';

export default function Dashboard() {
  const headingFontSize = useBreakpointValue({ base: "32px", md: "64px" });
  const subTextFontSize = useBreakpointValue({ base: "10px", md: "12px" });
  const refreshFontSize = useBreakpointValue({ base: "14px", md: "16px" });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  {/* --- Refresh button w/ real-time update description --- */}
  const handleRefresh = () => {
    setLastUpdated(new Date());
    // TODO: Add data fetching logic here if needed
  };

  return (
    <Layout>
      <VStack spacing="24px" px="32px" py="16px" align="stretch">
        <HStack justify="space-between" flexWrap="wrap">
          <VStack align="start" spacing="0">
            <Text color="#15A33D" fontSize={headingFontSize} fontWeight="800" wordBreak="break-word">
              DASHBOARD
            </Text>

            {/* --- Real-Time Update Description --- */}
            <Text color="#8E8E8E" fontSize={subTextFontSize} fontWeight="400" wordBreak="break-word">
              Last updated: {lastUpdated.toLocaleString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              })}
            </Text>
          </VStack>
          

          {/* --- Refresh Button --- */}
          <Button
            color="#053774"
            fontSize={refreshFontSize}
            fontWeight="700"
            variant="link"
            leftIcon={<FiRefreshCw />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </HStack>

        <SubmissionsAnalytics />
        <WasteAnalytics />
        <RecentSubmissions />
      </VStack>
    </Layout>
  );
}
