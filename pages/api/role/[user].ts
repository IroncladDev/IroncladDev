import config from "server/server.config";
import { verifyUser } from "server/discord";
import { User } from "server/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !config.admins.includes(session.user?.email || "")) {
    return res.json({ error: "Not authorized" });
  }

  const user = await User.findOne({ discordId: req.query.user });

  if (!user) {
    return res.json({
      error: "The user doesn't exists.",
    });
  } else {
    await verifyUser(req.query.user);
    user.verified = true;
    await user.save();
    res.json({
      error: null,
      done: true,
    });
  }
}
