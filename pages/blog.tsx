import { Section, Markdown, Footer, Slant } from "application/components";
import BlogPost, { BlogPostType } from "application/components/BlogPost";
import { View, Text, tokens, rcss, FlexSpacer } from "application/ui";
import { useScrollControl } from "application/hooks/useScroll";
import { useQuery } from "application/hooks/gql/useQuery";
import { useSpring, useTransform } from "framer-motion";
import { useGetJSON } from "application/hooks/fetch";
import { ObjectAny } from "application/types";
import { useEffect, useState } from "react";
import Content from "public/content/blog";
import Styles from "lib/baseStyles";

const { title, description } = Content;

export default function Blog() {
  const [posts, setPosts] = useState<Array<BlogPostType>>([]);
  const { initialHeight, scrollTop } = useScrollControl();
  const scrollEnd = initialHeight / 2;

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

  const { data: devPosts, loading: devPostsLoading } = useGetJSON(
    "https://dev.to/api/articles?username=ironcladdev"
  );

  const { data: replitPosts, loading: replitPostsLoading } = useQuery({
    query: `query repl($url: String!) {
      repl(url: $url) {
        ...on Repl {
          id url slug
          posts(count: 100) {
            items {
              title id
              commentCount
              timeCreated
              replComment {
                body
              }
            }
          }
        }
      }
    }`,
    variables: {
      url: "/@IroncladDev/Replit-Blog-IroncladDev",
    },
  });

  useEffect(() => {
    const devPostsArr = devPosts?.length ? devPosts : [];
    const replitPostsArr = replitPosts?.repl?.posts?.items?.length
      ? replitPosts.repl.posts.items
      : [];

    const allPosts: Array<BlogPostType> = [];

    devPostsArr.forEach((p: ObjectAny) => {
      allPosts.push({
        title: p.title,
        description: p.description,
        coverImage: p.cover_image,
        timeCreated: p.created_at,
        url: p.url,
        reactionCount: p.public_reactions_count,
        commentCount: p.comments_count,
      });
    });

    replitPostsArr.forEach((p: ObjectAny) => {
      if (p?.replComment?.body) {
        allPosts.push({
          title: p.title,
          description: p.replComment.body,
          timeCreated: p.timeCreated,
          url:
            "https://replit.com/@IroncladDev/Replit-Blog-IroncladDev?c=" + p.id,
          commentCount: p.commentCount,
        });
      }
    });

    setPosts(
      allPosts.sort(
        (a, b) =>
          new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
      )
    );
  }, [devPostsLoading, replitPostsLoading, devPosts, replitPosts]);

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

      {/* Posts */}
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
          {posts.map((post, i) => (
            <BlogPost post={post} scrollEnd={scrollEnd} key={i} />
          ))}
        </View>
      </Section>

      <Footer />
    </>
  );
}
