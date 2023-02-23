import Gql from "server/lib/gql";
import { Request, Response } from "express";
import nc from "next-connect";

const gql = new Gql("");

const app = nc();
app.post(async (req: Request, res: Response) => {
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
