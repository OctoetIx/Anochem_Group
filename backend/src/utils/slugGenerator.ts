// utils/slugHelper.ts
import  sanitizeSlug from "./slugHelper";

const generateUniqueSlug = async (Model: any, text: string): Promise<string> => {
  const baseSlug = sanitizeSlug(text);
  let slug = baseSlug;
  let counter = 1;

  while (await Model.exists({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};
export default generateUniqueSlug;