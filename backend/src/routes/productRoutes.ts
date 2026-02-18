import express, { Request, Response, NextFunction } from "express";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getProductBySlug,
  getRelatedProducts,
} from "../controllers/productControllers";
import { cache, CACHE_TTL } from "../middleware/cache";

const router = express.Router();

// ==============================
// Cache key prefixes
// ==============================
const CACHE_KEYS = {
  ALL: "products",
  CATEGORY: (slug: string) => `category:${slug}`,
  SEARCH: (term: string) => `search:${term}`,
  PRODUCT: (slug: string) => `product:${slug}`,
  RELATED: (slug: string) => `related:${slug}`,
};

// ==============================
// Typed cache wrapper (generic)
// ==============================
const cacheKey =
  <P extends Record<string, string>>(
    keyFn: (req: Request<P>) => string,
    ttl?: number
  ) =>
  (req: Request<P>, res: Response, next: NextFunction) =>
    cache(keyFn(req), ttl)(req, res, next);

// ==============================
// Routes
// ==============================

// Get all products
router.get("/", cache(CACHE_KEYS.ALL), getAllProducts);

// Search products
router.get(
  "/search/:term",
  cacheKey<{ term: string }>((req) =>
    CACHE_KEYS.SEARCH(req.params.term)
  ),
  searchProducts
);

// Get products by category
router.get(
  "/category/:slug",
  cacheKey<{ slug: string }>((req) =>
    CACHE_KEYS.CATEGORY(req.params.slug)
  ),
  getProductsByCategory
);

// Get related products
router.get(
  "/:slug/related",
  cacheKey<{ slug: string }>(
    (req) => CACHE_KEYS.RELATED(req.params.slug),
    CACHE_TTL.SHORT
  ),
  getRelatedProducts
);

// Get single product
router.get(
  "/:slug",
  cacheKey<{ slug: string }>((req) =>
    CACHE_KEYS.PRODUCT(req.params.slug)
  ),
  getProductBySlug
);

export default router;