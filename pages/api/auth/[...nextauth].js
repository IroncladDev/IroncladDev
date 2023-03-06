import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { User } from "server/lib/mongoose";
import config from "server/lib/server.config";
import verifyEmail from "server/lib/email";
import axios from 'axios';

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_AUTH_SECRET,
      authorization: `https://discord.com/api/oauth2/authorize?client_id=${
        config.botId
      }&redirect_uri=${encodeURIComponent(
        process.env.NEXTAUTH_URL + "/api/auth/callback/discord"
      )}&response_type=code&scope=identify%20guilds.join%20email`,
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
          await axios({
            method: "PUT",
            url: `https://discord.com/api/v10/guilds/${config.guildId}/members/${user.id}`,
            data: {
              access_token: account.access_token,
            },
            headers: {
              Authorization: `Bot ${process.env.BOT_TOKEN}`,
            },
          });
        }
        return true;
      } else {
        return `/?error=${verified.err}`;
      }
    },
  },
  pages: {
    error: "/",
  },
};

export default NextAuth(authOptions);
