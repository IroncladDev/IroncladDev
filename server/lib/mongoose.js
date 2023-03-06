import mongoose, { Schema, ObjectId, model } from "mongoose";
import config from "./server.config";

if (
  mongoose.connection.readyState === 0 ||
  mongoose.connection.readyState === 3
) {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  mongoose.connection.on("error", console.log);
  mongoose.connection.on("connected", () => console.log("Connected!"));
}

const UserSchema = new Schema(
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

export const User = mongoose.models.User || model("User", UserSchema);
