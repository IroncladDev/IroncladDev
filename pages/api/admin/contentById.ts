import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.get(async (req: Request, res: Response) => {
  const item = await PageData.findOne({
    _id: req.query.id,
  });
  res.status(200).json(item);
});

export default app;
