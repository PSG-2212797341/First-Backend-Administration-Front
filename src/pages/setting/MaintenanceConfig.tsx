import React from "react";
import {
  ToolOutlined,
  HomeOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  ClearOutlined,
  SyncOutlined,
  DownloadOutlined,
  UploadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Breadcrumb, Switch, Dropdown, Progress } from "antd";

export default function MaintenanceConfig() {
  // 核心维护任务列表数据
  const maintenanceTasks = [
    {
      title: "数据库备份",
      status: "已启用",
      desc: "下次执行：2024-05-21 02:00:00",
      icon: <DatabaseOutlined className="text-blue-500" />,
      bg: "bg-blue-50/60",
    },
    {
      title: "日志清理",
      status: "已启用",
      desc: "下次执行：2024-05-21 03:00:00",
      icon: <FileTextOutlined className="text-green-500" />,
      bg: "bg-green-50/60",
    },
    {
      title: "缓存清理",
      status: "已启用",
      desc: "下次执行：每天 04:00:00",
      icon: <ClearOutlined className="text-teal-500" />,
      bg: "bg-teal-50/60",
    },
    {
      title: "数据归档",
      status: "已禁用",
      desc: "下次执行：每周日 01:00:00",
      icon: <DatabaseOutlined className="text-gray-400" />,
      bg: "bg-gray-50",
    },
  ];

  // 系统维护工具面板数据
  const toolCards = [
    {
      title: "清理缓存",
      desc: "立即清理系统高级缓存",
      icon: <ClearOutlined className="text-blue-500" />,
    },
    {
      title: "修复数据",
      desc: "检测并修复数据表异常",
      icon: <ToolOutlined className="text-purple-500" />,
    },
    {
      title: "重建索引",
      desc: "重构数据库表高级索引",
      icon: <SyncOutlined className="text-orange-500" />,
    },
    {
      title: "优化数据库",
      desc: "优化数据库性能配置",
      icon: <DatabaseOutlined className="text-cyan-500" />,
    },
    {
      title: "导出配置",
      desc: "导出系统完整核心配置信息",
      icon: <DownloadOutlined className="text-emerald-500" />,
    },
    {
      title: "导入配置",
      desc: "导入高级系统配置信息",
      icon: <UploadOutlined className="text-indigo-500" />,
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen space-y-6">
      {/* 面包屑 */}
      <Breadcrumb
        className="text-xs text-gray-400"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "维护设置" }]}
      />

      {/* 头部大横幅 Banner */}
      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <ToolOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">维护设置</h1>
            <p className="text-sm text-gray-400">
              系统维护与更新配置，管理备份、缓存、任务及系统健康状态
            </p>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <ToolOutlined className="text-8xl text-blue-600" />
        </div>
      </div>

      {/* 中间三栏网格卡片面板组 */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* 1. 系统健康圆形度量盘 */}
        <div className="col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50 h-[332px] flex flex-col justify-between">
          <h3 className="text-sm font-bold text-gray-800">系统健康</h3>

          <div className="flex items-center justify-between gap-2 my-auto">
            {/* 环形大统计仪 */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              <Progress
                type="dashboard"
                percent={98}
                width={136}
                strokeWidth={8}
                strokeColor="#10b981"
                trailColor="#f3f4f6"
                gapDegree={60}
                showInfo={false}
              />
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-gray-800 tracking-tighter">98</span>
                <span className="text-[10px] text-white bg-green-500 font-medium px-2 py-0.5 rounded-full scale-90 mt-1">
                  系统状态 良好
                </span>
              </div>
            </div>

            {/* 右侧核心具体指标数值 */}
            <div className="flex-1 pl-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">● CPU使用率</span>
                <span className="text-gray-700 font-mono font-medium">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">● 内存使用率</span>
                <span className="text-gray-700 font-mono font-medium">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">● 磁盘使用率</span>
                <span className="text-gray-700 font-mono font-medium">52%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">● 数据库状态</span>
                <span className="text-green-600 font-medium">正常</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">● 服务状态</span>
                <span className="text-blue-600 font-medium">运行中</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-gray-50 pt-3 text-[11px] text-gray-400">
            <span>上次检查时间：2024-05-20 14:35:21</span>
            <a className="text-blue-500 hover:text-blue-600 font-medium">立即检查 &gt;</a>
          </div>
        </div>

        {/* 2. 维护任务垂直列表组 */}
        <div className="col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50 h-[332px]">
          <h3 className="text-sm font-bold text-gray-800 mb-4">维护任务</h3>
          <div className="space-y-3">
            {maintenanceTasks.map((task, index) => {
              const isEnabled = task.status === "已启用";
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-100 rounded-xl p-3 bg-gray-50/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 ${task.bg} rounded-lg flex items-center justify-center text-base`}
                    >
                      {task.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800 mb-0.5">{task.title}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{task.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-medium ${isEnabled ? "text-green-500" : "text-gray-400"}`}
                    >
                      {task.status}
                    </span>
                    <Dropdown
                      menu={{ items: [{ key: "1", label: "立即执行" }] }}
                      trigger={["click"]}
                    >
                      <Button
                        type="text"
                        size="small"
                        icon={<MoreOutlined className="text-gray-400" />}
                      />
                    </Dropdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. 系统维护矩阵工具面板格网 */}
        <div className="col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50 h-[332px]">
          <h3 className="text-sm font-bold text-gray-800 mb-4">系统维护工具</h3>
          <div className="grid grid-cols-2 gap-3">
            {toolCards.map((tool, idx) => (
              <div
                key={idx}
                className="border border-gray-50 hover:border-blue-100 rounded-xl p-3 bg-gray-50/30 flex items-start gap-2.5 cursor-pointer hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 bg-white shadow-sm rounded-lg flex items-center justify-center text-sm border border-gray-100 group-hover:scale-105 transition-transform">
                  {tool.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 mb-0.5 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </div>
                  <div className="text-[10px] text-gray-400 leading-normal line-clamp-1">
                    {tool.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. 底层统一样式系统设置控制组 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm shadow-gray-100/50">
        <h3 className="text-sm font-bold text-gray-800 mb-6">系统设置</h3>
        <div className="grid grid-cols-4 gap-6">
          {/* 开关 1 */}
          <div className="flex items-center justify-between py-1 border-r border-gray-100 pr-6 last:border-0">
            <div>
              <div className="text-xs font-bold text-gray-800 mb-0.5">维护模式</div>
              <div className="text-[11px] text-gray-400">开启后，系统将处于维护状态</div>
            </div>
            <Switch size="small" />
          </div>
          {/* 开关 2 */}
          <div className="flex items-center justify-between py-1 border-r border-gray-100 pr-6 last:border-0 pl-2">
            <div>
              <div className="text-xs font-bold text-gray-800 mb-0.5">自动更新</div>
              <div className="text-[11px] text-gray-400">系统将在空闲时自动更新</div>
            </div>
            <Switch defaultChecked size="small" />
          </div>
          {/* 开关 3 */}
          <div className="flex items-center justify-between py-1 border-r border-gray-100 pr-6 last:border-0 pl-2">
            <div>
              <div className="text-xs font-bold text-gray-800 mb-0.5">错误报告</div>
              <div className="text-[11px] text-gray-400">自动收集并上报系统错误</div>
            </div>
            <Switch defaultChecked size="small" />
          </div>
          {/* 开关 4 */}
          <div className="flex items-center justify-between py-1 pl-2">
            <div>
              <div className="text-xs font-bold text-gray-800 mb-0.5">性能监控</div>
              <div className="text-[11px] text-gray-400">开启系统性能监控</div>
            </div>
            <Switch defaultChecked size="small" />
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="text-center text-xs text-gray-400 pt-2 pb-4">
        © 2024 WorkPro. All rights reserved.
      </div>
    </div>
  );
}
