import type { Request, Response } from "express";
import { RefreshToken } from "../models/refreshToken.model";

export const logoutController = () => async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  await RefreshToken.deleteOne({ token: refreshToken });

  return res.json({ message: "Logged out successfully" });
};

