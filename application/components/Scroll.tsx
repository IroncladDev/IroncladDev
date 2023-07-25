import { useScrollRef } from "application/hooks/useScrollRef";
import { useScrollControl } from "application/hooks/useScroll";
import { ReactElement, useRef } from "react";
import { View } from "application/ui";
import { constrain } from "lib";
import {
  MotionValue,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";

export const ScrollControl = ({
  children,
  end = 0,
  inline,
  ...props
}: {
  children: (percentage: MotionValue<number>) => ReactElement;
  end?: number;
  inline?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollTop } = useScrollControl();
  const inView = useInView(containerRef);
  const percentage = useMotionValue(0);
  const scrollRef = useScrollRef();

  useMotionValueEvent(scrollTop, "change", () => {
    if (!inView || !scrollRef.current || !containerRef.current) return;

    const box = containerRef.current.getBoundingClientRect();
    const totalHeight = window.innerHeight - end;
    const scrollValue = (totalHeight - (Number(box?.top) - end)) / totalHeight;

    percentage.set(constrain(scrollValue, 0, 1));
  });

  return (
    <View
      css={inline ? { display: "inline" } : undefined}
      innerRef={containerRef}
      {...props}
    >
      {children(percentage)}
    </View>
  );
};
