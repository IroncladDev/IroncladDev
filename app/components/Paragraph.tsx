import { Text } from "app/ui";
import { Markdown } from "./Markdown";

export const Paragraph = ({
  children,
  percentage = 1,
  maxLines,
  ...props
}: {
  children: React.ReactNode;
  percentage?: number;
  maxLines?: number;
}) => {
  return (
    <div
      {...props}
      css={[
        { margin: 0, transition: "ease-out 0.5s" },
        maxLines
          ? {
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              lineClamp: 2,
              WebkitBoxOrient: "vertical",
            }
          : {},
      ]}
      style={{
        opacity: percentage,
        transform: `translatey(${(1 - percentage) * 15}vh)`,
      }}
    >
      <Text color="dimmer" multiline>
        <Markdown markdown={children} />
      </Text>
    </div>
  );
};
