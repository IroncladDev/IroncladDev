import { ScrollContext } from "application/state";
import { useContext } from "react";

export const useScrollRef = () => {
  const scrollRef = useContext(ScrollContext);

  if (!scrollRef) {
    throw new Error("useScrollRef must be used within ScrollContext.Provider");
  }

  return scrollRef;
};
