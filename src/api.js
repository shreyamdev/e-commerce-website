// src/api.js
import { useEffect, useState } from 'react';

export const useFetchDrops = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching drops:", error);
      }
    };

    fetchData();
  }, []);

  return data;
};