"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../config/redis"));
const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const session = await redis_1.default.get(`session:${decoded.id}`);
        if (!session || session !== token) {
            return res.status(401).json({ error: "Session expired or invalid" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        console.error("Auth check failed:", err);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};
exports.verifyAdmin = verifyAdmin;
