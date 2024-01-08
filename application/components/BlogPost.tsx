import { View, rcss, tokens, Text } from "application/ui";
import { useGetJSONLazy } from "application/hooks/fetch";
import { useSpring, useTransform } from "framer-motion";
import { ScrollControl } from "application/components";
import { Heart, MessageSquare } from "react-feather";
import { formatRelative } from "date-fns";
import { useEffect } from "react";
import { Markdown } from ".";

export interface BlogPostType {
  title: string;
  description: string;
  coverImage?: string;
  timeCreated: string;
  url: string;
  reactionCount?: number;
  commentCount?: number;
}

export default function BlogPost({
  post,
  index,
}: {
  post: BlogPostType;
  index?: number;
}) {
  return (
    <View
      css={[
        rcss.flex.row,
        rcss.borderRadius(8),
        {
          flex: "1 1 0",
          minWidth: 400,
          maxWidth: 700,
          "@media(max-width: 1000px)": {
            minWidth: 300,
          },
        },
      ]}
    >
      <View
        css={[
          rcss.position.relative,
          {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          },
        ]}
      >
        <ScrollControl>
          {(p) => {
            const smooth = useSpring(p, {
              mass: (index || 0) % 2 === 0 ? 0.25 : 1,
            });

            const transform = useTransform(
              smooth,
              (pr) => `translatey(${(1 - pr) * 15}vh)`
            );

            return (
              <View
                css={[
                  rcss.flex.column,
                  rcss.borderRadius(8),
                  {
                    border: `solid 1px ${tokens.backgroundHighest}`,
                    transition: "ease-out 0.25s",
                  },
                ]}
                style={{
                  transform,
                  opacity: smooth,
                }}
              >
                {post.coverImage ? (
                  <View
                    css={{
                      "& img": {
                        borderRadius: "8px 8px 0 0",
                        width: "100%",
                        borderBottom: `solid 1px ${tokens.backgroundHighest}`,
                      },
                    }}
                  >
                    <img src={post.coverImage} alt="Cover Image" />
                  </View>
                ) : null}

                <View css={[rcss.p(16), rcss.flex.column, rcss.colWithGap(16)]}>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    css={{ textDecoration: "none" }}
                  >
                    <View css={[rcss.rowWithGap(8), rcss.align.center]}>
                      <Text variant="subheadDefault" multiline>
                        {post.title}
                      </Text>
                    </View>
                  </a>

                  <View
                    css={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      lineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    <Text color="dimmer" multiline>
                      <Markdown markdown={post.description} />
                    </Text>
                  </View>

                  <View css={[rcss.rowWithGap(16)]}>
                    {post.reactionCount ? (
                      <View css={[rcss.rowWithGap(4), rcss.align.center]}>
                        <Heart size={16} />
                        <Text>{post.reactionCount}</Text>
                      </View>
                    ) : null}
                    {post.commentCount ? (
                      <View css={[rcss.rowWithGap(4), rcss.align.center]}>
                        <MessageSquare size={16} />
                        <Text>{post.commentCount}</Text>
                      </View>
                    ) : null}
                    <Text color="dimmer">
                      {formatRelative(
                        new Date(post?.timeCreated || 0),
                        new Date()
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        </ScrollControl>
      </View>
    </View>
  );
}

export function LazyBlogPost({
  post,
  index,
}: {
  post: string;
  index?: number;
}) {
  const [loadDevPost, { data: devPost, loading: devPostLoading }] =
    useGetJSONLazy("https://dev.to/api/articles/" + post);

  useEffect(() => {
    loadDevPost();
  }, []);

  return (
    <>
      {devPostLoading || !devPost ? (
        "loading..."
      ) : (
        <BlogPost
          post={{
            title: devPost?.title || "",
            description: devPost.body_markdown?.slice(0, 360) + "...",
            url: devPost?.canonical_url || "",
            coverImage: devPost?.cover_image || "",
            timeCreated: devPost?.created_at || "",
            reactionCount: devPost?.public_reactions_count || 0,
            commentCount: devPost?.comments_count || 0,
          }}
          index={index}
        />
      )}
    </>
  );
}
