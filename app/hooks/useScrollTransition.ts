import { RefObject, useEffect, useState } from "react";
import { constrain } from "lib";

export default function useScrollTransition({
  refs,
  trigger,
  pointTo,
}: {
  refs: Array<RefObject<any>>;
  trigger: number;
  pointTo: number;
}) {
  const [scrollPositions, setScrollPositions] = useState<Array<number>>([]);
  useEffect(() => {
    setScrollPositions((_) => {
      const positions = [];
      for (const ref of refs) {
        if (ref?.current) {
          const box = ref.current?.getBoundingClientRect();
          const totalHeight = window.innerHeight - pointTo;
          positions.push(
            box?.top
              ? constrain(
                  (totalHeight - (box.top - pointTo)) / totalHeight,
                  0,
                  1
                )
              : null
          );
        }
      }
      return positions;
    });
  }, [trigger]);

  return scrollPositions;
}
