import { createContext, RefObject } from "react";

export const ScrollContext = createContext<RefObject<HTMLDivElement> | null>(
  null
);
