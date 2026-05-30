// src/api/auth.api.ts
import http, { type UsuallyReturn } from "./index";

// 🔑 基础账密类型（仅用于登录）
export type AuthParams = {
  username: string;
  password: string;
};

// 📝 注册专属类型（比登录多一个必填的 email）
export type RegisterParams = AuthParams & {
  email: string;
};

// 🔒 忘记密码专属类型（比登录多一个必填的 6 位验证码 code）
export type ForgetParams = AuthParams & {
  code: string;
};

// ✉️ 发送验证码入参类型
export type SendCodeParams = {
  username: string;
};

// ==========================================
// 📐 返回数据契约区（严格对应你的 Express 响应）
// ==========================================
export type AuthReturn = {
  user: {
    id: string;
    username: string;
    role: "user" | "admin";
    email?: string; // 注册返回会带 email，登录不带，设为可选
    createdAt?: string; // 后端返回的是 ISO 字符串，到前端是 string
    updatedAt?: string;
  };
  token?: string; // 登录时下发，注册时不下发
};

// 忘记密码与发送验证码的通用返回
export type ForgetReturn = {
  success: boolean;
  message: string;
  error?: string | string[];
};

// 验证验证码的返回类型
export type VerifyCodeReturn = {
  success: boolean;
  message: string;
};

// ==========================================
// 🚀 2. API 请求作战区（无 any、极简泛型推导）
// ==========================================

/**
 * @description 用户注册
 * 后端契约: router.post("/register", ...) -> 返回 201 状态码与 data.user
 */
export const register = (params: RegisterParams) => {
  return http.post<UsuallyReturn<AuthReturn, string | undefined>>("/auth/register", params);
};

/**
 * @description 用户登录
 * 后端契约: router.post("/login", ...) -> 返回 200 状态码与 data.user, data.token
 */
export const login = (params: AuthParams) => {
  return http.post<UsuallyReturn<AuthReturn, string | undefined | string[]>>("/auth/login", params);
};

/**
 * @description 发送邮箱验证码
 * 后端契约: router.post("/send-code", ...) -> 返回 { success: true, message: "..." }
 */
export const sendCode = (params: SendCodeParams) => {
  return http.post<ForgetReturn>("/auth/send-code", params);
};

/**
 * @description 验证邮箱验证码
 * 后端契约: router.post("/verify-code", ...) -> 返回 { success: true, message: "..." }
 */
export const verifyCode = (params: SendCodeParams & { code: string }) => {
  return http.post<VerifyCodeReturn>("/auth/verify-code", params);
};

/**
 * @description 用户重置密码
 * 后端契约: router.post("/forgot-password", ...) -> 返回 { success: true, message: "..." }
 */
export const forgetPassword = (params: ForgetParams) => {
  return http.post<ForgetReturn>("/auth/forgot-password", params);
};
