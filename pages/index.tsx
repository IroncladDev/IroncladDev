import { View, Text, tokens, rcss, FlexSpacer, Button } from "app/ui";
import {
  Navbar,
  Section,
  Scroll,
  Markdown,
  Footer,
  Slant,
  LogoHeader,
  Paragraph,
} from "app/components";
import { useRef } from "react";
import useScroll from "app/hooks/useScroll";
import { css } from "@emotion/react";
import Link from "next/link";
import loadPageData from "server/lib/loadPageData";

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
      width: "40%",
    },
    rcss.handleMaxWidth(675, {
      width: "100%",
      "& > *": {
        textAlign: "center",
      },
    }),
  ]),

  ScrollHeader: (percentage: number) =>
    css({
      opacity: percentage <= 1 ? percentage : 0,
      transform: `translatex(${(1 - percentage) * 25}vw)`,
      position: "relative",
      display: "inline-block",
      margin: 0,
      transition: "ease-out 0.5s",
      "&::after": {
        content: '""',
        position: "absolute",
        left: "100%",
        top: "50%",
        transform: `translate(8px, -50%)`,
        background: tokens.linearDefault,
        width: "100vw",
        height: 4,
        opacity: percentage <= 1 ? percentage : 0,
      },
    }),

  DownButton: css([
    rcss.p(16),
    rcss.borderRadius("full"),
    {
      border: `solid 2px ${tokens.linearDefault}`,
      background: `rgba(0, 0, 0, 0.1)`,
      cursor: "pointer",
      transition: "0.25s",
      position: "relative",
      "&:hover": {
        background: `rgba(0, 0, 0, 0.15)`,
        boxShadow: `0 0 0 8px ${tokens.subgroundHigher}`,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "calc(50% - 10px)",
        borderRadius: 4,
        width: 12,
        height: 2,
        background: tokens.linearDefault,
        transform: "rotate(45deg)",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "calc(50% - 2px)",
        borderRadius: 4,
        width: 12,
        height: 2,
        background: tokens.linearDefault,
        transform: "rotate(-45deg)",
      },
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

  HeaderTitleMain: css({
    background: `-webkit-linear-gradient(135deg, ${tokens.accentPrimaryDimmer}, ${tokens.accentPrimaryStronger})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeHeaderBig,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1,
  }),

  HeaderTitleSecondary: css({
    background: `-webkit-linear-gradient(120deg, ${tokens.subgroundHighest}, ${tokens.linearDefault})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeHeaderBig,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1,
  }),

  HeaderTitleLast: css({
    background: `-webkit-linear-gradient(120deg, ${tokens.linearHighest}, ${tokens.linearDefault})`,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: tokens.fontSizeSubheadDefault,
    fontFamily: "var(--font-family-ui)",
    margin: 0,
    lineHeight: 1.1,
  }),
};

export default function Home({
  Header: { value: Header },
  AboutIntro: { value: AboutIntro },
  AboutParagraphs: { value: AboutParagraphs },
}) {
  const scrollRef = useRef(null);
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
                <h1 css={Styles.HeaderTitleMain}>{Header.headlineHighlight}</h1>
                <h1 css={Styles.HeaderTitleSecondary}>
                  {Header.headlineTitle}
                </h1>
                <h2 css={Styles.HeaderTitleLast}>{Header.subHeadline}</h2>
              </View>
              <FlexSpacer />
              <Text color="dimmer" multiline>
                <Markdown markdown={Header.description} />
              </Text>
            </View>
            <View>
              <LogoHeader />
            </View>
          </View>
          <View css={[rcss.flex.row, rcss.center]}>
            <button
              css={Styles.DownButton}
              onClick={() => {
                scrollRef.current.scrollBy(0, innerHeight);
              }}
            ></button>
          </View>
          <Slant
            path="polygon(100% 0, 0% 100%, 100% 100%)"
            background={tokens.backgroundRoot}
            borderTop
          />
        </View>

        {/* Introduction */}
        <View
          css={[
            rcss.p(16),
            rcss.flex.column,
            rcss.center,
            {
              background: tokens.backgroundRoot,
              width: "100vw",
            },
          ]}
          id="introduction"
        >
          <View
            css={[
              rcss.flex.row,
              rcss.center,
              {
                width: "100vw",
                maxWidth: tokens.maxBodyWidth,
                minHeight: "100vh",
              },
              rcss.handleMaxWidth(675, {
                flexDirection: "column",
              }),
            ]}
          >
            <View
              css={[
                rcss.p(16),
                rcss.colWithGap(16),
                rcss.flex.growAndShrink(2),
              ]}
            >
              <div>
                <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
                  {(_, p) => (
                    <h1 css={Styles.ScrollHeader(p)}>
                      <Markdown markdown={AboutIntro} />
                    </h1>
                  )}
                </Scroll>
              </div>
              {AboutParagraphs.sort((a, b) => a.position - b.position).map(
                ({ text }) => (
                  <Scroll scrollRef={scrollRef} end={scrollEnd}>
                    {(_, p) => <Paragraph percentage={p}>{text}</Paragraph>}
                  </Scroll>
                )
              )}
            </View>

            <View
              css={[
                rcss.p(16),
                rcss.flex.growAndShrink(2),
                rcss.colWithGap(16),
                rcss.align.center,
              ]}
            >
              <Scroll scrollRef={scrollRef} end={scrollEnd}>
                {(p) => (
                  <div
                    css={[
                      rcss.handleMaxWidth(675, {
                        "& > img": {
                          maxWidth: 300,
                          maxHeight: 300,
                        },
                      }),
                      {
                        "& > img": {
                          border: `solid 2px ${tokens.linearDefault}`,
                          borderRadius: "50%",
                          zIndex: 1,
                          width: "100%",
                        },
                        position: "relative",
                      },
                    ]}
                  >
                    <img
                      src="https://cms.replit.com/assets/about/connerow.jpeg"
                      alt="oh look its a face reveal"
                      style={{
                        opacity: p,
                      }}
                    />
                  </div>
                )}
              </Scroll>
              <Link href="/about" passHref>
                <a>
                  <Button text="Read More >>" />
                </a>
              </Link>
            </View>
          </View>
        </View>

        <Section
          css={[rcss.p(16)]}
          background={tokens.backgroundDefault}
          head={
            <Slant
              path="polygon(0 0, 0% 100%, 100% 0)"
              background={tokens.backgroundRoot}
            />
          }
        >
          <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
            {(_, p) => (
              <h1 css={Styles.ScrollHeader(p)}>
                <Markdown markdown={"Portfolio"} />
              </h1>
            )}
          </Scroll>
          <Scroll scrollRef={scrollRef} end={scrollEnd}>
            {(_, p) => (
              <Paragraph percentage={p}>
                Many of my side projects include games, websites, and tools that
                others can use. Here are some of my personal favorites! (WIP
                btw)
              </Paragraph>
            )}
          </Scroll>
        </Section>

        <Footer />
      </View>
    </View>
  );
}

export async function getServerSideProps() {
  const data = await loadPageData("Homepage");

  return {
    props: data,
  };
}
