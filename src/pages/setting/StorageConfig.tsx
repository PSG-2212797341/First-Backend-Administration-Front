import React, { useState } from "react";
import {
  SettingOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  CloudUploadOutlined,
  AppstoreOutlined,
  ApiOutlined,
  HistoryOutlined,
  ToolOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  HistoryOutlined as RotateLeftOutlined,
  DeleteOutlined,
  PieChartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Input,
  Select,
  Radio,
  Switch,
  Button,
  Breadcrumb,
  Table,
  Progress,
  Tag,
  Space,
} from "antd";

export default function StorageConfig() {
  const [activeTab, setActiveTab] = useState("storage");

  // 设置分类配置
  const settingCategories = [
    { key: "basic", icon: <SettingOutlined />, label: "基础设置", desc: "系统基本信息设置" },
    {
      key: "security",
      icon: <SafetyCertificateOutlined />,
      label: "安全设置",
      desc: "密码策略与登录安全",
    },
    { key: "notification", icon: <BellOutlined />, label: "通知设置", desc: "系统通知与消息配置" },
    {
      key: "storage",
      icon: <CloudUploadOutlined />,
      label: "存储设置",
      desc: "文件存储与上传配置",
    },
    { key: "business", icon: <AppstoreOutlined />, label: "业务设置", desc: "业务规则与参数配置" },
    { key: "integration", icon: <ApiOutlined />, label: "集成设置", desc: "第三方服务集成配置" },
    { key: "logs", icon: <HistoryOutlined />, label: "日志管理", desc: "系统日志与操作日志" },
    { key: "maintenance", icon: <ToolOutlined />, label: "维护设置", desc: "系统维护与更新配置" },
  ];

  // 存储媒体数据列表
  const storageDetails = [
    { label: "文件存储", size: "128 GB", percent: "50%", color: "bg-[#3b82f6]" },
    { label: "图片存储", size: "64 GB", percent: "25%", color: "bg-[#10b981]" },
    { label: "视频存储", size: "32 GB", percent: "12.5%", color: "bg-[#f59e0b]" },
    { label: "文档存储", size: "16 GB", percent: "6.3%", color: "bg-[#ec4899]" },
    { label: "其他", size: "16 GB", percent: "6.3%", color: "bg-[#a855f7]" },
  ];

  // 存储位置管理表格列定义
  const columns = [
    {
      title: "存储位置",
      dataIndex: "location",
      key: "location",
      width: "25%",
      render: (text: string, record: any) => (
        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
          {text}
          {record.isDefault && (
            <Tag
              color="blue"
              className="text-xs scale-90 origin-left border-none bg-blue-50 text-blue-500 font-medium px-1.5 py-0"
            >
              默认
            </Tag>
          )}
        </span>
      ),
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: "15%",
      render: (text: string) => <span className="text-xs text-gray-500">{text}</span>,
    },
    {
      title: "总容量",
      dataIndex: "total",
      key: "total",
      width: "15%",
      render: (text: string) => <span className="text-xs text-gray-700 font-medium">{text}</span>,
    },
    {
      title: "已使用",
      dataIndex: "used",
      key: "used",
      width: "15%",
      render: (text: string) => <span className="text-xs text-gray-500">{text}</span>,
    },
    {
      title: "使用率",
      dataIndex: "usagePercent",
      key: "usagePercent",
      width: "20%",
      render: (percent: number) => (
        <div className="flex items-center gap-3 w-40">
          <Progress
            percent={percent}
            size="small"
            showInfo={false}
            strokeColor="#3b82f6"
            trailColor="#f3f4f6"
            strokeWidth={6}
          />
          <span className="text-xs text-gray-400 min-w-[28px] text-right">{percent}%</span>
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: () => (
        <Space size="middle" className="text-xs">
          <a className="text-blue-600 hover:text-blue-700 font-medium">编辑</a>
          <a className="text-red-500 hover:text-red-600 font-medium">删除</a>
        </Space>
      ),
    },
  ];

  const tableData = [
    {
      key: "1",
      location: "本地存储 (主存储)",
      type: "本地磁盘",
      total: "512 GB",
      used: "256 GB",
      usagePercent: 50,
      isDefault: true,
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen">
      {/* 面包屑导航 */}
      <Breadcrumb
        className="text-xs text-gray-400 mb-4"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "存储设置" }]}
      />

      {/* 页面标题横幅 */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <CloudUploadOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">存储设置</h1>
            <p className="text-sm text-gray-400">管理系统文件存储、空间使用和上传相关配置</p>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <CloudUploadOutlined className="text-8xl text-blue-600" />
        </div>
      </div>

      {/* 下方双栏布局 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* 左栏：设置分类 */}
        <div className="col-span-3 bg-white rounded-2xl p-3 border border-gray-100 shadow-sm shadow-gray-100/50">
          <div className="text-xs font-bold text-gray-400 px-3 pt-2 pb-4">设置分类</div>
          <div className="space-y-1">
            {settingCategories.map(cat => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
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

        {/* 右栏：设置表单详情 */}
        <div className="col-span-9 space-y-6">
          {/* 1. 存储概览卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-800">存储概览</h3>
              <Button
                size="small"
                className="text-xs text-gray-500 border-gray-200 hover:text-blue-600 hover:border-blue-600 rounded-lg px-3 h-8"
              >
                查看使用详情
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-6 items-center">
              {/* 环形图模拟 */}
              <div className="col-span-3 flex justify-center">
                <div
                  className="relative w-40 h-40 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "conic-gradient(#3b82f6 0% 50%, #10b981 50% 75%, #f59e0b 75% 87.5%, #ec4899 87.5% 93.8%, #a855f7 93.8% 100%)",
                  }}
                >
                  <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-[10px] text-gray-400 font-medium">总存储空间</span>
                    <span className="text-lg font-bold text-gray-800 my-0.5 tracking-tight">
                      512 GB
                    </span>
                    <span className="text-[10px] bg-gray-50 px-1.5 py-0.5 rounded-full text-gray-400 font-normal scale-90 origin-center">
                      已使用 256 GB
                    </span>
                  </div>
                </div>
              </div>

              {/* 媒体分类占比图例 */}
              <div className="col-span-5 grid grid-cols-1 gap-2.5 pl-4">
                {storageDetails.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-gray-600 font-normal">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-gray-700 font-medium">{item.size}</span>
                      <span className="text-gray-400 w-10">{item.percent}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 右侧：存储使用率条形面板 */}
              <div className="col-span-4 border-l border-gray-100 pl-6 space-y-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">存储使用率</div>
                  <div className="flex items-baseline gap-0.5 mb-2">
                    <span className="text-3xl font-bold text-gray-800 tracking-tight">50</span>
                    <span className="text-base font-bold text-gray-800">%</span>
                  </div>
                  <Progress
                    percent={50}
                    showInfo={false}
                    strokeColor="#3b82f6"
                    trailColor="#f3f4f6"
                    strokeWidth={8}
                    className="m-0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <div className="text-[11px] text-gray-400">可用空间</div>
                    <div className="text-sm font-bold text-gray-700 mt-0.5">256 GB</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-400 flex items-center gap-0.5">
                      剩余可用天数 <span className="text-gray-300 scale-90 cursor-help">?</span>
                    </div>
                    <div className="text-sm font-bold text-gray-700 mt-0.5">预计 180 天</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 存储配置卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">存储配置</h3>
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-3">存储模式</label>
                <Radio.Group defaultValue="local" className="flex gap-4">
                  <Radio value="local" className="text-xs text-gray-700">
                    本地存储
                  </Radio>
                  <Radio value="cloud" className="text-xs text-gray-700">
                    对象存储
                  </Radio>
                </Radio.Group>
                <p className="text-[11px] text-gray-400 mt-3.5">本地存储将文件保存在服务器磁盘中</p>
              </div>

              <div className="col-span-5 grid grid-cols-2 gap-4 border-l border-gray-50 pl-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    单文件大小限制
                  </label>
                  <Select
                    defaultValue="100"
                    className="w-full h-10 rounded-lg"
                    options={[
                      { value: "100", label: "100 MB" },
                      { value: "500", label: "500 MB" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    批量上传数量限制
                  </label>
                  <Select
                    defaultValue="50"
                    className="w-full h-10 rounded-lg"
                    options={[
                      { value: "50", label: "50 个" },
                      { value: "100", label: "100 个" },
                    ]}
                  />
                </div>
              </div>

              <div className="col-span-4 border-l border-gray-50 pl-6">
                <label className="block text-xs font-medium text-gray-500 mb-2">存储路径</label>
                <div className="flex gap-2">
                  <Input
                    defaultValue="/data/workpro/storage"
                    className="h-10 rounded-lg bg-gray-50 border-gray-200"
                  />
                  <Button className="h-10 text-xs border-gray-200 hover:text-blue-600 hover:border-blue-600 rounded-lg px-3">
                    更改路径
                  </Button>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">文件将存储在该项目目录下说明</p>
              </div>
            </div>
          </div>

          {/* 3. 存储策略卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">存储策略</h3>
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* 左侧策略配置组 */}
              <div className="col-span-8 space-y-5 border-r border-gray-100 pr-6">
                {/* 自动清理 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center text-sm mt-0.5">
                      <ClockCircleOutlined />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 mb-0.5">
                        自动清理临时文件
                      </div>
                      <div className="text-xs text-gray-400">
                        开启后，系统会自动清理超过设定时间的临时文件
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">保留时间</span>
                      <Select
                        defaultValue="7"
                        size="small"
                        className="w-20"
                        options={[{ value: "7", label: "7 天" }]}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[60px] justify-end">
                      <Switch defaultChecked size="small" />
                      <span className="text-xs text-blue-500 font-medium">启用</span>
                    </div>
                  </div>
                </div>

                {/* 版本文件保留 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center text-sm mt-0.5">
                      <RotateLeftOutlined />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 mb-0.5">版本文件保留</div>
                      <div className="text-xs text-gray-400">
                        开启后，系统会保留历史覆盖文件的历史版本
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">保留版本数</span>
                      <Select
                        defaultValue="10"
                        size="small"
                        className="w-20"
                        options={[{ value: "10", label: "10 个" }]}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[60px] justify-end">
                      <Switch defaultChecked size="small" />
                      <span className="text-xs text-blue-500 font-medium">启用</span>
                    </div>
                  </div>
                </div>

                {/* 回收站 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center text-sm mt-0.5">
                      <DeleteOutlined />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 mb-0.5">回收站</div>
                      <div className="text-xs text-gray-400">
                        删除的文件将转移至回收站，在设定时间后自动清理
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">保留时间</span>
                      <Select
                        defaultValue="30"
                        size="small"
                        className="w-20"
                        options={[{ value: "30", label: "30 天" }]}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[60px] justify-end">
                      <Switch defaultChecked size="small" />
                      <span className="text-xs text-blue-500 font-medium">启用</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧存储统计面板 */}
              <div className="col-span-4 pl-2 space-y-3">
                <div className="text-xs font-medium text-gray-400 flex items-center gap-1">
                  <PieChartOutlined /> 存储统计
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-0.5">
                    <span className="text-gray-400">今日上传</span>
                    <span className="text-gray-700 font-medium">2.34 GB</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-gray-400">本周上传</span>
                    <span className="text-gray-700 font-medium">12.45 GB</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-gray-400">本月上传</span>
                    <span className="text-gray-700 font-medium">48.67 GB</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-gray-400">本月下载</span>
                    <span className="text-gray-700 font-medium">18.32 GB</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="w-full text-xs text-blue-600 border-blue-100 hover:border-blue-600 hover:text-blue-600 bg-blue-50/30 h-8.5 rounded-lg font-medium">
                    查看详细统计
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. 存储位置管理卡片 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 overflow-hidden">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
              <div>
                <h3 className="text-base font-bold text-gray-800">存储位置管理</h3>
                <p className="text-xs text-gray-400 mt-0.5">管理存储位置和配额</p>
              </div>
              <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
                className="bg-blue-600 hover:bg-blue-700 h-8.5 rounded-lg text-xs font-medium flex items-center px-3 shadow-sm shadow-blue-100"
              >
                添加存储位置
              </Button>
            </div>

            <div className="p-2">
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                className="custom-storage-table"
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

      {/* 补充：用于细微调整 Antd Table 视觉一致性的内联样式 */}
      <style>{`
        .custom-storage-table .ant-table { background: transparent; }
        .custom-storage-table .ant-table-thead > tr > th { 
          background: transparent !important; 
          font-size: 12px; 
          color: #9ca3af !important; 
          font-weight: 500;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .custom-storage-table .ant-table-tbody > tr > td { 
          border-bottom: 1px solid #f9fafb !important;
          padding: 14px 16px !important;
        }
        .custom-storage-table .ant-table-tbody > tr:hover > td {
          background: #fcfdfe !important;
        }
      `}</style>
    </div>
  );
}
