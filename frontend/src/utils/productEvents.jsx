 const PRODUCT_UPDATED_EVENT = "product-updated";

export const triggerProductRefresh = () => {
  window.dispatchEvent(new Event(PRODUCT_UPDATED_EVENT));
};

export default PRODUCT_UPDATED_EVENT;