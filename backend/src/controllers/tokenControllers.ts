import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import redis from "../config/redis";

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
    if (!token) return res.status(403).json({ error: "No refresh token provided" });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (err) {
      console.error("Invalid refresh token:", err);
      return res.status(403).json({ error: "Invalid or expired refresh token" });
    }

    const storedToken = await redis.get(`refresh:${decoded.id}`);
    if (!storedToken || storedToken !== token)
      return res.status(403).json({ error: "Refresh token revoked" });

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(
      decoded.id,
      decoded.email
    );

    // Update Redis
    await redis.set(`session:${decoded.id}`, newAccessToken, { EX: 3600 }); // 1h
    await redis.set(`refresh:${decoded.id}`, newRefreshToken, { EX: 7 * 24 * 3600 }); // 7d

    // Rotate cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({ error: "Token refresh failed. Please log in again." });
  }
};
