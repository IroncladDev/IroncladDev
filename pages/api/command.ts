import { User } from "server/mongoose";
import getRawBody from "raw-body";
import { verifyKey } from "discord-interactions";
import { verifyUser } from "server/discord";

/**
 * This is the code for the user command name
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Handler(req, res) {
  const raw = await getRawBody(req);

  const isValidRequest = verifyKey(
    raw,
    req.headers["x-signature-ed25519"],
    req.headers["x-signature-timestamp"],
    process.env.DISCORD_PUBLIC_KEY || ""
  );

  if (!isValidRequest) {
    return res.status(401).end("Invalid request signature");
  }

  try {
    const data = JSON.parse(raw.toString());

    switch (data.type) {
      case 1:
        return res.status(200).json({ type: 1 });
      case 2:
        const command = data.data;
        switch (command.name) {
          case "user":
            const user = await User.findOne({
              discordId: command.options[0].value,
            });
            if (user) {
              return res.status(200).json({
                type: 4,
                data: {
                  content: `You\'re viewing the profile of <@${user.discordId}>.\n\n**Avatar:** ${user.avatar}\n**Verified:** ${user.verified}\n**Discord Id:** ${user.discordId}\n**Email:** ${user.email}\n**Discriminator:** ${user.discriminator}`,

                  // ephemeral message!
                  flags: 1 << 6,
                },
              });
            } else {
              return res.status(200).json({
                type: 4,
                data: {
                  content: "Unknown user.",
                  flags: 1 << 6,
                },
              });
            }
          case "verify":
            await verifyUser(command.options[0].value);
            return res.status(200).json({
              type: 4,
              data: {
                flags: 1 << 6,
                content: "Verified!",
              },
            });
          default:
            return res.status(200).json({
              type: 4,
              data: {
                content: "I don't know this command.",
                flags: 1 << 6,
              },
            });
        }
        break;
      default:
        return res.status(200).json({
          type: 4,
          data: {
            content: "I don't know this command.",
          },
        });
    }
  } catch (_) {
    res.status(500).json({
      statusCode: 500,
      message: "Oops, something went wrong parsing the request!",
    });
  }
}
