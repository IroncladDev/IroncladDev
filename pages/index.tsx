import { MotionValue, useSpring, useTransform, motion } from "framer-motion";
import { ScrollHeader } from "application/components/ScrollHeader";
import { LazyBlogPost } from "application/components/BlogPost";
import { useScrollControl } from "application/hooks/useScroll";
import { Project } from "application/components/Project";
import { Projects as AllProjects } from "public/content/projects";
import Content from "public/content/index";
import Styles from "lib/baseStyles";
import {
  Section,
  Markdown,
  Footer,
  Slant,
  LogoHeader,
  SocialCard,
  ScrollControl,
  ParagraphControl,
} from "application/components";
import Link from "next/link";
import {
  View,
  Text,
  tokens,
  rcss,
  FlexSpacer,
  OutlineButton,
} from "application/ui";

const { headline, about, projects, blog, contact } = Content;

function FaceImage({ percentage }: { percentage: MotionValue<number> }) {
  const smooth = useSpring(percentage, {
    mass: 0.05,
  });

  const border = useTransform(
    smooth,
    (p) => `solid 1px rgb(191, 210, 231, ${1 - p})`
  );

  const opacity = useTransform(smooth, (p) => p * 0.75);

  const transform = useTransform(smooth, (p) => `scale(${p * 75}%)`);

  return (
    <motion.div
      css={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
      }}
      style={{ border }}
    >
      <motion.img
        src="/me.webp"
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
          opacity,
          transform,
        }}
      />
    </motion.div>
  );
}

function FadeUpButton({
  percentage,
  href,
  text,
}: {
  percentage: MotionValue<number>;
  text: string;
  href: string;
}) {
  const smooth = useSpring(percentage, {
    mass: 0.4,
  });

  const transform = useTransform(
    smooth,
    (p) => `translatey(${(1 - p) * 10}vh)`
  );

  return (
    <View
      css={[rcss.justify.center, rcss.flex.row]}
      style={{
        transform,
        opacity: smooth,
      }}
    >
      <Link href={href} legacyBehavior>
        <a>
          <OutlineButton text={text} />
        </a>
      </Link>
    </View>
  );
}

function Header() {
  const { initialHeight, scrollTop, scrollRef } = useScrollControl();

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
    <View
      css={[rcss.center, rcss.flex.column]}
      style={{
        minHeight: "calc(100vh - 100px)",
        background,
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
            scrollRef.current?.scrollBy(0, window.innerHeight);
          }}
          aria-label="scroll down"
        />
      </View>
      <Slant
        path="polygon(100% 0, 0% 100%, 100% 100%)"
        background={tokens.backgroundDefault}
        borderTop
      />
    </View>
  );
}

function Introduction() {
  return (
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
            rcss.maxWidth(600),
          ]}
        >
          <div>
            <ScrollControl inline>
              {(p) => (
                <ScrollHeader percentage={p}>
                  <Markdown markdown={about.title} />
                </ScrollHeader>
              )}
            </ScrollControl>
          </div>
          {about.paragraphs.map((text, i) => (
            <ScrollControl key={i}>
              {(p) => (
                <ParagraphControl percentage={p} index={i}>
                  {text}
                </ParagraphControl>
              )}
            </ScrollControl>
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
          <ScrollControl>{(p) => <FaceImage percentage={p} />}</ScrollControl>
          <ScrollControl inline>
            {(p) => (
              <FadeUpButton percentage={p} href="/about" text="Read More >>" />
            )}
          </ScrollControl>
        </View>
      </View>
    </View>
  );
}

function Projects() {
  return (
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
        <ScrollControl inline>
          {(p) => (
            <ScrollHeader percentage={p}>
              <Markdown markdown={projects.title} />
            </ScrollHeader>
          )}
        </ScrollControl>
        <ScrollControl>
          {(p) => (
            <ParagraphControl percentage={p}>
              {projects.description}
            </ParagraphControl>
          )}
        </ScrollControl>
      </View>

      {projects.projects.map((project, i) => (
        <Project key={i} project={project} />
      ))}

      <ScrollControl inline>
        {(p) => (
          <FadeUpButton
            percentage={p}
            href="/showcase"
            text={`See All (${AllProjects.length}) >>`}
          />
        )}
      </ScrollControl>
    </Section>
  );
}

function BlogPosts() {
  return (
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
      <ScrollControl inline>
        {(p) => (
          <ScrollHeader percentage={p}>
            <Markdown markdown={blog.title} />
          </ScrollHeader>
        )}
      </ScrollControl>
      <ScrollControl>
        {(p) => (
          <ParagraphControl percentage={p}>{blog.description}</ParagraphControl>
        )}
      </ScrollControl>
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
        {blog.posts.map(({ target: post }, i) => (
          <LazyBlogPost post={post} key={i} index={i} />
        ))}
      </View>

      <ScrollControl inline>
        {(p) => (
          <FadeUpButton percentage={p} href="/blog" text="Read More >>" />
        )}
      </ScrollControl>
    </Section>
  );
}

function Contact() {
  return (
    <Section
      css={[rcss.p(16), rcss.align.center]}
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
          rcss.colWithGap(32),
          rcss.flex.column,
          {
            width: "70vw",
            maxWidth: 500,
          },
        ]}
      >
        <ScrollControl inline>
          {(p) => (
            <ScrollHeader percentage={p}>
              <Markdown markdown={contact.title} />
            </ScrollHeader>
          )}
        </ScrollControl>

        <View css={[rcss.colWithGap(16)]}>
          {contact.socials.map(({ url, platform }, i) => (
            <SocialCard url={url} platform={platform} key={i} />
          ))}
        </View>
      </View>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      {/* Header Section */}
      <Header />

      {/* Introduction */}
      <Introduction />

      {/* Showcase projects */}
      <Projects />

      {/* Blog */}
      <BlogPosts />

      {/* Contact */}
      <Contact />

      <Footer />
    </>
  );
}
