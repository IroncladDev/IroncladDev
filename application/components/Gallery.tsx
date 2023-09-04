import { ChevronLeft, ChevronRight, X } from "react-feather";
import {
  rcss,
  View,
  tokens,
  Text,
  IconButton,
  FlexSpacer,
} from "application/ui";
import { useState } from "react";
import useGallery from "application/hooks/useGallery";

export const Gallery = ({
  images,
  image,
}: {
  images: Array<string>;
  image: string;
}) => {
  const [slideIndex, setSlideIndex] = useState(
    images?.findIndex((x) => x === image) || 0
  );
  const { close } = useGallery();

  if (images) {
    return (
      <View
        css={[
          rcss.flex.column,
          rcss.borderRadius(8),
          {
            background: tokens.backgroundDefault,
            border: `solid 1px ${tokens.backgroundHigher}`,
            minWidth: 300,
            maxWidth: `calc(100vw - 32px)`,
            maxHeight: `calc(100vh - 32px)`,
          },
        ]}
      >
        <View
          css={[
            rcss.px(16),
            rcss.py(8),
            rcss.flex.row,
            rcss.align.center,
            {
              borderBottom: `solid 1px ${tokens.backgroundHigher}`,
            },
          ]}
        >
          <Text variant="subheadDefault">Gallery</Text>
          <FlexSpacer />
          <IconButton elevation="default" onClick={close}>
            <X color={tokens.foregroundDefault} size={16} />
          </IconButton>
        </View>

        <img
          src={images[slideIndex]}
          css={{
            maxWidth: 800,
            maxHeight: `calc(100vh - 128px)`,
          }}
          alt="Gallery Image"
        />

        {images.length > 1 ? (
          <View
            css={[rcss.flex.row, rcss.rowWithGap(16), rcss.p(8), rcss.center]}
          >
            <IconButton
              elevation="default"
              onClick={() =>
                setSlideIndex(
                  slideIndex === 0 ? images.length - 1 : slideIndex - 1
                )
              }
            >
              <ChevronLeft color={tokens.foregroundDefault} size={16} />
            </IconButton>

            {images.map((_, i) => (
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
                  slideIndex === images.length - 1 ? 0 : slideIndex + 1
                )
              }
            >
              <ChevronRight color={tokens.foregroundDefault} size={16} />
            </IconButton>
          </View>
        ) : null}
      </View>
    );
  } else {
    close();
    return null;
  }
};
