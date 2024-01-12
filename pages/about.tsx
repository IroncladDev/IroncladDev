import { View, Text, tokens, rcss, FlexSpacer } from "application/ui";
import { ScrollHeader } from "application/components/ScrollHeader";
import { useSpring, useTransform, motion, MotionValue } from "framer-motion";
import { useScrollControl } from "application/hooks/useScroll";
import { TechnologyDescription } from "public/content/misc";
import Content from "public/content/about";
import Styles from "lib/baseStyles";
import {
  Section,
  Markdown,
  Footer,
  Slant,
  ScrollControl,
  ParagraphControl,
} from "application/components";
import { Technology } from "public/content/types";

const { title, description, introduction, journey, faq, skills, skillsHeader } =
  Content;

export default function About() {
  const { initialHeight, scrollTop } = useScrollControl();

  const scrollSpring = useSpring(scrollTop, {
    mass: 0.05,
  });

  const background = useTransform(
    scrollSpring,
    (scroll) => `linear-gradient(${
      135 + (scroll / initialHeight) * (180 - 135)
    }deg, 
      ${tokens.backgroundRoot} 0%,
      ${tokens.subgroundDefault} 50%,  
      ${tokens.subgroundRoot} 50%,
      ${tokens.backgroundDefault} 100%
    )`
  );

  return (
    <>
      {/* Header Section */}
      <View
        css={[rcss.center, rcss.flex.column]}
        style={{
          minHeight: initialHeight,
          background,
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

      {/* About */}
      <Section
        css={[
          rcss.p(16),
          rcss.flex.column,
          rcss.center,
          {
            paddingBottom: 64,
          },
        ]}
        background={tokens.backgroundRoot}
      >
        <View css={[rcss.colWithGap(32), rcss.maxWidth(600)]}>
          <ScrollControl inline>
            {(p) => (
              <ScrollHeader percentage={p}>
                <Markdown markdown={introduction.title} />
              </ScrollHeader>
            )}
          </ScrollControl>
          {introduction.paragraphs.map((text, i) => (
            <ScrollControl key={i}>
              {(p) => (
                <ParagraphControl percentage={p} index={i}>
                  {text}
                </ParagraphControl>
              )}
            </ScrollControl>
          ))}
        </View>
      </Section>

      {/* Journey */}
      <Section
        css={[
          rcss.p(16),
          rcss.flex.column,
          rcss.align.center,
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
        <View css={[rcss.colWithGap(32), rcss.maxWidth(600)]}>
          <ScrollControl inline>
            {(p) => (
              <ScrollHeader percentage={p}>
                <Markdown markdown={journey.title} />
              </ScrollHeader>
            )}
          </ScrollControl>
          {journey.paragraphs.map((text, i) => (
            <ScrollControl key={i}>
              {(p) => (
                <ParagraphControl percentage={p} index={i}>
                  {text}
                </ParagraphControl>
              )}
            </ScrollControl>
          ))}
        </View>
      </Section>

      {/* FAQ */}
      <Section
        css={[
          rcss.p(16),
          rcss.flex.column,
          rcss.center,
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
        <View css={[rcss.colWithGap(32), rcss.maxWidth(600)]}>
          <ScrollControl inline>
            {(p) => (
              <ScrollHeader percentage={p}>
                <Markdown markdown={faq.title} />
              </ScrollHeader>
            )}
          </ScrollControl>
          {faq.paragraphs.map((text, i) => (
            <ScrollControl key={i}>
              {(p) => (
                <ParagraphControl percentage={p} index={i}>
                  {text}
                </ParagraphControl>
              )}
            </ScrollControl>
          ))}
        </View>
      </Section>

      {/* Skills */}
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
        <ScrollControl inline>
          {(p) => (
            <ScrollHeader percentage={p}>
              <Markdown markdown={skillsHeader} />
            </ScrollHeader>
          )}
        </ScrollControl>

        {skills.map((sk, i) => (
          <ScrollControl key={i}>
            {(p) => <Skill p={p} sk={sk} />}
          </ScrollControl>
        ))}
      </Section>

      <Footer />
    </>
  );
}

function Skill({ sk, p }: { sk: Technology; p: MotionValue<number> }) {
  const smooth = useSpring(p, {
    mass: 0.5,
  });
  const transformLeft = useTransform(
    smooth,
    (p) => `translatex(-${(1 - p) * 100}%)`
  );
  const transformRight = useTransform(
    smooth,
    (p) => `translatex(${(1 - p) * 100}%)`
  );

  return (
    <View css={[rcss.flex.grow(1), rcss.flex.row, rcss.justify.center]}>
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
        <motion.img
          src={`/skills/${sk}.webp`}
          width="64"
          height="64"
          css={[
            rcss.borderRadius(8),
            {
              border: `solid 1px ${tokens.backgroundHigher}`,
              backgroundColor: tokens.backgroundRoot
            },
          ]}
          style={{
            transform: transformLeft,
          }}
          alt="pic"
        />
        <View
          css={[
            rcss.colWithGap(8),
            {
              flex: "1 1 0",
            },
          ]}
          style={{
            transform: transformRight,
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
  );
}
