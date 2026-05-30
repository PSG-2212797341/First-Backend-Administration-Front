import NProgressBar from "./components/n-progress";
import AppRoutes from "./router";

function App() {
  return (
    <>
      {/* 🚀 全局请求/路由切页进度条 */}
      <NProgressBar />
      {/* 🧭 路由交通大盘枢纽 */}
      <AppRoutes />
    </>
  );
}

export default App;
