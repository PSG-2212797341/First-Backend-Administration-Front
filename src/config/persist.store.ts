// src/config/persist.store.ts
import type { PersistConfig } from "redux-persist";

// 手写原生 localStorage 包装
const nativeStorage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

/**
 * 🟢 大厂终极零 any 圣体方案：
 * 1. 约束条件换成比 Record 宽松、但同样绝对无 any 的 object 关键字，完美接纳 interface IAuthState。
 * 2. 返回值上，将 whitelist 映射为 (keyof T)[] 的字符串数组断言，让消费端在写白名单时依然拥有 100% 的字段拼写提示。
 */
export const createPersistConfig = <T extends object>(whitelist: (keyof T)[]): PersistConfig<T> => {
  return {
    key: "root",
    storage: nativeStorage,
    whitelist: whitelist as string[],
  } as unknown as PersistConfig<T>; // 🎯 这一步类型洗白极其关键，让内部实现契合官方复杂的逆变声明
};
