import Button from "@/components/Button";
import config from "@/utils/app.config";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import authOptions from "./api/auth/[...nextauth]";

export default function Me({ session }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((u) => setUser(u));
  }, []);

  return (
    <>
      <Head>
        <title>{config.appTitle} | Verify your email</title>
      </Head>
      {user && user.verified && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            padding: "12px",
          }}
        >
          <h4
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            You have been authenticated.
          </h4>
          <Button onClick={() => window.open("https://www.discord.com/app")}>
            Open Discord
          </Button>
        </div>
      )}
      {!user ||
        (!user.verified && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
              padding: "12px",
            }}
          >
            <h4
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              {config.messageSentLabel}
            </h4>
          </div>
        ))}
    </>
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
