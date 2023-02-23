import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.post(async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || typeof name !== "string")
    return res.json({
      success: false,
      message: "Please provide a name for the page",
    });

  const item = new PageData({
    name,
    content: {},
    timeCreated: Date.now(),
    timeUpdated: Date.now(),
  });

  await item.save();

  res.json({
    success: true,
    data: item,
  });
});

export default app;
