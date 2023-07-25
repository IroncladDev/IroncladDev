import DOMPurify from "isomorphic-dompurify";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";
import { useMemo } from "react";
import Tw from "react-twemoji";

const clean = (dirty: string) =>
  sanitizeHtml(dirty, {
    allowedTags: [
      "i",
      "em",
      "strong",
      "a",
      "img",
      "p",
      "code",
      "br",
      "s",
      "strike",
      "br",
      "ul",
      "ol",
      "li",
      "h10",
      "h2",
      "h3",
      "h4",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedIframeHostnames: [],
  });

export const Markdown = ({ markdown }) => {
  const renderedMarkdown = useMemo(
    () => clean(DOMPurify.sanitize(marked.parse(markdown || ""))),
    [markdown]
  );

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
