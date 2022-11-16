import { model, Schema } from "mongoose";
import { UserInterface } from "../../types";

const userSchema = new Schema<UserInterface>({
  given_name: String,
  family_name: String,
  email: String,
  googleId: { type: String, required: false, default: null, unique: true },
  facebookId: { type: String, required: false, default: null, unique: true },
});

export const User = model("user", userSchema);
