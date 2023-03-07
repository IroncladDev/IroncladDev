import Gql from "server/gql";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const gql = new Gql("");

const app = nc();
app.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const gqlRes = await gql.raw(req.body);
  res.json(gqlRes);
});

export default app;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "200mb",
    },
  },
};
