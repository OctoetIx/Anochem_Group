// adminRoutes.ts
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers";
import { verifyAdmin } from "../middleware/verifyAuth";

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, "../../uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

router.get("/verify", verifyAdmin, (_req, res) =>
  res.json({ message: "Admin verified" }) 
);

// POST create
router.post("/products", verifyAdmin, upload.array("images", 8), createProduct);

// PUT update by slug
router.put(
  "/products/:slug",
  verifyAdmin,
  upload.array("images", 8),
  updateProduct
);

// DELETE
router.delete("/products/:slug", verifyAdmin, deleteProduct);

export default router;
