import type { GatekeeperConfig } from "../types/config.types";

export const defaultConfig: Partial<GatekeeperConfig> = {
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
  saltRounds: 12
};
