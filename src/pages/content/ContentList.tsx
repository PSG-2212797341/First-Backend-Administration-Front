import React, { useState } from "react";
import {
  Input,
  Button,
  Table,
  Select,
  DatePicker,
  Pagination,
  ConfigProvider,
  Tag,
  Avatar,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  FolderOpenOutlined,
  FileTextOutlined,
  ShareAltOutlined,
  ImportOutlined,
  EllipsisOutlined,
  MessageOutlined,
  EyeOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function ContentList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const statCards = [
    {
      title: "内容总数",
      value: "2,186",
      trend: "up",
      ratio: "8.2%",
      icon: "📊",
      bg: "bg-blue-50/50",
    },
    {
      title: "已发布",
      value: "1,860",
      trend: "up",
      ratio: "6.7%",
      icon: "🚀",
      bg: "bg-emerald-50/50",
    },
    {
      title: "草稿箱",
      value: "218",
      trend: "down",
      ratio: "2.1%",
      icon: "📝",
      bg: "bg-amber-50/50",
    },
    {
      title: "回收站",
      value: "108",
      trend: "down",
      ratio: "1.3%",
      icon: "🗑️",
      bg: "bg-purple-50/50",
    },
    {
      title: "浏览总量",
      value: "125,892",
      trend: "up",
      ratio: "12.5%",
      icon: "👁️",
      bg: "bg-cyan-50/50",
    },
  ];

  const categories = [
    { name: "全部分类", count: "2,186", active: true },
    { name: "产品公告", count: "156" },
    { name: "公司通知", count: "208" },
    { name: "干货分享", count: "320" },
    { name: "产品更新", count: "186" },
    { name: "客户案例", count: "98" },
    { name: "帮助中心", count: "421" },
    { name: "系统通知", count: "312" },
    { name: "产品规划", count: "85" },
  ];

  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">标题</span>,
      dataIndex: "title",
      key: "title",
      width: 320,
      render: (text, record) => (
        <div className="flex items-start gap-2.5 max-w-[300px]">
          <div className="w-10 h-10 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-lg shrink-0 overflow-hidden">
            {record.thumb}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-gray-800 truncate hover:text-blue-500 cursor-pointer">
              {text}
            </span>
            <span className="text-[10px] text-gray-400 truncate mt-0.5">{record.desc}</span>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">栏目</span>,
      dataIndex: "category",
      key: "category",
      width: 110,
      render: text => <span className="text-gray-600 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">类型</span>,
      dataIndex: "type",
      key: "type",
      width: 90,
      render: text => (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
            text === "公告"
              ? "text-blue-600 bg-blue-50"
              : text === "案例"
                ? "text-purple-600 bg-purple-50"
                : "text-gray-500 bg-gray-50"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">作者</span>,
      dataIndex: "author",
      key: "author",
      width: 100,
      render: text => <span className="text-gray-600 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 90,
      render: status => (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
            status === "已发布" ? "text-emerald-600 bg-emerald-50" : "text-orange-500 bg-orange-50"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">浏览量</span>,
      dataIndex: "views",
      key: "views",
      width: 100,
      render: val => (
        <span className="text-xs font-bold font-mono text-gray-700">
          {val === "-" ? "-" : val.toLocaleString()}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">发布时间</span>,
      dataIndex: "time",
      key: "time",
      width: 150,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 130,
      render: () => (
        <div className="flex items-center gap-2.5 text-xs font-medium text-blue-500 select-none">
          <span className="hover:text-blue-600 cursor-pointer">编辑</span>
          <span className="hover:text-blue-600 cursor-pointer">复制</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 hover:text-red-500 cursor-pointer">
            更多 <DownOutlined className="text-[9px]" />
          </span>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      title: "WorkPro v2.6.0 版本发布公告",
      desc: "全新版本带来多项功能升级与性能提升...",
      category: "产品公告",
      type: "文章",
      author: "张三",
      status: "已发布",
      views: 2845,
      time: "2024-05-20 10:30",
      thumb: "📢",
    },
    {
      key: "2",
      title: "如何提升团队协作效率？",
      desc: "分享 5 个实用的团队协作技巧...",
      category: "干货分享",
      type: "文章",
      author: "李四",
      status: "已发布",
      views: 1256,
      time: "2024-05-19 16:20",
      thumb: "👥",
    },
    {
      key: "3",
      title: "五一劳动节放假通知",
      desc: "根据国家法定节假日安排，现将 2024...",
      category: "公司通知",
      type: "公告",
      author: "王五",
      status: "已发布",
      views: 3421,
      time: "2024-05-18 09:00",
      thumb: "📅",
    },
    {
      key: "4",
      title: "新功能：数据分析看板上线",
      desc: "本次更新上线了全新的数据分析看板...",
      category: "产品更新",
      type: "文章",
      author: "张三",
      status: "草稿",
      views: "-",
      time: "2024-05-20 14:30",
      thumb: "💻",
    },
    {
      key: "5",
      title: "客户案例：某企业数字化转型实践",
      desc: "通过 WorkPro 平台，该企业实现了...",
      category: "客户案例",
      type: "案例",
      author: "李四",
      status: "已发布",
      views: 982,
      time: "2024-05-17 11:15",
      thumb: "🏢",
    },
    {
      key: "6",
      title: "系统使用指南 (新手必看)",
      desc: "从零开始，快速掌握系统的基本操作...",
      category: "帮助中心",
      type: "文章",
      author: "赵六",
      status: "已发布",
      views: 1568,
      time: "2024-05-16 14:45",
      thumb: "📖",
    },
    {
      key: "7",
      title: "系统维护通知",
      desc: "为提升系统稳定性，我们将于本周六...",
      category: "系统通知",
      type: "公告",
      author: "系统管理员",
      status: "已发布",
      views: 2103,
      time: "2024-05-15 17:00",
      thumb: "🛠️",
    },
    {
      key: "8",
      title: "产品路线图 2024 Q2",
      desc: "WorkPro 2024 年第二季度的产品规划...",
      category: "产品规划",
      type: "文章",
      author: "张三",
      status: "草稿",
      views: "-",
      time: "2024-05-14 10:20",
      thumb: "🗺️",
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff", borderRadius: 4 } }}>
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans text-gray-800 antialiased">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none">
          首页 / 内容管理 / <span className="text-gray-900 font-medium">内容列表</span>
        </div>

        {/* 头部标题区域 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/40">
            <FileTextOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">内容管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理网站中的各类内容，支持发布、编辑和分类管理
            </p>
          </div>
        </div>

        {/* 五大核心指标卡大盘 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-5 select-none">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded border border-gray-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-gray-400 block mb-0.5 font-medium truncate">
                  {card.title}
                </span>
                <span className="text-xl font-bold text-gray-900 block tracking-tight font-mono">
                  {card.value}
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-[9px]">
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
                className={`w-9 h-9 ${card.bg} rounded flex items-center justify-center text-base shrink-0`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 主工作区 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧主要数据区 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 高级多维筛查工具链 */}
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索内容标题、作者或关键词..."
                  className="h-8 text-xs w-56"
                />
                <Select
                  defaultValue="all"
                  className="h-8 text-xs w-24"
                  options={[{ value: "all", label: "全部栏目" }]}
                />
                <Select
                  defaultValue="allType"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allType", label: "全部类型" }]}
                />
                <Select
                  defaultValue="allStatus"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allStatus", label: "全部状态" }]}
                />
                <RangePicker
                  placeholder={["开始日期", "结束日期"]}
                  className="h-8 text-xs font-sans border-gray-200"
                  style={{ height: 32, width: 200 }}
                />

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="h-8 text-xs bg-blue-600 font-medium ml-auto"
                >
                  新建内容
                </Button>
              </div>

              {/* 核心高密度表格 */}
              <div className="overflow-hidden rounded border border-gray-100">
                <Table
                  rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  scroll={{ x: "max-content" }}
                />
              </div>

              {/* 分页与批量控制 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">共 2,186 条</span>
                  {selectedRowKeys.length > 0 && (
                    <Select
                      defaultValue="batch"
                      size="small"
                      className="w-24 text-xs"
                      options={[
                        { value: "batch", label: "批量操作" },
                        { value: "del", label: "下线删除" },
                      ]}
                    />
                  )}
                </div>
                <Pagination
                  total={2186}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  size="small"
                  showSizeChanger
                />
              </div>
            </div>
          </div>

          {/* 右侧边挂载监控区 */}
          <div className="w-full xl:w-68 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：左侧内容分类树状速查 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3 flex items-center gap-1.5">
                <FolderOpenOutlined className="text-blue-500" /> 内容分类
              </h3>
              <div className="space-y-1 text-xs">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors ${
                      cat.active
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="truncate">📁 {cat.name}</span>
                    <span
                      className={`font-mono text-[10px] ${cat.active ? "text-blue-500" : "text-gray-400"}`}
                    >
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 看板二：快捷高频业务触达 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <EditOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">新建文章</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <ShareAltOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">新建公告</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <CopyOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">新建案例</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <ImportOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量导入</span>
                </div>
              </div>
            </div>

            {/* 看板三：内容状态环形占比 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">内容状态</h3>
              <div className="flex items-center gap-4 py-1">
                <div className="relative w-16 h-16 rounded-full border-[8px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[8px] border-t-amber-400 border-b-purple-400 -m-[8px]"></div>
                  <span className="text-[10px] font-bold text-gray-900 font-mono">85.1%</span>
                </div>
                <div className="flex-1 text-[11px] space-y-1 text-gray-500 font-sans">
                  <div className="flex justify-between">
                    <span>● 已发布</span>
                    <span className="text-gray-700 font-mono font-medium">1,860 (85.1%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>● 草稿箱</span>
                    <span className="text-gray-700 font-mono font-medium">218 (10.0%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>● 回收站</span>
                    <span className="text-gray-700 font-mono font-medium">108 (4.9%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部页脚声明 */}
        <div className="text-center text-[11px] text-gray-400/80 mt-12 select-none tracking-wide">
          © 2024 WorkPro. All rights reserved.
        </div>
      </div>
    </ConfigProvider>
  );
}
