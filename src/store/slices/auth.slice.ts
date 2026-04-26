import { createSlice } from "@reduxjs/toolkit";
import { registers, logins, forgets } from "../reducers/auth.async.reducer";

interface IAuthState {
  user: {
    name: string | null;
  };
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  role: "admin" | "user";
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
    },
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    role: "user",
  } as IAuthState,
  reducers: {
    logout: state => {
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
        // 只保存用户信息（可选）
        state.user = {
          name: action.payload.data.user?.username ?? null,
        };
      })
      .addCase(registers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "注册失败";
      })
      .addCase(logins.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = {
          name: action.payload.data.user?.username ?? null,
        };
        // 可能需要保存 token
        state.token = action.payload.data?.token ?? null;
        // 保存可能需要用到的用户权限
        state.role = action.payload.data?.user.role;
      })
      .addCase(logins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "登录失败";
      })
      .addCase(forgets.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgets.fulfilled, state => {
        state.isLoading = false;
        // 重置密码成功后，不清除用户信息，只是返回登录页让用户重新登录
      })
      .addCase(forgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "重置密码失败";
      });
  },
});

// 导出同步的action
export const { logout } = authSlice.actions;
export default authSlice.reducer;
