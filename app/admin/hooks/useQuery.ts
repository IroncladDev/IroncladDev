import { ObjectAny } from "app/types";
import { useState, useEffect } from "react";
import { GetJSON } from "../lib";

export default function useQuery<T=ObjectAny>(url: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    GetJSON(url, (e) => {
      setError(e.toString());
      setLoading(false);
    }).then((res) => {
      try {
        JSON.parse(JSON.stringify(res));
        setData(res);
      } catch (e) {
        setError(e.toString());
      }
      setLoading(false);
    });
  };

  useEffect(refetch, []);

  return { loading, data, error, refetch };
}
