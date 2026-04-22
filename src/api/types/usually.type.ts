/**
 * @description 通用请求结果类型
 */
export interface UsuallyReturn<T, E> {
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
