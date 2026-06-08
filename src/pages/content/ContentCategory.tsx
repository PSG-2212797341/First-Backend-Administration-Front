import React from "react";
import { Input, Button, Table, Select, Pagination, ConfigProvider, Switch, Badge } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  FolderOutlined,
  FileOutlined,
  CopyOutlined,
  DeleteOutlined,
  LayoutOutlined,
  EyeOutlined,
  RightOutlined,
} from "@ant-design/icons";

export default function ContentCategory() {
  const statCards = [
    { title: "栏目总数", value: "24", icon: "📁", bg: "bg-blue-50/50" },
    { title: "启用栏目", value: "20", icon: "🟢", bg: "bg-emerald-50/50" },
    { title: "内容数量", value: "2,186", icon: "📄", bg: "bg-amber-50/50" },
    { title: "访问量", value: "125,892", icon: "👁️", bg: "bg-purple-50/50" },
    { title: "平均阅读量", value: "1,256", icon: "📈", bg: "bg-cyan-50/50" },
  ];

  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">栏目名称</span>,
      dataIndex: "name",
      key: "name",
      width: 240,
      render: (text, record) => (
        <span className="text-xs font-bold text-gray-800 select-none flex items-center gap-1.5">
          {record.isPage ? (
            <FileOutlined className="text-gray-400" />
          ) : (
            <FolderOutlined className="text-blue-500" />
          )}
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">栏目类型</span>,
      dataIndex: "type",
      key: "type",
      width: 100,
      render: text => <span className="text-gray-500 text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">内容数量</span>,
      dataIndex: "count",
      key: "count",
      width: 100,
      render: val => <span className="text-xs font-bold font-mono text-gray-700">{val}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">访问量</span>,
      dataIndex: "views",
      key: "views",
      width: 110,
      render: val => (
        <span className="text-xs font-bold font-mono text-gray-700">{val.toLocaleString()}</span>
      ),
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
      title: <span className="text-gray-500 font-medium text-xs select-none">排序</span>,
      dataIndex: "sort",
      key: "sort",
      width: 80,
      render: val => <span className="text-xs font-mono text-gray-500 font-medium">{val}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 140,
      render: () => (
        <div className="flex items-center gap-2 text-xs font-medium text-blue-500 select-none">
          <span className="hover:text-blue-600 cursor-pointer">编辑</span>
          <span className="hover:text-blue-600 cursor-pointer">复制</span>
          <span className="text-gray-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
            更多 <RightOutlined className="text-[8px] mt-0.5" />
          </span>
        </div>
      ),
    },
  ];

  // 完美对应第四张设计图的嵌套数据
  const treeData = [
    {
      key: "1",
      name: "产品中心",
      type: "频道",
      count: 356,
      views: 25689,
      status: "启用",
      sort: 1,
      isPage: false,
      children: [
        {
          key: "1-1",
          name: "产品介绍",
          type: "单页",
          count: 156,
          views: 12456,
          status: "启用",
          sort: 1,
          isPage: true,
        },
        {
          key: "1-2",
          name: "产品优势",
          type: "单页",
          count: 89,
          views: 8125,
          status: "启用",
          sort: 2,
          isPage: true,
        },
      ],
    },
    {
      key: "2",
      name: "解决方案",
      type: "频道",
      count: 234,
      views: 18632,
      status: "启用",
      sort: 2,
      isPage: false,
      children: [
        {
          key: "2-1",
          name: "行业方案",
          type: "频道",
          count: 124,
          views: 9856,
          status: "启用",
          sort: 1,
          isPage: false,
        },
        {
          key: "2-2",
          name: "客户案例",
          type: "单页",
          count: 110,
          views: 8776,
          status: "启用",
          sort: 2,
          isPage: true,
        },
      ],
    },
    {
      key: "3",
      name: "新闻动态",
      type: "频道",
      count: 428,
      views: 32156,
      status: "启用",
      sort: 3,
      isPage: false,
      children: [
        {
          key: "3-1",
          name: "公司新闻",
          type: "频道",
          count: 256,
          views: 18965,
          status: "启用",
          sort: 1,
          isPage: false,
        },
        {
          key: "3-2",
          name: "行业资讯",
          type: "频道",
          count: 172,
          views: 13191,
          status: "启用",
          sort: 2,
          isPage: false,
        },
      ],
    },
    {
      key: "4",
      name: "关于我们",
      type: "单页",
      count: 89,
      views: 6542,
      status: "启用",
      sort: 4,
      isPage: true,
    },
    {
      key: "5",
      name: "联系我们",
      type: "单页",
      count: 12,
      views: 1274,
      status: "禁用",
      sort: 5,
      isPage: true,
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff", borderRadius: 4 } }}>
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans text-gray-800 antialiased">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none">
          首页 / 内容管理 / <span className="text-gray-900 font-medium">栏目管理</span>
        </div>

        {/* 头部区域 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/40">
            <LayoutOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">栏目管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理网站栏目及层级结构，设置栏目属性和展示规则
            </p>
          </div>
        </div>

        {/* 核心大盘卡片 */}
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
              </div>
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-sm shrink-0">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 核心排版引擎 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧树形表格数据中心 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索栏目名称..."
                  className="h-8 text-xs w-48"
                />
                <Select
                  defaultValue="all"
                  className="h-8 text-xs w-24"
                  options={[{ value: "all", label: "全部状态" }]}
                />
                <Select
                  defaultValue="allType"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allType", label: "全部类型" }]}
                />

                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="h-8 text-xs bg-blue-600 font-medium ml-auto"
                >
                  新建栏目
                </Button>
                <Button className="h-8 text-xs bg-gray-50 text-gray-600">批量操作</Button>
              </div>

              <div className="overflow-hidden rounded border border-gray-100">
                <Table
                  rowSelection={{ type: "checkbox" }}
                  columns={columns}
                  dataSource={treeData}
                  pagination={false}
                  defaultExpandAllRows
                />
              </div>

              <div className="mt-4 pt-1 flex justify-between items-center select-none">
                <span className="text-xs text-gray-400">共 24 条</span>
                <Pagination total={24} defaultCurrent={1} defaultPageSize={10} size="small" />
              </div>
            </div>
          </div>

          {/* 右侧挂载区：树节点微观详情快照 */}
          <div className="w-full xl:w-68 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：微观属性快照 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
                <h3 className="text-xs font-bold text-gray-800 m-0">栏目详情</h3>
                <span className="text-blue-500 text-xs hover:underline cursor-pointer flex items-center gap-0.5">
                  <EditOutlined /> 编辑
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-xs">
                    <FolderOutlined />
                  </span>
                  <span className="font-bold text-gray-900">产品中心</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium text-emerald-600 bg-emerald-50 scale-90">
                    启用
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-2.5 pt-2 border-t border-dashed border-gray-100 font-sans text-gray-500">
                  <div>
                    栏目ID:{" "}
                    <span className="font-mono text-gray-800 font-semibold ml-1">10001</span>
                  </div>
                  <div>
                    栏目类型: <span className="text-gray-800 font-medium ml-1">频道</span>
                  </div>
                  <div>
                    上级栏目: <span className="text-gray-400 ml-1">顶级栏目</span>
                  </div>
                  <div>
                    排序: <span className="font-mono text-gray-800 font-medium ml-1">1</span>
                  </div>
                  <div>
                    内容数量: <span className="font-mono text-gray-800 font-bold ml-1">356</span>
                  </div>
                  <div>
                    访问量: <span className="font-mono text-gray-800 font-bold ml-1">25,689</span>
                  </div>
                </div>
                <div className="pt-2.5 border-t border-dashed border-gray-100 text-gray-500">
                  <div className="mb-1">
                    创建时间:{" "}
                    <span className="font-mono text-gray-700 ml-1">2024-01-15 10:30:00</span>
                  </div>
                  <div>
                    更新时间:{" "}
                    <span className="font-mono text-gray-700 ml-1">2024-05-20 14:30:00</span>
                  </div>
                  <div className="mt-2 leading-relaxed">
                    描述:{" "}
                    <span className="text-gray-600 font-medium bg-gray-50 p-1.5 rounded block mt-1">
                      产品相关信息的展示栏目
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 看板二：高频控制台 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="space-y-2">
                <Button
                  icon={<PlusOutlined />}
                  className="w-full h-8 text-xs text-left bg-gray-50 border-none hover:bg-gray-100 flex items-center justify-start text-gray-700"
                >
                  添加子栏目
                </Button>
                <Button
                  icon={<EyeOutlined />}
                  className="w-full h-8 text-xs text-left bg-gray-50 border-none hover:bg-gray-100 flex items-center justify-start text-gray-700"
                >
                  查看内容
                </Button>
                <Button
                  icon={<CopyOutlined />}
                  className="w-full h-8 text-xs text-left bg-gray-50 border-none hover:bg-gray-100 flex items-center justify-start text-gray-700"
                >
                  栏目复制
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  className="w-full h-8 text-xs text-left bg-red-50 border-none hover:bg-red-100 flex items-center justify-start text-red-500"
                >
                  删除栏目
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
