"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = __importDefault(require("../config/redis"));
const admin_1 = __importDefault(require("../models/admin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Generate tokens helper
const generateTokens = (adminId, email) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: adminId, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: adminId, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
// LOGIN CONTROLLER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const { accessToken, refreshToken } = generateTokens(admin._id.toString(), admin.email);
        await redis_1.default.set(`session:${admin._id}`, accessToken, { EX: 3600 });
        await redis_1.default.set(`refresh:${admin._id}`, refreshToken, { EX: 604800 }); // 7 days
        res.json({
            message: "Login successful",
            accessToken,
            refreshToken,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Invalid or expired token" });
    }
};
exports.login = login;
// REGISTER  CONTROLLER
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const existingAdmin = await admin_1.default.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: "Email already in use" });
        }
        const newAdmin = new admin_1.default({ email, password });
        await newAdmin.save();
        const { accessToken, refreshToken } = generateTokens(newAdmin._id.toString(), newAdmin.email);
        await redis_1.default.set(`session:${newAdmin._id}`, accessToken, { EX: 3600 });
        await redis_1.default.set(`refresh:${newAdmin._id}`, refreshToken, { EX: 604800 });
        res.status(201).json({
            message: "Admin registered successfully",
            accessToken,
            refreshToken,
            admin: {
                id: newAdmin._id,
                email: newAdmin.email,
            },
        });
    }
    catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: " Invalid or expired token" });
    }
};
exports.register = register;
// LOGOUT CONTROLLER
const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        await redis_1.default.del(`session:${decoded.id}`);
        await redis_1.default.del(`refresh:${decoded.id}`);
        res.json({ message: "Logout successful" });
    }
    catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ error: "Invalid or expired token" });
    }
};
exports.logout = logout;
