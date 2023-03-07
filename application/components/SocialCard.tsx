import { SocialPlatform } from "public/content/types";
import { View, rcss, tokens, Text } from "application/ui";
import { RefObject } from "react";
import { Scroll } from ".";

const ParseSocial = (url: SocialPlatform): { icon: string; title: string } => {
  switch (url) {
    case SocialPlatform.Twitter:
      return { icon: "/icons/twitter.svg", title: "Twitter" };
    case SocialPlatform.Dev:
      return { icon: "/icons/dev.svg", title: "Dev" };
    case SocialPlatform.Replit:
      return { icon: "/icons/replit.svg", title: "Replit" };
    case SocialPlatform.Email:
      return { icon: "/icons/email.svg", title: "Email" };
    case SocialPlatform.Polywork:
      return { icon: "/icons/polywork.svg", title: "Polywork" };
    case SocialPlatform.Discord:
      return { icon: "/icons/discord.svg", title: "Discord" };
    case SocialPlatform.Codepen:
      return { icon: "/icons/codepen.svg", title: "Codepen" };
    case SocialPlatform.Github:
      return { icon: "/icons/github.svg", title: "Github" };
    case SocialPlatform.Youtube:
      return { icon: "/icons/youtube.svg", title: "Youtube" };
  }
};

export const SocialCard = ({
  url,
  platform,
  scrollRef,
  scrollEnd,
}: {
  url: string;
  platform: SocialPlatform;
  scrollRef: RefObject<HTMLDivElement>;
  scrollEnd: number;
}) => {
  return (
    <Scroll scrollRef={scrollRef} end={scrollEnd}>
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
              <img src={ParseSocial(platform).icon} width={32} />
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
                {ParseSocial(platform).title}
              </Text>
              <Text variant="small" color="dimmer">
                {url.startsWith("/") ? "https://www.connerow.dev" : ""}
                {url}
              </Text>
            </View>
          </View>
        </a>
      )}
    </Scroll>
  );
};
