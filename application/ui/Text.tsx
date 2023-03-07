import { rcss, tokens } from ".";
import { css } from "@emotion/react";
import type { CSSInterpolation, SerializedStyles } from "@emotion/serialize";
import { ReactNode } from "react";

type Variant =
  | "text"
  | "small"
  | "headerBig"
  | "headerDefault"
  | "subheadBig"
  | "subheadDefault";
type Color = "default" | "dimmer" | "dimmest";

interface TextProps {
  multiline?: boolean;
  color?: Color;
  variant?: Variant;
  maxLines?: number;
  children: ReactNode;
}

const defaults = css({
  display: "inline",
  overflowWrap: "break-word",
});

const variants: Record<Variant, SerializedStyles> = {
  text: css({
    fontSize: tokens.fontSizeDefault,
    lineHeight: tokens.lineHeightDefault,
  }),
  small: css({
    fontSize: tokens.fontSizeSmall,
    lineHeight: tokens.lineHeightSmall,
  }),
  headerBig: css({
    fontSize: tokens.fontSizeHeaderBig,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHeaderBig,
    fontFamily: tokens.fontFamilyUI,
  }),
  headerDefault: css({
    fontSize: tokens.fontSizeHeaderDefault,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightHeaderDefault,
    fontFamily: tokens.fontFamilyUI,
  }),
  subheadBig: css({
    fontSize: tokens.fontSizeSubheadBig,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSubheadBig,
    fontFamily: tokens.fontFamilyUI,
  }),
  subheadDefault: css({
    fontSize: tokens.fontSizeSubheadDefault,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightSubheadDefault,
    fontFamily: tokens.fontFamilyUI,
  }),
};

const colors: Record<Color, undefined | SerializedStyles> = {
  default: css({ color: tokens.foregroundDefault }),
  dimmer: css({ color: tokens.foregroundDimmer }),
  dimmest: css({ color: tokens.foregroundDimmest }),
};

const lineClamp = (n: number) =>
  css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: n,
    WebkitBoxOrient: "vertical",
  });

function textCss(
  variant: Variant,
  color: undefined | Color,
  multiline: undefined | boolean,
  maxLines: undefined | number
): CSSInterpolation {
  return css([
    defaults,
    variants[variant],
    color != null && colors[color],
    !multiline && !maxLines && rcss.truncate,
    maxLines && lineClamp(maxLines),
  ]);
}

export const Text = ({
  variant = "text",
  color,
  maxLines,
  multiline,
  children,
}: TextProps) => {
  return (
    <span css={textCss(variant, color, multiline, maxLines)}>{children}</span>
  );
};
