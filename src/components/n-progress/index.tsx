// src/components/NProgress.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 配置 NProgress
NProgress.configure({
  showSpinner: false, // 不显示旋转加载图标
  minimum: 0.1, // 最小百分比
  speed: 300, // 动画速度
});

const NProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    // 路由变化时启动进度条
    NProgress.start();

    // 模拟加载完成（实际项目中可以在数据加载完成后调用 NProgress.done()）
    const timer = setTimeout(() => NProgress.done(), 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null; // 不渲染任何 UI，只管理进度条
};

export default NProgressBar;
