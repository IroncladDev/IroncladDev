import { View, rcss, tokens, Text } from "application/ui";
import { SocialDescription } from "public/content/misc";
import { SocialPlatform } from "public/content/types";
import { ScrollControl } from ".";

export const SocialCard = ({
  url,
  platform,
}: {
  url: string;
  platform: SocialPlatform;
}) => {
  return (
    <ScrollControl>
      {(p) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            display: "flex",
            maxWidth: 400,
          }}
        >
          <View
            css={[
              rcss.flex.row,
              rcss.borderRadius(8),
              rcss.flex.grow(1),
              {
                overflow: "hidden",
                border: `solid 1px ${tokens.subgroundHighest}`,
                transition: "0.25s",
                "&:hover": {
                  filter: "brightness(110%)",
                  "& *": {
                    textDecoration: "none !important",
                  },
                },
              },
            ]}
            style={{
              opacity: p,
            }}
          >
            <View
              css={[
                rcss.p(16),
                {
                  background: `linear-gradient(135deg, ${tokens.subgroundRoot}, ${tokens.subgroundHighest})`,
                },
              ]}
            >
              <img
                src={SocialDescription[platform].icon}
                width={32}
                height={32}
                alt="social platform icon"
              />
            </View>
            <View
              css={[
                rcss.p(8),
                rcss.flex.column,
                rcss.colWithGap(8),
                rcss.flex.grow(1),
                {
                  background: tokens.subgroundDefault,
                  borderLeft: `solid 1px ${tokens.subgroundHighest}`,
                },
              ]}
            >
              <Text variant="subheadDefault">
                {SocialDescription[platform].title}
              </Text>
              <Text variant="small" color="dimmer">
                {url.startsWith("/") ? "https://www.connerow.dev" : ""}
                {url}
              </Text>
            </View>
          </View>
        </a>
      )}
    </ScrollControl>
  );
};
