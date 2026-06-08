import { Route } from "react-router-dom";
import ProtectedRoute from "./components/AuthGuard";
import type { RouteItem } from "./routeConfig";

/**
 * renderRoutes - 递归生成 <Route> 组件
 * @param routes 路由配置
 * @returns ReactNode
 */
export const renderRoutes = (routes: RouteItem[], parentAuth?: boolean) => {
  return routes.map(route => {
    // 🔑 处理 auth 继承逻辑
    // 如果路由本身没有设置 auth，但父级有 auth，则继承父级
    const effectiveAuth = route.auth !== undefined ? route.auth : parentAuth;

    let element: React.ReactNode = undefined;
    if (route.element) {
      if (effectiveAuth !== undefined) {
        element = <ProtectedRoute requireAuth={effectiveAuth}>{route.element}</ProtectedRoute>;
      } else {
        element = route.element;
      }
    }

    // 如果有 children，则递归生成嵌套路由（传递当前路由的 auth 给子路由继承）
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={element}>
          {renderRoutes(route.children, effectiveAuth)}
        </Route>
      );
    }

    // 🔑 index 路由必须使用 index 属性，否则 React Router 无法正确匹配
    if (route.index) {
      return <Route key="index" index element={element} />;
    }

    return <Route key={route.path} path={route.path} element={element} />;
  });
};
