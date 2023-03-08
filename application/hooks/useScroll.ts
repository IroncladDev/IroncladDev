import { useState, useEffect, RefObject, UIEvent } from "react";

export default function useScroll(ref: RefObject<HTMLDivElement>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (ref?.current) {
      const callback = () => {
        if (typeof ref.current?.scrollHeight === "number") {
          setOuterHeight(ref.current?.scrollHeight);
          setScrollTop(ref.current?.scrollTop);
          setInitialHeight(ref.current?.offsetHeight);
          setPercentage(
            ref.current?.scrollTop /
              (ref.current?.scrollHeight - ref.current?.offsetHeight)
          );
        }
      };
      callback();
      ref.current.addEventListener("scroll", callback);
      window.addEventListener("resize", callback);
    }
  }, [ref]);

  return { scrollTop, outerHeight, percentage, initialHeight };
}
