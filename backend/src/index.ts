import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/authRoutes';  
import productRoutes from './routes/productRoutes';
import adminProductRoutes from './routes/adminProductRoutes';
import contactRoutes from './routes/contactRoutes';
import helmet from 'helmet';    
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { sanitizeMiddleware } from './middleware/sanitize';
import {connectToDatabase} from './config/db';
import redis, { connectRedis } from './config/redis';
import cloudinary from './config/cloudinary';
import cookieParser from 'cookie-parser';



const app = express();
const allowedOrigins = [process.env.CORS_ORIGIN];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(sanitizeMiddleware); 
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminProductRoutes);
app.use('/api/contact', contactRoutes)

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
}); 

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully!" });
}); 


// Start server         

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Something went wrong" });
});

//  Connect Database & Start Server
const PORT = process.env.PORT || 2000;

(async () => {
  try { 
    await connectToDatabase();
    console.log(" MongoDB connected successfully"); 

    await connectRedis();
    console.log("Redis connected successfully");

    const pongResult = await redis.ping();
    console.log("Redis ping response:", pongResult);

    await cloudinary.config();
    console.log("Cloudinary configured successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1); 
  }
})();

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await redis.quit();
  process.exit(0);
});

export default app;