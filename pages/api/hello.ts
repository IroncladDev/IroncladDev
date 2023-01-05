import nc from "next-connect";
import { Request, Response } from "express";

const app = nc();

app.get((req: Request, res: Response) => {
  res.status(200).json({ name: "John Doe" });
});

export default app;
