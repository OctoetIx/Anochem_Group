import express from "express";
import { login, register, logout } from "../controllers/authController";
import { refreshToken } from "../controllers/tokenControllers";
import { verifyAdmin } from "../middleware/verifyAuth";
import { AuthRequest } from "../middleware/verifyAuth";

const router = express.Router();

// ----------------- PUBLIC -----------------
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Refresh access token using HttpOnly cookie
router.post("/refresh", refreshToken);

// ----------------- PROTECTED -----------------
// Check if user is admin (access token or refresh token)

router.get("/verifyAdmin", verifyAdmin, (req: AuthRequest, res) => {
  res.json({
    message: "Admin verified",
    admin: req.admin,          // typed from middleware
    newAccessToken: req.newAccessToken || null, // optional auto-refreshed token
  });
});

export default router; 