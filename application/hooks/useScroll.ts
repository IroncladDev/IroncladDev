import { useScrollRef } from "./useScrollRef";
import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

export function useScrollControl() {
  const scrollRef = useScrollRef();
  const { scrollY, scrollYProgress } = useScroll({
    container: scrollRef,
    layoutEffect: false,
  });

  const [initialHeight, setInitialHeight] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return;

    setInitialHeight(scrollRef.current.offsetHeight);
    setOuterHeight(scrollRef.current.scrollHeight);
  }, [scrollRef]);

  return {
    percentage: scrollYProgress,
    scrollTop: scrollY,
    initialHeight,
    outerHeight,
    scrollRef,
  };
}
