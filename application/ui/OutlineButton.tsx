import { tokens, rcss, View, Text } from ".";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  small?: boolean;
}

export const OutlineButton = ({
  text,
  iconLeft,
  iconRight,
  small,
  ...props
}: Props) => {
  return (
    <button
      css={[
        rcss.borderRadius(8),
        rcss.px(small ? 8 : 24),
        rcss.py(small ? 4 : 8),
        {
          background: "transparent",
          color: tokens.linearHighest,
          fontSize: small ? tokens.fontSizeSmall : tokens.fontSizeDefault,
          transition: "0.25s",
          cursor: "pointer",
          fontFamily: "var(--font-family-ui)",
          border: `solid 2px ${tokens.linearRoot}`,
          transform: `skewX(-10deg)`,
          "&:hover": {
            background: `rgba(255, 255, 255, 0.1)`,
          },
          "&:active, &:focus": {
            borderColor: tokens.accentPrimaryStrongest,
            outline: "none",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
        },
      ]}
      aria-label={text}
      {...props}
    >
      <View css={[rcss.flex.row, rcss.rowWithGap(8), rcss.center]}>
        {iconLeft || null}
        <Text>{text}</Text>
        {iconRight || null}
      </View>
    </button>
  );
};
