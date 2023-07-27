import { SocialDescription } from "public/content/misc";
import { SocialPlatform } from "public/content/types";
import { View, tokens, rcss } from "application/ui";
import { Text } from "application/ui";
import { Section, Footer, Markdown } from "application/components";

function Card({
  index,
  type,
}: {
  index: number;
  type: SocialPlatform | string;
}) {
  if (!SocialDescription[type]) return null;

  const { icon, title, url, description, handle } = SocialDescription[type];

  return (
    <a
      href={url}
      css={{
        textDecoration: "none !important",
        "&:hover": {
          textDecoration: "none !important",
        },
      }}
    >
      <View
        css={[
          rcss.flex.row,
          rcss.borderRadius(12),
          {
            border: `solid 1px ${tokens.backgroundHigher}`,
            overflow: "hidden",
            maxWidth: 400,
            "& *": {
              textDecoration: "none !important",
            },
            "&:hover": {
              borderColor: tokens.backgroundHighest,
              boxShadow: `0 0 0 4px ${tokens.backgroundHigher}`,
            },
            transition: "0.25s",
          },
        ]}
      >
        <View
          css={[
            rcss.p(16),
            rcss.flex.row,
            rcss.center,
            {
              background:
                index % 2 === 0
                  ? `linear-gradient(135deg, ${tokens.subgroundRoot}, ${tokens.subgroundHigher})`
                  : `linear-gradient(-135deg, ${tokens.subgroundDefault}, ${tokens.subgroundHighest})`,
            },
          ]}
        >
          <img src={icon} width={64} height={64} alt="icon" />
        </View>
        <View
          css={[
            rcss.p(16),
            rcss.flex.column,
            rcss.colWithGap(8),
            rcss.flex.growAndShrink(1),
          ]}
        >
          <Text variant="subheadBig">{title}</Text>
          {handle ? (
            <Text variant="subheadDefault" color="dimmest">
              @{handle}
            </Text>
          ) : null}
          {description ? (
            <Text color="dimmer" multiline>
              <Markdown markdown={description} />
            </Text>
          ) : null}
        </View>
      </View>
    </a>
  );
}

export default function Contact() {
  return (
    <>
      <Section
        css={[
          rcss.p(16),
          {
            paddingBottom: "50vh",
          },
        ]}
        background={tokens.backgroundDefault}
      >
        <h1>Contact</h1>

        <View
          css={[
            rcss.flex.row,
            rcss.justify.center,
            {
              gap: 16,
              flexWrap: "wrap",
            },
          ]}
        >
          {Object.values(SocialPlatform).map((key, i) => (
            <Card key={key} type={key} index={i} />
          ))}
        </View>
      </Section>

      <Footer />
    </>
  );
}
