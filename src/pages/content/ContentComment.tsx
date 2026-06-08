import React from "react";
import { Input, Button, Table, Select, DatePicker, Pagination, ConfigProvider, Avatar } from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MessageOutlined,
  CommentOutlined,
  SettingOutlined,
  SafetyOutlined,
  WarningOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function ContentComment() {
  const statCards = [
    {
      title: "评论总数",
      value: "25,892",
      trend: "up",
      ratio: "12.4%",
      icon: "💬",
      bg: "bg-blue-50/50",
    },
    {
      title: "待审核",
      value: "1,256",
      trend: "down",
      ratio: "5.2%",
      icon: "⏳",
      bg: "bg-amber-50/50",
    },
    {
      title: "已通过",
      value: "23,456",
      trend: "up",
      ratio: "10.1%",
      icon: "✅",
      bg: "bg-emerald-50/50",
    },
    { title: "已拒绝", value: "986", trend: "down", ratio: "3.6%", icon: "❌", bg: "bg-red-50/50" },
    {
      title: "今日新增",
      value: "569",
      trend: "up",
      ratio: "8.7%",
      icon: "📈",
      bg: "bg-cyan-50/50",
    },
  ];

  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评论内容</span>,
      dataIndex: "content",
      key: "content",
      width: 280,
      render: text => (
        <span className="text-xs text-gray-700 font-medium truncate max-w-[260px] block">
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评论者</span>,
      dataIndex: "user",
      key: "user",
      width: 120,
      render: user => (
        <div className="flex items-center gap-2 select-none">
          <Avatar src={user.avatar} size={20} className="shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold text-gray-700 truncate max-w-[80px]">
              {user.name}
            </span>
            <span className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {user.id}</span>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">资源信息</span>,
      dataIndex: "resource",
      key: "resource",
      width: 150,
      render: res => (
        <div className="flex flex-col gap-0.5 select-none leading-tight">
          <span className="text-xs text-gray-600 truncate max-w-[140px]">{res.title}</span>
          <span
            className={`text-[9px] px-1 py-0.1 rounded font-semibold self-start ${res.type === "文章" ? "text-blue-500 bg-blue-50" : "text-emerald-500 bg-emerald-50"}`}
          >
            {res.type}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评论类型</span>,
      dataIndex: "type",
      key: "type",
      width: 90,
      render: text => <span className="text-gray-500 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 90,
      render: status => (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
            status === "已通过"
              ? "text-emerald-600 bg-emerald-50"
              : status === "待审核"
                ? "text-amber-500 bg-amber-50"
                : "text-red-500 bg-red-50"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评论时间</span>,
      dataIndex: "time",
      key: "time",
      width: 140,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 140,
      render: (_, record) => (
        <div className="flex items-center gap-2 text-xs font-medium text-blue-500 select-none">
          {record.status === "待审核" ? (
            <>
              <span className="hover:text-blue-600 cursor-pointer font-bold">审核</span>
              <span className="text-red-400 hover:text-red-500 cursor-pointer">删除</span>
            </>
          ) : (
            <>
              <span className="hover:text-blue-600 cursor-pointer">回复</span>
              <span className="hover:text-blue-600 cursor-pointer">编辑</span>
            </>
          )}
          <span className="text-gray-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
            更多 <DownOutlined className="text-[9px]" />
          </span>
        </div>
      ),
    },
  ];

  // 第二张图真实数据列表
  const data = [
    {
      key: "1",
      content: "这篇文章对我帮助很大，解决了我的问题！👍",
      user: {
        name: "李明",
        id: 10024,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lm",
      },
      resource: { title: "产品功能更新说明", type: "文章" },
      type: "普通评论",
      status: "已通过",
      time: "2024-05-20 10:30:45",
    },
    {
      key: "2",
      content: "请问这个功能支持自定义配置吗？期待回复～",
      user: {
        name: "王小胖",
        id: 10035,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wxp",
      },
      resource: { title: "产品中心页面", type: "页面" },
      type: "咨询",
      status: "待审核",
      time: "2024-05-20 09:15:22",
    },
    {
      key: "3",
      content: "讲解得很详细，学习了！",
      user: {
        name: "张晓晓",
        id: 10011,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zxx",
      },
      resource: { title: "数据分析入门指南", type: "文章" },
      type: "普通评论",
      status: "已通过",
      time: "2024-05-19 18:22:33",
    },
    {
      key: "4",
      content: "广告信息，联系方式：138****1234",
      user: {
        name: "匿名用户",
        id: 0,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ano",
      },
      resource: { title: "如何提升团队协作效率", type: "文章" },
      type: "普通评论",
      status: "已拒绝",
      time: "2024-05-19 17:45:10",
    },
    {
      key: "5",
      content: "什么时候上线移动端呢？",
      user: {
        name: "陈宇",
        id: 10028,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cy",
      },
      resource: { title: "产品路线图 2024 Q2", type: "文章" },
      type: "咨询",
      status: "待审核",
      time: "2024-05-19 16:30:05",
    },
    {
      key: "6",
      content: "非常实用的功能，已经推荐给同事了 👏",
      user: {
        name: "刘洋",
        id: 10017,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ly",
      },
      resource: { title: "系统版本更新公告", type: "公告" },
      type: "普通评论",
      status: "已通过",
      time: "2024-05-19 15:12:18",
    },
    {
      key: "7",
      content: "内容太棒了，收藏了！",
      user: {
        name: "赵六六",
        id: 10045,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zll",
      },
      resource: { title: "客户案例精选", type: "文章" },
      type: "普通评论",
      status: "已通过",
      time: "2024-05-19 14:05:59",
    },
    {
      key: "8",
      content: "重复的内容，已举报",
      user: {
        name: "匿名用户",
        id: 0,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ano2",
      },
      resource: { title: "产品功能更新说明", type: "文章" },
      type: "普通评论",
      status: "已拒绝",
      time: "2024-05-19 13:20:11",
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff", borderRadius: 4 } }}>
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans text-gray-800 antialiased">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none">
          首页 / 内容管理 / <span className="text-gray-900 font-medium">评论管理</span>
        </div>

        {/* 头部区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/40">
            <CommentOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">评论管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理用户评论，支持审核、回复、删除等操作
            </p>
          </div>
        </div>

        {/* 核心指标卡大盘 */}
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
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-sm shrink-0">
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 混合侧排工作台 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧评论流列表 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索评论内容、用户名或资源标题..."
                  className="h-8 text-xs w-56"
                />
                <Select
                  defaultValue="all"
                  className="h-8 text-xs w-24"
                  options={[{ value: "all", label: "全部状态" }]}
                />
                <Select
                  defaultValue="allType"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allType", label: "全部内容类型" }]}
                />
                <Select
                  defaultValue="allSource"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allSource", label: "全部来源" }]}
                />
                <RangePicker
                  placeholder={["开始日期", "结束日期"]}
                  className="h-8 text-xs font-sans border-gray-200"
                  style={{ height: 32, width: 200 }}
                />

                <Button className="h-8 text-xs text-gray-500 bg-gray-50 px-3 ml-auto">重置</Button>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  className="h-8 text-xs bg-blue-600 font-medium"
                >
                  筛选
                </Button>
              </div>

              <div className="overflow-hidden rounded border border-gray-100">
                <Table
                  rowSelection={{ type: "checkbox" }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                />
              </div>

              {/* 底部批量快控层 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="text-xs text-gray-400">已选择 0 项</span>
                  <Button
                    size="small"
                    className="text-[10px] text-emerald-600 bg-emerald-50 border-emerald-200 font-semibold"
                  >
                    批量通过
                  </Button>
                  <Button
                    size="small"
                    className="text-[10px] text-red-500 bg-red-50 border-red-200 font-semibold"
                  >
                    批量拒绝
                  </Button>
                  <Button
                    size="small"
                    className="text-[10px] text-gray-400 bg-gray-50 border-gray-200"
                  >
                    批量删除
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">共 25,892 条</span>
                  <Pagination
                    total={25892}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    size="small"
                    showSizeChanger
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧挂载舱：待审核单体精细快显卡 */}
          <div className="w-full xl:w-68 shrink-0 flex flex-col gap-5 select-none">
            {/* 审核面板 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
                <h3 className="text-xs font-bold text-gray-800 m-0">评论详情</h3>
                <span className="text-gray-400 text-xs hover:text-gray-500 cursor-pointer">
                  关闭
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=wxp" size={24} />
                    <div>
                      <span className="font-bold text-gray-900 block">王小胖</span>
                      <span className="text-[9px] text-gray-400 font-mono">ID: 10035</span>
                    </div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-medium text-amber-500 bg-amber-50">
                    待审核
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-50 space-y-2">
                  <div className="text-gray-500 leading-relaxed">
                    评论内容:{" "}
                    <span className="text-gray-800 font-medium bg-gray-50 p-2 rounded block mt-1">
                      请问这个功能支持自定义配置吗？期待回复～
                    </span>
                  </div>
                  <div className="text-gray-500">
                    资源信息: <span className="text-gray-800 font-medium ml-1">产品中心页面</span>{" "}
                    <span className="text-[9px] px-1 rounded text-emerald-500 bg-emerald-50 font-semibold">
                      页面
                    </span>
                  </div>
                  <div className="text-gray-500">
                    评论类型: <span className="text-gray-800 font-medium ml-1">咨询</span>
                  </div>
                  <div className="text-gray-500">
                    评论时间:{" "}
                    <span className="text-gray-700 font-mono ml-1">2024-05-20 09:15:22</span>
                  </div>
                  <div className="text-gray-500">
                    IP地址: <span className="text-gray-700 font-mono ml-1">101.34.56.78</span>
                  </div>
                  <div className="text-gray-500">
                    来源渠道: <span className="text-gray-800 font-medium ml-1">PC端</span>
                  </div>
                </div>
                {/* 底部控制流矩阵 */}
                <div className="pt-3 border-t border-gray-100 flex gap-1.5">
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    className="flex-1 h-7 text-[10px] bg-emerald-500 border-none font-bold"
                  >
                    通过
                  </Button>
                  <Button
                    danger
                    icon={<CloseCircleOutlined />}
                    className="flex-1 h-7 text-[10px] bg-red-50 border-none font-bold text-red-500"
                  >
                    拒绝
                  </Button>
                  <Button
                    icon={<MessageOutlined />}
                    className="h-7 text-[10px] bg-gray-50 border-none text-gray-600 font-medium"
                  >
                    回复
                  </Button>
                </div>
              </div>
            </div>

            {/* 图表统计面板 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">统计概览</h3>
              <div className="flex items-center gap-4 py-1">
                <div className="relative w-16 h-16 rounded-full border-[8px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[8px] border-t-amber-400 border-b-red-400 -m-[8px]"></div>
                  <span className="text-[10px] font-bold text-gray-900 font-mono">90.6%</span>
                </div>
                <div className="flex-1 text-[11px] space-y-1 text-gray-500 font-sans">
                  <div className="flex justify-between">
                    <span>● 已通过</span>
                    <span className="text-gray-700 font-mono font-medium">23,456 (90.6%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>● 待审核</span>
                    <span className="text-gray-700 font-mono font-medium">1,256 (4.8%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>● 已拒绝</span>
                    <span className="text-gray-700 font-mono font-medium">986 (3.8%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 自动化策略入口 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <SettingOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">评论设置</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <SafetyOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">黑名单管理</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <WarningOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">敏感词过滤</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <CommentOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">回收站</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
