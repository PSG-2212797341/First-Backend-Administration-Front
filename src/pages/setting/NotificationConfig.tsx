import React, { useState } from "react";
import {
  BellOutlined,
  HomeOutlined,
  AppstoreOutlined,
  SoundOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  SendOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  MessageOutlined,
  InfoCircleOutlined,
  UpOutlined,
  DownOutlined,
  CloudUploadOutlined,
  SyncOutlined,
  WarningOutlined,
  PieChartOutlined,
  FileTextOutlined,
  AuditOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Select, Switch, Button, Breadcrumb, Table, Space } from "antd";

export default function NotificationConfig() {
  const [activeSubTab, setActiveSubTab] = useState("system");
  const [systemExpanded, setSystemExpanded] = useState(true);
  const [businessExpanded, setBusinessExpanded] = useState(false);

  // 通知设置的专属子分类
  const noticeCategories = [
    { key: "system", icon: <BellOutlined />, label: "系统通知", desc: "系统公告、系统更新等通知" },
    {
      key: "business",
      icon: <AppstoreOutlined />,
      label: "业务通知",
      desc: "订单、审批、任务等业务通知",
    },
    {
      key: "marketing",
      icon: <SoundOutlined />,
      label: "营销通知",
      desc: "活动、优惠、推广等通知",
    },
    {
      key: "security",
      icon: <SafetyCertificateOutlined />,
      label: "安全通知",
      desc: "登录、安全、异常等通知",
    },
    {
      key: "reminder",
      icon: <ClockCircleOutlined />,
      label: "提醒设置",
      desc: "待办、到期、周期性提醒",
    },
    { key: "channels", icon: <SendOutlined />, label: "通知方式", desc: "管理接收渠道和方式" },
    {
      key: "dnd",
      icon: <EyeInvisibleOutlined />,
      label: "免打扰设置",
      desc: "设置免打扰时间和规则",
    },
  ];

  // 总览数据卡片配置
  const overviewCards = [
    {
      title: "总通知类型",
      count: "23",
      unit: "个",
      change: "较昨日 +2",
      color: "bg-blue-50 text-blue-600",
      icon: <BellOutlined />,
    },
    {
      title: "邮件通知",
      count: "12",
      unit: "个",
      change: "已启用",
      color: "bg-green-50 text-green-600",
      icon: <MailOutlined />,
    },
    {
      title: "站内通知",
      count: "18",
      unit: "个",
      change: "已启用",
      color: "bg-orange-50 text-orange-600",
      icon: <MessageOutlined />,
    },
    {
      title: "短信通知",
      count: "8",
      unit: "个",
      change: "已启用",
      color: "bg-purple-50 text-purple-600",
      icon: <SendOutlined />,
    },
  ];

  // 表格列定义定义
  const columns = [
    {
      title: "通知类型",
      dataIndex: "type",
      key: "type",
      width: "15%",
      render: (text: string, record: any) => (
        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <span className="text-blue-500 flex items-center">{record.icon}</span>
          {text}
        </span>
      ),
    },
    {
      title: "通知内容",
      dataIndex: "content",
      key: "content",
      width: "30%",
      render: (text: string) => <span className="text-xs text-gray-400">{text}</span>,
    },
    {
      title: "邮件通知",
      dataIndex: "mail",
      key: "mail",
      width: "12%",
      render: (checked: boolean) => (
        <div className="flex items-center gap-1.5">
          <Switch defaultChecked={checked} size="small" />
          <span className={`text-xs ${checked ? "text-blue-500 font-medium" : "text-gray-400"}`}>
            {checked ? "启用" : "禁用"}
          </span>
        </div>
      ),
    },
    {
      title: "站内通知",
      dataIndex: "site",
      key: "site",
      width: "12%",
      render: (checked: boolean) => (
        <div className="flex items-center gap-1.5">
          <Switch defaultChecked={checked} size="small" />
          <span className={`text-xs ${checked ? "text-blue-500 font-medium" : "text-gray-400"}`}>
            {checked ? "启用" : "禁用"}
          </span>
        </div>
      ),
    },
    {
      title: "短信通知",
      dataIndex: "sms",
      key: "sms",
      width: "12%",
      render: (checked: boolean) => (
        <div className="flex items-center gap-1.5">
          <Switch defaultChecked={checked} size="small" />
          <span className={`text-xs ${checked ? "text-blue-500 font-medium" : "text-gray-400"}`}>
            {checked ? "启用" : "禁用"}
          </span>
        </div>
      ),
    },
    {
      title: "接收频率",
      dataIndex: "frequency",
      key: "frequency",
      width: "11%",
      render: (value: string) => (
        <Select
          defaultValue={value}
          size="small"
          className="w-24 text-xs"
          options={[
            { value: "instantly", label: "立即" },
            { value: "daily", label: "每日汇总" },
            { value: "weekly", label: "每周" },
          ]}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "8%",
      render: () => (
        <Space size="middle" className="text-xs">
          <a className="text-blue-600 hover:text-blue-700 font-medium">编辑</a>
          <a className="text-red-500 hover:text-red-600 font-medium">禁用</a>
        </Space>
      ),
    },
  ];

  // 数据源
  const systemData = [
    {
      key: "1",
      type: "系统公告",
      icon: <BellOutlined />,
      content: "系统发布的公告和重要通知",
      mail: true,
      site: true,
      sms: false,
      frequency: "instantly",
    },
    {
      key: "2",
      type: "系统更新",
      icon: <SyncOutlined />,
      content: "系统版本更新和功能上线通知",
      mail: true,
      site: true,
      sms: false,
      frequency: "daily",
    },
    {
      key: "3",
      type: "系统维护",
      icon: <CloudUploadOutlined />,
      content: "系统维护、升级等通知",
      mail: true,
      site: true,
      sms: true,
      frequency: "instantly",
    },
    {
      key: "4",
      type: "安全提醒",
      icon: <WarningOutlined />,
      content: "账号安全、登录异常等提醒",
      mail: true,
      site: true,
      sms: true,
      frequency: "instantly",
    },
    {
      key: "5",
      type: "数据报告",
      icon: <PieChartOutlined />,
      content: "系统数据报告和统计信息",
      mail: false,
      site: true,
      sms: false,
      frequency: "weekly",
    },
  ];

  const businessData = [
    {
      key: "1",
      type: "订单通知",
      icon: <FileTextOutlined />,
      content: "订单创建、支付、发货等通知",
      mail: true,
      site: true,
      sms: true,
      frequency: "instantly",
    },
    {
      key: "2",
      type: "审批通知",
      icon: <AuditOutlined />,
      content: "审批申请、审批结果等通知",
      mail: true,
      site: true,
      sms: false,
      frequency: "instantly",
    },
    {
      key: "3",
      type: "任务通知",
      icon: <ContainerOutlined />,
      content: "任务分配、完成、逾期等通知",
      mail: false,
      site: true,
      sms: false,
      frequency: "daily",
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen">
      {/* 面包屑导航 */}
      <Breadcrumb
        className="text-xs text-gray-400 mb-4"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "通知设置" }]}
      />

      {/* 页面标题横幅 */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <BellOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">通知设置</h1>
            <p className="text-sm text-gray-400">配置系统通知方式，管理各类通知的接收渠道和频率</p>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <BellOutlined className="text-8xl text-blue-600" />
        </div>
      </div>

      {/* 下方双栏布局 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* 左栏：通知设置分类 */}
        <div className="col-span-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm shadow-gray-100/50">
          <div className="text-xs font-bold text-gray-400 px-3 pt-2 pb-4">通知设置分类</div>
          <div className="space-y-1">
            {noticeCategories.map(cat => {
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

        {/* 右栏：通知卡片与配置表格组 */}
        <div className="col-span-9 space-y-6">
          {/* 通知总览指标卡片 */}
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

          {/* 1. 系统通知配置组（带折叠） */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-800">系统通知</h3>
                <p className="text-xs text-gray-400 mt-0.5">系统相关的重要通知和公告</p>
              </div>
              <Button
                type="text"
                size="small"
                icon={systemExpanded ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setSystemExpanded(!systemExpanded)}
                className="text-xs text-gray-400 flex items-center gap-1 hover:bg-gray-50 rounded-md"
              >
                {systemExpanded ? "收起" : "展开"}
              </Button>
            </div>

            {systemExpanded && (
              <div className="p-2">
                <Table
                  columns={columns}
                  dataSource={systemData}
                  pagination={false}
                  className="custom-settings-table"
                  size="middle"
                />
              </div>
            )}
          </div>

          {/* 2. 业务通知配置组（带折叠） */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-800">业务通知</h3>
                <p className="text-xs text-gray-400 mt-0.5">业务相关的操作和状态变更通知</p>
              </div>
              <Button
                type="text"
                size="small"
                icon={businessExpanded ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setBusinessExpanded(!businessExpanded)}
                className="text-xs text-gray-400 flex items-center gap-1 hover:bg-gray-50 rounded-md"
              >
                {businessExpanded ? "收起" : "展开"}
              </Button>
            </div>

            {businessExpanded && (
              <div className="p-2">
                <Table
                  columns={columns}
                  dataSource={businessData}
                  pagination={false}
                  className="custom-settings-table"
                  size="middle"
                />
              </div>
            )}
          </div>

          {/* 底部版权 */}
          <div className="text-center text-xs text-gray-400 pt-2 pb-4">
            © 2024 WorkPro. All rights reserved.
          </div>
        </div>
      </div>

      {/* 补充：用于轻量微调 Antd Table 的极简内联样式 */}
      <style>{`
        .custom-settings-table .ant-table { background: transparent; }
        .custom-settings-table .ant-table-thead > tr > th { 
          background: transparent !important; 
          font-size: 12px; 
          color: #9ca3af !important; 
          font-weight: 500;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .custom-settings-table .ant-table-tbody > tr > td { 
          border-bottom: 1px solid #f9fafb !important;
          padding: 14px 16px !important;
        }
        .custom-settings-table .ant-table-tbody > tr:hover > td {
          background: #fcfdfe !important;
        }
      `}</style>
    </div>
  );
}
