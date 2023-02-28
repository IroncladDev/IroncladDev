import { View, Text, tokens, rcss, FlexSpacer, Button, IconButton } from "app/ui";
import { RefObject } from "react";
import { Scroll } from "./Scroll";
import { Paragraph } from ".";
import { ExternalLink, Code, ChevronLeft, ChevronRight } from "react-feather";
import { Project as ProjectType } from "public/content/types";
import { constrain } from "lib";
import { useState } from "react";

const PreviewImage = ({
  url,
  scrollRef,
  scrollEnd,
}: {
  url: string;
  scrollRef: RefObject<HTMLDivElement>;
  scrollEnd: number;
}) => {
  return (
    <Scroll scrollRef={scrollRef} end={scrollEnd}>
      {(percentage) => (
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
            },
          ]}
          style={{
            backgroundPosition: `0 -${(1 - percentage) * 150}px`,
            opacity: 0.25 + percentage / 2,
            filter: `grayscale(${1 - percentage})`,
          }}
        />
      )}
    </Scroll>
  );
};

export const Project = ({
  project,
  scrollRef,
  scrollEnd,
  initialHeight,
  index,
}: {
  project: ProjectType;
  scrollRef: RefObject<HTMLDivElement>;
  scrollEnd: number;
  initialHeight: number;
  index: number;
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <View
      css={[
        rcss.flex.row,
        rcss.align.center,
        rcss.rowWithGap(16),
        rcss.py(16),
        {
          width: "100%",
        },
      ]}
    >
      <View css={[rcss.flex.column, rcss.colWithGap(16)]}>
        {project.images.slice(slideIndex >= project.images.length - 2 ? project.images.length - 2 : slideIndex, slideIndex >= project.images.length - 2 ? project.images.length : slideIndex + 2).map((url) => <PreviewImage
          url={url}
          scrollRef={scrollRef}
          scrollEnd={scrollEnd}
        />)}
      </View>
      <View
        css={[
          rcss.flex.column,
          rcss.colWithGap(16),
          {
            flex: "1 1 0",
          },
        ]}
      >
        <Text variant="subheadBig">{project.title}</Text>
        <View>
          <Paragraph>{project.slides[slideIndex]}</Paragraph>
        </View>

        <View css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}>
          {project.stack.map((technology) => <img src={`/skills/${technology}.webp`} width="36" height="36" css={[rcss.borderRadius(8), rcss.p(2), {
            border: `solid 1px ${tokens.backgroundHighest}`
          }]}/>)}
        </View>
        
        <View css={[rcss.flex.row, rcss.rowWithGap(16), rcss.align.center]}>
          <View css={[rcss.flex.row, rcss.rowWithGap(16), rcss.align.center]}>
            <IconButton elevation="default" onClick={() => setSlideIndex(slideIndex === 0 ? 0 : slideIndex - 1)}>
              <ChevronLeft color={tokens.foregroundDefault} size={16} />
            </IconButton>

            {project.slides.map((_, i) => <button css={[rcss.p(4), rcss.borderRadius('full'), {
              background: slideIndex === i ? tokens.foregroundDefault : tokens.foregroundDimmest,
              border: 'none',
              boxShadow: slideIndex === i ? `0 0 0 4px ${tokens.backgroundHighest}` : "none",
              '&:hover': {
                background: tokens.foregroundDimmer
              }

            }]} onClick={() => setSlideIndex(i)} />)}

            <IconButton elevation="variable" onClick={() => setSlideIndex(slideIndex === project.slides.length - 1 ? project.slides.length - 1 : slideIndex + 1)}>
              <ChevronRight color={tokens.foregroundDefault} size={16} />
            </IconButton>
          </View>
          <View css={[rcss.flex.grow(1), rcss.pl(16), rcss.flex.row, rcss.rowWithGap(8), {
            height: '100%',
            borderLeft: `solid 1px ${tokens.backgroundHighest}`,
          }]}>
            {project.url ? <a href={project.url} target="_blank" rel="noreferrer">
              <Button text="Launch" iconRight={<ExternalLink size={12}/>} small/>
            </a> : null}

            {project.sourceCodeUrl ? <a href={project.sourceCodeUrl} target="_blank" rel="noreferrer">
              <Button text="Source Code" iconRight={<Code size={12}/>} small/>
            </a> : null}
          </View>
        </View>
      </View>
    </View>
  );
};
