import { rcss, tokens } from ".";
import { css } from "@emotion/react";

const styles = css({
  background: tokens.backgroundHigher,
  border: `solid 1px ${tokens.subgroundHighest}`,
  color: tokens.foregroundDefault,
  fontFamily: "var(--font-family-default)",
  transition: "0.25s",
  outline: "none",
  fontSize: tokens.fontSizeDefault,
  resize: "vertical",
  maxWidth: 400,

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

export const TextArea = ({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea css={[rcss.borderRadius(8), rcss.p(8), styles]} {...props} />
  );
};
