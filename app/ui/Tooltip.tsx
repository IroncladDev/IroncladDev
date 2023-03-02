import { useState, useEffect, useRef } from "react";
import { View, rcss, tokens, Text } from ".";

type TooltipAlignmentX = "center" | "left" | "right";
type TooltipAlignmentY = "center" | "top" | "bottom";

export const Tooltip = ({
  children,
  tooltip,
  align = ["center", "top"],
}: {
  children: React.ReactNode;
  tooltip: React.ReactNode | string;
  align?: [TooltipAlignmentX, TooltipAlignmentY];
}) => {
  const [mouseIn, setMouseIn] = useState(false);
  const [zIndex, setZindex] = useState(0);

  const tooltipRef = useRef<HTMLDivElement>(null);

  let top: string,
    left: string,
    tx: number,
    ty: number,
    mx: number = 0,
    my: number = 0;
  const [ax, ay] = align;

  switch (ax) {
    case "center":
      left = "50%";
      tx = -50;
      break;
    case "left":
      left = "0%";
      tx = -100;
      if (ay === "center") mx = -8;
      break;
    case "right":
      left = "100%";
      tx = 0;
      if (ay === "center") mx = 8;
      break;
  }

  switch (ay) {
    case "center":
      top = "50%";
      ty = -50;
      break;
    case "bottom":
      top = "100%";
      ty = 0;
      my = 8;
      break;
    case "top":
      top = "0%";
      ty = -100;
      my = -8;
      break;
  }

  useEffect(() => {
    if (tooltipRef?.current) {
      window.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const rect = tooltipRef?.current?.getBoundingClientRect();

        if (
          rect &&
          mouseX > rect.left &&
          mouseX < rect.right &&
          mouseY > rect.top &&
          mouseY < rect.bottom
        ) {
          setZindex(100);
          setMouseIn(true);
        } else {
          setZindex(0);
          setMouseIn(false);
        }
      });
    }
  }, [tooltipRef]);

  return (
    <View innerRef={tooltipRef} css={[rcss.position.relative]}>
      {children}
      <View
        css={[
          rcss.position.absolute,
          rcss.borderRadius(8),
          rcss.p(8),
          {
            background: tokens.backgroundHigher,
            border: `solid 1px ${tokens.backgroundHighest}`,
            left: `calc(${left} + ${mx}px)`,
            top: `calc(${top} + ${my}px)`,
            transform: `translate(${tx}%, ${ty}%) ${
              mouseIn ? "scale(1)" : "scale(0)"
            }`,
            opacity: mouseIn ? 1 : 0,
            overflow: "hidden",
            transition: "0.25s",
            zIndex,
          },
        ]}
      >
        {typeof tooltip === "string" ? (
          <Text variant="small">{tooltip}</Text>
        ) : (
          tooltip
        )}
      </View>
    </View>
  );
};
