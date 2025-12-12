
const sanitizeSlug = (text: string): string => {
  return text
      .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

        
};
export default sanitizeSlug;