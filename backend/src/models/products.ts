// models/products.ts
import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface IProduct extends Document {
  productName: string;
  category: string;
  categorySlug: string;
  slug: string;       
  description: string;
  imageUrl: string;
  cloudinaryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true, trim: true },
    slug: { type: String, required: true, index: true },  // slug for URLs
    categorySlug: {type: String, required: true, index:true },
    description: { type: String, required: true, default: "" },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to generate slug
productSchema.pre("save", function (next) {
  if (!this.slug)
    this.slug = this.productName.toLowerCase().replace(/\s+/g, "-");
  if (!this.categorySlug)
    this.categorySlug = this.category.toLowerCase().replace(/\s+/g, "-");
  next();
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;