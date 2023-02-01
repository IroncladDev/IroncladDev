import { ObjectAny, ObjectValueType } from "app/types";

export function indexObjectByString(
  obj: ObjectAny,
  str: string
): ObjectValueType {
  try {
    if (!str) return null;
    let keys = str.split(".");
    let current = obj;
    for (const i in keys) {
      current = current[keys[i]];
    }
    if (typeof current !== "object") {
      return current;
    }
  } catch (e) {
    return null;
  }
}

export function flattenObjectKeys(obj: object) {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] !== "object") {
      keys.push(key);
    }
    if (typeof obj[key] === "object") {
      const subkeys = flattenObjectKeys(obj[key]);
      keys = keys.concat(
        subkeys.map(function (subkey) {
          let output = key + "." + subkey;
          if (typeof obj[key][subkey] !== "object") {
            return output;
          }
        })
      );
    }
  }
  return keys;
}

export const generateId = () =>
  Math.random().toString(36) +
  Math.random()
    .toString(2 + Math.floor(Math.random() * 33))
    .slice(0, 24);
