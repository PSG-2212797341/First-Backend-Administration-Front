import http, { type UsuallyReturn, type Pagination } from "./index";

export type CreateForm = {
  formConfig: string;
  formData: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type GetAllFormReturn = {
  success: boolean;
  data: CreateForm[];
  pagination: Pagination;
  timestamp: string;
};

/**
 * @description 保存一个动态表单
 */
export const createDynamicForm = (params: CreateForm) => {
  return http.post<UsuallyReturn<null, string[]>>("dynamic-forms", params);
};

/**
 * @description 获取所有的动态表单
 */
export const getAllDynamicForms = () => {
  return http.get<GetAllFormReturn>("dynamic-forms");
};
