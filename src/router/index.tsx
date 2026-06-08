import { Routes, Route } from "react-router-dom";
import { routeConfig } from "./routeConfig";
import { renderRoutes } from "./renderRoutes";
import NotFound from "@/pages/error/NotFound";

/**
 * AppRoutes - 路由入口组件
 * 自动生成路由，包括 404 页面
 */
const AppRoutes = () => {
  return (
    <Routes>
      {renderRoutes(routeConfig)}

      {/* 兜底 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
