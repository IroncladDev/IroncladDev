import { ReactElement, RefObject, useRef, useState, useEffect } from "react";
import { View } from "app/ui";
import useScroll from "app/hooks/useScroll";
import { constrain } from "lib";

export const Scroll = ({
  children,
  end = 0,
  scrollRef,
  inline,
  ...props
}: {
  children: (percentage: number, absolutePercentage: number) => ReactElement;
  end?: number;
  scrollRef: RefObject<HTMLDivElement>;
  inline?: boolean;
}) => {
  const { scrollTop } = useScroll(scrollRef);
  const elementRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);
  const [absolutePercentage, setAbsolutePercentage] = useState(0);

  useEffect(() => {
    const box = elementRef.current?.getBoundingClientRect();
    const totalHeight = window.innerHeight - end;
    const scrollValue = (totalHeight - (box.top - end)) / totalHeight;

    setPercentage(
      constrain(scrollValue, 0, 1)
    );

    setAbsolutePercentage(
      constrain(scrollValue, 0, scrollValue)
    );
  }, [scrollTop, end]);

  return (
    <View {...props} innerRef={elementRef} css={inline ? { display: 'inline' } : undefined}>
      {children(percentage, absolutePercentage)}
    </View>
  );
};
