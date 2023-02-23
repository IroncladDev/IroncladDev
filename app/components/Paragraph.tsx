import { Text } from "app/ui";
import { Markdown } from "./Markdown";

export const Paragraph = ({
  children,
  percentage = 1,
  ...props
}: {
  children: React.ReactNode;
  percentage?: number;
}) => {
  return (
    <div
      {...props}
      css={{ margin: 0 }}
      style={{
        opacity: percentage,
        transform: `translatey(${(1 - percentage) * 15}vh)`,
        transition: "ease-out 0.5s",
      }}
    >
      <Text color="dimmer" multiline>
        <Markdown markdown={children} />
      </Text>
    </div>
  );
};
