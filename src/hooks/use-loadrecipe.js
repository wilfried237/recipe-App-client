// import { useEffect, useState } from 'react';
import {useQuery} from '@tanstack/react-query'
import axios from 'axios';

const useLoader = (url) => {
  const {data, isLoading, error} = useQuery({
    queryFn : async ()=>{ 
      const response = await axios.get(url);
      return response.data;
    },
    queryKey: ['recipe', url],
    staleTime: Infinity
  });
  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(url);
  //       setData(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // },[url]);

  return { data, isLoading, error };
};

export default useLoader;