import { Request } from "express";
import { SortOrder } from "mongoose";

export const getPagination = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortField = (req.query.sort as string) || "createdAt";
  const order: SortOrder = (req.query.order as string) === "asc" ? "asc" : -1;

  const skip = (page - 1) * limit;

  return { page, limit, skip, sortField, order };
};