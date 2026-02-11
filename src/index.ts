import type { GatekeeperConfig } from "./types/config.types";
import { defaultConfig } from "./config/default";
import { createAuthRoutes } from "./routes/auth.routes";
import { protect } from "./middleware/auth.middleware";

export const initGatekeeper = (userConfig: GatekeeperConfig) => {
  const config: GatekeeperConfig = { ...defaultConfig, ...userConfig };

  if (!config.jwtSecret) {
    throw new Error("jwtSecret required");
  }

  return {
    routes: createAuthRoutes(config),
    protect: protect(config)
  };
};
