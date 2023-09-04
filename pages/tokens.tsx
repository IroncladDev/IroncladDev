import { Footer } from "application/components";
import { IconButton, rcss, tokens } from "application/ui";
import { useEffect, useState } from "react";
import { Copy } from "react-feather";
import { Text } from "application/ui";

const colors: Array<{
  name: string;
  colors: Array<keyof typeof tokens>;
}> = [
  {
    name: "Background",
    colors: [
      "backgroundDepth",
      "backgroundRoot",
      "backgroundDefault",
      "backgroundHigher",
      "backgroundHighest",
    ],
  },
  {
    name: "Foreground",
    colors: ["foregroundDimmest", "foregroundDimmer", "foregroundDefault"],
  },
  {
    name: "Accent",
    colors: [
      "accentPrimaryDimmest",
      "accentPrimaryDimmer",
      "accentPrimaryDefault",
      "accentPrimaryStronger",
      "accentPrimaryStrongest",
    ],
  },
  {
    name: "Subground",
    colors: [
      "subgroundRoot",
      "subgroundDefault",
      "subgroundHigher",
      "subgroundHighest",
    ],
  },
  {
    name: "Linear",
    colors: ["linearRoot", "linearDefault", "linearHigher", "linearHighest"],
  },
];

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);

  return (
    <IconButton
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      }}
    >
      <Copy
        size={16}
        color={
          copied ? tokens.accentPrimaryStrongest : tokens.foregroundDefault
        }
      />
    </IconButton>
  );
}

export default function Home() {
  return (
    <>
      {/* Header Section */}
      <div css={[rcss.flex.column, rcss.center, rcss.p(16)]}>
        <div css={[rcss.colWithGap(16)]}>
          <div
            css={[
              rcss.flex.column,
              rcss.colWithGap(8),
              rcss.align.center,
              rcss.p(16),
              rcss.minHeight("100vh"),
            ]}
          >
            <h2 css={{ marginTop: 0 }}>Color Tokens</h2>

            <div
              css={[
                rcss.flex.row,
                rcss.justify.center,
                {
                  gap: 16,
                  flexWrap: "wrap",
                },
              ]}
            >
              {colors.map((p, i) => (
                <div
                  key={i}
                  css={[
                    rcss.flex.column,
                    rcss.colWithGap(8),
                    rcss.borderRadius(8),
                    rcss.p(8),
                    {
                      background: tokens.backgroundDefault,
                    },
                  ]}
                >
                  <h3 css={{ marginTop: 0 }}>{p.name}</h3>

                  {p.colors.map((c, j) => (
                    <div
                      key={j}
                      css={[
                        rcss.flex.row,
                        rcss.rowWithGap(8),
                        rcss.align.center,
                      ]}
                    >
                      <div
                        css={[
                          rcss.p(12),
                          rcss.borderRadius(8),
                          {
                            border: `solid 1px ${tokens.backgroundHigher}`,
                          },
                        ]}
                        style={{ background: tokens[c] }}
                      />
                      <CopyButton
                        text={
                          typeof window !== "undefined"
                            ? getComputedStyle(
                                document.documentElement
                              ).getPropertyValue(
                                tokens[c].slice(4, tokens[c].length - 1)
                              )
                            : tokens[c]
                        }
                      />
                      <Text color="dimmer">{c}</Text>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
