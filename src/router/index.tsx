import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MyLayout from "@/layout/index";
import NotFound from "@/pages/error/NotFound";

// 🚀 消灭 router/components 套娃，使用全局守卫组件
import ProtectedRoute from "./AuthGuard";

// 🚀 全量启用 React.lazy 异步懒加载。Vite 构建时会自动帮它们打出独立的 JS 小包！
const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/Register")); // 🌟 新增注册
const ForgotPasswordPage = lazy(() => import("@/pages/auth/ForgotPassword")); // 🌟 新增忘记密码

const Analytics = lazy(() => import("@/pages/index/Analytics"));
const BasicForm = lazy(() => import("@/pages/form/BasicForm"));
const StandardList = lazy(() => import("@/pages/list/StandardList"));
const BasicDetail = lazy(() => import("@/pages/detail/BasicDetail"));
const DataReport = lazy(() => import("@/pages/report/DataReport"));

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

        {/* 兼容以前的旧 /login 路由，防止有代码误跳（可选，不加也行） */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />

        {/* 🔒 内部通道：使用布局作为根路由 - 需要认证 */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={true}>
              <MyLayout />
            </ProtectedRoute>
          }
        >
          {/* 首页 */}
          <Route index element={<Analytics />} />

          {/* 表单状态相关路由 */}
          <Route path="form">
            <Route path="basic" element={<BasicForm />} />
          </Route>

          {/* 列表状态相关路由 */}
          <Route path="list">
            <Route path="standard" element={<StandardList />} />
          </Route>

          {/* 详情列表相关路由 */}
          <Route path="detail">
            <Route path="basic" element={<BasicDetail />} />
          </Route>

          {/* 报表相关路由 */}
          <Route path="report">
            <Route path="data" element={<DataReport />} />
          </Route>
        </Route>

        {/* 兜底 404 页面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
