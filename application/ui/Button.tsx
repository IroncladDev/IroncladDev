import { tokens, rcss, View, Text } from ".";
import { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  small?: boolean;
}

export const Button = ({
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
        rcss.px(small ? 8 : 12),
        rcss.py(small ? 4 : 8),
        {
          background: tokens.accentPrimaryDimmest,
          color: tokens.accentPrimaryStrongest,
          fontSize: small ? tokens.fontSizeSmall : tokens.fontSizeDefault,
          transition: "0.25s",
          cursor: "pointer",
          fontFamily: "var(--font-family-ui)",
          border: `solid 1px transparent`,
          "&:hover": {
            background: tokens.accentPrimaryDimmer,
          },
          "&:active, &:focus": {
            border: `solid 1px ${tokens.accentPrimaryStrongest}`,
            outline: "none",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
            background: tokens.accentPrimaryDimmest,
          },
        },
      ]}
      aria-label={text}
      {...props}
    >
      <View
        css={[
          rcss.flex.row,
          rcss.rowWithGap(8),
          rcss.align.center,
          rcss.justify.center,
        ]}
      >
        {iconLeft || null}
        <Text>{text}</Text>
        {iconRight || null}
      </View>
    </button>
  );
};
