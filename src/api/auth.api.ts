import http from "./index";
import type { AuthParams, AuthReturn, ForgetReturn } from "./types/auth.api.type";
import type { UsuallyReturn } from "./types/usually.type";

/**
 * @description 用户注册
 */
export const register = async (
  params: AuthParams
): Promise<UsuallyReturn<AuthReturn, string | undefined>> => {
  return await http.post("/auth/register", params);
};

/**
 * @description 用户登陆
 */
export const login = async (
  params: AuthParams
): Promise<UsuallyReturn<AuthReturn, string | undefined | string[]>> => {
  return await http.post("/auth/login", params);
};

/**
 * @description 用户重置密码
 */
export const forgetPassword = async (params: AuthParams): Promise<ForgetReturn> => {
  return await http.post("/auth/forgot-password", params);
};
