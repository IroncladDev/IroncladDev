import { ReactNode, RefObject } from "react";
import { tokens, rcss } from ".";

export const IconButton = ({
  children,
  elevation = "root",
  elevationColor,
  innerRef,
  onClick,
  ...props
}: {
  children: ReactNode;
  elevation?: "root" | "default" | "higher" | "variable";
  elevationColor?: string;
  onClick: () => void;
  innerRef?: RefObject<any>;
}) => {
  let elevationDefault = tokens.backgroundRoot;
  let elevationNext: string | undefined = tokens.backgroundDefault;
  switch (elevation) {
    case "default":
      elevationDefault = tokens.backgroundDefault;
      elevationNext = tokens.backgroundHigher;
      break;
    case "higher":
      elevationDefault = tokens.backgroundHigher;
      elevationNext = tokens.backgroundHighest;
      break;
    case "variable":
      elevationDefault = "transparent";
      elevationNext = elevationColor;
      break;
  }
  return (
    <button
      css={[
        rcss.p(4),
        rcss.borderRadius(8),
        rcss.flex.row,
        rcss.center,
        {
          border: `solid 1px transparent`,
          background: elevationDefault,
          fontFamily: `var(--font-family-ui)`,
          cursor: "pointer",
          transition: "0.25s",
          "&:hover": {
            background: elevationNext,
            borderColor: tokens.accentPrimaryDefault,
          },
          "&:active": {
            borderColor: tokens.accentPrimaryStronger,
          },
          "&:focus": {
            borderColor: tokens.accentPrimaryDefault,
          },
        },
      ]}
      onClick={onClick}
      ref={innerRef}
      {...props}
    >
      {children}
    </button>
  );
};
