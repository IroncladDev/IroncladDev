import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { GetJSON, PostJSON } from "server/fetch";

const app = nc();
app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await GetJSON(
    "https://dev.to/api/users/by_username?url=ironcladdev"
  );
  const posts = await GetJSON(
    "https://dev.to/api/articles?username=ironcladdev"
  );

  res.json({
    user,
    posts,
  });
});

export default app;
