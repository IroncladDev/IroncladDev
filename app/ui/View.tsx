import { tokens, rcss } from ".";
import { ReactNode, RefObject } from "react";
import { ObjectAny } from "app/types";

interface ViewProps {
  css?: ObjectAny | Array<ObjectAny>;
  children?: ReactNode;
  innerRef?: RefObject<HTMLDivElement>;
  [key: string]: any;
}

export const View = ({ children, innerRef, ...props }: ViewProps) => {
  return (
    <div {...props} css={rcss.ViewElement} ref={innerRef}>
      {children}
    </div>
  );
};
