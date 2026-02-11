import jwt from "jsonwebtoken";
import type { IUser } from "../models/user.model";
import type { GatekeeperConfig } from "../types/config.types";

export const generateAccessToken = (user: IUser, config: GatekeeperConfig) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.accessTokenExpiry }
  );
};

export const generateRefreshToken = (user: IUser, config: GatekeeperConfig) => {
  return jwt.sign(
    { id: user._id },
    config.jwtSecret,
    { expiresIn: config.refreshTokenExpiry }
  );
};
