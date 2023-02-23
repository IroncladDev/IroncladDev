import { View, rcss, tokens, Text } from 'app/ui';
import { useGetJSONLazy } from 'app/hooks/fetch';
import { useQuery } from 'app/hooks/gql/useQuery';
import { useEffect } from 'react';

enum BlogPlatform {
  Dev = 'Dev',
  Replit = 'Replit'
}

interface BlogPostType {
  title: string;
  description: string;
  coverImage?: string;
  timeStampContent: string;
  url: string;
}

export default function BlogPost() {

}

export function LazyBlogPost({ post, platform, percentage: p }: { post: string; platform: BlogPlatform; percentage: number; }) {
  const [loadDevPost, { data: devPost, loading: devPostLoading }] = useGetJSONLazy("https://dev.to/api/articles/" + post);

  const { data: replitPost, loading: replitPostLoading, refetch: loadReplitPost } = useQuery({
    query: `query post($id: Int!) {
      post(id: $id) {
        title
        id
        url
        timeCreated
        replComment {
          body
        }
      }
    }`,
    variables: {
      id: Number(post)
    },
    hold: true
  })

  useEffect(() => {
    if (platform === BlogPlatform.Dev) {
      loadDevPost();
    } else {
      loadReplitPost();
    }
  }, []);

  if(platform === BlogPlatform.Dev) {
    return <>{(devPostLoading || !devPost) ? "loading..." : <View>
      <Text variant="subheadDefault">[Dev] {devPost.title}</Text>
    </View>}</>
  } else {
    return <>{(replitPostLoading || !replitPost) ? "loading" : <View>
      <Text variant="subheadDefault">[Replit] {replitPost.post.title}</Text>
    </View>}</>
  }
}