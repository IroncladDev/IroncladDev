import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Gql from "server/gql";

const gql = new Gql("");

const app = nc();
app.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const { data } = await gql.raw({
    query: `query userByUsername {
      userByUsername(username: "IroncladDev") {
        id
        followerCount
        timeCreated
        publicRepls(count: 10000) {
          items {
            id
            likeCount
            publicForkCount
          }
        }
      }
    }`,
  });

  res.json({
    data,
  });
});

export default app;
