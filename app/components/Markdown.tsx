import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
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
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedIframeHostnames: [],
  });

export const Markdown = ({ markdown }) => {
  const renderedMarkdown = clean(
    DOMPurify.sanitize(marked.parse(markdown || ""))
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
