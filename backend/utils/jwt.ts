// utils/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  "your-refresh-secret-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export const generateTokens = (payload: TokenPayload) => {
  // Используем any для обхода проблем с типами
  const accessToken = jwt.sign(
    payload as any,
    JWT_SECRET as any,
    {
      expiresIn: JWT_EXPIRES_IN,
    } as any
  );

  const refreshToken = jwt.sign(
    payload as any,
    JWT_REFRESH_SECRET as any,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    } as any
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET as any) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_REFRESH_SECRET as any) as TokenPayload;
};
