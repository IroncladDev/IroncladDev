import { ObjectAny } from "application/types";

export const GetJSON = async (url: string, bearer?: string) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearer}`,
    },
  }).then((r) => r.json());
};

export const PostJSON = async (url: string, body: ObjectAny) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }).then((r) => r.json());
};
