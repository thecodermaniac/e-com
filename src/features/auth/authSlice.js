import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { STATUS } from "../../constants/Status";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  user: null,
  userId: 0,
  token: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

// Async thunk actions
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login({
      username: String(user.username),
      password: String(user.password),
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const signUp = createAsyncThunk("users", async (userInfo, thunkAPI) => {
  try {
    return await authService.signUpUsers({
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUser = createAsyncThunk(
  "auth/user",
  async (userId, thunkAPI) => {
    try {
      return await authService.getUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        localStorage.setItem("user", JSON.stringify(2));
        state.status = STATUS.IDLE;
        toast.success(state.status);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
        state.status = STATUS.IDLE;
        toast.success(state.status);
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.status = STATUS.IDLE;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.status = STATUS.IDLE;
        toast.success("Successfully signed up");
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      });
  },
});

export const { authReset } = authSlice.actions;
export default authSlice.reducer;
