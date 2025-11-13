import { Request, Response, NextFunction } from "express";


export const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitize = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map((item) => sanitize(item));
    } else if (value && typeof value === "object") {
      const clean: any = {};
      for (const key of Object.keys(value)) {
        const safeKey = key.replace(/\$|\./g, "_"); // prevent Mongo injection
        clean[safeKey] = sanitize(value[key]);
      }
      return clean;
    }
    return value;
  };

  try {
    // req.body can safely be replaced
    if (req.body && typeof req.body === "object") {
      req.body = sanitize(req.body);
    }

    //  For req.query and req.params, mutate instead of reassign
    if (req.query && typeof req.query === "object") {
      const cleanQuery = sanitize(req.query);
      for (const key of Object.keys(req.query)) delete (req.query as any)[key];
      Object.assign(req.query, cleanQuery);
    }

    if (req.params && typeof req.params === "object") {
      const cleanParams = sanitize(req.params);
      for (const key of Object.keys(req.params)) delete (req.params as any)[key];
      Object.assign(req.params, cleanParams);
    }
  } catch (err) {
    console.error("Sanitization error:", err);
  }

  next();
};