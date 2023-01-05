import { tokens, rcss, View } from ".";
import Image from "next/image";

export const Button = ({
  text,
  iconLeft,
  iconRight,
  ...props
}: {
  text: string;
  iconLeft?: string;
  iconRight?: string;
}) => {
  return (
    <button
      css={[
        rcss.borderRadius(8),
        rcss.p(8),
        {
          background: tokens.accentPrimaryDimmest,
          color: tokens.foregroundDefault,
          fontSize: tokens.fontSizeDefault,
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
        },
      ]}
      {...props}
    >
      <View css={[rcss.flex.row, rcss.rowWithGap(8), rcss.center]}>
        {iconLeft ? (
          <Image src={iconLeft} width={16} height={16} alt="Icon Left" />
        ) : null}
        {text}
        {iconRight ? (
          <Image src={iconRight} width={16} height={16} alt="Icon Right" />
        ) : null}
      </View>
    </button>
  );
};
