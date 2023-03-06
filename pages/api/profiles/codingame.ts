import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { PostJSON } from "server/lib/fetch";

const app = nc();
app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await PostJSON(
    "https://www.codingame.com/services/CodinGamer/findCodingamePointsStatsByHandle",
    ["a8e83723bd266272a4564fe2bcd6a7907926134"]
  );
  const rank = await PostJSON(
    "https://www.codingame.com/services/Leaderboards/getCodinGamerClashRanking",
    [4316297, null, null]
  )

  res.json({
    user,
    rank
  });
});

export default app;
