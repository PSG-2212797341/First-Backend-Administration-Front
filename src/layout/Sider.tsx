import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { getOpenKeysByPath } from "./utils/navigationLogic";
import { generateMenuItems } from "./config/menuConfig";

interface MySiderProps {
  collapsed?: boolean;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

function MySider({ collapsed = false, isMobile = false, onMobileClose }: MySiderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>(
    collapsed ? [] : getOpenKeysByPath(location.pathname)
  );

  const menuItems = generateMenuItems(location.pathname);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
    if (isMobile && onMobileClose) onMobileClose();
  };

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
          selectedKeys={[location.pathname]}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={keys => {
            const lastKey =
              keys.find(key => !openKeys.includes(key)) || keys.find(key => openKeys.includes(key));

            if (lastKey) {
              setOpenKeys([lastKey]);
              navigate(`${lastKey}/index`);
            } else {
              setOpenKeys([]);
            }
          }}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </div>
    </div>
  );
}

export default MySider;
