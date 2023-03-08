import { useState, useEffect, useRef } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Button, Input, tokens, View, Text, rcss } from "application/ui";
import { AuthenticatedUser, ObjectAny } from "application/types";
import config from "server/server.config";
import { Navbar } from "application/components";
import Styles from "lib/baseStyles";

const styles: ObjectAny = {};

const USERS_PER_PAGE = 10;

export default function Dashboard() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<Array<AuthenticatedUser>>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [type, setType] = useState(0);
  const restart = useRef(true);
  const end = useRef(false);

  useEffect(() => {
    fetch(
      `/api/search?page=${page}&type=${type}&query=${encodeURIComponent(query)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          end.current = data.users.length < USERS_PER_PAGE;
          if (restart.current) {
            setUsers(data.users);
            restart.current = false;
          } else {
            setUsers((u) => [...u, ...data.users]);
          }
        }
      });
  }, [page, query, type]);

  function fetchMore() {
    setPage((p) => p + 1);
  }

  return (
    <View css={Styles.Container}>
      <Navbar scrollRef={scrollRef} />
      <View
        css={[
          Styles.BodyContainer,
          rcss.flex.column,
          rcss.colWithGap(16),
          rcss.p(16),
          { background: tokens.backgroundDefault },
        ]}
        innerRef={scrollRef}
      >
        <View css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}>
          <View
            css={[
              rcss.flex.column,
              rcss.colWithGap(8),
              {
                minWidth: 350,
                maxWidht: 600,
              },
            ]}
          >
            <Input
              placeholder="Search a username"
              onChange={(e) => {
                restart.current = true;
                setQuery(e.target.value);
              }}
              value={query}
            />
            <select
              onChange={(e) => {
                restart.current = true;
                setType(+e.target.value);
              }}
              value={type}
            >
              <option value={0}>All</option>
              <option value={1}>Verified</option>
              <option value={2}>Unverified</option>
            </select>
          </View>
          {users.map((user, i) => (
            <View
              key={i}
              css={[
                rcss.flex.row,
                rcss.rowWithGap(8),
                rcss.align.center,
                rcss.borderRadius(8),
                rcss.p(8),
                {
                  maxWidth: 600,
                  minWidth: 350,
                  background: tokens.backgroundHigher,
                },
              ]}
            >
              <View css={[rcss.flex.column, rcss.colWithGap(8)]}>
                <img
                  src={user.avatar}
                  alt="e"
                  width={100}
                  css={[rcss.borderRadius(8)]}
                />
                {!user.verified ? <Button small text="Verify" /> : null}
              </View>

              <View css={[rcss.flex.column, rcss.colWithGap(8)]}>
                <Text variant="subheadDefault">{user.discriminator}</Text>
                <Text color="dimmer">{user.email}</Text>
                <Text color="dimmer">
                  Verified: {user.verified ? "yes" : "no"}
                </Text>
                <Text color="dimmer">Discord ID: {user.discordId}</Text>
              </View>
            </View>
          ))}
        </View>
        {!end.current && (
          <Button
            style={{ margin: "16px auto" }}
            onClick={fetchMore}
            text="More"
          />
        )}
      </View>
    </View>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !config.admins.includes(session?.user?.email || "")) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
