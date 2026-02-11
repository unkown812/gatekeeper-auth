import type { Request, Response } from "express";
import { User } from "../models/user.model";
import type { GatekeeperConfig } from "../types/config.types";
import { registerSchema } from "../utils/validators";
import { hashPassword } from "../utils/hash";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const registerController =
  (config: GatekeeperConfig) =>
    async (req: Request, res: Response) => {
      try {
        // Validate input
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({
            message: parsed.error.message
          });
        }

        const { username, email, password } = parsed.data;

        // Check if user exists
        const exists = await User.findOne({
          $or: [{ email }, { username }]
        });

        if (exists) {
          return res.status(400).json({
            message: "User already exists"
          });
        }

        // Hash password
        const hashed = await hashPassword(
          password,
          config.saltRounds || 12
        );

        // Create user
        const user = await User.create({
          username,
          email,
          password: hashed
        });

        // Generate tokens
        const accessToken = generateAccessToken(user, config);
        const refreshToken = generateRefreshToken(user, config);

        return res.status(201).json({
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
          message: error.message || "Registration failed"
        });
      }
    };
