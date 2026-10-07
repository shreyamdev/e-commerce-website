import { useEffect, useState } from 'react';
import { api } from './api/httpClient';

export const useFetchDrops = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let active = true;
    api.get('/products')
      .then((response) => {
        if (active) setData(response.products || []);
      })
      .catch((error) => console.error('Error fetching drops:', error));
    return () => { active = false; };
  }, []);

  return data;
};
