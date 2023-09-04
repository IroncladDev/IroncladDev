import { ExternalLink, Code, ChevronLeft, ChevronRight } from "react-feather";
import { Project as ProjectType, Technology } from "public/content/types";
import { TechnologyDescription } from "public/content/misc";
import { MotionValue, useTransform } from "framer-motion";
import { ParagraphControl } from "./Paragraph";
import { ScrollControl } from "./Scroll";
import { useState } from "react";
import {
  View,
  Text,
  tokens,
  rcss,
  Tooltip,
  Button,
  IconButton,
  FlexSpacer,
} from "application/ui";
import useGallery from "application/hooks/useGallery";

const PreviewImage = ({
  url,
  percentage,
  images,
}: {
  url: string;
  percentage: MotionValue<number>;
  images: Array<string>;
}) => {
  const { open } = useGallery();

  const openGallery = () => {
    open({
      images,
      image: url,
    });
  };

  const filter = useTransform(percentage, (p) => `grayscale(${1 - p})`);

  return (
    <View
      css={[
        rcss.borderRadius(8),
        {
          width: 300,
          height: 150,
          backgroundImage: `url(${url})`,
          backgroundSize: `cover`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          opacity: 0.25,
          transition: "ease-out 0.25s",
          border: `solid 2px ${tokens.backgroundHigher}`,
          "&:hover": {
            border: `solid 2px ${tokens.accentPrimaryStronger}`,
            transform: `scale(1.025)`,
            cursor: "pointer",
          },
        },
      ]}
      style={{
        opacity: percentage,
        filter,
      }}
      onClick={openGallery}
    />
  );
};

export const Project = ({ project }: { project: ProjectType }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <ScrollControl>
      {(p) => {
        const transform = useTransform(
          p,
          (pr) => `translatex(${(1 - pr) * 100}%)`
        );

        const transform2 = useTransform(
          p,
          (pr) => `translatex(-${(1 - pr) * 100}%)`
        );

        return (
          <View
            css={[
              rcss.flex.row,
              rcss.align.center,
              rcss.rowWithGap(16),
              rcss.py(16),
              {
                width: "100%",
                "@media(max-width: 700px)": {
                  flexDirection: "column",
                },
              },
            ]}
            style={{ opacity: p }}
          >
            <View
              css={[
                rcss.colWithGap(16),
                {
                  transition: "ease-out 0.25s",
                },
              ]}
              style={{
                transform: transform2,
              }}
            >
              {project.images
                .slice(
                  slideIndex >= project.images.length - 2
                    ? project.images.length - 2
                    : slideIndex,
                  slideIndex >= project.images.length - 2
                    ? project.images.length
                    : slideIndex + 2
                )
                .map((url, i) => (
                  <ScrollControl key={i}>
                    {(p) => (
                      <PreviewImage
                        key={i}
                        url={url}
                        percentage={p}
                        images={project.images}
                      />
                    )}
                  </ScrollControl>
                ))}
            </View>

            <View
              css={[
                rcss.flex.column,
                rcss.colWithGap(16),
                {
                  transition: "ease-out 0.25s",
                  marginTop: 24,
                  maxWidth: `calc(100% - 32px)`,
                  "@media(min-width: 700px)": {
                    flex: "1 1 0",
                    height: "100%",
                    marginTop: 0,
                  },
                },
              ]}
              style={{
                transform,
              }}
            >
              <Text variant="subheadBig">{project.title}</Text>
              <View>
                <ParagraphControl percentage={p}>
                  {project.slides[slideIndex]}
                </ParagraphControl>
              </View>
              <Text color="dimmest" variant="small">
                {"• "}
                {project.timeCreated}
              </Text>

              <View
                css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}
              >
                {project.stack.map((technology, i) => (
                  <Tooltip
                    key={i}
                    tooltip={
                      <View
                        css={[
                          rcss.flex.column,
                          rcss.colWithGap(4),
                          {
                            minWidth: 200,
                          },
                        ]}
                      >
                        <Text variant="subheadDefault">
                          {TechnologyDescription[Technology[technology]].title}
                        </Text>
                        <Text variant="small" color="dimmer" multiline>
                          {
                            TechnologyDescription[Technology[technology]]
                              .description
                          }
                        </Text>
                      </View>
                    }
                    align={["center", "top"]}
                  >
                    <img
                      src={`/skills/${technology}.webp`}
                      width="36"
                      height="36"
                      css={[
                        rcss.borderRadius(8),
                        rcss.p(2),
                        {
                          border: `solid 1px ${tokens.backgroundHighest}`,
                        },
                      ]}
                      alt="Technology"
                    />
                  </Tooltip>
                ))}
              </View>

              <FlexSpacer />

              <View
                css={[rcss.flex.row, rcss.rowWithGap(16), rcss.align.center]}
              >
                {project.slides.length > 1 ? (
                  <View
                    css={[
                      rcss.flex.row,
                      rcss.rowWithGap(16),
                      rcss.align.center,
                    ]}
                  >
                    <IconButton
                      elevation="default"
                      onClick={() =>
                        setSlideIndex(
                          slideIndex === 0
                            ? project.slides.length - 1
                            : slideIndex - 1
                        )
                      }
                    >
                      <ChevronLeft color={tokens.foregroundDefault} size={16} />
                    </IconButton>

                    {project.slides.map((_, i) => (
                      <button
                        key={i}
                        css={[
                          rcss.borderRadius("full"),
                          {
                            background:
                              slideIndex === i
                                ? tokens.foregroundDefault
                                : tokens.foregroundDimmest,
                            border: "none",
                            boxShadow:
                              slideIndex === i
                                ? `0 0 0 4px ${tokens.backgroundHighest}`
                                : "none",
                            padding: 6,
                            transition: `0.25s`,
                            "&:focus": {
                              boxShadow: `0 0 0 2px ${tokens.accentPrimaryStrongest}`,
                            },
                            "&:hover": {
                              background: tokens.foregroundDimmer,
                              boxShadow:
                                slideIndex === i
                                  ? `0 0 0 6px ${tokens.backgroundHighest}`
                                  : `0 0 0 4px ${tokens.backgroundHighest}`,
                            },
                          },
                        ]}
                        onClick={() => setSlideIndex(i)}
                      />
                    ))}

                    <IconButton
                      elevation="variable"
                      onClick={() =>
                        setSlideIndex(
                          slideIndex === project.slides.length - 1
                            ? 0
                            : slideIndex + 1
                        )
                      }
                    >
                      <ChevronRight
                        color={tokens.foregroundDefault}
                        size={16}
                      />
                    </IconButton>
                  </View>
                ) : null}

                <View
                  css={[
                    rcss.flex.grow(1),
                    rcss.pl(project.slides.length > 1 ? 16 : 0),
                    rcss.flex.row,
                    rcss.rowWithGap(8),
                    {
                      height: "100%",
                      borderLeft:
                        project.slides.length > 1
                          ? `solid 1px ${tokens.backgroundHighest}`
                          : "none",
                    },
                  ]}
                >
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer">
                      <Button
                        text="Launch"
                        iconRight={<ExternalLink size={12} />}
                        small
                      />
                    </a>
                  ) : null}

                  {project.sourceCodeUrl ? (
                    <a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        text="Source Code"
                        iconRight={<Code size={12} />}
                        small
                      />
                    </a>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        );
      }}
    </ScrollControl>
  );
};
