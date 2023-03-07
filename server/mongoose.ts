import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  avatar: string;
  verified: boolean;
  discordId: string;
  email: string;
  discriminator: string;
}

type UserModel = mongoose.Model<IUser, {}>;

const UserSchema = new Schema<IUser>(
  {
    avatar: { type: String, required: true },
    verified: { type: Boolean, default: false },
    discordId: { type: String, required: true },
    email: { type: String, required: true },
    discriminator: { type: String, required: true },
  },
  {
    collection: "users",
  }
);

export const User =
  (mongoose.models.User as UserModel) ||
  model<IUser, UserModel>("User", UserSchema);

if (process.env.MONGO_URI) {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGO_URI);
} else {
  throw new Error("Please provide MONGO_URI in your .env file.");
}
