import { Request, Response } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import redis from "../config/redis";
import { DecodedToken } from "../types/decodedToken";


// Generate access and refresh tokens
export const generateTokens = (adminId: string, email: string) => {
  const accessToken = jwt.sign({ id: adminId, email }, process.env.JWT_SECRET!, {
    expiresIn: "1h", // access token valid 1 hour
  });

  const refreshToken = jwt.sign({ id: adminId, email }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d", // refresh token valid 7 days
  });

  return { accessToken, refreshToken };
};

// Refresh access token using HttpOnly cookie

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: "No refresh token provided" });

    let decoded: JwtPayload | string;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (err: any) {
      console.warn("Invalid or expired refresh token:", err.message);
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    // Type guard to ensure decoded is an object
    if (typeof decoded === "string" || !decoded.id || !decoded.email) {
      return res.status(401).json({ error: "Invalid refresh token payload" });
    }

    // Cast safely to DecodedToken
    const user = decoded as DecodedToken;

    // Check Redis to ensure the token hasn’t been revoked
    const storedToken = await redis.get(`refresh:${user.id}`);
    if (!storedToken || storedToken !== token) {
      console.warn(`Refresh token revoked for admin ${user.id}`);
      return res.status(401).json({ error: "Refresh token revoked" });
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(
      user.id,
      user.email
    );

    // Update Redis
    await redis.set(`session:${user.id}`, newAccessToken, { EX: 3600 }); // 1h
    await redis.set(`refresh:${user.id}`, newRefreshToken, { EX: 7 * 24 * 3600 }); // 7d

    // Rotate cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });

    console.info(`Refresh token rotated for admin ${user.id}`);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Token refresh failed:", err);
    res.status(500).json({ error: "Token refresh failed. Please log in again." });
  }
};