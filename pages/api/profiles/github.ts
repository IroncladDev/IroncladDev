import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { GetJSON } from "server/lib/fetch";

const app = nc();
app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await GetJSON("https://api.github.com/users/Conner1115", process.env.ACCESS_TOKEN);
  const repos = await GetJSON("https://api.github.com/users/Conner1115/repos", process.env.ACCESS_TOKEN);

  res.json({
    user,
    repos,
  });
});

export default app;
