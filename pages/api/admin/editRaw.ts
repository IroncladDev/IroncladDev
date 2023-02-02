import nc from "next-connect";
import { Request, Response } from "express";
import { authenticate } from "server/lib/jwt";
import { PageData } from "server/models";

const app = nc();

app.use(authenticate);
app.post(async (req: Request, res: Response) => {
  const { value, key, id } = req.body;
  const item = await PageData.findOne({
    _id: id,
  });

  if (!item) {
    res.json({
      success: false,
      message: "Item with ID " + id + " not found",
    });
  }

  if (!item?.content?.[key]) {
    res.json({
      success: false,
      message: "Invalid index",
    });
  }

  const k = value;
  if (typeof k.type === "string" && k.value) {
    if (k.type === "kv") {
      if (typeof k.value === "string" || typeof k.value === "number") {
        item.content[key] = value;
      } else {
        res.json({
          success: false,
          message: "Invalid type",
        });
      }
    } else if (k.type === "object") {
      if (typeof k.value === "object" && !Array.isArray(k.value)) {
        item.content[key] = value;
      } else {
        res.json({
          success: false,
          message: "Invalid type",
        });
      }
    } else if (k.type === "array" && k.keySchema) {
      if (Array.isArray(k.value)) {
        item.content[key] = value;
      } else {
        res.json({
          success: false,
          message: "Invalid type",
        });
      }
    }
  } else {
    res.json({
      success: false,
      message: "Invalid value structure",
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
