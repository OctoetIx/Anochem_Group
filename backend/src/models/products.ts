import mongoose, { Document, Schema } from "mongoose";
import sanitizeSlug from "../utils/slugHelper";

export interface IProductImage {
  url: string;
  cloudinaryId: string;
}

export interface IProduct extends Document {
  productName: string;
  category: string;
  categorySlug: string;
  slug: string;
  description: string;
  images: IProductImage[];
  coverImageIndex?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true, trim: true },
    slug: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    description: { type: String, required: true, default: "", trim: true },
    images: {
      type: [
        {
          url: { type: String, required: true },
          cloudinaryId: { type: String, required: true },
        },
      ],
      default: [],
    },
    coverImageIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (!this.slug) this.slug = sanitizeSlug(this.productName);
  if (!this.categorySlug) this.categorySlug = sanitizeSlug(this.category);

  if (this.images.length === 0) this.coverImageIndex = undefined;
  else if (
    typeof this.coverImageIndex !== "number" ||
    this.coverImageIndex >= this.images.length
  )
    this.coverImageIndex = 0;

  next();
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
