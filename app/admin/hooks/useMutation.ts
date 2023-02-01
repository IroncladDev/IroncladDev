import { ObjectAny } from "app/types";
import { useState, useEffect } from "react";
import { PostJSON } from "../lib";

export default function useMutation(url: string, body: ObjectAny) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ObjectAny | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refetch = (jsonBody?: ObjectAny) => {
    const jsonRes = PostJSON(url, jsonBody || body, (e) => {
      setError(e.toString());
      setLoading(false);
    });

    jsonRes.then((res) => {
      try {
        JSON.parse(JSON.stringify(res));
        setData(res);
      } catch (e) {
        setError(e.toString());
      }
      setLoading(false);
    });

    return jsonRes;
  };

  useEffect(() => {
    refetch();
  }, []);

  return { loading, data, error, refetch };
}
