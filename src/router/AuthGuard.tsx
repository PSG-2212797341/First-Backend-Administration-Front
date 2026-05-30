import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Spin } from "antd";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
}) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" description="加载中..." />
      </div>
    );
  }

  // 如果需要认证但用户未登录，重定向到登录页面
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 如果不需要认证但用户已登录，重定向到首页
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
