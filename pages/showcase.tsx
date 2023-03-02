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
import { Project } from "app/components/Project";
import Content from "public/content/projects";

const { title, description, projects } = Content;

const Styles = {
  Container: css([
    rcss.flex.column,
    {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    },
  ]),
  BodyContainer: css({
    flex: 1,
    display: "flex",
    overflowY: "auto",
    overflowX: "hidden",
  }),

  HeaderContentContainer: css([
    rcss.flex.row,
    rcss.align.center,
    rcss.flex.grow(1),
    {
      maxWidth: tokens.maxBodyWidth,
      width: "100%",
      justifyContent: "center",
    },
    rcss.handleMaxWidth(675, {
      flexDirection: "column",
    }),
  ]),
  HeaderContentText: css([
    rcss.p(16),
    rcss.flex.column,
    rcss.colWithGap(8),
    {
      textAlign: "center",
      maxWidth: 600,
    },
  ]),

  HeaderContents: css([
    rcss.flex.column,
    rcss.colWithGap(8),
    rcss.handleMaxWidth(675, {
      display: "block",
      "& h1, & h2": {
        display: "inline-block",
        margin: "4px 8px",
      },
    }),
  ]),

  HeaderTitleSecondary: css({
    background: `-webkit-linear-gradient(120deg, ${tokens.subgroundHighest}, ${tokens.linearDefault})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeHeaderBig,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1,
  }),
};

export default function Work() {
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
            <View css={Styles.HeaderContentText}>
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

        {/* Showcase projects */}
        <Section
          css={[
            rcss.p(16),
            rcss.colWithGap(64),
            {
              paddingBottom: 64,
            },
          ]}
          background={tokens.backgroundRoot}
        >
          {projects.map((project, i) => (
            <Project
              key={i}
              project={project}
              scrollRef={scrollRef}
              scrollEnd={scrollEnd}
            />
          ))}
        </Section>

        <Footer />
      </View>
    </View>
  );
}
