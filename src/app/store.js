import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/carts/cartSlice";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
