import { useState, useEffect, useCallback } from 'react';
import { 
  VStack, 
  HStack, 
  Text, 
  Button, 
  useBreakpointValue, 
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

// Layout & Components
import Layout from '../components/Layout';
import SubmissionsAnalytics from '../components/dashboard/SubmissionsAnalytics';
import WasteAnalytics from '../components/dashboard/WasteAnalytics';
import RecentSubmissions from '../components/dashboard/RecentSubmissions';

import DbDisclaimer from '../components/dbDisclaimer';


export default function Dashboard() {
  // --- UI Responsive Styles ---
  const headingFontSize = useBreakpointValue({ base: "32px", md: "64px" });
  const subTextFontSize = useBreakpointValue({ base: "10px", md: "12px" });
  const refreshFontSize = useBreakpointValue({ base: "14px", md: "16px" });
  
  // --- State Management ---
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('Last 7 days');
  const [submFilterType, setSubmFilterType] = useState('Last 7 days');
  const [submissionData, setSubmissionData] = useState(null);
  const [wasteAnalyticsData, setWasteAnalyticsData] = useState(null);
  
  const toast = useToast();

  function getUrl() {
    return import.meta.env.VITE_FLOTECTOR_API || "http://localhost:5000";
  }

  // --- Helper: Calculate Date Range ---
  const getDateRange = useCallback((filter) => {
    // 1. Helper to safely format dates
    const formatDate = (d) => (d instanceof Date ? d.toISOString().split('T')[0] : '');

    // 2. Check if 'filter' is actually the Custom Range Array [start, end]
    if (Array.isArray(filter) && filter.length > 0) {
      return {
        start: formatDate(filter[0]),
        end: formatDate(filter[1] || filter[0]) // Use start date if end is missing
      };
    }

    // 3. Existing String Logic
    const end = new Date();
    const start = new Date();

    if (filter === 'Today') {
      start.setHours(0, 0, 0, 0);
    } else if (filter === 'Last 7 days') {
      start.setDate(end.getDate() - 7);
    } else if (filter === 'This Month') {
      start.setDate(1); 
    }
    
    return {
      start: formatDate(start),
      end: formatDate(end)
    };
  }, []);

  const refreshData = () => {
    fetchWasteAnalytics();
    fetchSubAnalytics();
  }

   // --- API Fetch Function (UPDATED WITH SMART LOGIC) ---
  const fetchSubAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const { start, end } = getDateRange(submFilterType);
      
      console.log(`Submission Fetching range: ${start} to ${end}`); 
      
      // NOTE: Ensure this URL matches your Flask backend
      const response = await fetch(`${getUrl()}/api/dashboard/submissions?start_date=${start}&end_date=${end}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const result = await response.json();
      setSubmissionData(result.data[0]);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast({
        title: "Error loading dashboard",
        description: "Could not fetch latest data. Check console for details.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [submFilterType, getDateRange, toast]);

  useEffect(() => {
    fetchSubAnalytics();
  }, [fetchSubAnalytics]);

  // --- API Fetch Function (UPDATED WITH SMART LOGIC) ---
  const fetchWasteAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const { start, end } = getDateRange(filterType);
      
      console.log(`Waste Analytics Fetching range: ${start} to ${end}`); 
      
      // NOTE: Ensure this URL matches your Flask backend
      const response = await fetch(`${getUrl()}/api/dashboard/waste-analytics?start_date=${start}&end_date=${end}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const result = await response.json();
      setWasteAnalyticsData(result);

    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast({
        title: "Error loading dashboard",
        description: "Could not fetch latest data. Check console for details.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [filterType, getDateRange, toast]);

  // --- Effect: Fetch on Mount & Filter Change ---
  useEffect(() => {
    fetchWasteAnalytics();
  }, [fetchWasteAnalytics]);

  return (
    <Layout>
      <VStack spacing="24px" px="32px" py="16px" align="stretch">
        
        {/* --- Header & Refresh --- */}
        <HStack justify="space-between" flexWrap="wrap">
          <VStack align="start" spacing="0">
            <Text color="#15A33D" fontSize={headingFontSize} fontWeight="800" wordBreak="break-word">
              DASHBOARD
            </Text>
            <HStack spacing={2}>
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
              {isLoading && <Spinner size="xs" color="#15A33D" />}
            </HStack>
          </VStack>

          <Button
            color="#053774"
            fontSize={refreshFontSize}
            fontWeight="700"
            variant="link"
            leftIcon={<FiRefreshCw />}
            onClick={refreshData}
            isDisabled={isLoading}
          >
            Refresh
          </Button>
        </HStack>

        <DbDisclaimer />

        {/* --- 1. Submissions Analytics Section --- */}
        <SubmissionsAnalytics 
          data={submissionData}
          currentFilter={submFilterType}
          onFilterChange={setSubmFilterType}
        />

        {/* --- 2. Waste Analytics Section (Controls Filters) --- */}
        <WasteAnalytics 
           // Summary Cards
                data={wasteAnalyticsData}
                currentFilter={filterType}
                onFilterChange={setFilterType}
        />

        {/* --- 3. Recent Submissions --- */}
        <RecentSubmissions />

      </VStack>
    </Layout>
  );
}