import { useEffect, useState } from "react";

const Delay = 1000; // ms

// Replace with a real API client once we have a back end.
export default function useFakeApi(method, url, dummyData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Sending a request to back end: ", method, url);
    setTimeout(() => {
      console.log("Obtained result: ", dummyData);
      setData(dummyData);
      setLoading(false);
    }, Delay);
  }, []);

  return [{ data, loading, error: null }];
}
