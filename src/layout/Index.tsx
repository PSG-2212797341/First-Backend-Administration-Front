import React, { useState, useEffect } from "react";
import { Avatar, Layout, theme, Button, type MenuProps, Dropdown } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import MySider from "./Sider";
import lightPng from "@/assets/png/light.png";

import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import { logout } from "@/store/slices/auth.slice";

const { Header, Content, Sider } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 使用store中的数据
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 检测屏幕尺寸，在小屏幕上自动折叠侧边栏
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 在组件内部定义菜单项
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserSwitchOutlined />,
      label: "个人中心",
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      danger: true,
    },
  ];

  // 菜单点击处理
  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      // 退出登录逻辑
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          style={{
            background: colorBgContainer,
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <MySider collapsed={collapsed} />
        </Sider>
      )}

      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: !isMobile && !collapsed ? "200px" : !isMobile && collapsed ? "80px" : "0",
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: "16px" }}
              />
            )}
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: "16px" }}
              />
            )}
          </div>

          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img className="cursor-pointer" src={lightPng} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Avatar className="cursor-pointer" size={24} icon={<UserOutlined />} />
                <span className="cursor-pointer">{user.name}</span>
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content
          className="p-4 md:p-7.5"
          style={{
            flex: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* 移动端侧边栏遮罩 */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* 移动端侧边栏 */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            width: "80%",
            maxWidth: "300px",
            background: colorBgContainer,
            zIndex: 1000,
            overflow: "auto",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <MySider collapsed={false} isMobile={true} />
        </div>
      )}
    </Layout>
  );
};

export default MyLayout;
