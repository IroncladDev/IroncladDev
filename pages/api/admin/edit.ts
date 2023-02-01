import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.post(async (req: Request, res: Response) => {
  const { value, type, key, id } = req.body;
  const item = await PageData.findOne({
    _id: id,
  });

  if (!item) {
    res.json({
      success: false,
      message: "Item with ID " + id + " not found",
    });
  }

  if (!item?.content?.[key]?.value) {
    res.json({
      success: false,
      message: "Invalid index",
    });
  }

  if (type === "kv") {
    if (typeof value === "string" || typeof value === "number") {
      item.content[key].value = value;
    } else {
      res.json({
        success: false,
        message: "Invalid type",
      });
    }
  } else if (type === "object") {
    if (typeof value === "object" && !Array.isArray(value)) {
      item.content[key].value = value;
    } else {
      res.json({
        success: false,
        message: "Invalid type",
      });
    }
  } else if (type === "array") {
    if (Array.isArray(value)) {
      item.content[key].value = value;
    } else {
      res.json({
        success: false,
        message: "Invalid type",
      });
    }
  }

  item.markModified("content");
  item.save();

  res.json({
    success: true,
    data: item,
  });
});

export default app;
