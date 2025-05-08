import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Data from './pages/Data';
import Map from './pages/Map';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/data" element={<Data />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
