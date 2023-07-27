import { marked } from "marked";
import { useMemo } from "react";
import Tw from "react-twemoji";

export const Markdown = ({ markdown }: { markdown: string }) => {
  const renderedMarkdown = useMemo(() => marked.parse(markdown), [markdown]);

  return (
    <Tw>
      <span
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: renderedMarkdown,
        }}
      />
    </Tw>
  );
};
