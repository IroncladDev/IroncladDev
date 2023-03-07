import config from "./server.config";

export function verifyUser(user) {
  return fetch(
    `https://discord.com/api/v10/guilds/${config.guildId}/members/${user}/roles/${config.roleToAdd}`,
    {
      method: "PUT",
      headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` },
    }
  );
}
