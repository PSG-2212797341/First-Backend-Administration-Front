import React, { useState } from "react";
import {
  FileTextOutlined,
  HomeOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Breadcrumb, Table, Select, Input, DatePicker, Pagination, Tag } from "antd";

const { RangePicker } = DatePicker;

export default function LogConfig() {
  // 顶部总览卡片
  const overviewCards = [
    {
      title: "今日日志",
      count: "18,392",
      change: "较昨日 ↑ 12.5%",
      color: "bg-blue-50 text-blue-600",
      icon: <FileTextOutlined />,
    },
    {
      title: "错误日志",
      count: "342",
      change: "较昨日 ↓ 8.2%",
      color: "bg-red-50 text-red-600",
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "访问日志",
      count: "12,593",
      change: "较昨日 ↑ 15.3%",
      color: "bg-blue-50 text-blue-600",
      icon: <FileTextOutlined />,
    },
    {
      title: "操作日志",
      count: "5,457",
      change: "较昨日 ↑ 6.7%",
      color: "bg-green-50 text-green-600",
      icon: <CheckCircleOutlined />,
    },
    {
      title: "系统日志",
      count: "2,186",
      change: "较昨日 ↓ 3.4%",
      color: "bg-blue-50 text-blue-600",
      icon: <InfoCircleOutlined />,
    },
  ];

  // 日志列表表格列定义
  const columns = [
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      width: "18%",
      render: (text: string) => <span className="text-xs text-gray-500 font-mono">{text}</span>,
    },
    {
      title: "日志类型",
      dataIndex: "type",
      key: "type",
      width: "12%",
      render: (text: string) => <span className="text-xs text-gray-700">{text}</span>,
    },
    {
      title: "日志级别",
      dataIndex: "level",
      key: "level",
      width: "10%",
      render: (level: string) => {
        let dotColor = "bg-green-500";
        let textColor = "text-green-600";
        if (level === "错误") {
          dotColor = "bg-red-500";
          textColor = "text-red-600";
        }
        if (level === "警告") {
          dotColor = "bg-orange-500";
          textColor = "text-orange-600";
        }
        return (
          <span className={`flex items-center gap-1.5 text-xs font-medium ${textColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            {level}
          </span>
        );
      },
    },
    {
      title: "模块",
      dataIndex: "module",
      key: "module",
      width: "12%",
      render: (text: string) => <span className="text-xs text-gray-600 font-medium">{text}</span>,
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      width: "28%",
      render: (text: string) => (
        <span className="text-xs text-gray-500 truncate block max-w-xs" title={text}>
          {text}
        </span>
      ),
    },
    {
      title: "操作人",
      dataIndex: "operator",
      key: "operator",
      width: "10%",
      render: (text: string) => <span className="text-xs text-gray-700">{text}</span>,
    },
    {
      title: "IP地址",
      dataIndex: "ip",
      key: "ip",
      width: "12%",
      render: (text: string) => <span className="text-xs text-gray-400 font-mono">{text}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: () => (
        <a className="text-blue-600 hover:text-blue-700 font-medium text-xs">查看详情</a>
      ),
    },
  ];

  const tableData = [
    {
      key: "1",
      time: "2024-05-20 14:32:21",
      type: "操作日志",
      level: "信息",
      module: "用户管理",
      content: "管理员 张三 修改用户信息 (ID:1001)",
      operator: "张三",
      ip: "192.168.1.100",
    },
    {
      key: "2",
      time: "2024-05-20 14:28:15",
      type: "访问日志",
      level: "信息",
      module: "内容管理",
      content: "访问页面 /content/article/123",
      operator: "李四",
      ip: "192.168.1.101",
    },
    {
      key: "3",
      time: "2024-05-20 14:25:09",
      type: "错误日志",
      level: "错误",
      module: "订单管理",
      content: "订单创建失败：库存不足 (OrderID:20240520001)",
      operator: "系统",
      ip: "192.168.1.102",
    },
    {
      key: "4",
      time: "2024-05-20 14:20:33",
      type: "系统日志",
      level: "警告",
      module: "系统配置",
      content: "配置项缓存刷新失败",
      operator: "系统",
      ip: "192.168.1.100",
    },
    {
      key: "5",
      time: "2024-05-20 14:18:47",
      type: "操作日志",
      level: "信息",
      module: "产品管理",
      content: "管理员 王五 删除产品 (ID:2003)",
      operator: "王五",
      ip: "192.168.1.103",
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] w-full mx-auto bg-[#f4f7fc] min-h-screen space-y-6">
      {/* 面包屑 */}
      <Breadcrumb
        className="text-xs text-gray-400"
        items={[{ title: <HomeOutlined /> }, { title: "系统设置" }, { title: "日志管理" }]}
      />

      {/* 头部条 Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex justify-between items-center relative overflow-hidden shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4 z-10">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl">
            <FileTextOutlined />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">日志管理</h1>
            <p className="text-sm text-gray-400">查看和管理系统日志，支持日志查询、分析与导出</p>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <FileTextOutlined className="text-8xl text-blue-600" />
        </div>
      </div>

      {/* 总览指标卡片网格 */}
      <div className="grid grid-cols-5 gap-4">
        {overviewCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm shadow-gray-100/50 flex items-center gap-3.5"
          >
            <div
              className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-base`}
            >
              {card.icon}
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">{card.title}</div>
              <div className="text-base font-bold text-gray-800 tracking-tight">
                {card.count} <span className="text-[10px] text-gray-400 font-normal">条</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{card.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 日志查询主体大面板 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 p-5 space-y-4">
        {/* 条件筛选搜索控制栏 */}
        <div className="flex justify-between items-center bg-gray-50/30 p-3 rounded-xl border border-gray-50/50 gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <RangePicker showTime className="h-9 rounded-lg border-gray-200 text-xs w-64" />
            <Select
              defaultValue="all_type"
              className="h-9 w-32"
              options={[{ value: "all_type", label: "日志类型" }]}
            />
            <Select
              defaultValue="all_level"
              className="h-9 w-32"
              options={[{ value: "all_level", label: "日志级别" }]}
            />
            <Input
              placeholder="请输入关键词"
              className="h-9 rounded-lg border-gray-200 text-xs max-w-xs flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button size="small" className="h-9 text-xs border-gray-200 rounded-lg text-gray-500">
              重置
            </Button>
            <Button
              type="primary"
              size="small"
              className="h-9 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg px-4 shadow-sm shadow-blue-50"
            >
              查询
            </Button>
          </div>
        </div>

        {/* 顶部批量动作条 */}
        <div className="flex justify-end gap-2 text-xs">
          <Button
            size="small"
            icon={<DownloadOutlined />}
            className="text-gray-500 border-gray-200 h-8 rounded-lg"
          >
            导出日志
          </Button>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            className="text-gray-500 border-gray-200 h-8 rounded-lg"
          >
            清理日志
          </Button>
        </div>

        {/* 数据表 */}
        <div className="pt-1">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            size="middle"
            className="custom-log-table"
          />
          {/* 完整分页栏 */}
          <div className="p-4 flex justify-between items-center text-xs text-gray-400 border-t border-gray-50 mt-4">
            <div>共 18,392 条</div>
            <Pagination
              size="small"
              total={18392}
              defaultCurrent={1}
              pageSize={10}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>

      <style>{`
        .custom-log-table .ant-table { background: transparent; }
        .custom-log-table .ant-table-thead > tr > th { 
          background: transparent !important; font-size: 12px; color: #9ca3af !important; font-weight: 500; border-bottom: 1px solid #f3f4f6 !important;
        }
        .custom-log-table .ant-table-tbody > tr > td { border-bottom: 1px solid #f9fafb !important; padding: 13px 16px !important; }
        .custom-log-table .ant-table-tbody > tr:hover > td { background: #fcfdfe !important; }
      `}</style>
    </div>
  );
}
