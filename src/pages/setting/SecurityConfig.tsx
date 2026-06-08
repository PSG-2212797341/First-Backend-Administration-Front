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
  CheckCircleFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { Input, Select, Radio, Switch, Button, Breadcrumb, Checkbox } from "antd";

export default function SecurityConfig() {
  const [activeTab, setActiveTab] = useState("security");

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
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "安全设置" }]}
      />

      {/* 页面标题横幅 */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <SafetyCertificateOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">安全设置</h1>
            <p className="text-sm text-gray-400">管理密码策略、登录安全、访问控制等安全相关设置</p>
          </div>
        </div>
        {/* 右侧背景装饰图标 */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <SafetyCertificateOutlined className="text-8xl text-blue-600" />
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
          {/* 1. 密码策略卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-gray-800">密码策略</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">启用密码策略</span>
                <Switch defaultChecked size="small" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">最小长度</label>
                <Select
                  defaultValue="8"
                  className="w-full h-10 rounded-lg"
                  options={[
                    { value: "8", label: "8 位" },
                    { value: "10", label: "10 位" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">必须包含</label>
                <div className="flex flex-col gap-2 mt-1">
                  <Checkbox defaultChecked className="text-xs text-gray-600 custom-checkbox-icon">
                    大小写字母
                  </Checkbox>
                  <Checkbox defaultChecked className="text-xs text-gray-600">
                    数字
                  </Checkbox>
                  <Checkbox defaultChecked className="text-xs text-gray-600">
                    特殊字符
                  </Checkbox>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">密码有效期</label>
                <Select
                  defaultValue="90"
                  className="w-full h-10 rounded-lg"
                  options={[
                    { value: "90", label: "90 天" },
                    { value: "180", label: "180 天" },
                  ]}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">密码历史</label>
                <Select
                  defaultValue="5"
                  className="w-full h-10 rounded-lg"
                  options={[{ value: "5", label: "禁止最近 5 次使用" }]}
                />
              </div>
            </div>
          </div>

          {/* 2. 登录安全卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">登录安全</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {/* 登录失败锁定 */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 mb-0.5">登录失败锁定</div>
                    <div className="text-xs text-gray-400">连续输错密码达到限制后锁定账户</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked size="small" />
                    <span className="text-xs text-blue-500 font-medium">启用</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      最大失败次数
                    </label>
                    <Input defaultValue="5" suffix="次" className="h-10 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">锁定时长</label>
                    <Select
                      defaultValue="30"
                      className="w-full h-10 rounded-lg"
                      options={[{ value: "30", label: "30 分钟" }]}
                    />
                  </div>
                </div>
              </div>

              {/* 二次验证 (2FA) */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 mb-0.5">二次验证 (2FA)</div>
                    <div className="text-xs text-gray-400">用户登录时需要进行二次身份验证</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked size="small" />
                    <span className="text-xs text-blue-500 font-medium">启用</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-3">验证方式</label>
                  <div className="flex gap-4">
                    <Checkbox defaultChecked className="text-xs text-gray-600">
                      短信验证码
                    </Checkbox>
                    <Checkbox defaultChecked className="text-xs text-gray-600">
                      邮箱验证码
                    </Checkbox>
                    <Checkbox defaultChecked className="text-xs text-gray-600">
                      身份验证器 App
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 会话管理卡片 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
            <h3 className="text-base font-bold text-gray-800 mb-6">会话管理</h3>
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* 左侧配置单栏 */}
              <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-5 border-r border-gray-100 pr-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-800">会话超时时间</div>
                  <Select
                    defaultValue="30"
                    className="w-full h-10 rounded-lg"
                    options={[{ value: "30", label: "30 分钟" }]}
                  />
                  <div className="text-xs text-gray-400">超时时间内无操作将自动退出登录</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-800">记住我功能</div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked size="small" />
                      <span className="text-xs text-blue-500 font-medium">启用</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      记住我时长
                    </label>
                    <Select
                      defaultValue="7"
                      className="w-full h-10 rounded-lg"
                      options={[{ value: "7", label: "7 天" }]}
                    />
                  </div>
                </div>

                <div className="col-span-2 flex justify-between items-center pt-2 border-t border-gray-50">
                  <div>
                    <div className="text-sm font-medium text-gray-800 mb-0.5">单设备登录</div>
                    <div className="text-xs text-gray-400">
                      同一账号在多个设备登录时，强制下线旧设备
                    </div>
                  </div>
                  <Switch size="small" />
                </div>
              </div>

              {/* 右侧：当前在线会话小仪表盘 */}
              <div className="col-span-4 pl-2">
                <div className="text-xs font-medium text-gray-400 mb-1">当前在线会话</div>
                <div className="flex items-baseline gap-1.5 my-2">
                  <span className="text-3xl font-bold text-gray-800 tracking-tight">18</span>
                  <span className="text-xs text-gray-400">个会话</span>
                </div>
                <div className="text-xs text-gray-400 mb-4 leading-relaxed">
                  当前系统中所有用户的在线会话数量
                </div>
                <Button className="w-full text-xs text-blue-600 border-blue-100 hover:border-blue-600 hover:text-blue-600 bg-blue-50/30 h-9 rounded-lg flex items-center justify-center gap-1.5 font-medium">
                  <TeamOutlined className="text-sm" /> 查看会话
                </Button>
              </div>
            </div>
          </div>

          {/* 4. IP 访问控制 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50 flex justify-between items-center">
            <div className="flex gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-medium text-gray-800">IP 访问限制</span>
                  <div className="flex items-center gap-1.5">
                    <Switch defaultChecked size="small" />
                    <span className="text-xs text-blue-500 font-medium">启用</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">仅允许指定 IP 地址访问系统</div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">访问模式</label>
                <Radio.Group defaultValue="white" className="flex gap-6">
                  <Radio value="white" className="text-xs text-gray-700">
                    白名单 <span className="text-gray-400 font-normal">（允许列表）</span>
                  </Radio>
                  <Radio value="black" className="text-xs text-gray-700">
                    黑名单 <span className="text-gray-400 font-normal">（拒绝列表）</span>
                  </Radio>
                </Radio.Group>
              </div>
            </div>

            <Button className="text-xs text-blue-600 border-blue-200 hover:border-blue-600 rounded-lg h-9 px-4">
              配置 IP 列表
            </Button>
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
