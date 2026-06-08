import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeOutlined,
  FileTextOutlined,
  AuditOutlined,
  ContainerOutlined,
  BuildOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  BarcodeOutlined,
  CloudUploadOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Select, Radio, Switch, Button, Breadcrumb, Table, Space, Dropdown } from "antd";

export default function BusinessConfig() {
  const [activeSubTab, setActiveSubTab] = useState("order_config");

  // 业务设置的专属子分类
  const businessCategories = [
    { key: "order_config", icon: <FileTextOutlined />, label: "订单配置", desc: "订单流程与规则" },
    { key: "approve_config", icon: <AuditOutlined />, label: "审批配置", desc: "审批流程与节点" },
    { key: "task_config", icon: <ContainerOutlined />, label: "任务配置", desc: "任务创建与执行" },
    { key: "auto_rule", icon: <BuildOutlined />, label: "自动化规则", desc: "自动触发策略" },
    { key: "business_params", icon: <SettingOutlined />, label: "业务参数", desc: "核心业务参数" },
    { key: "sla_setting", icon: <ClockCircleOutlined />, label: "SLA设置", desc: "服务等级协议" },
    { key: "code_rule", icon: <BarcodeOutlined />, label: "编号规则", desc: "单据编码生成规则" },
    {
      key: "data_archive",
      icon: <CloudUploadOutlined />,
      label: "数据归档",
      desc: "业务数据归档策略",
    },
  ];

  // 顶部概览指标数据
  const overviewCards = [
    {
      title: "订单流程",
      count: "12",
      unit: "个",
      change: "已启用",
      color: "bg-blue-50 text-blue-600",
      icon: <FileTextOutlined />,
    },
    {
      title: "审批流程",
      count: "8",
      unit: "个",
      change: "已启用",
      color: "bg-green-50 text-green-600",
      icon: <AuditOutlined />,
    },
    {
      title: "自动规则",
      count: "26",
      unit: "个",
      change: "已启用",
      color: "bg-orange-50 text-orange-600",
      icon: <BuildOutlined />,
    },
    {
      title: "SLA策略",
      count: "5",
      unit: "个",
      change: "已启用",
      color: "bg-purple-50 text-purple-600",
      icon: <ClockCircleOutlined />,
    },
  ];

  // 下拉菜单操作项定义
  const actionMenuItems = {
    items: [
      { key: "1", label: "查看详情" },
      { key: "2", label: "历史版本" },
    ],
  };

  // 1. 审批配置表格列
  const approveColumns = [
    {
      title: "审批流程",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text: string) => <span className="text-sm font-medium text-gray-800">{text}</span>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: string) => {
        const isEnabled = status === "启用";
        return (
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span
              className={`w-1.5 h-1.5 rounded-full ${isEnabled ? "bg-green-500" : "bg-gray-400"}`}
            />
            {status}
          </span>
        );
      },
    },
    {
      title: "节点数",
      dataIndex: "nodes",
      key: "nodes",
      width: "15%",
      render: (text: number) => <span className="text-xs text-gray-600 font-medium">{text}</span>,
    },
    {
      title: "更新时间",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "20%",
      render: (text: string) => <span className="text-xs text-gray-400">{text}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: "25%",
      render: () => (
        <Space size="middle" className="text-xs">
          <a className="text-blue-600 hover:text-blue-700 font-medium">编辑</a>
          <a className="text-blue-600 hover:text-blue-700 font-medium">复制</a>
          <Dropdown menu={actionMenuItems} trigger={["click"]}>
            <a className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              更多 <DownOutlined className="text-[10px]" />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const approveData = [
    { key: "1", name: "请假审批", status: "启用", nodes: 3, updatedAt: "今日 10:30" },
    { key: "2", name: "采购审批", status: "启用", nodes: 5, updatedAt: "今日 09:15" },
    { key: "3", name: "合同审批", status: "启用", nodes: 4, updatedAt: "今日 08:45" },
    { key: "4", name: "报销审批", status: "禁用", nodes: 2, updatedAt: "3 天前" },
  ];

  // 2. 自动化规则表格列
  const autoRuleColumns = [
    {
      title: "规则名称",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text: string) => <span className="text-sm font-medium text-gray-800">{text}</span>,
    },
    {
      title: "触发条件",
      dataIndex: "condition",
      key: "condition",
      width: "20%",
      render: (text: string) => <span className="text-xs text-gray-500">{text}</span>,
    },
    {
      title: "执行动作",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (text: string) => <span className="text-xs text-gray-500">{text}</span>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (checked: boolean) => <Switch defaultChecked={checked} size="small" />,
    },
    {
      title: "操作",
      key: "action",
      width: "20%",
      render: () => (
        <Space size="middle" className="text-xs">
          <a className="text-blue-600 hover:text-blue-700 font-medium">编辑</a>
          <a className="text-blue-600 hover:text-blue-700 font-medium">复制</a>
          <Dropdown menu={actionMenuItems} trigger={["click"]}>
            <a className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              更多 <DownOutlined className="text-[10px]" />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const autoRuleData = [
    { key: "1", name: "新订单创建", condition: "创建订单", action: "分配负责人", status: true },
    { key: "2", name: "审批通过", condition: "审批完成", action: "创建任务", status: true },
    { key: "3", name: "超时未处理", condition: "订单超时", action: "发送提醒", status: true },
    {
      key: "4",
      name: "客户评级变更",
      condition: "客户信息更新",
      action: "更新客户等级",
      status: false,
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen">
      {/* 面包屑导航 */}
      <Breadcrumb
        className="text-xs text-gray-400 mb-4"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "业务设置" }]}
      />

      {/* 页面标题横幅 */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <AppstoreOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">业务设置</h1>
            <p className="text-sm text-gray-400">
              配置业务运行规则、审批流程、自动化任务及系统业务参数
            </p>
          </div>
        </div>
        {/* 背景轻量装饰元素 */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none flex items-center gap-4 text-3xl text-blue-600 font-light">
          <span className="border border-blue-600 px-3 py-1 rounded">三</span>
          <span>→</span>
          <span className="border border-blue-600 px-3 py-1 rounded bg-blue-50 opacity-50">✓</span>
        </div>
      </div>

      {/* 下方双栏布局 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* 左栏：业务设置分类 */}
        <div className="col-span-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm shadow-gray-100/50">
          <div className="text-xs font-bold text-gray-400 px-3 pt-2 pb-4">业务设置分类</div>
          <div className="space-y-1">
            {businessCategories.map(cat => {
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

        {/* 右栏：业务总览与细项配置 */}
        <div className="col-span-9 space-y-6">
          {/* 业务总览卡片组 */}
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

          {/* 订单配置网格面板 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <div className="mb-6">
              <h3 className="text-base font-bold text-gray-800">订单配置</h3>
              <p className="text-xs text-gray-400 mt-0.5">管理订单生命周期及处理规则</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* 订单模式 */}
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/20">
                <label className="block text-xs font-medium text-gray-500 mb-3">订单模式</label>
                <Radio.Group defaultValue="approve" className="flex flex-col gap-2.5">
                  <Radio value="standard" className="text-xs text-gray-700">
                    标准订单
                  </Radio>
                  <Radio value="approve" className="text-xs text-gray-700">
                    审批订单
                  </Radio>
                  <Radio value="auto" className="text-xs text-gray-700">
                    自动订单
                  </Radio>
                </Radio.Group>
              </div>

              {/* 自动分配 */}
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-500">自动分配</label>
                    <Switch defaultChecked size="small" />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    系统根据规则自动分配负责人
                  </p>
                </div>
              </div>

              {/* 超时提醒 */}
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-500">超时提醒</label>
                    <Switch defaultChecked size="small" />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                    开启后，订单超时将提醒相关人员
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1.5">提醒时间</label>
                  <Select
                    defaultValue="30"
                    size="small"
                    className="w-full text-xs"
                    options={[{ value: "30", label: "30 分钟" }]}
                  />
                </div>
              </div>

              {/* 自动关闭未处理订单 */}
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-gray-500">自动关闭未处理订单</label>
                    <Switch defaultChecked size="small" />
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
                    开启后，超时未处理的订单将自动关闭
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1.5">关闭时间</label>
                  <Select
                    defaultValue="7"
                    size="small"
                    className="w-full text-xs"
                    options={[{ value: "7", label: "7 天" }]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 审批配置组表格 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-800">审批配置</h3>
                <p className="text-xs text-gray-400 mt-0.5">配置审批流程及节点规则</p>
              </div>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                className="bg-blue-600 hover:bg-blue-700 h-8.5 rounded-lg text-xs font-medium flex items-center px-3 shadow-sm shadow-blue-100"
              >
                新建流程
              </Button>
            </div>
            <div className="p-2">
              <Table
                columns={approveColumns}
                dataSource={approveData}
                pagination={false}
                className="custom-business-table"
                size="middle"
              />
            </div>
          </div>

          {/* 自动化规则表格 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-800">自动化规则</h3>
                <p className="text-xs text-gray-400 mt-0.5">配置自动触发条件与执行动作</p>
              </div>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                className="bg-blue-600 hover:bg-blue-700 h-8.5 rounded-lg text-xs font-medium flex items-center px-3 shadow-sm shadow-blue-100"
              >
                新建规则
              </Button>
            </div>
            <div className="p-2">
              <Table
                columns={autoRuleColumns}
                dataSource={autoRuleData}
                pagination={false}
                className="custom-business-table"
                size="middle"
              />
            </div>
          </div>

          {/* 底部版权 */}
          <div className="text-center text-xs text-gray-400 pt-2 pb-4">
            © 2024 WorkPro. All rights reserved.
          </div>
        </div>
      </div>

      {/* 补充：用于轻量维护 Antd Table 极简内联样式 */}
      <style>{`
        .custom-business-table .ant-table { background: transparent; }
        .custom-business-table .ant-table-thead > tr > th { 
          background: transparent !important; 
          font-size: 12px; 
          color: #9ca3af !important; 
          font-weight: 500;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .custom-business-table .ant-table-tbody > tr > td { 
          border-bottom: 1px solid #f9fafb !important;
          padding: 14px 16px !important;
        }
        .custom-business-table .ant-table-tbody > tr:hover > td {
          background: #fcfdfe !important;
        }
      `}</style>
    </div>
  );
}
