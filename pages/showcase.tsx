import { View, Text, tokens, rcss, FlexSpacer, OutlineButton } from "app/ui";
import { Navbar, Section, Markdown, Footer, Slant } from "app/components";
import { useRef } from "react";
import useScroll from "app/hooks/useScroll";
import { Project } from "app/components/Project";
import Content from "public/content/projects";
import Styles from "lib/baseStyles";

const { title, description, projects } = Content;

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

        {/* Showcase projects */}
        <Section
          css={[
            rcss.p(16),
            rcss.colWithGap(64),
            {
              paddingBottom: "50vh",
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
