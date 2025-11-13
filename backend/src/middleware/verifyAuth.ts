import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import redis from "../config/redis";

export interface AuthRequest extends Request {
  admin?: { id: string; email: string };
}

interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const verifyAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    // Check if token exists in Redis session
    const sessionToken = await redis.get(`session:${decoded.id}`);
    if (!sessionToken || sessionToken !== token) {
      return res.status(401).json({ error: "Session expired or invalid" });
    }

    // Attach admin info to request
    req.admin = { id: decoded.id, email: decoded.email };

    next();
  } catch (err) {
    console.error("Auth check failed:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};