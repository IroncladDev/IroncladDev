import { motion, MotionValue, useTransform } from "framer-motion";
import { rcss, tokens } from "application/ui";

export function ScrollHeader({
  children,
  percentage,
}: {
  children: React.ReactNode;
  percentage: MotionValue<number>;
}) {
  const transform = useTransform(
    percentage,
    (p) => `translatex(${(1 - p) * 25}vw`
  );

  const lineOpacity = useTransform(percentage, (p) => (p < 1 ? p : 0));

  return (
    <motion.div
      css={[
        rcss.flex.row,
        rcss.rowWithGap(8),
        rcss.align.center,
        {
          width: "100vw",
          transition: `0.25s ease-out`,
        },
      ]}
      style={{
        transform,
      }}
    >
      <motion.h1
        style={{
          display: "inline-block",
          margin: 0,
          opacity: percentage,
          transition: `0.25s ease-out`,
        }}
      >
        {children}
      </motion.h1>
      <motion.div
        style={{
          background: tokens.linearDefault,
          height: 4,
          opacity: lineOpacity,
          flexGrow: 1,
          transform,
          transition: "0.25s ease-out",
        }}
      />
    </motion.div>
  );
}
