import { simplifyEmail } from "server/lib/email";
import { User } from "server/lib/mongoose";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { verifyUser } from "server/lib/discord";

export default async function Handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const decoded = await jwt.verify(req.query.token, process.env.JWT_TOKEN, {
      ignoreExpiration: true,
    });

    if (!session) {
      return res.json({
        verified: false,
        error: "User not logged in.",
      });
    } else if (simplifyEmail(session.user.email) === decoded.email) {
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.json({
          error: "The user doesn't exists.",
          verified: false,
        });
      } else {
        if (!user.verified) {
          await verifyUser(user.discordId);
          await user.update({ verified: true });
        }
        res.redirect("/me");
      }
    } else {
      res.json({
        verified: false,
        error: "This is not your token.",
      });
    }
  } catch (_) {
    return res.json({
      error: "An internal error occured.",
    });
  }
}
