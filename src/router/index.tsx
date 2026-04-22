import { Routes, Route } from "react-router-dom";
import Analytics from "@/pages/index/Analytics";
import BasicForm from "@/pages/form/BasicForm";
import StandardList from "@/pages/list/StandardList";
import BasicDetail from "@/pages/detail/BasicDetail";
import LoginPage from "@/pages/auth/login";
import MyLayout from "@/layout/Index";
import ProtectedRoute from "./components/index";
import NotFound from "@/pages/error/NotFound";

// 路由配置组件
const AppRoutes = () => {
  return (
    <Routes>
      {/* 登录页面路由 - 已登录用户不能访问 */}
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />

      {/* 使用布局作为根路由 - 需要认证 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MyLayout />
          </ProtectedRoute>
        }
      >
        {/* 首页相关路由 */}
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
      </Route>

      {/* 404页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
