export * from "./constrain";
export const age = () =>
  Math.abs(
    new Date(Date.now() - Date.parse("Nov 15 2005")).getUTCFullYear() - 1970
  );
