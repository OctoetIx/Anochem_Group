"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../config/redis"));
const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token required" });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const storedToken = await redis_1.default.get(`refresh:${decoded.id}`);
        if (!storedToken || storedToken !== refreshToken) {
            return res.status(401).json({ error: "Invalid or expired refresh token" });
        }
        const newAccessToken = jsonwebtoken_1.default.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await redis_1.default.set(`session:${decoded.id}`, newAccessToken, { EX: 3600 });
        res.json({
            message: "Access token refreshed",
            accessToken: newAccessToken,
        });
    }
    catch (err) {
        console.error("Refresh token error:", err);
        res.status(401).json({ error: "Invalid or expired refresh token" });
    }
};
exports.refreshAccessToken = refreshAccessToken;
