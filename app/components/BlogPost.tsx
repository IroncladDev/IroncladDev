import { View, rcss, tokens, Text, Button } from "app/ui";
import { useGetJSONLazy } from "app/hooks/fetch";
import { useQuery } from "app/hooks/gql/useQuery";
import { useEffect } from "react";
import { ExternalLink, Heart, MessageSquare } from "react-feather";
import { formatRelative } from "date-fns";
import { Markdown } from ".";
import { BlogPostPlatform as BlogPlatform } from "public/content/types";

interface BlogPostType {
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
  p,
}: {
  post: BlogPostType;
  p: number;
}) {
  return (
    <View
      css={[
        rcss.flex.column,
        rcss.py(16),
        rcss.colWithGap(16),
        {
          borderBottom: `solid 2px ${tokens.backgroundHighest}`,
        },
      ]}
      style={{
        transform: `translatey(${(1 - p) * 15}vh)`,
        opacity: p + 0.5,
      }}
    >
      <View css={[rcss.flex.row]}>
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <View
            css={[
              rcss.rowWithGap(8),
              rcss.align.center,
              {
                borderBottom: `solid 2px ${tokens.backgroundHigher}`,
              },
            ]}
          >
            <Text variant="subheadBig">{post.title}</Text>
            <ExternalLink size={16} />
          </View>
        </a>
      </View>

      {post.coverImage ? (
        <View
          css={{
            "& img": {
              border: `solid 2px ${tokens.backgroundHigher}`,
              borderRadius: 8,
              width: "100%",
              maxWidth: 500,
            },
          }}
        >
          <img src={post.coverImage} />
        </View>
      ) : null}

      <View
        css={[
          rcss.pl(16),
          rcss.py(8),
          {
            borderLeft: `solid 2px ${tokens.backgroundHighest}`,
          },
        ]}
      >
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
          {formatRelative(new Date(post?.timeCreated || 0), new Date())}
        </Text>
      </View>
    </View>
  );
}

export function LazyBlogPost({
  post,
  platform,
  percentage: p,
}: {
  post: string;
  platform: BlogPlatform;
  percentage: number;
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
            p={p}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {replitPostLoading || !replitPost.post ? (
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
            p={p}
          />
        )}
      </>
    );
  }
}
