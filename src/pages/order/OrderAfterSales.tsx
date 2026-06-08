import React, { useState } from "react";
import {
  Input,
  Button,
  Table,
  Select,
  DatePicker,
  Pagination,
  ConfigProvider,
  Tabs,
  Avatar,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  CustomerServiceOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
  InboxOutlined,
  SettingOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function OrderAfterSales() {
  const [activeTab, setActiveTab] = useState("1");

  // 1. 顶部七大核心指标大盘数据
  const statCards = [
    {
      title: "全部申请",
      value: "1,254",
      trend: "up",
      ratio: "9.4%",
      icon: "📋",
      bg: "bg-blue-50/50",
    },
    {
      title: "待受理",
      value: "156",
      trend: "down",
      ratio: "4.2%",
      icon: "⏳",
      bg: "bg-amber-50/50",
    },
    {
      title: "处理中",
      value: "482",
      trend: "up",
      ratio: "11.7%",
      icon: "⚙️",
      bg: "bg-indigo-50/50",
    },
    {
      title: "待用户寄回",
      value: "218",
      trend: "up",
      ratio: "6.9%",
      icon: "📦",
      bg: "bg-emerald-50/50",
    },
    {
      title: "待商家处理",
      value: "276",
      trend: "up",
      ratio: "3.6%",
      icon: "🏪",
      bg: "bg-orange-50/50",
    },
    {
      title: "已完成",
      value: "892",
      trend: "up",
      ratio: "8.3%",
      icon: "✅",
      bg: "bg-purple-50/50",
    },
    { title: "已关闭", value: "94", trend: "down", ratio: "2.1%", icon: "❌", bg: "bg-red-50/50" },
  ];

  // 右侧看板：售后类型分布真实数据
  const typeDistribution = [
    { type: "退货退款", count: 842, percent: 67.1, color: "bg-blue-500" },
    { type: "换货", count: 342, percent: 27.3, color: "bg-blue-500" },
    { type: "仅退款", count: 48, percent: 3.8, color: "bg-blue-500" },
    { type: "维修", count: 22, percent: 1.8, color: "bg-blue-500" },
  ];

  // 右侧看板：状态颜色映射
  const sidebarStatus = [
    { name: "待受理", count: 156, percent: "12.4%", color: "bg-amber-400" },
    { name: "处理中", count: 482, percent: "38.4%", color: "bg-emerald-400" },
    { name: "待用户寄回", count: 218, percent: "17.4%", color: "bg-blue-400" },
    { name: "待商家处理", count: 276, percent: "22.0%", color: "bg-indigo-400" },
    { name: "已完成", count: 892, percent: "71.1%", color: "bg-purple-400" },
    { name: "已关闭", count: 94, percent: "7.5%", color: "bg-red-400" },
  ];

  // 2. 复合高密度表格列定义
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">售后单号</span>,
      dataIndex: "afterSale",
      key: "afterSale",
      width: 160,
      render: item => (
        <div className="flex flex-col gap-0.5 leading-tight py-0.5 select-none font-mono">
          <span className="text-xs text-gray-800 font-medium">{item.no}</span>
          <span className="text-[10px] text-gray-400">来源: {item.channel}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">订单信息</span>,
      dataIndex: "order",
      key: "order",
      width: 160,
      render: item => (
        <div className="flex flex-col gap-0.5 leading-tight select-none font-mono">
          <span className="text-xs text-gray-600">订单号: {item.no}</span>
          <span className="text-xs font-semibold text-gray-800">¥ {item.price.toFixed(2)}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">商品信息</span>,
      dataIndex: "product",
      key: "product",
      width: 160,
      render: prod => (
        <div className="flex items-center gap-2 min-w-0 select-none">
          <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-base shrink-0">
            {prod.thumb}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-xs text-gray-700 truncate font-medium">{prod.name}</div>
            <div className="text-[10px] text-gray-400 mt-0.5 font-mono">
              ¥ {prod.price.toFixed(2)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">售后类型</span>,
      dataIndex: "type",
      key: "type",
      width: 100,
      render: text => (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
            text === "退货退款" ? "text-red-500 bg-red-50" : "text-blue-600 bg-blue-50"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">申请原因</span>,
      dataIndex: "reason",
      key: "reason",
      width: 120,
      render: text => <span className="text-gray-700 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">申请人</span>,
      dataIndex: "applicant",
      key: "applicant",
      width: 120,
      render: user => (
        <div className="flex items-center gap-1.5 select-none">
          <Avatar src={user.avatar} size={20} className="shrink-0 border border-gray-100" />
          <div className="flex flex-col leading-none">
            <span className="text-xs font-semibold text-gray-700">{user.name}</span>
            <span className="text-[10px] text-gray-400 font-mono mt-1">{user.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">申请时间</span>,
      dataIndex: "time",
      key: "time",
      width: 140,
      render: text => (
        <span className="text-gray-400 font-mono text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">当前状态</span>,
      dataIndex: "status",
      key: "status",
      width: 110,
      render: status => {
        let style = "text-blue-600 bg-blue-50";
        if (status === "待受理") style = "text-amber-500 bg-amber-50";
        if (status === "处理中") style = "text-emerald-600 bg-emerald-50";
        if (status === "待用户寄回") style = "text-blue-500 bg-blue-50";
        if (status === "待商家处理") style = "text-indigo-600 bg-indigo-50";
        if (status === "已完成") style = "text-purple-600 bg-purple-50";
        if (status === "已关闭") style = "text-gray-400 bg-gray-50";

        return (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${style}`}>{status}</span>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      dataIndex: "status",
      key: "action",
      width: 100,
      render: status => {
        let actionBtn = "处理";
        if (status === "待用户寄回") actionBtn = "提醒";
        if (status === "已完成" || status === "已关闭") actionBtn = "查看";

        return (
          <div className="flex items-center gap-3 text-xs font-medium select-none whitespace-nowrap">
            <span className="text-blue-500 hover:text-blue-600 cursor-pointer">详情</span>
            <span className="text-blue-500 hover:text-blue-600 cursor-pointer">{actionBtn}</span>
          </div>
        );
      },
    },
  ];

  // 3. 高度还原设计图表格的真实售后数据集
  const data = [
    {
      key: "1",
      afterSale: { no: "AF202405200001", channel: "APP" },
      order: { no: "202405200001", price: 699.0 },
      product: { name: "智能手表 S2", thumb: "⌚", price: 699.0 },
      type: "退货退款",
      reason: "商品质量问题",
      applicant: {
        name: "李明",
        phone: "138****1234",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liming",
      },
      time: "2024-05-20 10:30:45",
      status: "待受理",
    },
    {
      key: "2",
      afterSale: { no: "AF202405200002", channel: "小程序" },
      order: { no: "202405200002", price: 358.0 },
      product: { name: "运动蓝牙耳机", thumb: "🎧", price: 358.0 },
      type: "换货",
      reason: "商品规格不符",
      applicant: {
        name: "王小胖",
        phone: "156****5678",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoping",
      },
      time: "2024-05-20 10:15:22",
      status: "处理中",
    },
    {
      key: "3",
      afterSale: { no: "AF202405200003", channel: "官网" },
      order: { no: "202405200003", price: 899.0 },
      product: { name: "无线降噪耳机 Pro", thumb: "🎛️", price: 899.0 },
      type: "退货退款",
      reason: "不喜欢/7天无理由",
      applicant: {
        name: "张晓晓",
        phone: "188****9012",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang",
      },
      time: "2024-05-20 09:58:11",
      status: "待用户寄回",
    },
    {
      key: "4",
      afterSale: { no: "AF202405190004", channel: "APP" },
      order: { no: "202405190004", price: 129.0 },
      product: { name: "便携充电宝 10000mAh", thumb: "🔋", price: 129.0 },
      type: "退货退款",
      reason: "商品质量问题",
      applicant: {
        name: "刘洋",
        phone: "199****2468",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang",
      },
      time: "2024-05-19 18:22:33",
      status: "待商家处理",
    },
    {
      key: "5",
      afterSale: { no: "AF202405190005", channel: "小程序" },
      order: { no: "202405190005", price: 499.0 },
      product: { name: "机械键盘 K87", thumb: "⌨️", price: 499.0 },
      type: "换货",
      reason: "功能/按键异常",
      applicant: {
        name: "陈宇",
        phone: "177****1357",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chenyu",
      },
      time: "2024-05-19 16:45:09",
      status: "处理中",
    },
    {
      key: "6",
      afterSale: { no: "AF202405180006", channel: "京东旗舰店" },
      order: { no: "202405180006", price: 299.0 },
      product: { name: "智能音箱 Mini", thumb: "🔊", price: 299.0 },
      type: "退货退款",
      reason: "商品破损",
      applicant: {
        name: "赵六六",
        phone: "155****6789",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu",
      },
      time: "2024-05-18 14:32:18",
      status: "已完成",
    },
    {
      key: "7",
      afterSale: { no: "AF202405180007", channel: "天猫店铺" },
      order: { no: "202405180007", price: 89.0 },
      product: { name: "无线鼠标 M3", thumb: "🖱️", price: 89.0 },
      type: "换货",
      reason: "其他原因",
      applicant: {
        name: "钱多多",
        phone: "186****8642",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=qianduo",
      },
      time: "2024-05-18 10:21:44",
      status: "已完成",
    },
    {
      key: "8",
      afterSale: { no: "AF202405170008", channel: "拼多多" },
      order: { no: "202405170008", price: 39.9 },
      product: { name: "手机支架折叠款", thumb: "📱", price: 39.9 },
      type: "退货退款",
      reason: "不喜欢/7天无理由",
      applicant: {
        name: "孙悟空",
        phone: "159****3579",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sunwukong",
      },
      time: "2024-05-17 09:11:05",
      status: "已关闭",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 4,
          colorBgContainer: "#ffffff",
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#555555",
            headerBorderRadius: 0,
            headerSplitColor: "transparent",
            cellPaddingInline: 12,
            cellPaddingBlock: 12,
            rowHoverBg: "#f9fbfd",
          },
          Tabs: {
            titleFontSize: 13,
            horizontalMargin: "0 0 16px 0",
          },
        },
      }}
    >
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans antialiased text-gray-800">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none tracking-wide">
          首页 / 订单管理 / <span className="text-gray-900 font-medium">售后管理</span>
        </div>

        {/* 标题说明区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <CustomerServiceOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">售后管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              处理用户的售后申请，跟踪处理进度，提升客户满意度
            </p>
          </div>
        </div>

        {/* 顶部七大核心统计指标大盘 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded border border-gray-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-gray-400 block mb-0.5 font-medium truncate">
                  {card.title}
                </span>
                <span className="text-lg font-bold text-gray-900 block tracking-tight font-mono">
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
                className={`w-8 h-8 ${card.bg} rounded flex items-center justify-center text-sm shrink-0`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 主工作区 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧售后明细数据舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 高阶多重条件筛查栏 */}
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索售后单号、订单号、商品名称、用户..."
                  className="h-8 text-xs w-60"
                />
                <Select
                  defaultValue="allStatus"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allStatus", label: "全部状态" }]}
                />
                <Select
                  defaultValue="allType"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allType", label: "全部类型" }]}
                />
                <Select
                  defaultValue="allChannels"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allChannels", label: "全部渠道" }]}
                />
                <RangePicker
                  placeholder={["开始日期", "结束日期"]}
                  className="h-8 text-xs font-sans border-gray-200"
                  style={{ height: 32, width: 210 }}
                />

                <Button
                  icon={<ReloadOutlined />}
                  className="h-8 text-xs text-gray-500 bg-gray-50 px-3 ml-auto"
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<ExportOutlined />}
                  className="h-8 text-xs bg-blue-600 font-medium"
                >
                  导出
                </Button>
              </div>

              {/* 二级状态横向 Tab 页签 */}
              <div className="border-b border-gray-100 mb-4 select-none">
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  className="border-none mb-0 custom-sales-tabs"
                  items={[
                    { key: "1", label: "全部 (1,254)" },
                    { key: "2", label: "待受理 (156)" },
                    { key: "3", label: "处理中 (482)" },
                    { key: "4", label: "待用户寄回 (218)" },
                    { key: "5", label: "待商家处理 (276)" },
                    { key: "6", label: "已完成 (892)" },
                    { key: "7", label: "已关闭 (94)" },
                  ]}
                />
              </div>

              {/* 核心售后明细数据表格 */}
              <div className="overflow-hidden rounded border border-gray-100/80">
                <Table
                  rowSelection={{ type: "checkbox" }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="w-full ant-table-custom"
                  scroll={{ x: "max-content" }}
                />
              </div>

              {/* 分页组件对齐 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-slate-400 font-medium">共 1,254 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={1254}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    size="small"
                    showSizeChanger
                  />
                  <span className="text-xs text-slate-400 ml-1">
                    跳至{" "}
                    <input
                      type="text"
                      defaultValue="1"
                      className="w-8 h-6 border border-slate-200 rounded text-center mx-1 text-slate-700 font-medium text-xs outline-none focus:border-blue-500"
                    />{" "}
                    页
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧售后多维统计与挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：售后数据概览环状图 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-800 m-0">售后数据概览</h3>
                <span className="text-blue-500 text-xs hover:underline cursor-pointer">
                  更多 ＞
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-1">
                <div className="relative w-20 h-20 rounded-full border-[10px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-amber-400 border-r-indigo-400 border-b-purple-400 border-l-red-400 -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">申请率</span>
                    <span className="text-xs font-extrabold text-gray-900 block font-mono">
                      4.8%
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-[11px] space-y-1.5 font-sans">
                  {sidebarStatus.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-gray-500">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                        {item.name}
                      </span>
                      <span className="text-gray-700 font-mono font-medium shrink-0">
                        {item.count}{" "}
                        <span className="text-gray-400 font-normal">({item.percent})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 售后趋势折线图模拟组件 */}
              <div className="border-t border-gray-100 mt-4 pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-400">售后趋势 (近 7 天)</span>
                  <span className="text-[10px] text-gray-400 font-mono">05-20: 362单</span>
                </div>
                <div className="text-base font-bold text-gray-900 font-mono tracking-tight block">
                  申请量 362 单
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                  <span>较上周</span>
                  <span className="text-emerald-500 font-semibold">↑ 15.6%</span>
                </div>
                {/* 极简折线模拟 */}
                <div className="h-10 flex items-end justify-between gap-1 mt-2 px-1">
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[30%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[50%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[40%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[65%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[55%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[80%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-50 rounded-t-sm h-[90%]" />
                </div>
              </div>
            </div>

            {/* 看板二：售后类型比例分布（垂直柱状条） */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">售后类型分布</h3>
              <div className="space-y-2.5">
                {typeDistribution.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between text-gray-600 mb-1 text-[11px]">
                      <span className="font-medium">{item.type}</span>
                      <span className="text-gray-400 font-mono">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 看板三：底部快速方格入口 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <PieChartOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">受理售后单</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <MedicineBoxOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量处理</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <ExportOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">导出数据</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <SettingOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">售后设置</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 高度紧凑防抖样式 */}
      <style>{`
        .ant-table-custom .ant-table-thead > tr > th {
          font-size: 12px !important;
          border-bottom: 1px solid #efeef2 !important;
          white-space: nowrap !important;
        }
        .ant-table-custom .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f8f8fa !important;
        }
        .ant-select-selector {
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
        }
        .custom-sales-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .custom-sales-tabs .ant-tabs-tab {
          padding: 6px 2px !important;
          margin-right: 16px !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
