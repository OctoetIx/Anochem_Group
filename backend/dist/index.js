"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const db_1 = require("./config/db");
const redis_1 = __importDefault(require("./config/redis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
}));
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Start server         
// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error("Global error handler:", err);
    res.status(500).json({ error: "Something went wrong" });
});
//  Connect Database & Start Server
const PORT = process.env.PORT || 2000;
(async () => {
    try {
        await (0, db_1.connectToDatabase)();
        console.log(" MongoDB connected successfully");
        await redis_1.default.connect();
        console.log("Redis connected successfully");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error(" Failed to start server:", error);
        process.exit(1);
    }
})();
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    await redis_1.default.quit();
    process.exit(0);
});
exports.default = app;
