import express from "express";
import { login, register, logout } from "../controllers/authController";
import { refreshToken } from "../controllers/tokenControllers";
import { verifyAdmin } from "../middleware/verifyAuth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken); // refresh using HttpOnly cookie
router.get("/verifyAdmin", verifyAdmin, (req, res) => {
  res.json({ message: "Admin verified", admin: (req as any).admin });
});

export default router;
