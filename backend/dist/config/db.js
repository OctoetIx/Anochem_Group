"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        const dbURI = process.env.dbURI;
        if (!dbURI) {
            throw new Error("Missing database connection string (process.env.dbURI)");
        }
        const conn = await mongoose_1.default.connect(dbURI);
        console.log(` MongoDB connected to: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(" MongoDB connection error:", error.message);
        process.exit(1);
    }
}
;
