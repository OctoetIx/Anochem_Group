import { Request, Response } from "express";
import Product from "../models/products";
import fs from "fs";
import cloudinary from "../config/cloudinary";
import { deleteImageFromCloudinary } from "../utils/cloudinaryHelper";
import { getPagination } from "../utils/pagination";
import { clearProductCaches } from "../middleware/cache";
import createSlug from "../utils/slugHelper";

// ---------------- PUBLIC ----------------

// Get single product by slug
export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product by slug:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get related products by slug
export const getRelatedProducts = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const currentProduct = await Product.findOne({ slug });
    if (!currentProduct) return res.status(404).json({ error: "Product not found" });

    const related = await Product.find({
      categorySlug: currentProduct.categorySlug,
      slug: { $ne: slug }, // exclude current product
    })
      .limit(5)
      .sort({ createdAt: -1 });

    res.json(related);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all products (paginated)
export const getAllProducts = async (req: Request, res: Response) => {
  const { page, limit, skip, sortField, order } = getPagination(req);
  const products = await Product.find()
    .sort({ [sortField]: order })
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments();

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    items: products,
  });
};

// Get products by category slug
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { page, limit, skip, sortField, order } = getPagination(req);

    const products = await Product.find({ categorySlug: slug })
      .sort({ [sortField]: order })
      .skip(skip)
      .limit(limit);
    const total = await Product.countDocuments({ categorySlug: slug });

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: products,
    });
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Search products by name
export const searchProducts = async (req: Request, res: Response) => {
  const { term } = req.params;
  const regex = new RegExp(term, "i");
  const { page, limit, skip, sortField, order } = getPagination(req);

  const products = await Product.find({ productName: regex })
    .sort({ [sortField]: order })
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments({ productName: regex });

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    items: products,
  });
};

// ---------------- ADMIN ----------------

// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productName, category, description } = req.body;
    if (!productName || !category || !description || !req.file?.path) {
      if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "Missing required fields or image" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    const slug = createSlug(productName);
    const categorySlug = createSlug(category);

    const product = await Product.create({
      productName,
      category,
      categorySlug,
      slug,
      description,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await clearProductCaches(categorySlug);

    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const { productName, category, description } = req.body;

    if (productName) {
      product.productName = productName;
      product.slug = createSlug(productName);
    }

    if (category) {
      product.category = category;
      product.categorySlug = createSlug(category);
    }

    if (description) product.description = description;

    if (req.file?.path) {
      if (product.cloudinaryId) await deleteImageFromCloudinary(product.cloudinaryId);

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });

      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

      product.imageUrl = result.secure_url;
      product.cloudinaryId = result.public_id;
    }

    await product.save();
    await clearProductCaches(product.categorySlug);

    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.cloudinaryId) await deleteImageFromCloudinary(product.cloudinaryId);

    await product.deleteOne();
    await clearProductCaches(product.categorySlug);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};