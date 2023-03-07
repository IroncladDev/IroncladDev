import { simplifyEmail } from "server/email";
import { User } from "server/mongoose";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { verifyUser } from "server/discord";

export default async function Handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const decoded = await jwt.verify(req.query.token, process.env.JWT_TOKEN, {
      ignoreExpiration: true,
    });

    console.log(session);

    if (!session?.user) {
      return res.json({
        verified: false,
        error: "User not logged in.",
      });
    } else if (simplifyEmail(session.user.email) === decoded.email) {
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.json({
          error: "User does not exist",
          verified: false,
        });
      } else {
        if (!user.verified) {
          await verifyUser(user.discordId);
          user.verified = true;
          await user.save();
        }
        res.redirect("/me");
      }
    } else {
      res.json({
        verified: false,
        error: "Access Denied",
      });
    }
  } catch (_) {
    return res.json({
      error: "An internal error occured.",
    });
  }
}
