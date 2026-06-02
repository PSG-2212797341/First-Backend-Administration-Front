// src/api/index.ts
import axios, { type AxiosInstance } from "axios";
import nprogress from "nprogress"; // 🚀 引入进度条

/**
 * 🟢 定义后端统一返回的响应体骨架 (杜绝 any，使用未知类型 unknown)
 */
export interface UsuallyReturn<T = unknown, E = unknown> {
  data: T;
  message: string;
  success: boolean;
  error: E;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ==========================================
// 🔥 核心魔法：重写 Axios 的类型声明
// 让 TS 彻底明白：只要用了这个 http 实例，拿到的就是剥壳后的后端数据，而不是 AxiosResponse！
// ==========================================
declare module "axios" {
  interface AxiosInstance {
    request<T = unknown>(config: InternalAxiosRequestConfig): Promise<T>;
    get<T = unknown>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
    delete<T = unknown>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
    head<T = unknown>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
    options<T = unknown>(url: string, config?: InternalAxiosRequestConfig): Promise<T>;
    post<T = unknown>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T>;
    put<T = unknown>(url: string, data?: unknown, config?: InternalAxiosRequestConfig): Promise<T>;
    patch<T = unknown>(
      url: string,
      data?: unknown,
      config?: InternalAxiosRequestConfig
    ): Promise<T>;
  }
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    nprogress.start();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    nprogress.done();
    Promise.reject(error);
  }
);

// 响应拦截器
// 响应拦截器
http.interceptors.response.use(
  response => {
    nprogress.done();
    // 🟢 拦截器在这里安全剥壳
    return response.data;
  },
  error => {
    nprogress.done();
    // 🚀 核心优化：获取当前请求的 URL
    const requestUrl = error.config?.url || "";

    // 🌟 如果是 auth 相关的接口（比如 /api/auth/login, /api/auth/forget 等），
    // 即使报了 401 也是正常的业务错误，直接放行，让组件内部的 catch 去处理，绝对不刷新页面！
    const isAuthApi = requestUrl.includes("/auth") || requestUrl.includes("/login");

    if (error.response?.status === 401 && !isAuthApi) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default http;
