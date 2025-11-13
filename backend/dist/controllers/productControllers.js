"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.searchProducts = exports.getProductsByCategory = exports.getAllProducts = exports.getRelatedProducts = exports.getProductById = void 0;
const products_1 = __importDefault(require("../models/products"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const cloudinaryHelper_1 = require("../utils/cloudinaryHelper");
const pagination_1 = require("../utils/pagination");
const cache_1 = require("../middleware/cache");
const mongoose_1 = __importDefault(require("mongoose"));
// Get product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }
    try {
        const product = await products_1.default.findById(id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json(product);
    }
    catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getProductById = getProductById;
// Get related products
const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the current product first
        const currentProduct = await products_1.default.findById(id);
        if (!currentProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        const related = await products_1.default.find({
            category: currentProduct.category,
            _id: { $ne: id },
        })
            .limit(5)
            .sort({ createdAt: -1 });
        res.json(related);
    }
    catch (err) {
        console.error("Error fetching related products:", err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getRelatedProducts = getRelatedProducts;
// Get all products 
const getAllProducts = async (req, res) => {
    const { page, limit, skip, sortField, order } = (0, pagination_1.getPagination)(req);
    const products = await products_1.default.find().sort({ [sortField]: order }).skip(skip).limit(limit);
    const total = await products_1.default.countDocuments();
    res.json({ page, totalPages: Math.ceil(total / limit), totalItems: total, items: products });
};
exports.getAllProducts = getAllProducts;
// Get products by category
const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    const { page, limit, skip, sortField, order } = (0, pagination_1.getPagination)(req);
    const products = await products_1.default.find({ category }).sort({ [sortField]: order }).skip(skip).limit(limit);
    const total = await products_1.default.countDocuments({ category });
    res.json({ page, totalPages: Math.ceil(total / limit), totalItems: total, items: products });
};
exports.getProductsByCategory = getProductsByCategory;
// Search products
const searchProducts = async (req, res) => {
    const { term } = req.params;
    const regex = new RegExp(term, "i");
    const { page, limit, skip, sortField, order } = (0, pagination_1.getPagination)(req);
    const products = await products_1.default.find({ productName: regex }).sort({ [sortField]: order }).skip(skip).limit(limit);
    const total = await products_1.default.countDocuments({ productName: regex });
    res.json({ page, totalPages: Math.ceil(total / limit), totalItems: total, items: products });
};
exports.searchProducts = searchProducts;
// Create product
const createProduct = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "No image uploaded" });
        const { productName, category, description } = req.body;
        if (!productName || !category || !description)
            return res.status(400).json({ error: "Missing fields" });
        const result = await cloudinary_1.default.uploader.upload(req.file.path, {
            folder: "products",
            transformation: [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "auto" },
            ],
        });
        fs_1.default.unlinkSync(req.file.path);
        const product = await products_1.default.create({
            productName,
            category,
            description,
            imageUrl: result.secure_url,
        });
        await (0, cache_1.clearProductCaches)(category);
        res.status(201).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
};
exports.createProduct = createProduct;
// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products_1.default.findById(id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        const { productName, category, description } = req.body;
        if (productName)
            product.productName = productName;
        if (category)
            product.category = category;
        if (description)
            product.description = description;
        if (req.file) {
            await (0, cloudinaryHelper_1.deleteImageFromCloudinary)(product.imageUrl);
            const result = await cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "products",
                transformation: [
                    { width: 800, height: 800, crop: "limit" },
                    { quality: "auto" },
                    { fetch_format: "auto" },
                ],
            });
            fs_1.default.unlinkSync(req.file.path);
            product.imageUrl = result.secure_url;
        }
        await product.save();
        await (0, cache_1.clearProductCaches)(product.category);
        res.json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Update failed" });
    }
};
exports.updateProduct = updateProduct;
// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await products_1.default.findById(id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        await (0, cloudinaryHelper_1.deleteImageFromCloudinary)(product.imageUrl);
        await product.deleteOne();
        await (0, cache_1.clearProductCaches)(product.category);
        res.json({ message: "Product deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete failed" });
    }
};
exports.deleteProduct = deleteProduct;
