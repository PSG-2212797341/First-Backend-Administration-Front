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
} from "@ant-design/icons";
import { Input, Select, Radio, Switch, Button, Breadcrumb } from "antd";

export default function BaseConfig() {
  const [activeTab, setActiveTab] = useState("basic");

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

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen">
      {/* 面包屑导航 */}
      <Breadcrumb
        className="text-xs text-gray-400 mb-4"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }]}
      />

      {/* 页面标题横幅 */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <SettingOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">系统设置</h1>
            <p className="text-sm text-gray-400">配置系统参数，管理全局设置和个性化选项</p>
          </div>
        </div>
        {/* 右侧背景装饰图标 */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <SettingOutlined className="text-8xl text-blue-600" />
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
          {/* 1. 基础信息卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-800">基础信息</h3>
              <Button
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 shadow-sm h-9 px-5 rounded-lg"
              >
                保存设置
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-x-6 gap-y-5">
              <div className="col-span-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">系统名称</label>
                    <Input
                      defaultValue="WorkPro 管理系统"
                      className="h-10 rounded-lg border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">系统时区</label>
                    <Select
                      defaultValue="shanghai"
                      className="w-full h-10 rounded-lg border-gray-200"
                      options={[
                        { value: "shanghai", label: "(UTC+08:00) 北京，上海，香港特别行政区" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">系统语言</label>
                    <Select
                      defaultValue="zh"
                      className="w-full h-10 rounded-lg border-gray-200"
                      options={[{ value: "zh", label: "简体中文" }]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">日期格式</label>
                    <Select
                      defaultValue="ymd"
                      className="w-full h-10 rounded-lg border-gray-200"
                      options={[{ value: "ymd", label: "YYYY-MM-DD" }]}
                    />
                  </div>
                </div>
              </div>

              {/* Logo 区域 */}
              <div className="col-span-4">
                <label className="block text-xs font-medium text-gray-500 mb-2">系统 Logo</label>
                <div className="border border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center bg-gray-50/30 h-[116px]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      W
                    </div>
                    <span className="text-base font-bold text-gray-800 tracking-wide">WorkPro</span>
                  </div>
                  <Button
                    size="small"
                    className="w-full text-xs text-gray-500 border-gray-200 hover:text-blue-600 hover:border-blue-600 h-8 rounded-lg bg-white"
                  >
                    更换 Logo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 界面设置卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">界面设置</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-3">主题模式</label>
                <Radio.Group defaultValue="light" className="flex gap-4">
                  <Radio value="light" className="text-sm text-gray-700">
                    浅色模式
                  </Radio>
                  <Radio value="dark" className="text-sm text-gray-700">
                    深色模式
                  </Radio>
                </Radio.Group>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-3">导航模式</label>
                <Radio.Group defaultValue="side" className="flex gap-4">
                  <Radio value="side" className="text-sm text-gray-700">
                    侧边栏模式
                  </Radio>
                  <Radio value="top" className="text-sm text-gray-700">
                    顶部导航模式
                  </Radio>
                </Radio.Group>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">每页显示条数</label>
                <Select
                  defaultValue="10"
                  className="w-full h-10 rounded-lg border-gray-200"
                  options={[
                    { value: "10", label: "10 条" },
                    { value: "20", label: "20 条" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* 3. 系统参数卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">系统参数</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-0.5">注册功能</div>
                  <div className="text-xs text-gray-400">开启后，允许新用户注册</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked size="small" />
                  <span className="text-xs text-blue-500 font-medium">启用</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-0.5">数据导出</div>
                  <div className="text-xs text-gray-400">开启后，允许导出系统数据</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked size="small" />
                  <span className="text-xs text-blue-500 font-medium">启用</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-0.5">游客访问</div>
                  <div className="text-xs text-gray-400">开启后，允许游客访问系统部分内容</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked size="small" />
                  <span className="text-xs text-blue-500 font-medium">启用</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium text-gray-800 mb-0.5">维护模式</div>
                  <div className="text-xs text-gray-400">开启后，系统将进入维护状态</div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch size="small" />
                  <span className="text-xs text-gray-400 font-medium">禁用</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. 系统信息卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">系统信息</h3>
            <div className="grid grid-cols-5 gap-4">
              <div className="border-r border-gray-100 last:border-0 pr-4">
                <div className="text-xs text-gray-400 mb-1.5">当前版本</div>
                <div className="text-sm font-medium text-gray-700">v2.3.1</div>
              </div>
              <div className="border-r border-gray-100 last:border-0 pr-4">
                <div className="text-xs text-gray-400 mb-1.5">最后更新</div>
                <div className="text-sm font-medium text-gray-700">2024-06-10 14:30:00</div>
              </div>
              <div className="border-r border-gray-100 last:border-0 pr-4">
                <div className="text-xs text-gray-400 mb-1.5">服务器时间</div>
                <div className="text-sm font-medium text-gray-700">2024-06-18 10:30:00</div>
              </div>
              <div className="border-r border-gray-100 last:border-0 pr-4">
                <div className="text-xs text-gray-400 mb-1.5">运行环境</div>
                <div
                  className="text-sm font-medium text-gray-700 truncate"
                  title="Linux / Nginx / MySQL"
                >
                  Linux / Nginx / MySQL
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1.5">PHP 版本</div>
                <div className="text-sm font-medium text-gray-700">8.2.12</div>
              </div>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="text-center text-xs text-gray-400 pt-2 pb-4">
            © 2024 WorkPro. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
