import { View, Text, tokens, rcss, FlexSpacer } from "application/ui";
import { useScrollControl } from "application/hooks/useScroll";
import { Project } from "application/components/Project";
import { useSpring, useTransform } from "framer-motion";
import Content from "public/content/projects";
import { Section, Markdown, Footer, Slant } from "application/components";
import Styles from "lib/baseStyles";

const { title, description, projects } = Content;

export default function Work() {
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
          <Project key={i} project={project} />
        ))}
      </Section>

      <Footer />
    </>
  );
}
