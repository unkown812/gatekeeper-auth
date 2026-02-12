import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  emailVerifyToken: string | null;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  isVerified: {type: Boolean,default: false},
  emailVerifyToken: {type: String,default: null}
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", userSchema);