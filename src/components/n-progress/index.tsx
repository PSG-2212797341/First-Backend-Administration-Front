// src/components/NProgressBar.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.1 });

const NProgressBar: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();
    nprogress.done(); // 🚀 纯静态页面切换时，一开即关。
  }, [location]);

  return null;
};

export default NProgressBar;
