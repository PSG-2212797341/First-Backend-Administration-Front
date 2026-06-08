import React, { useState } from "react";
import { Input, Button, Table, Switch, Pagination, ConfigProvider, Dropdown, Space } from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DownOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  BlockOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

export default function ProductSort() {
  // 顶部 5 个核心指标数据
  const statCards = [
    {
      title: "全部分类",
      value: "36",
      trend: "up",
      ratio: "6.7%",
      icon: "📁",
      bg: "bg-blue-50/50",
      text: "text-blue-500",
    },
    {
      title: "一级分类",
      value: "8",
      trend: "up",
      ratio: "0%",
      icon: "🟢",
      bg: "bg-emerald-50/50",
      text: "text-emerald-500",
    },
    {
      title: "二级分类",
      value: "16",
      trend: "up",
      ratio: "14.3%",
      icon: "🟠",
      bg: "bg-orange-50/50",
      text: "text-orange-500",
    },
    {
      title: "三级分类",
      value: "12",
      trend: "up",
      ratio: "9.1%",
      icon: "🟣",
      bg: "bg-purple-50/50",
      text: "text-purple-500",
    },
    {
      title: "未分类产品",
      value: "24",
      trend: "down",
      ratio: "3.3%",
      icon: "📄",
      bg: "bg-slate-50",
      text: "text-slate-500",
    },
  ];

  // 树形表格列配置 (严格遵循不换行规则)
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs pl-2">分类名称</span>,
      dataIndex: "name",
      key: "name",
      width: 260,
      render: (text, record) => (
        <div className="flex items-center gap-2 py-0.5 select-none whitespace-nowrap">
          {record.children ? (
            <FolderOpenOutlined className="text-blue-400 text-sm" />
          ) : (
            <FolderOutlined className="text-purple-400 text-sm" />
          )}
          <span className="font-semibold text-gray-800 text-[13px]">{text}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs">分类层级</span>,
      dataIndex: "level",
      key: "level",
      width: 120,
      render: level => {
        let cls = "text-blue-500 bg-blue-50/60 border-blue-100";
        if (level === "二级分类") cls = "text-orange-500 bg-orange-50/60 border-orange-100";
        if (level === "三级分类") cls = "text-purple-500 bg-purple-50/60 border-purple-100";
        return (
          <span
            className={`text-[10px] px-2 py-0.5 rounded border font-medium whitespace-nowrap ${cls}`}
          >
            {level}
          </span>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs">所属分类</span>,
      dataIndex: "parent",
      key: "parent",
      width: 140,
      render: text => (
        <span className="text-gray-500 text-xs whitespace-nowrap">{text || "-"}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs">产品数量</span>,
      dataIndex: "productCount",
      key: "productCount",
      width: 100,
      render: text => (
        <span className="text-gray-700 font-semibold text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs">排序</span>,
      dataIndex: "sort",
      key: "sort",
      width: 80,
      render: text => <span className="text-gray-600 text-xs whitespace-nowrap">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 90,
      render: status => (
        <div className="whitespace-nowrap">
          <Switch defaultChecked={status} size="small" className="bg-gray-200" />
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs">操作</span>,
      key: "action",
      width: 120,
      render: () => (
        <div className="flex items-center gap-4 text-xs select-none whitespace-nowrap">
          <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors">
            编辑
          </span>
          <span className="text-red-500 hover:text-red-600 font-medium cursor-pointer transition-colors">
            删除
          </span>
        </div>
      ),
    },
  ];

  // 模拟树形结构嵌套数据 (完美契合图纸中的展示效果)
  const data = [
    {
      key: "1",
      name: "数码配件",
      level: "一级分类",
      parent: "",
      productCount: 356,
      sort: 1,
      status: true,
    },
    {
      key: "2",
      name: "智能设备",
      level: "一级分类",
      parent: "",
      productCount: 198,
      sort: 2,
      status: true,
    },
    {
      key: "3",
      name: "电脑外设",
      level: "一级分类",
      parent: "",
      productCount: 287,
      sort: 3,
      status: true,
    },
    {
      key: "4",
      name: "家居生活",
      level: "一级分类",
      parent: "",
      productCount: 215,
      sort: 4,
      status: true,
    },
    {
      key: "5",
      name: "服饰鞋包",
      level: "一级分类",
      parent: "",
      productCount: 142,
      sort: 5,
      status: true,
    },
    {
      key: "6",
      name: "美妆个护",
      level: "一级分类",
      parent: "",
      productCount: 96,
      sort: 6,
      status: true,
    },
    {
      key: "7",
      name: "运动户外",
      level: "一级分类",
      parent: "",
      productCount: 88,
      sort: 7,
      status: true,
    },
    {
      key: "8",
      name: "食品饮料",
      level: "一级分类",
      parent: "",
      productCount: 72,
      sort: 8,
      status: true,
    },
    {
      key: "9",
      name: "手机配件",
      level: "二级分类",
      parent: "数码配件",
      productCount: 86,
      sort: 1,
      status: true,
      children: [
        {
          key: "9-1",
          name: "手机壳",
          level: "三级分类",
          parent: "手机配件",
          productCount: 42,
          sort: 1,
          status: true,
        },
        {
          key: "9-2",
          name: "手机膜",
          level: "三级分类",
          parent: "手机配件",
          productCount: 18,
          sort: 2,
          status: true,
        },
        {
          key: "9-3",
          name: "数据线",
          level: "三级分类",
          parent: "手机配件",
          productCount: 26,
          sort: 3,
          status: true,
        },
      ],
    },
  ];

  // 批量操作下拉菜单配置
  const bulkItems = [
    { key: "1", label: "批量导出" },
    { key: "2", label: "批量隐藏" },
    { key: "3", label: "批量删除", danger: true },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 4, // 核心修剪：圆角统一限制在极干脆的 4px
          colorBgContainer: "#ffffff",
          controlInteractiveSize: 14,
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#555555",
            headerBorderRadius: 0,
            headerSplitColor: "transparent",
            cellPaddingInline: 16,
            cellPaddingBlock: 12,
            rowHoverBg: "#f9fbfd",
          },
        },
      }}
    >
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans antialiased text-gray-800">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none tracking-wide">
          首页 / 产品管理 / <span className="text-gray-900 font-medium">产品分类</span>
        </div>

        {/* 页面主标题区域 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <AppstoreOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">产品分类</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理产品分类，支持添加、编辑、删除分类及调整分类层级
            </p>
          </div>
        </div>

        {/* 顶部指标度量衡 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded border border-gray-100/80 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-gray-400 block mb-1 font-medium">{card.title}</span>
                <span className="text-xl font-bold text-gray-900 block tracking-tight">
                  {card.value}
                </span>
                <div className="flex items-center gap-1 mt-1 text-[10px]">
                  <span className="text-gray-400">较昨日</span>
                  <span
                    className={
                      card.trend === "up"
                        ? "text-emerald-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {card.trend === "up" ? "↑" : "↓"} {card.ratio}
                  </span>
                </div>
              </div>
              <div
                className={`w-9 h-9 ${card.bg} rounded flex items-center justify-center text-base`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 主体左右分栏布局 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧主要内容面板：全面融合一体化白底 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 操作工具栏 */}
              <div className="flex justify-between items-center mb-4 gap-3 select-none">
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="bg-blue-600 h-8 text-xs font-medium"
                  >
                    新建分类
                  </Button>
                  <Dropdown menu={{ items: bulkItems }} trigger={["click"]}>
                    <Button className="h-8 text-xs text-gray-600 bg-gray-50/50">
                      <Space>
                        批量操作 <DownOutlined className="text-[9px]" />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="搜索分类名称"
                    className="w-48 sm:w-56 h-8 text-xs bg-white"
                  />
                  <Button
                    icon={<ReloadOutlined className="text-xs" />}
                    className="w-8 h-8 flex items-center justify-center p-0 text-gray-400"
                  />
                </div>
              </div>

              {/* 树形数据表格主体 */}
              <div className="overflow-hidden rounded border border-gray-100/80">
                <Table
                  rowSelection={{ type: "checkbox" }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="w-full ant-table-custom"
                  scroll={{ x: "max-content" }}
                  expandable={{
                    expandIcon: ({ expanded, onExpand, record }) =>
                      record.children ? (
                        <span
                          onClick={e => onExpand(record, e)}
                          className="cursor-pointer mr-2 text-gray-400 select-none"
                        >
                          {expanded ? "▼" : "▶"}
                        </span>
                      ) : (
                        <span className="inline-block w-4 mr-2" />
                      ),
                  }}
                />
              </div>

              {/* 底部紧凑底座 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-gray-400 font-medium">共 36 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={36}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    size="small"
                    showSizeChanger
                  />
                  <span className="text-xs text-gray-400 ml-1">
                    跳至{" "}
                    <input
                      type="text"
                      defaultValue="1"
                      className="w-7 h-6 border border-gray-200 rounded text-center mx-1 text-gray-700 font-medium text-xs outline-none focus:border-blue-500"
                    />{" "}
                    页
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧深度信息挂件看板 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：分类结构环形比例 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-4">分类结构</h3>
              <div className="flex items-center justify-between gap-4 py-1">
                {/* 环形图外观模拟 */}
                <div className="relative w-20 h-20 rounded-full border-[10px] border-cyan-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-blue-500 border-r-indigo-500 border-b-transparent border-l-transparent -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">核心分级</span>
                    <span className="text-xs font-extrabold text-blue-600 block">比例</span>
                  </div>
                </div>
                {/* 对应指示器 */}
                <div className="flex-1 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="truncate">一级分类</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">8 (22.2%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                      <span className="truncate">二级分类</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">16 (44.4%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                      <span className="truncate">三级分类</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">12 (33.3%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 看板二：操作记录紧凑流 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-gray-800 m-0">操作记录</h3>
                <span className="text-blue-500 text-[11px] font-medium cursor-pointer hover:underline">
                  查看更多 &gt;
                </span>
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex gap-2.5 items-start text-xs">
                  <div className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center text-blue-500 shrink-0 mt-0.5">
                    <HistoryOutlined className="scale-90" />
                  </div>
                  <div className="min-w-0 leading-snug">
                    <div className="font-semibold text-gray-700 truncate">新增分类 “美妆个护”</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">张三 2024-05-20 10:30</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start text-xs">
                  <div className="w-6 h-6 bg-amber-50 rounded flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                    <EditOutlined className="scale-90" />
                  </div>
                  <div className="min-w-0 leading-snug">
                    <div className="font-semibold text-gray-700 truncate">编辑分类 “手机壳”</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">李四 2024-05-20 09:15</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start text-xs">
                  <div className="w-6 h-6 bg-red-50 rounded flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                    <DeleteOutlined className="scale-90" />
                  </div>
                  <div className="min-w-0 leading-snug">
                    <div className="font-semibold text-gray-700 truncate">删除分类 “旧分类”</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">王五 2024-05-19 16:45</div>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start text-xs">
                  <div className="w-6 h-6 bg-purple-50 rounded flex items-center justify-center text-purple-500 shrink-0 mt-0.5">
                    <BlockOutlined className="scale-90" />
                  </div>
                  <div className="min-w-0 leading-snug">
                    <div className="font-semibold text-gray-700 truncate">调整分类排序</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">赵六 2024-05-19 14:22</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 看板三：快捷操作微型格 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <PlusOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">
                    添加一级分类
                  </span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <CloudUploadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">
                    批量导入分类
                  </span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <CloudDownloadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">
                    导出分类数据
                  </span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <BlockOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">分类排序</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 注入全局 CSS 阻断换行与调整缩进间距 */}
      <style>{`
        .ant-table-custom .ant-table-thead > tr > th {
          font-size: 12px !important;
          border-bottom: 1px solid #efeef2 !important;
          white-space: nowrap !important;
        }
        .ant-table-custom .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f8f8fa !important;
          white-space: nowrap !important;
        }
        /* 去除 Antd 树形默认多余的前缀框线，还原干净利落的UI感 */
        .ant-table-row-indent {
          padding-left: 12px !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
