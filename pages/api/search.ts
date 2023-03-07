import config from "server/server.config";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { User } from "server/mongoose";
import { ObjectAny } from "application/types";

const USERS_PER_PAGE = 10;
const types = [null, true, false];

export default async function Handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !config.admins.includes(session.user?.email || "")) {
    return res.json({ error: "Unauthorized", users: [] });
  }

  const query: ObjectAny = {
    discriminator: { $regex: decodeURIComponent(req.query?.query || "") },
  };

  req.query.type = parseInt(req.query.type);

  if (
    req.query?.type &&
    typeof req.query.type === "number" &&
    req.query.type >= 0 &&
    req.query.type <= 2
  ) {
    query.verified = types[req.query.type];
  }

  res.json({
    users: await User.find(
      query,
      ["verified", "discordId", "email", "discriminator", "avatar"],
      {
        limit: USERS_PER_PAGE,
        skip: req.query?.page * USERS_PER_PAGE || 0,
      }
    ).exec(),
  });
}
