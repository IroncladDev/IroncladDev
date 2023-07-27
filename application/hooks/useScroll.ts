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

  const updateRefs = () => {
    if (!scrollRef.current) return;

    setInitialHeight(scrollRef.current.offsetHeight);
  };

  useEffect(() => {
    updateRefs();

    window.addEventListener("resize", updateRefs);

    return () => {
      window.removeEventListener("resize", updateRefs);
    };
  }, [scrollRef]);

  return {
    percentage: scrollYProgress,
    scrollTop: scrollY,
    initialHeight,
    scrollRef,
  };
}
