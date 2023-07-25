import { tokens, rcss } from ".";
import { ReactNode, RefObject } from "react";
import { ObjectAny } from "application/types";
import { motion } from "framer-motion";

interface ViewProps {
  css?: ObjectAny | Array<ObjectAny>;
  children?: ReactNode;
  innerRef?: RefObject<HTMLDivElement>;
  [key: string]: any;
}

export const View = ({ children, innerRef, ...props }: ViewProps) => {
  return (
    <motion.div {...props} css={rcss.ViewElement} ref={innerRef}>
      {children}
    </motion.div>
  );
};
