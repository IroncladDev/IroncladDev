import { tokens } from ".";
import { css } from "@emotion/react";

const styles = css({
  background: tokens.backgroundHigher,
  color: tokens.foregroundDefault,
  fontFamily: "var(--font-family-default)",
  transition: "0.25s",
  outline: "none",
  fontSize: tokens.fontSizeDefault,
  border: "solid 1px transparent",
  maxWidth: 400,
  borderRadius: 8,
  padding: "4px 8px",
  cursor: "pointer !important",

  "&:focus": {
    borderColor: tokens.accentPrimaryDefault,
  },

  "&:active": {
    borderColor: tokens.accentPrimaryStronger,
    borderThickness: 2,
  },

  "&:hover": {
    backgroundColor: tokens.backgroundHighest,
  },

  "&::placeholder": {
    color: tokens.foregroundDimmest,
  },
});

export const Select = ({
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return <select {...props} css={styles} />;
};
