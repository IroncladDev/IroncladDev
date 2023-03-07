import { View, rcss, tokens, Text, Button } from "application/ui";
import { useGetJSONLazy } from "application/hooks/fetch";
import { useQuery } from "application/hooks/gql/useQuery";
import { RefObject, useEffect } from "react";
import { Heart, MessageSquare } from "react-feather";
import { formatRelative } from "date-fns";
import { Markdown } from ".";
import { BlogPostPlatform as BlogPlatform } from "public/content/types";
import { Scroll } from "application/components";

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
  scrollRef,
  scrollEnd,
}: {
  post: BlogPostType;
  scrollRef: RefObject<HTMLDivElement>;
  scrollEnd: number;
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
        <Scroll scrollRef={scrollRef} end={scrollEnd}>
          {(p) => (
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
                transform: `translatey(${(1 - p) * 15}vh)`,
                opacity: p,
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
                  <img src={post.coverImage} />
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
          )}
        </Scroll>
      </View>
    </View>
  );
}

export function LazyBlogPost({
  post,
  platform,
  scrollRef,
  scrollEnd,
}: {
  post: string;
  platform: BlogPlatform;
  scrollRef: RefObject<HTMLDivElement>;
  scrollEnd: number;
}) {
  const [loadDevPost, { data: devPost, loading: devPostLoading }] =
    useGetJSONLazy("https://dev.to/api/articles/" + post);

  const {
    data: replitPost,
    loading: replitPostLoading,
    refetch: loadReplitPost,
  } = useQuery({
    query: `query post($id: Int!) {
      post(id: $id) {
        title
        id
        url
        timeCreated
        replComment {
          id
          body
          replies { id }
        }
        repl {
          url
        }
      }
    }`,
    variables: {
      id: Number(post),
    },
    hold: true,
  });

  useEffect(() => {
    if (platform === BlogPlatform.Dev) {
      loadDevPost();
    } else {
      loadReplitPost();
    }
  }, []);

  if (platform === BlogPlatform.Dev) {
    return (
      <>
        {devPostLoading || !devPost ? (
          "loading..."
        ) : (
          <BlogPost
            post={{
              title: devPost.title,
              description: devPost.body_markdown,
              url: devPost.canonical_url,
              coverImage: devPost.cover_image,
              timeCreated: devPost.created_at,
              reactionCount: devPost.public_reactions_count,
              commentCount: devPost.comments_count,
            }}
            scrollRef={scrollRef}
            scrollEnd={scrollEnd}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {replitPostLoading || !replitPost?.post ? (
          "loading"
        ) : (
          <BlogPost
            post={{
              title: replitPost.post.title,
              description: replitPost.post.replComment.body,
              url:
                "https://replit.com" +
                replitPost.post.repl.url +
                "?c=" +
                replitPost.post.replComment?.id,
              timeCreated: replitPost.post.timeCreated,
              commentCount: replitPost.post.replComment?.replies?.length,
            }}
            scrollRef={scrollRef}
            scrollEnd={scrollEnd}
          />
        )}
      </>
    );
  }
}
