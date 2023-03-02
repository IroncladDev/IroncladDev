import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.post(async (req: Request, res: Response) => {
  const { keyname, page } = req.body;
  const item = await PageData.findOne({
    _id: page,
  });

  if (item?.content?.[keyname]) {
    delete item.content[keyname];
    item.markModified("content");
    item.save();
    res.json({
      success: true,
      data: item,
    });
  } else {
    res.json({
      success: false,
      message: "Key does not exist",
    });
  }
});

export default app;