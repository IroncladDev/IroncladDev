import { useState, useEffect, RefObject, UIEvent } from "react";

export default function useScroll(ref: RefObject<HTMLDivElement>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const current = ref.current;

    if (current) {
      const callback = () => {
        if (typeof current.scrollHeight === "number") {
          setOuterHeight(current.scrollHeight);
          setScrollTop(current.scrollTop);
          setInitialHeight(current.offsetHeight);
          setPercentage(
            current.scrollTop / (current?.scrollHeight - current.offsetHeight)
          );
        }
      };
      callback();
      current.addEventListener("scroll", callback);
      window.addEventListener("resize", callback);

      return () => {
        window.removeEventListener("resize", callback);
        current.removeEventListener("scroll", callback);
      };
    }
  }, [ref]);

  return { scrollTop, outerHeight, percentage, initialHeight };
}
