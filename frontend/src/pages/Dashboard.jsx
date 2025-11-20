import { useState, useEffect, useCallback } from 'react';
import { 
  VStack, 
  HStack, 
  Text, 
  Button, 
  useBreakpointValue, 
  useToast,
  Spinner
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";

// Layout & Components
import Layout from '../components/Layout';
import SubmissionsAnalytics from '../components/dashboard/SubmissionsAnalytics';
import WasteAnalytics from '../components/dashboard/WasteAnalytics';
import RecentSubmissions from '../components/dashboard/RecentSubmissions';

export default function Dashboard() {
  // --- UI Responsive Styles ---
  const headingFontSize = useBreakpointValue({ base: "32px", md: "64px" });
  const subTextFontSize = useBreakpointValue({ base: "10px", md: "12px" });
  const refreshFontSize = useBreakpointValue({ base: "14px", md: "16px" });
  
  // --- State Management ---
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState('Last 7 days');
  const [dashboardData, setDashboardData] = useState(null);
  
  const toast = useToast();

  // --- Helper: Calculate Date Range ---
  const getDateRange = useCallback((filter) => {
    const end = new Date();
    const start = new Date();
    
    if (filter === 'Today') {
      start.setHours(0, 0, 0, 0);
    } else if (filter === 'Last 7 days') {
      start.setDate(end.getDate() - 7);
    } else if (filter === 'This Month') {
      start.setDate(1); // 1st of current month
    }
    
    // Format to YYYY-MM-DD for the API
    const formatDate = (d) => d.toISOString().split('T')[0];
    
    return {
      start: formatDate(start),
      end: formatDate(end)
    };
  }, []);

  // --- API Fetch Function (UPDATED WITH SMART LOGIC) ---
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { start, end } = getDateRange(filterType);
      
      console.log(`Fetching range: ${start} to ${end}`); 
      
      // NOTE: Ensure this URL matches your Flask backend
      const response = await fetch(`http://localhost:5000/api/dashboard/summary?startDate=${start}&endDate=${end}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log("API RAW RESULT:", result); // Debug log to see what backend sends
      
      let finalData = null;

      // 1. Check if backend returned the "No metrics" string message
      if (result.data === "No metrics available for the selected range.") {
        console.warn("Backend reported no data for this range.");
        setDashboardData(null); // Clear data so UI shows 0s
        setLastUpdated(new Date());
        return;
      }

      // 2. Smart Unwrapping
      if (result.data && typeof result.data === 'object') {
        // Case A: Backend sends { data: { overall_totals: ... } }
        finalData = result.data;
      } else if (result.overall_totals) {
         // Case B: Backend sends { overall_totals: ... } directly
         finalData = result;
      }

      if (result.data && typeof result.data === 'object') {
        finalData = result.data;
      } else if (result.overall_totals) {
        finalData = result;
      }

      // 🔹 DEBUG: Log top hotspots right after finalData is set
      console.log("Parsed dashboard data:", finalData);
      console.log("Top hotspots array:", finalData?.top_hotspots);

      // 3. State Update
      if (finalData) {
        setDashboardData(finalData);
        setLastUpdated(new Date());
      } else {
        console.warn("Data structure mismatch. Received:", result);
        // Don't throw error here to prevent crashing, just let it be empty
        setDashboardData(null);
      }

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
    fetchDashboardData();
  }, [fetchDashboardData]);

  // --- Safe Data Accessors ---
  // Defaults prevent crashes if dashboardData is null
  const stats = dashboardData || {};
  const overall = stats.overall_totals || {};
  const topHotspot = (stats.top_hotspots && stats.top_hotspots.length > 0) 
    ? stats.top_hotspots[0] 
    : {};

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
            onClick={fetchDashboardData}
            isDisabled={isLoading}
          >
            Refresh
          </Button>
        </HStack>

        {/* --- 1. Submissions Analytics Section --- */}
        <SubmissionsAnalytics 
          totalSubmissions={overall.total_submissions}
          graphData={stats.submissions_over_time || []}
        />

        {/* --- 2. Waste Analytics Section (Controls Filters) --- */}
        <WasteAnalytics 
           // Summary Cards
           overallDetection={overall.total_detected_wastes}
           wasteType={stats.top_waste_type?.waste_class}
           topHotspot={topHotspot}
           
           // Charts Data
           donutData={stats.waste_breakdown || []}
           locationData={stats.detection_counts_per_city || []}
           
           // Filter State
           currentFilter={filterType}
           onFilterChange={setFilterType}
        />

        {/* --- 3. Recent Submissions (Static for now) --- */}
        <RecentSubmissions />

      </VStack>
    </Layout>
  );
}