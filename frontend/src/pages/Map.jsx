import React, { useState, useEffect } from 'react';
import { Box, Spinner } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAGZSYlxM6plLsSAI2lsXpYlw-ZvxMPvTk';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 14.380000,
  lng: 120.940500
};

export default function Map() {
  const [locations, setLocations] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('flotector-data')
        .select('lat, lng, total_count, result_url');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLocations(data);
      }
    };

    fetchData();
  }, []);

  if (!isLoaded) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Layout>
    <Box pt="72px">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            icon={{
              url:
                location.total_count >= 5
                  ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  : 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }}
            onClick={() => {
              window.open(location.result_url, '_blank');
            }}
          />
        ))}
      </GoogleMap>
    </Box>
    </Layout>
  );
}
