import { View, Text, tokens, rcss, FlexSpacer, OutlineButton } from "application/ui";
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
} from "application/components";
import { useRef, RefObject } from "react";
import useScroll from "application/hooks/useScroll";
import { css } from "@emotion/react";
import Link from "next/link";
import { Project } from "application/components/Project";
import { LazyBlogPost } from "application/components/BlogPost";
import Content from "public/content/index";
import Styles from "lib/baseStyles";

const { headline, about, projects, blog, contact } = Content;

export default function Home() {
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
                <h1 css={Styles.HeaderTitleMain}>{headline.titleHighlight}</h1>
                <h1 css={Styles.HeaderTitleSecondary}>{headline.title}</h1>
                <h2 css={Styles.HeaderTitleLast}>{headline.subTitle}</h2>
              </View>
              <FlexSpacer />
              <Text color="dimmer" multiline>
                <Markdown markdown={headline.description} />
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
                scrollRef.current?.scrollBy(0, innerHeight);
              }}
            ></button>
          </View>
          <Slant
            path="polygon(100% 0, 0% 100%, 100% 100%)"
            background={tokens.backgroundDefault}
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
              background: tokens.backgroundDefault,
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
                  {(p) => (
                    <h1 css={Styles.ScrollHeader(p)}>
                      <Markdown markdown={about.title} />
                    </h1>
                  )}
                </Scroll>
              </div>
              {about.paragraphs.map((text, i) => (
                <Scroll scrollRef={scrollRef} end={scrollEnd} key={i}>
                  {(p) => <Paragraph percentage={p}>{text}</Paragraph>}
                </Scroll>
              ))}
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
                {(p, P) => (
                  <div
                    css={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "50%",
                      border: `solid 1px rgb(191, 210, 231, ${1 - p})`,
                    }}
                  >
                    <img
                      src="https://cms.replit.com/assets/about/connerow.jpeg"
                      alt="oh look its a face reveal"
                      css={[
                        rcss.handleMaxWidth(675, {
                          maxWidth: 300,
                          maxHeight: 300,
                        }),
                        {
                          border: `solid 2px ${tokens.subgroundDefault}`,
                          borderRadius: "50%",
                          zIndex: 1,
                          width: "100%",
                          filter: "grayscale(100%)",
                        },
                      ]}
                      style={{
                        opacity: P / 2,
                        transform: `scale(${p * 75}%)`,
                      }}
                    />
                  </div>
                )}
              </Scroll>
              <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
                {(p) => (
                  <View
                    css={[rcss.justify.center, rcss.flex.row]}
                    style={{
                      transform: `translatey(${(1 - p) * 10}vh)`,
                      opacity: p,
                      transition: "ease-out 0.25s",
                    }}
                  >
                    <Link href="/about" passHref>
                      <a>
                        <OutlineButton text="Read More >>" />
                      </a>
                    </Link>
                  </View>
                )}
              </Scroll>
            </View>
          </View>
        </View>

        {/* Showcase projects */}
        <Section
          css={[rcss.p(16), rcss.colWithGap(64)]}
          background={tokens.backgroundRoot}
          head={
            <Slant
              path="polygon(0 0, 0% 100%, 100% 0)"
              background={tokens.backgroundDefault}
            />
          }
        >
          <View css={[rcss.colWithGap(16)]}>
            <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
              {(p) => (
                <h1 css={Styles.ScrollHeader(p)}>
                  <Markdown markdown={projects.title} />
                </h1>
              )}
            </Scroll>
            <Scroll scrollRef={scrollRef} end={scrollEnd}>
              {(p) => (
                <Paragraph percentage={p}>{projects.description}</Paragraph>
              )}
            </Scroll>
          </View>

          {projects.projects.map((project, i) => (
            <Project
              key={i}
              project={project}
              scrollRef={scrollRef}
              scrollEnd={scrollEnd}
            />
          ))}

          <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
            {(p) => (
              <View
                css={[rcss.justify.center, rcss.flex.row]}
                style={{
                  transform: `translatey(${(1 - p) * 10}vh)`,
                  opacity: p,
                  transition: "ease-out 0.25s",
                }}
              >
                <Link href="/showcase" passHref>
                  <a>
                    <OutlineButton text="See all >>" />
                  </a>
                </Link>
              </View>
            )}
          </Scroll>
        </Section>

        <Section
          css={[rcss.p(16), rcss.colWithGap(32)]}
          background={tokens.backgroundDefault}
          head={
            <Slant
              path="polygon(0 0, 100% 100%, 100% 0)"
              background={tokens.backgroundRoot}
            />
          }
        >
          <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
            {(p) => (
              <h1 css={Styles.ScrollHeader(p)}>
                <Markdown markdown={blog.title} />
              </h1>
            )}
          </Scroll>
          <Scroll scrollRef={scrollRef} end={scrollEnd}>
            {(p) => <Paragraph percentage={p}>{blog.description}</Paragraph>}
          </Scroll>
          <View
            css={[
              rcss.flex.row,
              rcss.justify.center,
              rcss.p(16),
              {
                flexWrap: "wrap",
                gap: 16,
              },
            ]}
          >
            {blog.posts.map(({ target: post, platform }, i) => (
              <LazyBlogPost
                post={post}
                platform={platform}
                key={i}
                scrollRef={scrollRef}
                scrollEnd={scrollEnd}
              />
            ))}
          </View>

          <View css={[rcss.flex.row, rcss.center]}>
            <Link href="/blog" passHref>
              <a>
                <OutlineButton text="Read More >>" />
              </a>
            </Link>
          </View>
        </Section>

        <Section
          css={[rcss.p(16), rcss.colWithGap(32), rcss.align.center]}
          background={`linear-gradient( 
            ${tokens.backgroundRoot},
            ${tokens.subgroundRoot}
          )`}
          head={
            <Slant
              path="polygon(0 0, 100% 100%, 100% 0)"
              background={tokens.backgroundDefault}
            />
          }
        >
          <View
            css={[
              rcss.p(16),
              rcss.flex.column,
              rcss.colWithGap(8),
              {
                width: "70vw",
                maxWidth: 500,
              },
            ]}
          >
            <Scroll scrollRef={scrollRef} end={scrollEnd} inline>
              {(p) => (
                <h1 css={Styles.ScrollHeader(p)}>
                  <Markdown markdown={contact.title} />
                </h1>
              )}
            </Scroll>

            {contact.socials.map(({ url, platform }, i) => (
              <SocialCard
                url={url}
                platform={platform}
                scrollRef={scrollRef}
                scrollEnd={scrollEnd}
                key={i}
              />
            ))}
          </View>
        </Section>

        <Footer />
      </View>
    </View>
  );
}
