"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? "asc" : -1;
    const skip = (page - 1) * limit;
    return { page, limit, skip, sortField, order };
};
exports.getPagination = getPagination;
