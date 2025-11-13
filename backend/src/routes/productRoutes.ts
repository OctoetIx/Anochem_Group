import express from "express";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getProductById,
  getRelatedProducts,
} from "../controllers/productControllers";
import { cache, CACHE_TTL } from "../middleware/cache";

const router = express.Router();

// 🧠 Cache key helpers
const CACHE_KEYS = {
  ALL: "products",
  CATEGORY: (category: string) => `category:${category}`,
  SEARCH: (term: string) => `search:${term}`,
  PRODUCT: (id: string) => `product:${id}`,
  RELATED: (id: string) => `related:${id}`,
};

// Generic cache wrapper
const cacheKey =
  (keyFn: (req: express.Request) => string, ttl?: number) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    cache(keyFn(req), ttl)(req, res, next);

// -------------------- PUBLIC ROUTES --------------------

// 1. Get all products
router.get("/", cache(CACHE_KEYS.ALL), getAllProducts);

// 2. Search products (should be before /:id to avoid conflicts)
router.get(
  "/search/:term",
  cacheKey((req) => CACHE_KEYS.SEARCH(req.params.term)),
  searchProducts
);

// 3. Products by category (before /:id to avoid slug/ID confusion)
router.get(
  "/category/:slug",
  cacheKey((req) => CACHE_KEYS.CATEGORY(req.params.slug)),
  getProductsByCategory
);

// 4. Related products
router.get(
  "/:id/related",
  cacheKey((req) => CACHE_KEYS.RELATED(req.params.id), CACHE_TTL.SHORT),
  getRelatedProducts
);

// 5. Single product by ID (last to avoid conflicts with other routes)
router.get(
  "/:id",
  cacheKey((req) => CACHE_KEYS.PRODUCT(req.params.id)),
  getProductById
);

export default router;