import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgetPassword, login, register } from "@/api/auth.api";
import type { UsuallyReturn } from "@/api/types/usually.type";
import type { AuthParams, AuthReturn, ForgetReturn } from "@/api/types/auth.api.type";

type RegisterResponse = UsuallyReturn<AuthReturn, string | undefined>;

/**
 * @description 注册使用的异步chunk
 */
export const registers = createAsyncThunk<RegisterResponse, AuthParams>(
  "auth/register",
  async credentials => {
    const response = await register(credentials);
    return response;
  }
);

type LoginResponse = UsuallyReturn<AuthReturn, string | undefined | string[]>;

/**
 * @description 登陆使用的异步chunk
 */
export const logins = createAsyncThunk<LoginResponse, AuthParams>(
  "auth/login",
  async credentials => {
    const response = await login(credentials);
    return response;
  }
);

/**
 * @description 忘记密码使用的异步chunk
 */
export const forgets = createAsyncThunk<ForgetReturn, AuthParams>(
  "auth/forget",
  async credentials => {
    const response = await forgetPassword(credentials);
    return response;
  }
);
