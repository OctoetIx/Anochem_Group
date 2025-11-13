import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createProduct, updateProduct, deleteProduct } from "../controllers/productControllers";
import { verifyAdmin } from "../middleware/verifyAuth";

const router = express.Router();

// ------------------- MULTER SETUP -------------------
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

// ------------------- ADMIN ROUTES -------------------
router.get("/verify", verifyAdmin, (_req, res) => res.json({ message: "Admin verified" }));
router.post("/products", verifyAdmin, upload.single("image"), createProduct);
router.put("/products/:id", verifyAdmin, upload.single("image"), updateProduct);
router.delete("/products/:id", verifyAdmin, deleteProduct);

export default router;