import http, { type UsuallyReturn } from "./index";

export type CreateTotalItem = {
  name: string;
  total: number;
  dailyAve: number;
  dayOnDay: number;
  weakOnWeak: number;
};

export type GetAllTotalReturn = {
  success: boolean;
  data: CreateTotalItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  timestamp: Date | string;
};

/**
 * @description 创建一个汇总项目数据
 */
export const createTotalItem = (params: CreateTotalItem) => {
  return http.post<UsuallyReturn<CreateTotalItem>>("/total", params);
};

/**
 * @description 清除所有的汇总项目的数据
 */
export const deleteAllTotal = () => {
  return http.delete<UsuallyReturn<{ deletedCount: number }>>("/total");
};

/**
 * @description 获取所有的汇总项目的数据
 */
export const getAllTotal = () => {
  return http.get<GetAllTotalReturn>("/total");
};
