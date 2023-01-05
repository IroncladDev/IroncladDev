import { View, Text, tokens, rcss, FlexSpacer, Button } from "app/ui";
import { Navbar, Section } from "app/components";
import { RefObject, useEffect, useRef, useCallback } from "react";
import LogoHeader from "app/components/LogoHeader";
import useScroll from "app/hooks/useScroll";
import { Slant } from "app/components/Slant";
import { css } from "@emotion/react";
import useScrollTransition from "app/hooks/useScrollTransition";
import { age } from "lib";
import Link from "next/link";
import Tw from 'react-twemoji';
import Footer from "app/components/Footer";

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
  HeaderSection: (rotation, initialHeight) =>
    css([
      rcss.center,
      rcss.flex.column,
      {
        minHeight: initialHeight,
        background: `linear-gradient(${135 + rotation}deg, 
        ${tokens.backgroundRoot} 0%,
        ${tokens.subgroundDefault} 50%,  
        ${tokens.subgroundRoot} 50%,
        ${tokens.backgroundDefault} 100%
      )`,
      },
    ]),
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
      opacity: percentage,
      transform: `translatex(${(1 - percentage) * 25}vw)`,
      position: "relative",
      display: "inline-block",
      margin: 0,
      transition: "0.25s",
      "&::after": {
        content: '""',
        position: "absolute",
        left: "100%",
        top: "50%",
        transform: `translate(8px, -50%)`,
        background: tokens.linearDefault,
        width: "100vw",
        height: 4,
        opacity: 1 - percentage,
      },
    }),

  ScrollParagraph: (percentage: number) =>
    css({
      opacity: percentage,
      transform: `translatey(${(1 - percentage) * 25}vh)`,
      margin: "16px 0",
      transition: "0.25s",
    }),

  FaceReveal: (percentage: number) =>
    css([
      {
        "@media(max-width: 675px)": {
          "& > img": {
            maxWidth: 300,
            maxHeight: 300,
          },
        },
        "& > img": {
          border: `solid 2px ${tokens.linearDefault}`,
          borderRadius: "50%",
          zIndex: 1,
          width: "100%",
          opacity: percentage,
        },
        position: "relative",
      },
    ]),

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
        boxShadow: `0 0 0 8px ${tokens.backgroundHighest}`,
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

export default function Home() {
  const scrollRef = useRef(null);
  const { initialHeight, scrollTop } = useScroll(scrollRef);

  const [introHeaderRef, para1, para2, para3, faceReveal, pHeadRef, pDescRef] =
    [
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
      useRef(null),
    ];

  const [introRatio, pr1, pr2, pr3, frPos, pHead, pDesc] = useScrollTransition({
    refs: [introHeaderRef, para1, para2, para3, faceReveal, pHeadRef, pDescRef],
    trigger: scrollTop,
    pointTo: initialHeight / 2,
  });

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View css={Styles.BodyContainer} innerRef={scrollRef}>
        {/* Header Section */}
        <View
          css={Styles.HeaderSection(
            (scrollTop / initialHeight) * (180 - 135),
            initialHeight
          )}
        >
          <View css={Styles.HeaderContentContainer}>
            <View css={Styles.HeaderContentText}>
              <View css={Styles.HeaderContents}>
                <h1 css={Styles.HeaderTitleMain}>Redneck</h1>
                <h1 css={Styles.HeaderTitleSecondary}>Fullstack</h1>
                <h2 css={Styles.HeaderTitleLast}>Web Developer</h2>
              </View>
              <FlexSpacer />
              <Text color="dimmer" multiline>
                I'm a Fullstack website developer who lives out in the country.
                I do support engineering at{" "}
                <a href="https://replit.com" target="_blank">
                  Replit
                </a>{" "}
                and enjoy building tools for empowering Trust & Safety.
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
                <h1 css={Styles.ScrollHeader(introRatio)} ref={introHeaderRef}>
                  <Tw>Hi there 👋</Tw>
                </h1>
              </div>
              <p css={Styles.ScrollParagraph(pr1)} ref={para1}>
                <Text color="dimmer" multiline>
                  I'm Conner Ow, a {age()}-year-old web developer who enjoys
                  programming, competing, solving puzzles, and living out in the
                  country.
                </Text>
              </p>
              <p css={Styles.ScrollParagraph(pr2)} ref={para2}>
                <Text color="dimmer" multiline>
                  I work as a full-time Support Engineer at{" "}
                  <a href="https://replit.com" target="_blank">
                    Replit
                  </a>{" "}
                  and enjoy helping others out, building new features, and
                  creating tools to improve Replit's Security and Trust & Safety
                  systems.
                </Text>
              </p>
              <p css={Styles.ScrollParagraph(pr3)} ref={para3}>
                <Text color="dimmer" multiline>
                  You can find me on the internet by the handle{" "}
                  <strong>@IroncladDev</strong> on most platforms.
                </Text>
              </p>
            </View>

            <View css={[rcss.p(16), rcss.flex.growAndShrink(2), rcss.colWithGap(16), rcss.align.center]}>
              <div css={Styles.FaceReveal(frPos)}>
                <img
                  src="https://cms.replit.com/assets/about/connerow.jpeg"
                  alt="oh look its a face reveal"
                  ref={faceReveal}
                />
              </div>
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
          <div>
            <h1 css={Styles.ScrollHeader(pHead)} ref={pHeadRef}>
              <Tw>Portfolio 💻</Tw>
            </h1>
          </div>
          <p css={Styles.ScrollParagraph(pDesc)} ref={pDescRef}>
            <Text color="dimmer" multiline>
              Many of my side projects include games, websites, and tools that
              others can use. Here are some of my personal favorites! (WIP btw)
            </Text>
          </p>
        </Section>

        <Footer/>
      </View>
    </View>
  );
}
