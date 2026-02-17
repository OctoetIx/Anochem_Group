import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    admin?: {
      id: string;
      email: string;
    };
    newAccessToken?: string; // optional, if token was rotated
  }
}