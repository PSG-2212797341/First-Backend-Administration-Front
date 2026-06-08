import React, { useState } from "react";
import {
  ApiOutlined,
  HomeOutlined,
  AppstoreOutlined,
  KeyOutlined,
  LinkOutlined,
  SyncOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  ShopOutlined,
  PlusOutlined,
  DownOutlined,
  WechatOutlined,
  CloudServerOutlined,
} from "@ant-design/icons";
import { Button, Breadcrumb, Table, Space, Tag, Dropdown, Pagination } from "antd";

export default function IntegrationConfig() {
  const [activeSubTab, setActiveSubTab] = useState("app_integration");

  // 集成设置的专属子分类
  const integrationCategories = [
    {
      key: "app_integration",
      icon: <AppstoreOutlined />,
      label: "应用集成",
      desc: "第三方应用集成管理",
    },
    { key: "api_management", icon: <KeyOutlined />, label: "API管理", desc: "API接口与密钥管理" },
    { key: "webhook", icon: <LinkOutlined />, label: "Webhook", desc: "事件订阅与通知" },
    { key: "data_sync", icon: <SyncOutlined />, label: "数据同步", desc: "数据同步任务管理" },
    {
      key: "auth_management",
      icon: <SafetyCertificateOutlined />,
      label: "认证管理",
      desc: "认证方式与凭证管理",
    },
    { key: "connect_logs", icon: <FileTextOutlined />, label: "连接日志", desc: "集成调用日志" },
    { key: "market", icon: <ShopOutlined />, label: "集成市场", desc: "应用市场与扩展" },
  ];

  // 顶部集成概览指标数据
  const overviewCards = [
    {
      title: "集成应用",
      count: "12",
      unit: "个",
      change: "已启用 8 个",
      color: "bg-blue-50 text-blue-600",
      icon: <AppstoreOutlined />,
    },
    {
      title: "API接口",
      count: "24",
      unit: "个",
      change: "已启用 18 个",
      color: "bg-green-50 text-green-600",
      icon: <ApiOutlined />,
    },
    {
      title: "Webhook",
      count: "6",
      unit: "个",
      change: "已启用 4 个",
      color: "bg-orange-50 text-orange-600",
      icon: <LinkOutlined />,
    },
    {
      title: "数据同步任务",
      count: "15",
      unit: "个",
      change: "运行中 7 个",
      color: "bg-purple-50 text-purple-600",
      icon: <SyncOutlined />,
    },
  ];

  // 底部快速集成推荐卡片数据
  const quickIntegrations = [
    {
      name: "企业微信",
      desc: "连接企业微信，接收消息通知",
      icon: <span className="text-xl text-blue-500">💬</span>,
    },
    {
      name: "钉钉",
      desc: "连接钉钉，提升协同高效",
      icon: <span className="text-xl text-blue-400">⚡</span>,
    },
    {
      name: "飞书",
      desc: "集成飞书，打通协同流转",
      icon: <span className="text-xl text-green-500">🕊️</span>,
    },
    {
      name: "金蝶云星空",
      desc: "对接金蝶ERP系统",
      icon: <span className="text-xl text-blue-600">📊</span>,
    },
    {
      name: "阿里云OSS",
      desc: "集成对象存储服务",
      icon: <CloudServerOutlined className="text-xl text-orange-500" />,
    },
  ];

  // 下拉菜单操作项
  const actionMenuItems = {
    items: [
      { key: "1", label: "同步日志" },
      { key: "2", label: "解除绑定" },
    ],
  };

  // 应用集成表格列定义
  const columns = [
    {
      title: "应用名称",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text: string, record: any) => (
        <span className="flex items-center gap-3 text-sm font-medium text-gray-800">
          <span className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 text-base">
            {record.avatar}
          </span>
          <div>
            <div className="font-medium text-gray-800">{text}</div>
            <div className="text-[11px] text-gray-400 font-normal">{record.subText}</div>
          </div>
        </span>
      ),
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: "15%",
      render: (type: string) => {
        let color = "blue";
        if (type === "自建应用") color = "green";
        if (type === "第三方应用") color = "purple";
        return (
          <Tag color={color} className="text-xs border-none font-medium px-2 py-0.5">
            {type}
          </Tag>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => {
        const isActive = status === "已启用" || status === "运行中";
        const isWarning = status === "运行中";
        return (
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span
              className={`w-1.5 h-1.5 rounded-full ${isWarning ? "bg-blue-500 animate-pulse" : isActive ? "bg-green-500" : "bg-gray-300"}`}
            />
            {status}
          </span>
        );
      },
    },
    {
      title: "最后同步",
      dataIndex: "lastSync",
      key: "lastSync",
      width: "20%",
      render: (text: string) => <span className="text-xs text-gray-400">{text || "-"}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: "25%",
      render: () => (
        <Space size="middle" className="text-xs">
          <a className="text-blue-600 hover:text-blue-700 font-medium">配置</a>
          <a className="text-blue-600 hover:text-blue-700 font-medium">测试</a>
          <Dropdown menu={actionMenuItems} trigger={["click"]}>
            <a className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              更多 <DownOutlined className="text-[10px]" />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "企业微信",
      subText: "IM通讯",
      avatar: "💬",
      type: "官方应用",
      status: "已启用",
      lastSync: "今天 10:30",
    },
    {
      key: "2",
      name: "钉钉",
      subText: "IM通讯",
      avatar: "⚡",
      type: "官方应用",
      status: "已启用",
      lastSync: "今天 09:15",
    },
    {
      key: "3",
      name: "飞书",
      subText: "协同办公",
      avatar: "🕊️",
      type: "官方应用",
      status: "已启用",
      lastSync: "今天 08:45",
    },
    {
      key: "4",
      name: "微信公众号",
      subText: "社交平台",
      avatar: "🟢",
      type: "自建应用",
      status: "已启用",
      lastSync: "昨天 16:20",
    },
    {
      key: "5",
      name: "金蝶云星空",
      subText: "ERP系统",
      avatar: "📊",
      type: "第三方应用",
      status: "已启用",
      lastSync: "昨天 14:30",
    },
    {
      key: "6",
      name: "用友U8",
      subText: "ERP系统",
      avatar: "🔴",
      type: "第三方应用",
      status: "未启用",
      lastSync: "",
    },
    {
      key: "7",
      name: "阿里云短信",
      subText: "短信服务",
      avatar: "✉️",
      type: "官方应用",
      status: "已启用",
      lastSync: "前天 11:20",
    },
    {
      key: "8",
      name: "腾讯云存储",
      subText: "文件存储",
      avatar: "☁️",
      type: "官方应用",
      status: "运行中",
      lastSync: "前天 10:05",
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen">
      {/* 面包屑导航 */}
      <Breadcrumb
        className="text-xs text-gray-400 mb-4"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "集成设置" }]}
      />

      {/* 页面标题横幅 */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <ApiOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">集成设置</h1>
            <p className="text-sm text-gray-400">
              管理与第三方系统的集成连接，配置API、WebHook及数据同步规则
            </p>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <ApiOutlined className="text-8xl text-blue-600" />
        </div>
      </div>

      {/* 下方双栏布局 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* 左栏：集成设置分类 */}
        <div className="col-span-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm shadow-gray-100/50">
          <div className="text-xs font-bold text-gray-400 px-3 pt-2 pb-4">集成设置分类</div>
          <div className="space-y-1">
            {integrationCategories.map(cat => {
              const isActive = activeSubTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveSubTab(cat.key)}
                  className={`w-full flex items-center gap-3.5 p-3 rounded-xl transition-all text-left ${
                    isActive
                      ? "bg-blue-50/60 text-blue-600 font-medium"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <div className={`text-lg ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                    {cat.icon}
                  </div>
                  <div>
                    <div
                      className={`text-sm ${isActive ? "text-blue-600" : "text-gray-700 font-normal"}`}
                    >
                      {cat.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 font-normal">{cat.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 右栏：核心配置面板 */}
        <div className="col-span-9 space-y-6">
          {/* 集成概览指标卡片组 */}
          <div className="grid grid-cols-4 gap-4">
            {overviewCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm shadow-gray-100/50 flex items-center gap-4"
              >
                <div
                  className={`w-11 h-11 ${card.color} rounded-xl flex items-center justify-center text-lg`}
                >
                  {card.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">{card.title}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-gray-800">{card.count}</span>
                    <span className="text-xs text-gray-400">{card.unit}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 font-normal">{card.change}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 应用集成数据表格卡片 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-800">应用集成</h3>
                <p className="text-xs text-gray-400 mt-0.5">管理已集成的第三方应用</p>
              </div>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                className="bg-blue-600 hover:bg-blue-700 h-8.5 rounded-lg text-xs font-medium flex items-center px-3 shadow-sm shadow-blue-100"
              >
                新建集成
              </Button>
            </div>

            <div className="p-2">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                className="custom-integration-table"
                size="middle"
              />
              {/* 自定义极简分页器 */}
              <div className="p-4 flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 mt-2">
                <div>共 8 条</div>
                <Pagination
                  size="small"
                  total={8}
                  defaultCurrent={1}
                  pageSize={10}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>

          {/* 快速集成推荐卡片区域 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-base font-bold text-gray-800">快速集成</h3>
                <p className="text-xs text-gray-400 mt-0.5">推荐集成应用，快速连接到您的业务系统</p>
              </div>
              <a className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
                查看集成市场 &gt;
              </a>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {quickIntegrations.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-xl p-4 flex flex-col justify-between items-center text-center bg-gray-50/10 hover:shadow-sm transition-all h-[156px]"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2.5 border border-gray-50">
                      {item.icon}
                    </div>
                    <div className="text-xs font-bold text-gray-800 mb-1">{item.name}</div>
                    <div className="text-[10px] text-gray-400 leading-normal max-w-[110px] line-clamp-2">
                      {item.desc}
                    </div>
                  </div>
                  <Button
                    size="small"
                    className="w-full text-[11px] text-blue-600 border-blue-100 hover:border-blue-600 hover:text-blue-600 bg-blue-50/20 h-7 rounded-lg font-medium"
                  >
                    立即集成
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* 底部版权 */}
          <div className="text-center text-xs text-gray-400 pt-2 pb-4">
            © 2024 WorkPro. All rights reserved.
          </div>
        </div>
      </div>

      {/* 补充：针对 Antd Table 样式精细对齐的内联配置 */}
      <style>{`
        .custom-integration-table .ant-table { background: transparent; }
        .custom-integration-table .ant-table-thead > tr > th { 
          background: transparent !important; 
          font-size: 12px; 
          color: #9ca3af !important; 
          font-weight: 500;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .custom-integration-table .ant-table-tbody > tr > td { 
          border-bottom: 1px solid #f9fafb !important;
          padding: 12px 16px !important;
        }
        .custom-integration-table .ant-table-tbody > tr:hover > td {
          background: #fcfdfe !important;
        }
        .ant-tag-blue { background-color: #eff6ff !important; color: #3b82f6 !important; }
        .ant-tag-green { background-color: #ecfdf5 !important; color: #10b981 !important; }
        .ant-tag-purple { background-color: #faf5ff !important; color: #a855f7 !important; }
      `}</style>
    </div>
  );
}
