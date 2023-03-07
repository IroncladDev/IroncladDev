import { simplifyEmail } from "server/email";
import { User } from "server/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function Handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.json({
      error: "Not logged in",
    });
  }
  const data = await User.findOne({
    email: simplifyEmail(session.user?.email),
  });
  if (data) {
    return res.json({
      verified: data.verified,
      discordId: data.discordId,
      email: data.email,
      discriminator: data.discriminator,
    });
  } else {
    return res.json({
      verified: false,
      discordId: "0",
      email: "no@email.com",
      discriminator: "Deleted User#0000",
    });
  }
}
