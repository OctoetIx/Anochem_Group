import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import redis from "../config/redis";
import { generateTokens } from "../controllers/tokenControllers";
import { DecodedToken } from "../types/decodedToken";

export interface AuthRequest extends Request {
  admin?: { id: string; email: string };
  newAccessToken?: string; // optional, if auto-refreshed
}

export const verifyAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    let decoded: JwtPayload | string | null = null;

    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!);
      } catch (err: any) {
        // Token expired? We'll try refresh token
        if (err.name !== "TokenExpiredError") throw err;
      }
    }

    // Type guard for access token
    if (decoded && typeof decoded !== "string" && "id" in decoded && "email" in decoded) {
      req.admin = { id: decoded.id, email: decoded.email };
      return next();
    }

    // If no valid access token, check refresh token cookie
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

    let decodedRefresh: JwtPayload | string;
    try {
      decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch (err) {
      return res.status(401).json({ error: "Refresh token invalid or expired" });
    }

    if (typeof decodedRefresh === "string" || !("id" in decodedRefresh) || !("email" in decodedRefresh)) {
      return res.status(401).json({ error: "Refresh token payload invalid" });
    }

    const user = decodedRefresh as DecodedToken;

    // Check Redis for refresh token validity
    const storedToken = await redis.get(`refresh:${user.id}`);
    if (!storedToken || storedToken !== refreshToken) {
      return res.status(401).json({ error: "Refresh token revoked" });
    }

    // Generate new access token
    const { accessToken: newAccessToken } = generateTokens(user.id, user.email);

    // Update Redis session
    await redis.set(`session:${user.id}`, newAccessToken, { EX: 3600 }); // 1h

    // Attach admin info & new token to request
    req.admin = { id: user.id, email: user.email };
    req.newAccessToken = newAccessToken;

    // Optionally: set new access token in headers for frontend convenience
    res.setHeader("x-access-token", newAccessToken);

    next();
  } catch (err) {
    console.error("verifyAdmin error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};