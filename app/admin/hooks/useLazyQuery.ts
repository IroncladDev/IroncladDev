import { ObjectAny } from "app/types";
import { useState } from "react";
import { GetJSON } from "../lib";

type LazyQueryOutput = [
  () => void,
  {
    loading: boolean;
    data: ObjectAny;
    error: string;
  }
];

export default function useLazyQuery(url: string): LazyQueryOutput {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ObjectAny | null>(null);
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

  return [refetch, { loading, data, error }];
}
