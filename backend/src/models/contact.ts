import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: false },
    productInterest: { type: String, required: true },
    product: { type: String, default: "N/A" },
    productSlug: { type: String},
    message: { type: String, required: true },
  },
  { timestamps: true }
);
contactSchema.index({createdAt: 1}, {expireAfterSeconds: 14 * 24 * 60 * 60});
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;