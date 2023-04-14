import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/axios-customize";

export interface iUser {
  fullName: string;
  email?: string;
  password: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

interface iAuthState {
  isAuthenticated: boolean;
  user: iUser | null;
  status: "success" | "loading" | "failed" | null;
  error: string | null;
}

const initialState: iAuthState = {
  isAuthenticated: false,
  user: null,
  status: null,
  error: null,
};
// resgister user by backend
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: iUser, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/register", user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// login user and save token to localstorage, refresh token to cookie
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: iUser, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", user);
      localStorage.setItem("access_token", response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

        // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
          state.status = "success";
          state.user = action.payload;
          state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const { actions, reducer } = authSlice;

export default reducer;
