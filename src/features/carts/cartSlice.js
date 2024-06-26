import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { toast } from "react-toastify";
import { STATUS } from "../../constants/Status";

// Initial state
const initialState = {
  cartItems: [],
  totalItems: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

// Async thunk actions
export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartItem, thunkAPI) => {
    try {
      return await cartService.addToCart(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const removeItemFromCart = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    try {
      return await cartService.removeItemFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const reduceItemFromCart = createAsyncThunk(
  "cart/reduce",
  async (cartItem, thunkAPI) => {
    try {
      return await cartService.reduceItemFromCart(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const incrementItemFromCart = createAsyncThunk(
  "cart/increment",
  async (cartItem, thunkAPI) => {
    try {
      return await cartService.incrementItemFromCart(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product.id == action.payload.product.id
        );
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity += 1;
          state.totalItems += 1;
        } else {
          const product = { ...action.payload, quantity: 1 };
          state.totalItems += 1;
          state.cartItems.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.IDLE;
        toast.success(state.status);
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.IDLE;
        toast.error(state.status);
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedCart = state.cartItems.filter(
          (p) => p.product.id !== action.payload
        );
        state.cartItems = updatedCart;
        state.totalItems = state.cartItems.reduce(
          (total, curr) => (total += curr.quantity),
          0
        );
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.IDLE;
        toast.success(state.status);
      })
      .addCase(removeItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(reduceItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(reduceItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.id
        );

        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
          state.totalItems -= 1;
        } else if (state.cartItems[itemIndex].quantity === 1) {
          const updatedCart = state.cartItems.filter(
            (p) => p.product.id !== action.payload.id
          );
          state.cartItems = updatedCart;
          state.totalItems -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.IDLE;
        toast.success(state.status);
      })
      .addCase(reduceItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(incrementItemFromCart.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(incrementItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.id
        );

        if (state.cartItems[itemIndex].quantity >= 1) {
          state.cartItems[itemIndex].quantity += 1;
          state.totalItems += 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        state.status = STATUS.IDLE;
        toast.success(state.status);
      })
      .addCase(incrementItemFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      });
  },
});

export const { cartReset } = cartSlice.actions;
export default cartSlice.reducer;
