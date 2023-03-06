import config from 'server/lib/server.config'
import { verifyUser } from 'server/lib/discord';
import { User } from 'server/lib/mongoose'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Handler (req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !config.admins.includes(session.user?.email)) {
    return res.json({ error: 'Not authorized' });
  }
  
  const user = await User.findOne({ discordId: req.query.user });
  
  if (!user) {
    return res.json({
      error: 'The user doesn\'t exists.'
    });
  } else {
    await verifyUser(req.query.user);
    await user.update({ verified: true });
    res.json({
      error: null,
      done: true
    });
  }
}