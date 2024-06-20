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

  return { data, isLoading, error };
};

export default useLoader;