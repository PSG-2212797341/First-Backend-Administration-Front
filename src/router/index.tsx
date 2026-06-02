import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MyLayout from "@/layout/Index";
import NotFound from "@/pages/error/NotFound";

// 🚀 消灭 router/components 套娃，使用全局守卫组件
import ProtectedRoute from "./AuthGuard";
import { Navigate } from "react-router-dom";

// 🚀 全量启用 React.lazy 异步懒加载。Vite 构建时会自动帮它们打出独立的 JS 小包！
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/Register")); // 🌟 新增注册
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPassword")); // 🌟 新增忘记密码

const Analytics = lazy(() => import("@/pages/index/Analytics"));

const UserManage = lazy(() => import("@/pages/user/UserManage"));

// 📦 骨架兜底组件
const PageLoading = () => (
  <div className="flex h-full w-full items-center justify-center text-gray-400">加载中...</div>
);

const AppRoutes = () => {
  return (
    // 💡 React 要求 lazy 组件必须被 Suspense 包裹，用来捕获异步加载状态
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* 🔓 外部通道组：已登录用户无法访问这些页面，会被守卫直接弹回首页 */}
        <Route path="/auth">
          <Route index element={<Navigate to="/auth/login" replace />} />
          {/* /auth/login */}
          <Route
            path="login"
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          {/* /auth/register */}
          <Route
            path="register"
            element={
              <ProtectedRoute requireAuth={false}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          {/* /auth/forgot-password */}
          <Route
            path="forgot-password"
            element={
              <ProtectedRoute requireAuth={false}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 🔒 内部通道：使用布局作为根路由 - 需要认证 */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={true}>
              <MyLayout />
            </ProtectedRoute>
          }
        >
          {/* 首页 (当路径为 /index 或 / 时) */}
          <Route index element={<Analytics />} />
          <Route path="index" element={<Analytics />} />

          {/* 个人中心 (保留你原有的) */}
          <Route path="user">
            <Route index element={<UserManage />} />
            <Route path="index" element={<UserManage />} />
          </Route>
        </Route>

        {/* 兜底 404 页面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
