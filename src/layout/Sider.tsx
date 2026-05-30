import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { getOpenKeysByPath } from "./utils/navigationLogic";
import { generateMenuItems } from "./config/menuConfig";

interface MySiderProps {
  collapsed?: boolean;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

function MySider({ collapsed = false, isMobile = false, onMobileClose }: MySiderProps) {
  const navigate = useNavigate();
  const location = useLocation(); // 🎯 实时抓取浏览器当前真实 URL 路径

  // 🔥 核心优化：直接动态计算！删掉 useState 和 useEffect
  // 每次页面路由一变，React 会自动重新跑这行计算，完全没有“级联渲染”的性能损耗
  const currentOpenKeys = collapsed ? [] : getOpenKeysByPath(location.pathname);

  // 点击子菜单切页
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);

    if (isMobile && onMobileClose) {
      onMobileClose(); // 移动端点完自动关闭侧边栏
    }
  };

  const menuItems = generateMenuItems(location.pathname);

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 leading-16 border-b border-gray-200 text-center font-bold text-gray-700 shrink-0">
        {!collapsed ? "📊 看板行政系统" : "📊"}
      </div>
      <div className="flex-1 overflow-auto">
        <Menu
          theme="light"
          mode="inline"
          style={{ padding: collapsed ? "12px" : "16px", borderRight: 0 }}
          selectedKeys={[location.pathname]} // 🎯 保持同步高亮
          openKeys={currentOpenKeys} // 🎯 换成我们实时动态计算出来的数组
          onClick={handleMenuClick}
          items={menuItems}
        />
      </div>
    </div>
  );
}

export default MySider;
