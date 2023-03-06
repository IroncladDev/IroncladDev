import { View, Text, tokens, rcss, FlexSpacer, OutlineButton } from "app/ui";
import {
  Navbar,
  Section,
  Scroll,
  Markdown,
  Footer,
  Slant,
  LogoHeader,
  Paragraph,
  SocialCard,
} from "app/components";
import { useRef, RefObject } from "react";
import useScroll from "app/hooks/useScroll";
import { css } from "@emotion/react";
import Content from "public/content/about";
import Styles from "lib/baseStyles";
import { TechnologyDescription } from "public/content/misc";

const { title, description, introduction, journey, faq, skills, skillsHeader } =
  Content;

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { initialHeight, scrollTop } = useScroll(scrollRef);
  const scrollEnd = initialHeight / 2;

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View css={Styles.BodyContainer} innerRef={scrollRef}>
        {/* Header Section */}
        <View
          css={[rcss.center, rcss.flex.column]}
          style={{
            minHeight: initialHeight,
            background: `linear-gradient(${
              135 + (scrollTop / initialHeight) * (180 - 135)
            }deg, 
              ${tokens.backgroundRoot} 0%,
              ${tokens.subgroundDefault} 50%,  
              ${tokens.subgroundRoot} 50%,
              ${tokens.backgroundDefault} 100%
            )`,
          }}
        >
          <View css={Styles.HeaderContentContainer}>
            <View css={Styles.HeaderContentTextCenter}>
              <View css={Styles.HeaderContents}>
                <h1 css={Styles.HeaderTitleSecondary}>{title}</h1>
              </View>
              <FlexSpacer />
              <Text color="dimmer" multiline>
                <Markdown markdown={description} />
              </Text>
            </View>
          </View>
          <Slant
            path="polygon(100% 0, 0% 100%, 100% 100%)"
            background={tokens.backgroundRoot}
            borderTop
          />
        </View>

        <Section
          css={[
            rcss.p(16),
            rcss.flex.column,
            rcss.justify.center,
            {
              paddingBottom: 64,
            },
          ]}
          background={tokens.backgroundRoot}
        >
          <View css={[rcss.colWithGap(32)]}>
            <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
              {(p) => (
                <h1 css={Styles.ScrollHeader(p)}>
                  <Markdown markdown={introduction.title} />
                </h1>
              )}
            </Scroll>
            {introduction.paragraphs.map((text, i) => (
              <Scroll scrollRef={scrollRef} end={scrollEnd} key={i}>
                {(p) => <Paragraph percentage={p}>{text}</Paragraph>}
              </Scroll>
            ))}
          </View>
        </Section>

        <Section
          css={[
            rcss.p(16),
            rcss.colWithGap(32),
            {
              paddingBottom: 64,
            },
          ]}
          head={
            <Slant
              path="polygon(100% 0, 100% 100%, 0 0)"
              background={tokens.backgroundRoot}
            />
          }
          background={tokens.backgroundDefault}
        >
          <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
            {(p) => (
              <h1 css={Styles.ScrollHeader(p)}>
                <Markdown markdown={journey.title} />
              </h1>
            )}
          </Scroll>
          {journey.paragraphs.map((text, i) => (
            <Scroll scrollRef={scrollRef} end={scrollEnd} key={i}>
              {(p) => <Paragraph percentage={p}>{text}</Paragraph>}
            </Scroll>
          ))}
        </Section>

        <Section
          css={[
            rcss.p(16),
            rcss.flex.column,
            rcss.justify.center,
            {
              paddingBottom: 64,
            },
          ]}
          head={
            <Slant
              path="polygon(100% 0, 0% 100%, 0 0)"
              background={tokens.backgroundDefault}
            />
          }
          background={tokens.backgroundRoot}
        >
          <View css={[rcss.colWithGap(32)]}>
            <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
              {(p) => (
                <h1 css={Styles.ScrollHeader(p)}>
                  <Markdown markdown={faq.title} />
                </h1>
              )}
            </Scroll>
            {faq.paragraphs.map((text, i) => (
              <Scroll scrollRef={scrollRef} end={scrollEnd} key={i}>
                {(p) => <Paragraph percentage={p}>{text}</Paragraph>}
              </Scroll>
            ))}
          </View>
        </Section>

        <Section
          css={[
            rcss.p(16),
            rcss.colWithGap(32),
            {
              paddingBottom: "50vh",
            },
          ]}
          head={
            <Slant
              path="polygon(100% 0, 0% 100%, 0 0)"
              background={tokens.backgroundRoot}
            />
          }
          background={tokens.backgroundDefault}
        >
          <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
            {(p) => (
              <h1 css={Styles.ScrollHeader(p)}>
                <Markdown markdown={skillsHeader} />
              </h1>
            )}
          </Scroll>

          {skills.map((sk, i) => (
            <Scroll scrollRef={scrollRef} end={scrollEnd} key={i}>
              {(p) => (
                <View
                  css={[rcss.flex.grow(1), rcss.flex.row, rcss.justify.center]}
                >
                  <View
                    css={[
                      rcss.flex.row,
                      rcss.rowWithGap(16),
                      rcss.align.center,
                      {
                        maxWidth: 500,
                        flex: "1 1 0",
                      },
                    ]}
                    style={{ opacity: p }}
                  >
                    <img
                      src={`/skills/${sk}.webp`}
                      width="64"
                      height="64"
                      css={[
                        rcss.borderRadius(8),
                        {
                          border: `solid 1px ${tokens.backgroundHigher}`,
                        },
                      ]}
                      style={{
                        transform: `translatex(-${(1 - p) * 100}%)`,
                      }}
                    />
                    <View
                      css={[
                        rcss.colWithGap(8),
                        {
                          flex: "1 1 0",
                        },
                      ]}
                      style={{
                        transform: `translatex(${(1 - p) * 100}%)`,
                      }}
                    >
                      <Text variant="subheadDefault">
                        {TechnologyDescription[sk].title}
                      </Text>
                      <Text color="dimmer" multiline>
                        {TechnologyDescription[sk].description}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </Scroll>
          ))}
        </Section>

        <Footer />
      </View>
    </View>
  );
}
