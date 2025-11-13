"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const productControllers_1 = require("../controllers/productControllers");
const cache_1 = require("../middleware/cache");
const verifyAuth_1 = require("../middleware/verifyAuth");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
const CACHE_KEYS = {
    ALL: "products",
    CATEGORY: (category) => `category:${category}`,
    SEARCH: (term) => `search:${term}`,
    PRODUCT: (id) => `product:${id}`,
};
//  Get all products 
router.get("/", (0, cache_1.cache)(CACHE_KEYS.ALL), productControllers_1.getAllProducts);
// Get products by category 
router.get("/category/:category", (req, res, next) => (0, cache_1.cache)(`category:${req.params.category}`)(req, res, next), productControllers_1.getProductsByCategory);
//  Search products 
router.get("/search/:term", (req, res, next) => (0, cache_1.cache)(`search:${req.params.term}`)(req, res, next), productControllers_1.searchProducts);
// Get product by ID (single product )
router.get("/:id", (req, res, next) => (0, cache_1.cache)(`product:${req.params.id}`)(req, res, next), productControllers_1.getProductById);
router.get("/:id/related", (0, cache_1.cache)("related", cache_1.CACHE_TTL.SHORT), productControllers_1.getRelatedProducts);
// ADMIN ONLY ROUTES
// Create
router.post("/upload", verifyAuth_1.verifyAdmin, upload.single("image"), productControllers_1.createProduct);
//update
router.put("/update/:id", verifyAuth_1.verifyAdmin, upload.single("image"), productControllers_1.updateProduct);
//delete
router.delete("/delete/:id", verifyAuth_1.verifyAdmin, productControllers_1.deleteProduct);
exports.default = router;
