import mongoose from "mongoose";
import { ObjectAny } from "app/types";

export interface IPageData extends mongoose.Document {
  timeUpdated: number;
  timeCreated: number;
  name: string;
  content: ObjectAny;
}

type PageDataModel = mongoose.Model<IPageData, {}>;

export const PageDataSchema = new mongoose.Schema<IPageData>({
  timeUpdated: { type: Number, default: Number(Date.now()) },
  timeCreated: { type: Number, default: Number(Date.now()) },
  name: { type: String },
  content: { type: Object, default: {} },
});

export const PageData =
  (mongoose.models.PageData as PageDataModel) ||
  mongoose.model<IPageData, PageDataModel>("PageData", PageDataSchema);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);
