import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { User } from "server/mongoose";
import config from "server/server.config";
import verifyEmail from "server/email";
import axios from "axios";
import fetch from "node-fetch";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID || "",
      clientSecret: process.env.DISCORD_AUTH_SECRET || "",
      authorization: `https://discord.com/api/oauth2/authorize?client_id=${
        config.botId
      }&redirect_uri=${encodeURIComponent(
        process.env.NEXTAUTH_URL + "/api/auth/callback/discord"
      )}&response_type=code&scope=email%20identify%20guilds.join`,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      const verified = await verifyEmail(user.email);

      if (verified.can) {
        if (!verified.exists) {
          const newUser = new User({
            avatar: user.image,
            verified: false,
            discordId: user.id,
            email: verified.email,
            discriminator: `${profile.username}#${profile.discriminator}`,
          });
          await newUser.save();

          // we add the user to the guild
          await fetch(
            `https://discord.com/api/v10/guilds/${process.env.GUILD_ID}/members/${user.id}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: account.access_token,
              }),
            }
          );
        }
        return true;
      } else {
        return `/discord?error=${verified.err}`;
      }
    },
  },
  pages: {
    error: "/discord",
  },
};

export default NextAuth(authOptions);
