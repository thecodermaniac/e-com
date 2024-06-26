import axiosConfig from "../../app/axiosConfig";

const addToCart = async (cartItem) => {
  await axiosConfig.post("carts", cartItem);

  return cartItem;
};

const removeItemFromCart = async (id) => {
  await axiosConfig.post("carts", id);

  return id;
};

const reduceItemFromCart = async (cartItem) => {
  await axiosConfig.post("carts", cartItem);

  return cartItem;
};
const incrementItemFromCart = async (cartItem) => {
  await axiosConfig.post("carts", cartItem);

  return cartItem;
};

const cartService = {
  addToCart,
  removeItemFromCart,
  reduceItemFromCart,
  incrementItemFromCart,
};

export default cartService;
