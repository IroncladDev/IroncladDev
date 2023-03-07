import { View, tokens, rcss } from "application/ui";
import { Navbar, Section, Footer } from "application/components";
import { useRef } from "react";
import Styles from "lib/baseStyles";
import {
  GithubCard,
  ReplitCard,
  DevCard,
  CGCard,
  BaseCard,
} from "application/components/SocialCards";
import { SocialPlatform } from "public/content/types";

export default function Contact() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View css={Styles.BodyContainer} innerRef={scrollRef}>
        <Section
          css={[
            rcss.p(16),
            {
              paddingBottom: "50vh",
            },
          ]}
          background={tokens.backgroundDefault}
        >
          <View
            css={[
              rcss.flex.row,
              rcss.justify.center,
              rcss.align.start,
              rcss.p(16),
              {
                flexWrap: "wrap",
                gap: 16,
              },
            ]}
          >
            <GithubCard />
            <ReplitCard />
            <DevCard />
            <CGCard />
            <View
              css={[
                rcss.colWithGap(16),
                {
                  maxWidth: 400,
                  minWidth: 300,
                },
              ]}
            >
              <BaseCard social={SocialPlatform.Twitter} />
              <BaseCard social={SocialPlatform.Email} />
              <BaseCard social={SocialPlatform.Polywork} />
            </View>
            <View
              css={[
                rcss.colWithGap(16),
                {
                  maxWidth: 400,
                  minWidth: 300,
                },
              ]}
            >
              <BaseCard social={SocialPlatform.Discord} />
              <BaseCard social={SocialPlatform.Codepen} />
              <BaseCard social={SocialPlatform.Youtube} />
            </View>
          </View>
        </Section>

        <Footer />
      </View>
    </View>
  );
}
