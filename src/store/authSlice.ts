import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  callLoginUser,
  callRegisterUser,
  callFetchUser,
} from "../services/API/User/index";

export interface IUser {
  fullName: string;
  email?: string;
  password: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

interface iAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: iAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  success: null,
};

// resgister user by backend
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: IUser, thunkAPI) => {
    try {
      const response = await callRegisterUser(user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// login user and save token to localstorage, refresh token to cookie
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: IUser, thunkAPI) => {
    try {
      const response = await callLoginUser(user);
      localStorage.setItem("access_token", response.data.access_token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    const response = await callFetchUser();
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("access_token");
    },
    resetStatus(state) {
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.success = "Register success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.success = "Login success";
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      })

      // Fetch User

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
      });
  },
});

export const { actions, reducer } = authSlice;

export const { loginSuccess, logoutSuccess, resetStatus } = actions;

export default reducer;
