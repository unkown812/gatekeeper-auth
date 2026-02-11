export interface GatekeeperConfig {
  jwtSecret: string;
  accessTokenExpiry?: string;
  refreshTokenExpiry?: string;
  saltRounds?: number;
}
