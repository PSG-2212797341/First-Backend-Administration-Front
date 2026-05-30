// src/store/slices/auth.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // 🚀 引入 axios 用作精准的类型守卫
import { forgetPassword, login, register } from "@/api/auth.api";
import type { UsuallyReturn } from "@/api";
import type { AuthParams, AuthReturn, ForgetReturn } from "@/api/auth.api";

// 后端统一返回的错误数据结构契约
interface BackendErrorResponse {
  success: boolean;
  message: string;
}

export interface RegisterParams extends AuthParams {
  email: string;
}

export interface ForgotParams extends AuthParams {
  code: string;
}

type RegisterResponse = UsuallyReturn<AuthReturn, string | undefined>;
type LoginResponse = UsuallyReturn<AuthReturn, string | undefined | string[]>;

// ==========================================
// 🚀 1. 异步作战区（彻底物理超度 any）
// ==========================================

/**
 * @description 提取安全的后端错误文本（替代原先的 any 盲猜）
 */
const getErrorMessage = (err: unknown, defaultMsg: string): string => {
  if (axios.isAxiosError<BackendErrorResponse>(err)) {
    return err.response?.data?.message || defaultMsg;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return defaultMsg;
};

export const registers = createAsyncThunk<
  RegisterResponse,
  RegisterParams,
  { rejectValue: string }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const response = await register(credentials);
    if (response && !response.success) {
      return rejectWithValue(response.message || "注册失败");
    }
    return response;
  } catch (err: unknown) {
    // 🔒 严格使用 unknown
    return rejectWithValue(getErrorMessage(err, "注册遭遇网络异常"));
  }
});

export const logins = createAsyncThunk<LoginResponse, AuthParams, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      if (response && !response.success) {
        return rejectWithValue(response.message || "登录失败");
      }
      return response;
    } catch (err: unknown) {
      // 🔒 严格使用 unknown
      return rejectWithValue(getErrorMessage(err, "登录遭遇网络异常"));
    }
  }
);

export const forgets = createAsyncThunk<ForgetReturn, ForgotParams, { rejectValue: string }>(
  "auth/forget",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await forgetPassword(credentials);
      if (response && !response.success) {
        return rejectWithValue(response.message || "重置密码失败");
      }
      return response;
    } catch (err: unknown) {
      // 🔒 严格使用 unknown
      return rejectWithValue(getErrorMessage(err, "密码重置遭遇网络异常"));
    }
  }
);

// ==========================================
// 📐 2. 类型定义与状态区
// ==========================================
export interface IAuthState {
  user: {
    name: string | null;
  };
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  role: "admin" | "user";
}

const initialState: IAuthState = {
  user: { name: null },
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: "user",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: state => {
      state.user = { name: null };
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.role = "user";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload?.data?.user?.username ?? null,
        };
      })
      .addCase(registers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "注册失败";
      })
      .addCase(logins.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = {
          name: action.payload?.data?.user?.username ?? null,
        };
        state.token = action.payload?.data?.token ?? null;
        state.role = action.payload?.data?.user?.role || "user";
      })
      .addCase(logins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "登录失败";
      })
      .addCase(forgets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgets.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(forgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "重置密码失败";
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
