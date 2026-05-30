import React, { useState, useEffect } from "react";
import { Avatar, Layout, theme, Button, type MenuProps, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import MySider from "./Sider";
import lightPng from "@/assets/png/light.png";

import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import { logOut } from "@/store/slices/auth.slice"; // 🎯 确保方法名拼写与你的 slice 完全一致

const { Header, Content, Sider } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [collapsed]);

  const userMenuItems: MenuProps["items"] = [
    { key: "profile", icon: <UserSwitchOutlined />, label: "个人中心" },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "退出登录", danger: true },
  ];

  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      dispatch(logOut());
      navigate("/login");
    }
  };

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      {/* 🖥️ 桌面端固定侧边栏 */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={220} // 大厂舒适宽度
          style={{
            background: colorBgContainer,
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1000,
            boxShadow: "1px 0 4px rgba(0,21,41,.08)",
          }}
        >
          <MySider collapsed={collapsed} />
        </Sider>
      )}

      {/* 🚀 主内容包装容器 */}
      <Layout
        style={{
          marginLeft: !isMobile ? (collapsed ? "80px" : "220px") : "0px",
          transition: "margin-left 0.2s flex flex-col h-screen",
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
            borderBottom: "1px solid #f0f0f0",
            height: "64px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-base"
          />

          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
          >
            <div className="flex items-center gap-4 cursor-pointer select-none">
              <img src={lightPng} alt="theme" className="w-5 h-5" />
              <div className="flex items-center gap-2">
                <Avatar size={28} icon={<UserOutlined />} />
                <span className="text-gray-700 font-medium">{user?.name || "管理员"}</span>
              </div>
            </div>
          </Dropdown>
        </Header>

        {/* 🎨 核心画布区：严格防溢出，全面承接你的看板业务 */}
        <Content className="p-6 overflow-auto bg-gray-50 flex-1 min-h-0">
          <Outlet />
        </Content>
      </Layout>

      {/* 📱 移动端抽屉遮罩与侧边栏 */}
      {isMobile && !collapsed && (
        <>
          <div className="fixed inset-0 bg-black/40 z-999" onClick={() => setCollapsed(true)} />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white z-1000 shadow-2xl animate-fade-in-left">
            <MySider collapsed={false} isMobile={true} onMobileClose={() => setCollapsed(true)} />
          </div>
        </>
      )}
    </Layout>
  );
};

export default MyLayout;
