import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  try {
    const dbURI = process.env.MONGO_URI;

    if (!dbURI) {
      throw new Error("Missing database connection string (process.env.MONGO_URI)");
    }

    const conn = await mongoose.connect(dbURI);

    console.log(` MongoDB connected to: ${conn.connection.host}`);
  } catch (error) {
    console.error(" MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};
