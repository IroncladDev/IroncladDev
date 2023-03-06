import { View, tokens, rcss, Text, Tooltip, Button, FlexSpacer } from "app/ui";
import { useGetJSON } from "app/hooks/fetch";
import {
  Heart,
  Clock,
  Star,
  Users,
  ArrowRight,
  GitBranch,
  GitHub,
  Code,
  MessageSquare,
  List,
  BarChart2,
  Award as Badge,
  BarChart
} from "react-feather";
import { SocialPlatform } from "public/content/types";
import { SocialDescription } from "public/content/misc";
import { useEffect, useReducer, useRef } from 'react';
import { format } from 'date-fns';

interface CardStat {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string | number;
}

interface StatObj {
  [key: string]: CardStat;
}

export const BaseCard = ({
  social,
  stats = [],
  loading = false
}: {
  social: SocialPlatform;
  stats?: Array<CardStat>;
  loading?: boolean;
}) => {
  return (
    <View
      css={[
        rcss.p(16),
        rcss.borderRadius(8),
        rcss.colWithGap(16),
        {
          background: tokens.backgroundHigher,
          maxWidth: 400,
          minWidth: 300
        },
      ]}
    >
      <View css={[rcss.rowWithGap(16), rcss.align.center]}>
        <View
          css={[
            rcss.p(4),
            rcss.borderRadius(8),
            {
              background: tokens.backgroundDefault,
            },
          ]}
        >
          <img src={SocialDescription[social].icon} width={32} height={32} />
        </View>
        <Text variant="subheadBig">{SocialDescription[social].title}</Text>

        {stats.length === 0 ? <>
          <FlexSpacer />
          <a
            href={SocialDescription[social].url}
            target="_blank"
            rel="noreferrer"
            style={{ flexGrow: 1, display: "flex", textDecoration: "none" }}
          >
            <Button
              text={social === SocialPlatform.Discord ? `Join Server` : `${SocialDescription[social].title} ${social === SocialPlatform.Email ? "Me" : "Profile"}`}
              iconRight={<ArrowRight />}
              css={[rcss.flex.grow(1)]}
              small
            />
          </a>
        </> : null}
      </View>
      {stats.length && !loading ? (
        <View css={[rcss.flex.column, rcss.colWithGap(8)]}>
          {stats.map((stat, i) => (
            <Tooltip key={i} tooltip={stat.description} bg={tokens.backgroundHighest}>
              <View
                css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}
                key={i}
              >
                {stat.icon}
                <Text>{stat.title}</Text>
                <View
                  css={[
                    rcss.flex.grow(1),
                    rcss.borderRadius(8),
                    {
                      borderTop: `solid 4px ${tokens.backgroundHighest}`,
                    },
                  ]}
                ></View>
                <Text>{stat.value}</Text>
              </View>
            </Tooltip>
          ))}
        </View>
      ) : null}

      {stats.length && loading ? stats.map((_, i) => <View css={[rcss.p(4), rcss.borderRadius(4), {
        animation: `load 1s infinite ease-in`
      }]} key={i}></View>) : null}

      {stats?.length > 0 ? <View css={[rcss.flex.row]}>
        <a
          href={SocialDescription[social].url}
          target="_blank"
          rel="noreferrer"
          style={{ flexGrow: 1, display: "flex", textDecoration: "none" }}
        >
          <Button
            text={`View ${SocialDescription[social].title} Profile`}
            iconRight={<ArrowRight />}
            css={[rcss.flex.grow(1)]}
            small
          />
        </a>
      </View> : null}
    </View>
  );
};

export const DevCard = () => {
  const { data, loading } = useGetJSON("/api/profiles/dev");
  const [, reload] = useReducer(x => x + 1, 0)

  const stats = useRef<StatObj>({
    posts: {
      icon: <List size={16} />,
      title: "Posts",
      description: "Total amount of published posts on Dev.to",
      value: 18,
    },
    likes: {
      icon: <Heart size={16} />,
      title: "Likes",
      description: "Total amount of likes gained on published posts",
      value: 1177,
    },
    comments: {
      icon: <MessageSquare size={16} />,
      title: "Comments",
      description: "Total amount of comments gained on published posts",
      value: 165,
    },
    dateJoined: {
      icon: <Clock size={16} />,
      title: "Joined",
      description: "The date I joined Dev.to",
      value: 'December 4th, 2020',
    },
  })

  useEffect(() => {
    if (data?.user && data?.posts?.length) {
      const { user, posts } = data;
      stats.current.posts.value = posts.length;
      stats.current.likes.value = posts.map(x => x.public_reactions_count
      ).reduce((a, b) => a + b);
      stats.current.comments.value = posts.map(x => x.comments_count).reduce((a, b) => a + b);
      stats.current.dateJoined.value = format(
        new Date(user.joined_at),
        "MMMM Qo, yyyy"
      );
      reload();
    }
  }, [data, loading]);

  return (
    <BaseCard
      social={SocialPlatform.Dev}
      loading={loading}
      stats={Object.values(stats?.current)}
    />
  );
};

export const ReplitCard = () => {
  const { data, loading } = useGetJSON("/api/profiles/replit");
  const [, reload] = useReducer(x => x + 1, 0)

  const stats = useRef<StatObj>({
    followers: {
      icon: <Users size={16} />,
      title: "Followers",
      description: "Total amount of followers on Replit",
      value: 1845,
    },
    likes: {
      icon: <Heart size={16} />,
      title: "Likes",
      description: "Total amount of likes gained on public Repls",
      value: 4979,
    },
    forks: {
      icon: <GitBranch size={16} />,
      title: "Forks",
      description: "Total amount of forks gained on public Repls",
      value: 6443,
    },
    repls: {
      icon: <Code size={16} />,
      title: "Repls",
      description: "Total amount of public repls",
      value: 70,
    },
    dateJoined: {
      icon: <Clock size={16} />,
      title: "Joined",
      description: "The date I joined Replit",
      value: 'September 3rd, 2020',
    },
  })

  useEffect(() => {
    if (data?.data?.userByUsername) {
      const user = data.data.userByUsername;
      stats.current.followers.value = user.followerCount;
      stats.current.likes.value = user.publicRepls?.items?.map(x => x.likeCount).reduce((a, b) => a + b);
      stats.current.dateJoined.value = format(
        new Date(user.timeCreated),
        "MMMM Qo, yyyy"
      );
      stats.current.forks.value = user.publicRepls?.items?.map(x => x.publicForkCount).reduce((a, b) => a + b);
      stats.current.repls.value = user.publicRepls?.items?.length
      reload();
    }
  }, [data, loading]);

  return (
    <BaseCard
      social={SocialPlatform.Replit}
      loading={loading}
      stats={Object.values(stats?.current)}
    />
  );
};

export const CGCard = () => {
  const { data, loading } = useGetJSON("/api/profiles/codingame");
  const [, reload] = useReducer(x => x + 1, 0)

  const stats = useRef<StatObj>({
    rankCoc: {
      icon: <BarChart2 size={16} />,
      title: "CoC Rank",
      description: "Global Clash of Code Rank out of 3342280 users.",
      value: 1655,
    },
    rankGlobal: {
      icon: <BarChart size={16} />,
      title: "Global Rank",
      description: "Global Rank out of 3342280 users.",
      value: 7690,
    },
    badges: {
      icon: <Badge size={16} />,
      title: "Achievements",
      description: "Total amount of achievements gained",
      value: 35,
    },
    clashes: {
      icon: <MessageSquare size={16} />,
      title: "Clashes",
      description: "Total amount of clashes I've participated in",
      value: 1566,
    },
  })

  useEffect(() => {
    if (data?.user && data?.rank) {
      const { user, rank } = data;
      stats.current.rankCoc.value = rank.rank;
      stats.current.rankGlobal.value = user.codingamer.rank;
      stats.current.badges.value = user.achievementCount;
      stats.current.clashes.value = rank.clashesCount;
      stats.current.rankCoc.description = `Global Clash of Code Rank out of ${user.codingamePointsRankingDto.numberCodingamers} users.`
      stats.current.rankGlobal.description = `Global Rank out of ${user.codingamePointsRankingDto.numberCodingamers} users.`
      reload();
    }
  }, [data, loading]);

  return (
    <BaseCard
      social={SocialPlatform.Codingame}
      loading={loading}
      stats={Object.values(stats?.current)}
    />
  );
};

export const GithubCard = () => {
  const { data, loading } = useGetJSON("/api/profiles/github");
  const [, reload] = useReducer(x => x + 1, 0)

  const stats = useRef<StatObj>({
    stars: {
      icon: <Star size={16} />,
      title: "Stars",
      description: "Total amount of starts earned on Github",
      value: 185,
    },
    followers: {
      icon: <Users size={16} />,
      title: "Followers",
      description: "Total amount of followers on Github",
      value: 120,
    },
    forks: {
      icon: <GitBranch size={16} />,
      title: "Forks",
      description: "Total amount of forks on my Github Repos",
      value: 37,
    },
    repositories: {
      icon: <GitHub size={16} />,
      title: "Repositories",
      description: "Total amount of repositories Github",
      value: 22,
    },
    dateJoined: {
      icon: <Clock size={16} />,
      title: "Joined",
      description: "The date I joined Github",
      value: 'May 2nd, 2019',
    },
  })

  useEffect(() => {
    if (data) {
      const { user, repos } = data;
      stats.current.dateJoined.value = format(
        new Date(user.created_at),
        "MMMM Qo, yyyy"
      );

      stats.current.repositories.value = repos.length;
      stats.current.forks.value = repos.map(x => x.forks_count).reduce((a, b) => a + b);
      stats.current.followers.value = user.followers;
      stats.current.stars.value = repos.map(x => x.stargazers_count).reduce((a, b) => a + b);
      reload();
    }
  }, [data, loading]);

  return (
    <BaseCard
      social={SocialPlatform.Github}
      loading={loading}
      stats={Object.values(stats?.current)}
    />
  );
};
