import { Request, Response } from "express";
import Contact from "../models/contact";
import sendAdminEmail from "../utils/sendEmail";

const submitContactForm = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      productInterest,
      productSlug,
      productName,
      message,
    } = req.body;

    if (!firstName || !lastName || !email || !productInterest || !message) {
      return res.status(400).json({
        error: "All required fields must be filled.",
      });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || "N/A",
      productInterest,
      product: productName || "N/A", // ✅ FIX
      productSlug: productSlug || null,
      message,
    });

    await sendAdminEmail(newContact);

    res.status(201).json({
      message: "Contact form submitted successfully.",
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({
      error: "An error occurred while submitting the contact form.",
    });
  }
};

export default submitContactForm;
