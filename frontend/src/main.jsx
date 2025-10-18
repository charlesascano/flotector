import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css"; 
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)