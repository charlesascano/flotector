import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Data from './pages/Data';
import Map from './pages/Map';
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Layout from './components/Layout';
import theme from './theme/theme';
import ScrollToTop from "./components/ScrollToTop";

function AppContent() {
  const location = useLocation();
  const background = location.state && location.state.background; // Check for background

  return (
    <>
      <ScrollToTop />
      <Routes location={background || location}>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/data" element={<Layout><Data /></Layout>} />
        <Route path="/map" element={<Layout><Map /></Layout>} />
        <Route path="/results/:uuid" element={<Layout><Results /></Layout>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<Layout><About/></Layout>} />
        <Route path="/catalog" element={<Layout><Catalog /></Layout>} />
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