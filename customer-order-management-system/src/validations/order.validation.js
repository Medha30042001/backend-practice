export const validateOrders = ({
  product_name,
  quantity,
  price,
  customer_id,
}) => {
  if (!product_name || !quantity || !price || !customer_id) {
    return "All fields required";
  }
  if (typeof product_name !== "string") {
    return "product_name should be a string";
  }
  if (typeof quantity !== "number" || quantity <= 0) {
    return "Quantity must be a positive number";
  }
  return null;
};
