"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageFromCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const deleteImageFromCloudinary = async (imageUrl) => {
    try {
        if (!imageUrl)
            return;
        const segments = imageUrl.split("/");
        const filename = segments[segments.length - 1];
        const publicId = filename.split(".")[0];
        const folder = segments[segments.length - 2];
        const fullPublicId = `${folder}/${publicId}`;
        await cloudinary_1.default.uploader.destroy(fullPublicId, { resource_type: "image" });
    }
    catch (err) {
        console.error("Failed to delete image from Cloudinary:", err);
    }
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
