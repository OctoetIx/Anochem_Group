import express from "express";
import {
  getAllProducts,
  getProductsByCategory,
  searchProducts,
  getProductBySlug,
  getRelatedProducts,
} from "../controllers/productControllers";
import { cache, CACHE_TTL } from "../middleware/cache";

const router = express.Router();

// Cache key prefixes
const CACHE_KEYS = {
  ALL: "products",
  CATEGORY: (slug: string) => `category:${slug}`,
  SEARCH: (term: string) => `search:${term}`,
  PRODUCT: (slug: string) => `product:${slug}`,
  RELATED: (slug: string) => `related:${slug}`,
};

// Wraps cache() so routes can dynamically generate keys
const cacheKey = (
  keyFn: (req: express.Request) => string,
  ttl?: number
) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  cache(keyFn(req), ttl)(req, res, next);

// Routes
router.get("/", cache(CACHE_KEYS.ALL), getAllProducts);

router.get(
  "/search/:term",
  cacheKey((req) => CACHE_KEYS.SEARCH(req.params.term)),
  searchProducts
);

router.get(
  "/category/:slug",
  cacheKey((req) => CACHE_KEYS.CATEGORY(req.params.slug)),
  getProductsByCategory
);

router.get(
  "/:slug/related",
  cacheKey((req) => CACHE_KEYS.RELATED(req.params.slug), CACHE_TTL.SHORT),
  getRelatedProducts
);

router.get(
  "/:slug",
  cacheKey((req) => CACHE_KEYS.PRODUCT(req.params.slug)),
  getProductBySlug
);

export default router;