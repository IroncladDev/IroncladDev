import { Text } from "application/ui";
import { Markdown } from "./Markdown";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

export const ParagraphControl = ({
  children,
  percentage,
  maxLines,
  index = 0,
  ...props
}: {
  children: string;
  percentage: MotionValue<number>;
  maxLines?: number;
  index?: number;
}) => {
  const percentageSpring = useSpring(percentage, {
    mass: 0.05 + index * 0.05,
  });

  const transform = useTransform(
    percentageSpring,
    (p) => `translatey(${(1 - p) * 15}vh)`
  );

  return (
    <motion.div
      {...props}
      css={[
        { margin: 0 },
        maxLines
          ? {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: maxLines,
              lineClamp: maxLines,
              WebkitBoxOrient: "vertical",
            }
          : {},
      ]}
      style={
        percentage
          ? {
              opacity: percentage,
              transform,
            }
          : undefined
      }
    >
      <Text color="dimmer" multiline>
        <Markdown markdown={children} />
      </Text>
    </motion.div>
  );
};
