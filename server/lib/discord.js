import axios from "axios";
import config from './server.config';

export const discordClient = axios.create({
  baseURL: "https://discord.com/api/v8",
  headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` },
});

const userCommand = {
  name: "user",
  description: "View a user's information.",
  options: [
    {
      type: 6,
      name: "user",
      description: "User ID",
      required: true,
    },
  ],
  default_member_permissions: 1099511627776,
  dm_permission: true,
};

const verifyCommand = {
  name: "verify",
  description: "Verify a user",
  options: [
    {
      type: 6,
      name: "user",
      description: "User ID",
      required: true,
    },
  ],
  default_member_permissions: 1099511627776,
  dm_permission: true,
};

export function createCommand(command) {
  discordClient.post(`/applications/${process.env.DISCORD_ID}/guilds/${config.guildId}/commands`, command);
}

export function initCommands () {
  console.log('Commands are ready!');  
  createCommand(userCommand);
  createCommand(verifyCommand);
}

export function verifyUser (user) {
  return fetch( `https://discord.com/api/v10/guilds/${config.guildId}/members/${user}/roles/${config.roleToAdd}`,
      {
        method: "PUT",
        headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` },
      }
    );
}