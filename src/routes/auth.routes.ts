import express, { Router } from "express";
import type { GatekeeperConfig } from "../types/config.types";
import { registerController } from "../controllers/register.controller";
import { loginController } from "../controllers/login.controller";
import { refreshController } from "../controllers/refresh.controller";
import { logoutController } from "../controllers/logout.controller";
import { verifyEmailController } from "../controllers/verifyEmail.controller";

/**
 * Creates auth routes with injected config
 * This allows the package to be reusable across projects
 */
export const createAuthRoutes = (config: GatekeeperConfig): Router => {
  const router = express.Router();

  /**
   * @route   POST /register
   * @desc    Register new user
   * @access  Public
   */
  router.post("/register", registerController(config));

  /**
   * @route   POST /login
   * @desc    Login with username/email + password
   * @access  Public
   */
  router.post("/login", loginController(config));

  /**
   * @route   POST /refresh
   * @desc    Generate new access token using refresh token
   * @access  Public
   */

  router.post("/logout", logoutController());
  router.post("/refresh", refreshController(config));
  router.get("/verify-email/:token", verifyEmailController());

  return router;
};
