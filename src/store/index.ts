// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// 🟢 1. 改为引入我们最新的工厂函数，不再引入已经消失的旧变量
import { createPersistConfig } from "@/config/persist.store";
// 🟢 2. 引入你 auth.slice 里的强类型定义
import authReducer, { type IAuthState } from "@/store/slices/auth.slice";

/**
 * 🟢 3. 动态生成专属契约
 * 显式传入 <IAuthState>，TS 会严格校验后面的白名单数组，打错任何一个字母都会爆红！
 */
const authPersistConfig = createPersistConfig<IAuthState>(["token", "isAuthenticated", "user"]);

// 🛠️ 将专属配置喂给 Reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
