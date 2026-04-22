import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import authReducer from "@/store/slices/auth.slice";

// redux-presist的配置，用于管理storage
const persistConfig = {
  key: "auth", // localStorage 中的 key 名称
  storage, // 存储引擎（localStorage）
  whitelist: ["token", "user", "isAuthenticated"], // 只持久化这些字段
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export { persistedAuthReducer };
