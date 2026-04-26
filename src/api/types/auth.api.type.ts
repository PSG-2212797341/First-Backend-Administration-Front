/**
 * @description 用户用于获取auth时的参数类型
 */
export type AuthParams = {
  username: string;
  password: string;
};

/**
 * @description 用户用于获取auth时的返回类型
 */
export type AuthReturn = {
  user: { id: string; username: string; role: "user" | "admin"; createdAt: Date; updatedAt: Date };
  token?: string;
};

/**
 * @description 忘记密码的返回值类型
 */
export type ForgetReturn = {
  success: boolean;
  message: string;
  error: string | string[] | undefined;
};
