import { ObjectAny } from "app/types";

export const PostJSON = async (
  url: string,
  body: ObjectAny,
  onError?: (e: Error) => void
) => {
  return await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .catch(typeof onError === "function" ? onError : () => {});
};

export const GetJSON = async (url: string, onError?: (e: Error) => void) => {
  return await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((r) => r.json())
    .catch(typeof onError === "function" ? onError : () => {});
};
