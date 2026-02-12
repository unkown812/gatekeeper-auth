import type { Request, Response } from "express";
import { User } from "../models/user.model";

export const verifyEmailController = () => async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerifyToken: token
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    user.isVerified = true;
    user.emailVerifyToken = null;
    await user.save();

    return res.json({ message: "Email verified successfully" });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
