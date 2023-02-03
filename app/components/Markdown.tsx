import DOMPurify from "isomorphic-dompurify";
import { parse } from "marked";
import sanitizeHtml from "sanitize-html";
import Tw from "react-twemoji";

const clean = (dirty) =>
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
      a: ["href", "target", "rel"]
    },
    allowedIframeHostnames: [],
  });

export const Markdown = ({ markdown }) => {
  const renderedMarkdown = clean(DOMPurify.sanitize(parse(markdown)))

  return (
    <Tw>
      <span
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: renderedMarkdown
        }}
      />
    </Tw>
  );
}
