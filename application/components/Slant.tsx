import { View, tokens } from "application/ui";

export const Slant = ({
  path,
  background,
  minHeight = 100,
  borderTop,
}: {
  path: string;
  background: string;
  minHeight?: number;
  borderTop?: boolean;
}) => {
  return (
    <View
      css={[
        {
          minHeight,
          width: "100vw",
          clipPath: path,
          position: "relative",
          background: borderTop ? tokens.linearDefault : background,
          zIndex: 5,
          "&::before": borderTop
            ? {
                content: '""',
                position: "absolute",
                clipPath: path,
                minHeight,
                width: "100vw",
                top: 4,
                background,
                zIndex: 4,
              }
            : {},
        },
      ]}
    />
  );
};
