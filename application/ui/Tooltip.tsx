import { useState, useEffect, useRef } from "react";
import { View, rcss, tokens, Text } from ".";

type TooltipAlignmentX = "center" | "left" | "right";
type TooltipAlignmentY = "center" | "top" | "bottom";

export const Tooltip = ({
  children,
  tooltip,
  align = ["center", "top"],
  bg = tokens.backgroundHigher,
}: {
  children: React.ReactNode;
  tooltip: React.ReactNode | string;
  align?: [TooltipAlignmentX, TooltipAlignmentY];
  bg?: string;
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

  return (
    <View
      innerRef={tooltipRef}
      css={[rcss.position.relative]}
      onMouseEnter={() => {
        setZindex(100);
        setMouseIn(true);
      }}
      onMouseLeave={() => {
        setZindex(0);
        setMouseIn(false);
      }}
    >
      {children}
      <View
        css={[
          rcss.position.absolute,
          rcss.borderRadius(8),
          rcss.p(8),
          {
            background: bg,
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
