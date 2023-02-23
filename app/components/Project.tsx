import { View, Text, tokens, rcss, FlexSpacer, Button } from "app/ui";
import { RefObject } from "react";
import { Paragraph } from "./Paragraph";
import { Scroll } from "./Scroll";
import { ExternalLink, Code } from "react-feather";

export const Project = ({
  project,
  scrollRef,
  scrollEnd,
  initialHeight,
  index,
}: {
  project: {
    id: string;
    title: string;
    description: string;
    position: number;
    timeCreated: string;
    imageUrl: string;
    url: string;
    sourceCodeUrl: string;
  };
  scrollRef: RefObject<HTMLDivElement>;
  scrollEnd: number;
  initialHeight: number;
  index: number;
}) => {
  return (
    <Scroll scrollRef={scrollRef} end={scrollEnd}>
      {(percentage, abs) => (
        <View
          css={[
            rcss.flex.row,
            rcss.rowWithGap(16),
            rcss.py(16),
            {
              width: "100%",
            },
          ]}
        >
          <View
            css={[
              rcss.flex.grow(1),
              rcss.flex.row,
              {
                height: initialHeight,
                position: "relative",
                overflow: "hidden",
                clipPath:
                  index % 2 === 0
                    ? `polygon(0 0, 100% 48px, 100% 100%, 0 calc(100% - 48px));`
                    : `polygon(0 48px, 100% 0, 100% calc(100% - 48px), 0 100%);`,
                background: tokens.backgroundDepth,
                maxHeight: "500px",
              },
            ]}
          >
            <View
              css={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${project.imageUrl})`,
                  backgroundSize: `auto ${initialHeight}px`,
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
                  backgroundPosition: `left 50% top calc(100vh - ${initialHeight}px)`,
                  transition: "ease-out 0.5s",
                },
              ]}
              style={{
                opacity: percentage * 0.75,
                filter: `grayscale(${(1 - percentage * 0.75) * 100}%)`,
              }}
            />

            <View
              css={[
                {
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(0deg, ${tokens.backgroundDepth}, rgba(0, 0, 0, 0.5))`,
                  transition: "ease-out 0.5s",
                  padding: "64px 32px",
                },
                rcss.colWithGap(16),
              ]}
              style={{
                top: initialHeight - initialHeight * percentage,
                opacity: abs / 1.5,
              }}
            >
              <Text variant="headerDefault">{project.title}</Text>
              <Paragraph percentage={percentage}>
                {project.description}
              </Paragraph>
              <FlexSpacer />
              <View css={[rcss.flex.row, rcss.rowWithGap(16)]}>
                <a target="_blank" href={project.url} rel="noreferrer">
                  <Button
                    text={"Open " + project.title}
                    iconRight={<ExternalLink size={16} />}
                  />
                </a>
                {project.sourceCodeUrl ? (
                  <a
                    href={project.sourceCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button
                      text={"Source Code"}
                      iconRight={<Code size={16} />}
                    />
                  </a>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      )}
    </Scroll>
  );
};
