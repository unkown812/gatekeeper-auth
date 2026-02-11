import type { Request, Response } from "express";
import { User } from "../models/user.model";
import type { GatekeeperConfig } from "../types/config.types";
import { loginSchema } from "../utils/validators";
import { comparePassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const loginController =
  (config: GatekeeperConfig) =>
    async (req: Request, res: Response) => {
      try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({
            message: parsed.error.message
          });
        }

        const { identifier, password } = parsed.data;

        // find by email OR username
        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const valid = await comparePassword(password, user.password);
        if (!valid) {
          return res.status(401).json({ message: "Invalid password" });
        }

        const accessToken = generateAccessToken(user, config);
        const refreshToken = generateRefreshToken(user, config);

        return res.json({
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          accessToken,
          refreshToken
        });

      } catch (error: any) {
        return res.status(500).json({
          message: error.message || "Login failed"
        });
      }
    };
