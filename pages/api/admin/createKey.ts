import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.post(async (req: Request, res: Response) => {
  const { value, keyname, id } = req.body;
  const item = await PageData.findOne({
    _id: id,
  });

  if (item.content[keyname]) {
    res.json({
      success: false,
      message: "Key already exists",
    });
  } else if (typeof value === "object") {
    item.content[keyname] = value;
  } else {
    res.json({
      success: false,
      message: "Value must be of type object",
    });
  }

  item.markModified("content");
  item.save();

  res.json({
    success: true,
    data: item,
  });
});

export default app;
