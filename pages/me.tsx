import { Navbar } from "application/components";
import useScroll from "application/hooks/useScroll";
import { AuthenticatedUser } from "application/types";
import { Button, Text, View, rcss, tokens } from "application/ui";
import Styles from "lib/baseStyles";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import authOptions from "./api/auth/[...nextauth]";

export default function Me() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { initialHeight, scrollTop } = useScroll(scrollRef);
  const scrollEnd = initialHeight / 2;
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((u) => setUser(u));
  }, []);

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View css={Styles.BodyContainer} innerRef={scrollRef}>
        <View css={[rcss.flex.grow(1), rcss.center]}>
          {user && user?.verified ? (
            <View
              css={[
                rcss.p(16),
                rcss.colWithGap(16),
                rcss.borderRadius(8),
                {
                  background: tokens.backgroundHigher,
                  border: `solid 1px ${tokens.backgroundHighest}`,
                  maxWidth: 300,
                },
              ]}
            >
              <Text variant="subheadBig">Authenticated!</Text>
              <Text color="dimmer" multiline>
                Thank you for joining my discord server! You have been
                authenticated successfully!
              </Text>
              <Button
                onClick={() => window.open("https://www.discord.com/app")}
                text="Open Discord"
              />
            </View>
          ) : null}
          {!user ||
            (!user.verified && (
              <View
                css={[
                  rcss.p(16),
                  rcss.colWithGap(16),
                  rcss.borderRadius(8),
                  {
                    background: tokens.backgroundHigher,
                    border: `solid 1px ${tokens.backgroundHighest}`,
                    maxWidth: 300,
                  },
                ]}
              >
                <Text variant="subheadBig">Verify your Email</Text>
                <Text color="dimmer" multiline>
                  A verification email has been sent to your inbox (same email
                  as your discord account). Please click the link to gain access
                  to my discord server.
                </Text>
                <Text color="dimmer" multiline>
                  If you can&apos;t find the email, please check your spam
                  folder.
                </Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
