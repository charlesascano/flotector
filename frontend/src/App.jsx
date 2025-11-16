import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Data from './pages/Data';
import Map from './pages/Map';
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import theme from './lib/theme';

function AppContent() {
  const location = useLocation();
  const background = location.state && location.state.background; // Check for background

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/data" element={<Data />} />
        <Route path="/map" element={<Map />} />
        <Route path="/results/:uuid" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* If background exists, render Results as an overlay */}
      {background && (
        <Routes>
          <Route path="/results/:uuid" element={<Results isOverlay={true} />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}

export default App;