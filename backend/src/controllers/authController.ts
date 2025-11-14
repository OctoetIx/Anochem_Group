// controllers/authControllers.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin";
import redis from "../config/redis";
import { generateTokens } from "./tokenControllers";

// LOGIN
 
export const login = async (req: Request, res: Response) => {
  try {
    // Trim and normalize inputs
    const emailInput = req.body.email?.trim().toLowerCase();
    const passwordInput = req.body.password?.trim();

    if (!emailInput || !passwordInput) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find admin
    const admin = await Admin.findOne({ email: emailInput });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    // Compare password
    const isMatch = await admin.comparePassword(passwordInput);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    
    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(
      admin._id.toString(),
      admin.email
    );

    // Save tokens in Redis
    await redis.set(`session:${admin._id}`, accessToken, { EX: 3600 }); // 1h
    await redis.set(`refresh:${admin._id}`, refreshToken, {
      EX: 7 * 24 * 3600,
    }); // 7h

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600 * 1000, // 7h
    });

    // Respond with access token
    res.json({
      message: "Login successful",
      accessToken,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// REGISTER

export const register = async (req: Request, res: Response) => {
  try {
    const emailInput = req.body.email?.trim().toLowerCase();
    const passwordInput = req.body.password?.trim();

    if (!emailInput || !passwordInput) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: emailInput });
    if (existingAdmin)
      return res.status(400).json({ error: "Email already in use" });

    const newAdmin = new Admin({ email: emailInput, password: passwordInput });
    await newAdmin.save();

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(
      newAdmin._id.toString(),
      newAdmin.email
    );

    // Save tokens in Redis
    await redis.set(`session:${newAdmin._id}`, accessToken, { EX: 3600 });
    await redis.set(`refresh:${newAdmin._id}`, refreshToken, { EX: 7 * 3600 });

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 3600 * 1000, // 7h
    });

    res.status(201).json({
      message: "Admin registered successfully",
      accessToken,
      admin: { id: newAdmin._id, email: newAdmin.email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// LOGOUT

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: "No token provided" });

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Delete tokens from Redis
    await redis.del(`session:${decoded.id}`);
    await redis.del(`refresh:${decoded.id}`);

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Logout failed" });
  }
};
