import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  // 严格模式
  <StrictMode>
    {/* 路由实例 */}
    <BrowserRouter>
      {/* store对象 */}
      <Provider store={store}>
        {/* 加载进度条效果 */}
        <PersistGate loading={null} persistor={persistor}>
          {/* antd的设置 */}
          <ConfigProvider
            theme={{
              components: {
                Card: {
                  colorBorderSecondary: "transparent",
                },
              },
            }}
          >
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
