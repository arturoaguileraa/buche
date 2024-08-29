'use client';

import { useEffect } from 'react';
import api from '../api/api';

const ExamplePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/ruta-protegida');
        console.log('Protected data:', response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Check the console for fetched data.</h1>
    </div>
  );
};

export default ExamplePage;
