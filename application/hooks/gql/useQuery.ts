import { QueryInput, QueryOutput, GraphInput } from "./types";
import { useState, useEffect } from "react";
import { ObjectAny } from "application/types";

// Queries graphql
export const useQuery = ({
  query,
  variables,
  onComplete,
  onError,
  hold = false,
}: QueryInput): QueryOutput => {
  const [data, setData] = useState<ObjectAny | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = (vars?: ObjectAny) => {
    let vsobj: GraphInput = {
      query,
    };
    if (variables || vars) {
      vsobj.variables = vars ? { ...variables, ...vars } : variables;
    }
    setLoading(true);
    fetch("/api/gql", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vsobj),
    })
      .then((res) => res.json())
      .then(({ data, errors }) => {
        if (errors) {
          setError(errors[0].message);
          if (onError && typeof onError === "function") {
            onError(errors[0].message);
          } else {
            throw errors[0].message;
          }
        } else {
          setData(data);
          if (onComplete && typeof onComplete === "function") {
            onComplete(data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        if (onError && typeof onError === "function") {
          onError(err);
        } else {
          throw err;
        }
      });
  };

  useEffect(() => {
    if (!hold) {
      refetch();
    }
  }, [hold]);

  return { data, loading, error, refetch };
};
