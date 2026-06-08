import React from "react";
import { Input, Button, Table, Select, Pagination, ConfigProvider, Tag } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  TagsOutlined,
  DownOutlined,
} from "@ant-design/icons";

export default function ContentTag() {
  const statCards = [
    { title: "标签总数", value: "186", icon: "🏷️", bg: "bg-blue-50/50" },
    { title: "使用中的标签", value: "162", icon: "⚡", bg: "bg-emerald-50/50" },
    { title: "未使用标签", value: "24", icon: "📭", bg: "bg-amber-50/50" },
    { title: "内容关联量", value: "5,892", icon: "🔗", bg: "bg-purple-50/50" },
  ];

  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">标签名称</span>,
      dataIndex: "name",
      key: "name",
      width: 140,
      render: (text, record) => (
        <span className="text-xs font-bold text-gray-800 select-none flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${record.color}`} />
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">标签别名</span>,
      dataIndex: "alias",
      key: "alias",
      width: 160,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">所属分类</span>,
      dataIndex: "group",
      key: "group",
      width: 110,
      render: text => <span className="text-gray-600 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">关联内容</span>,
      dataIndex: "count",
      key: "count",
      width: 100,
      render: val => <span className="text-xs font-bold font-mono text-gray-700">{val}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 90,
      render: status => (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
            status === "启用" ? "text-emerald-600 bg-emerald-50" : "text-gray-400 bg-gray-50"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">创建时间</span>,
      dataIndex: "time",
      key: "time",
      width: 140,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 130,
      render: () => (
        <div className="flex items-center gap-2.5 text-xs font-medium text-blue-500 select-none">
          <span className="hover:text-blue-600 cursor-pointer">编辑</span>
          <span className="text-red-400 hover:text-red-500 cursor-pointer">停用</span>
          <span className="text-gray-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
            更多 <DownOutlined className="text-[9px]" />
          </span>
        </div>
      ),
    },
  ];

  // 第三张图真实列表源
  const data = [
    {
      key: "1",
      name: "产品公告",
      alias: "product-announcement",
      group: "产品相关",
      count: 256,
      status: "启用",
      time: "2024-05-10 10:30",
      color: "bg-emerald-500",
    },
    {
      key: "2",
      name: "功能更新",
      alias: "feature-update",
      group: "产品相关",
      count: 189,
      status: "启用",
      time: "2024-05-09 15:20",
      color: "bg-amber-500",
    },
    {
      key: "3",
      name: "使用教程",
      alias: "user-guide",
      group: "帮助文档",
      count: 342,
      status: "启用",
      time: "2024-05-08 09:15",
      color: "bg-orange-500",
    },
    {
      key: "4",
      name: "常见问题",
      alias: "faq",
      group: "帮助文档",
      count: 278,
      status: "启用",
      time: "2024-05-07 16:45",
      color: "bg-teal-500",
    },
    {
      key: "5",
      name: "行业动态",
      alias: "industry-news",
      group: "行业资讯",
      count: 156,
      status: "启用",
      time: "2024-05-06 14:10",
      color: "bg-blue-500",
    },
    {
      key: "6",
      name: "客户案例",
      alias: "case-study",
      group: "客户服务",
      count: 198,
      status: "启用",
      time: "2024-05-05 11:25",
      color: "bg-indigo-500",
    },
    {
      key: "7",
      name: "系统通知",
      alias: "system-notice",
      group: "系统相关",
      count: 98,
      status: "启用",
      time: "2024-05-04 10:00",
      color: "bg-pink-500",
    },
    {
      key: "8",
      name: "活动资讯",
      alias: "event-news",
      group: "市场活动",
      count: 124,
      status: "停用",
      time: "2024-05-03 09:30",
      color: "bg-purple-500",
    },
    {
      key: "9",
      name: "合作伙伴",
      alias: "partner",
      group: "合作伙伴",
      count: 76,
      status: "启用",
      time: "2024-05-02 14:50",
      color: "bg-cyan-500",
    },
    {
      key: "10",
      name: "技术分享",
      alias: "tech-share",
      group: "技术文章",
      count: 210,
      status: "启用",
      time: "2024-05-01 13:35",
      color: "bg-sky-500",
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff", borderRadius: 4 } }}>
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans text-gray-800 antialiased">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none">
          首页 / 内容管理 / <span className="text-gray-900 font-medium">标签管理</span>
        </div>

        {/* 头部区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/40">
            <TagsOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">标签管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理内容标签，支持标签分类、合并与使用统计
            </p>
          </div>
        </div>

        {/* 大盘指标 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5 select-none">
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
              </div>
              <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-sm shrink-0">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 侧挂舱结构 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧表格数据 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索标签名称..."
                  className="h-8 text-xs w-48"
                />
                <Select
                  defaultValue="all"
                  className="h-8 text-xs w-24"
                  options={[{ value: "all", label: "全部状态" }]}
                />
                <Select
                  defaultValue="allGroup"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allGroup", label: "全部分类" }]}
                />

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="h-8 text-xs bg-blue-600 font-medium ml-auto"
                >
                  新建标签
                </Button>
                <Select
                  defaultValue="batch"
                  size="small"
                  className="w-24 text-xs h-8"
                  options={[{ value: "batch", label: "批量操作" }]}
                />
              </div>

              <div className="overflow-hidden rounded border border-gray-100">
                <Table
                  rowSelection={{ type: "checkbox" }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                />
              </div>

              <div className="mt-4 pt-1 flex justify-between items-center select-none">
                <span className="text-xs text-gray-400">共 186 条</span>
                <Pagination total={186} defaultCurrent={1} defaultPageSize={10} size="small" />
              </div>
            </div>
          </div>

          {/* 右侧看板 */}
          <div className="w-full xl:w-68 shrink-0 flex flex-col gap-5 select-none">
            {/* 热门标签排行榜 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">热门标签</h3>
              <div className="space-y-3 font-sans text-xs">
                {[
                  { rank: 1, label: "产品公告", count: 256, bg: "bg-orange-50 text-orange-500" },
                  { rank: 2, label: "使用教程", count: 342, bg: "bg-blue-50 text-blue-500" },
                  { rank: 3, label: "常见问题", count: 278, bg: "bg-emerald-50 text-emerald-500" },
                  { rank: 4, label: "功能更新", count: 189, bg: "bg-gray-50 text-gray-400" },
                  { rank: 5, label: "客户案例", count: 198, bg: "bg-gray-50 text-gray-400" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${item.bg}`}
                      >
                        {item.rank}
                      </span>
                      <span className="text-gray-600 font-medium truncate">{item.label}</span>
                    </div>
                    <span className="text-gray-900 font-mono font-bold">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 多彩聚合标签云 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">标签云</h3>
              <div className="flex flex-wrap gap-1.5">
                <Tag color="blue" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  产品公告
                </Tag>
                <Tag color="purple" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  使用教程
                </Tag>
                <Tag color="cyan" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  常见问题
                </Tag>
                <Tag color="green" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  功能更新
                </Tag>
                <Tag color="orange" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  客户案例
                </Tag>
                <Tag color="magenta" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  行业动态
                </Tag>
                <Tag color="volcano" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  系统通知
                </Tag>
                <Tag color="gold" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  活动资讯
                </Tag>
                <Tag color="geekblue" className="text-[10px] px-1.5 py-0.5 border-none m-0">
                  合作伙伴
                </Tag>
                <Button
                  size="small"
                  className="text-[9px] h-5 px-1.5 bg-gray-50 border-none text-gray-400"
                >
                  更多
                </Button>
              </div>
            </div>

            {/* 自动化低频清理器 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="space-y-2 text-[10px] text-gray-500">
                <div className="flex items-center gap-1.5 p-1.5 hover:bg-gray-50 rounded cursor-pointer text-gray-700">
                  <span>📝</span> 新建标签
                </div>
                <div className="flex items-center gap-1.5 p-1.5 hover:bg-gray-50 rounded cursor-pointer text-gray-700">
                  <span>📁</span> 标签分类管理
                </div>
                <div className="flex items-center gap-1.5 p-1.5 hover:bg-gray-50 rounded cursor-pointer text-gray-700">
                  <span>🔀</span> 合并标签
                </div>
                <div className="flex items-center gap-1.5 p-1.5 hover:bg-red-50 rounded cursor-pointer text-red-500 font-medium">
                  <span>🗑️</span> 清理未使用标签
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
