import { Request, Response } from "express";
import Product from "../models/products";
import fs from "fs";
import cloudinary from "../config/cloudinary";
import { deleteImageFromCloudinary } from "../utils/cloudinaryHelper";
import { getPagination } from "../utils/pagination";
import { clearProductCaches } from "../middleware/cache";
import sanitizeSlug from "../utils/slugHelper";
import generateUniqueSlug from "../utils/slugGenerator";

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

// Get related products
export const getRelatedProducts = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const currentProduct = await Product.findOne({ slug });
    if (!currentProduct) return res.status(404).json({ error: "Product not found" });

    const related = await Product.find({
      categorySlug: currentProduct.categorySlug,
      slug: { $ne: slug },
    })
      .limit(5)
      .sort({ createdAt: -1 });

    res.json(related);
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Paginated list
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

// Get products by category
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

// Search products
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
    const { productName, category, description, coverImageIndex } = req.body;

    if (!productName || !category || !description) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const slugBase = sanitizeSlug(productName);
    let slug = slugBase;
    let attempt = 1;

    while (await Product.exists({ slug })) {
      slug = `${slugBase}-${attempt++}`;
    }

    const images: any[] = [];

    // Upload new images
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        const uploaded = await cloudinary.uploader.upload(file.path);
        images.push({
          url: uploaded.secure_url,
          cloudinaryId: uploaded.public_id,
        });
      }
    }

    const product = await Product.create({
      productName,
      category,
      description,
      slug,
      categorySlug: sanitizeSlug(category),
      images,
      coverImageIndex: images.length ? Math.min(Number(coverImageIndex) || 0, images.length - 1) : undefined,
    });
      await clearProductCaches(product.categorySlug);

    return res.status(201).json({ product });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    return res.status(500).json({ error: "Server error." });
  }
};



// ===============================
//  UPDATE PRODUCT
// ===============================
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { productName, category, description } = req.body;

    let existingImages: string[] = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch {
        return res.status(400).json({ error: "Invalid existingImages JSON." });
      }
    }

    const newCoverIndex = Number(req.body.coverImageIndex ?? 0);

    const product = await Product.findOne({ slug });
    if (!product) return res.status(404).json({ error: "Product not found." });

    // Update fields
    if (productName) product.productName = productName;
    if (category) {
      product.category = category;
      product.categorySlug = sanitizeSlug(category);
    }
    if (description) product.description = description;

    // ------------------------------------
    // HANDLE IMAGE ORDER, REMOVAL, UPLOAD
    // ------------------------------------
    const retained = product.images.filter((img) =>
      existingImages.includes(img.url)
    );

    const removed = product.images.filter(
      (img) => !existingImages.includes(img.url)
    );

    // Delete removed images from Cloudinary
    for (const r of removed) {
      try {
        await cloudinary.uploader.destroy(r.cloudinaryId);
      } catch (err) {
        console.error("Cloudinary deletion error:", err);
      }
    }

    // Upload new images
    const newUploads: any[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as Express.Multer.File[]) {
        const uploaded = await cloudinary.uploader.upload(file.path);
        newUploads.push({
          url: uploaded.secure_url,
          cloudinaryId: uploaded.public_id,
        });
      }
    }

    // Final reordered array
    const finalImages = [
      ...existingImages
        .map((url) => retained.find((i) => i.url === url))
        .filter(Boolean),
      ...newUploads,
    ];

    product.images = finalImages;

    // Fix cover index
    if (finalImages.length === 0) {
      product.coverImageIndex = undefined;
    } else {
      product.coverImageIndex = Math.min(newCoverIndex, finalImages.length - 1);
    }

    // Update slug if name changed
    if (productName) {
      const base = sanitizeSlug(productName);
      let newSlug = base;
      let attempt = 1;
      while (await Product.exists({ slug: newSlug, _id: { $ne: product._id } })) {
        newSlug = `${base}-${attempt++}`;
      }
      product.slug = newSlug;
    }

    await product.save();

    await clearProductCaches(product.categorySlug);

    return res.json({ product });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    return res.status(500).json({ error: "Server error." });
  }
};



// ===============================
//  DELETE PRODUCT
// ===============================
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });

    if (!product) return res.status(404).json({ error: "Not found" });

    // delete images from cloudinary
    for (const img of product.images) {
      try {
        await cloudinary.uploader.destroy(img.cloudinaryId);
      } catch (err) {
        console.error("Cloudinary delete error:", err);
      }
    }

    await product.deleteOne();
    await clearProductCaches(product.categorySlug);
    return res.json({ success: true });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    return res.status(500).json({ error: "Server error." });
  }
};