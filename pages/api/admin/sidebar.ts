import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.get(async (_: Request, res: Response) => {
  const data = await PageData.find().select("name");
  res.status(200).json(data);
});

export default app;
