/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const useFetch = <T>(url : string):{ data: T[], loading: boolean } => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    axios.get(url)
      .then((res:AxiosResponse) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
  }, [url]);
  return { data, loading }
}
export default useFetch;
