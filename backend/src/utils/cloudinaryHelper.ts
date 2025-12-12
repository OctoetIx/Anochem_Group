import cloudinary from "../config/cloudinary";


export const deleteImageFromCloudinary = async (publicId: string): Promise<void> => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      console.warn(` Cloudinary deletion returned: ${result.result}`);
    } else {
      console.log(` Image deleted from Cloudinary: ${publicId}`);
    }
  } catch (error) {
    console.error(` Failed to delete Cloudinary image (${publicId}):`, error);
  }
};