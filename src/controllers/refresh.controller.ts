import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { GatekeeperConfig } from "../types/config.types";
import { User } from "../models/user.model";
import { RefreshToken } from "../models/refreshToken.model";
import { generateAccessToken } from "../utils/jwt";

export const refreshController =
  (config: GatekeeperConfig) =>
    async (req: Request, res: Response) => {
      try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
          return res.status(401).json({ message: "Refresh token required" });
        }

        // check token exists in DB
        const stored = await RefreshToken.findOne({ token: refreshToken });
        if (!stored) {
          return res.status(403).json({ message: "Token revoked" });
        }

        const decoded = jwt.verify(refreshToken, config.jwtSecret) as any;

        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = generateAccessToken(user, config);

        return res.json({ accessToken: newAccessToken });

      } catch {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    };
