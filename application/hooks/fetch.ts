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

  useEffect(callback, []);

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

export const usePostJSON = ({
  url,
  body,
  onComplete,
  onError,
}: {
  url: string;
  body: ObjectAny;
  onComplete: (data: ObjectAny) => void;
  onError: (err: string) => void;
}): [
  (jsonBody?: ObjectAny) => void,
  { data: ObjectAny | null; loading: boolean; error: string | null }
] => {
  const [data, setData] = useState<ObjectAny | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callback = (jsonBody?: ObjectAny) => {
    setLoading(true);
    setError(null);

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(jsonBody || body),
    })
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        onComplete(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        onError(err.toString());
        setLoading(false);
      });
  };

  return [callback, { data, loading, error }];
};
