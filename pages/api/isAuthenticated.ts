import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";

const app = nc();

app.use(authenticate);
app.get((_: Request, res: Response) => {
  res.status(200).json({ success: true });
});

export default app;
