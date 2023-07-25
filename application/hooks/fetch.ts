import { ObjectAny } from "application/types";
import { useState, useEffect } from "react";

export const useGetJSON = (
  url: string
): {
  data: ObjectAny | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} => {
  const [data, setData] = useState<ObjectAny | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const callback = () => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  };

  useEffect(callback, [url]);

  return { data, loading, error, refetch: callback };
};

export const useGetJSONLazy = (
  url: string
): [
  () => void,
  { data: ObjectAny | null; loading: boolean; error: string | null }
] => {
  const [data, setData] = useState<ObjectAny | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callback = () => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  };

  return [callback, { data, loading, error }];
};
