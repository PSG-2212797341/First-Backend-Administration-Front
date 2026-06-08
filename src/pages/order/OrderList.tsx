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
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  DownOutlined,
  FileTextOutlined,
  AccountBookOutlined,
  ShoppingCartOutlined,
  SendOutlined,
  CheckCircleOutlined,
  AlertOutlined,
  PrinterOutlined,
  SettingOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function OrderList() {
  const [activeTab, setActiveTab] = useState("1");

  // 1. 顶部六大核心大盘指标数据
  const statCards = [
    {
      title: "订单总数",
      value: "25,892",
      trend: "up",
      ratio: "12.4%",
      icon: "📄",
      bg: "bg-blue-50/50",
    },
    {
      title: "待付款",
      value: "1,256",
      trend: "down",
      ratio: "5.2%",
      icon: "👛",
      bg: "bg-amber-50/50",
    },
    {
      title: "待发货",
      value: "3,568",
      trend: "up",
      ratio: "8.7%",
      icon: "📦",
      bg: "bg-indigo-50/50",
    },
    {
      title: "待收货",
      value: "2,984",
      trend: "up",
      ratio: "6.3%",
      icon: "🚚",
      bg: "bg-emerald-50/50",
    },
    {
      title: "已完成",
      value: "17,856",
      trend: "up",
      ratio: "10.8%",
      icon: "✅",
      bg: "bg-purple-50/50",
    },
    { title: "售后中", value: "232", trend: "up", ratio: "3.1%", icon: "🚨", bg: "bg-red-50/50" },
  ];

  // 右侧看板：订单按状态分布
  const statusDistribution = [
    { name: "待付款", count: "1,256", percent: "4.85%", color: "bg-amber-400" },
    { name: "待发货", count: "3,568", percent: "13.78%", color: "bg-indigo-400" },
    { name: "待收货", count: "2,984", percent: "11.52%", color: "bg-emerald-400" },
    { name: "已完成", count: "17,856", percent: "68.98%", color: "bg-purple-400" },
    { name: "售后中", count: "232", percent: "0.87%", color: "bg-red-400" },
  ];

  // 2. 复合订单表格列定义
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">订单信息</span>,
      dataIndex: "order",
      key: "order",
      width: 180,
      render: order => (
        <div className="flex flex-col gap-0.5 leading-tight py-0.5 select-none">
          <span className="text-xs text-gray-800 font-mono font-medium flex items-center gap-1">
            订单号: {order.no}
            {order.isHot && <span className="text-orange-500 text-[10px]">🔥</span>}
          </span>
          <span className="text-[11px] text-gray-400">
            渠道 : <span className="text-orange-500 font-medium">{order.channel}</span>
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">用户信息</span>,
      dataIndex: "user",
      key: "user",
      width: 140,
      render: user => (
        <div className="flex items-center gap-2 select-none">
          <Avatar src={user.avatar} size={24} className="shrink-0 border border-gray-100" />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-gray-700">{user.name}</span>
            <span className="text-[10px] text-gray-400 font-mono mt-0.5">{user.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">商品信息</span>,
      dataIndex: "product",
      key: "product",
      width: 180,
      render: prod => (
        <div className="flex items-center gap-2 min-w-0 select-none">
          <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-base shrink-0">
            {prod.thumb}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-xs text-gray-700 truncate font-medium">{prod.name}</div>
            <div className="text-[10px] text-gray-400 mt-0.5 font-mono">x{prod.count}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">金额</span>,
      dataIndex: "payment",
      key: "payment",
      width: 120,
      render: pay => (
        <div className="flex flex-col leading-none font-sans select-none">
          <span className="text-xs font-bold text-gray-800">¥ {pay.total.toFixed(2)}</span>
          <span className="text-[10px] text-gray-400 mt-1">
            (含运费 ¥{pay.shipping.toFixed(2)})
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 130,
      render: status => {
        let tagStyle = "text-blue-600 bg-blue-50";
        if (status.main === "待付款") tagStyle = "text-amber-600 bg-amber-50";
        if (status.main === "待发货") tagStyle = "text-indigo-600 bg-indigo-50";
        if (status.main === "待收货") tagStyle = "text-emerald-600 bg-emerald-50";
        if (status.main === "已完成") tagStyle = "text-gray-500 bg-gray-50";
        if (status.main === "售后中") tagStyle = "text-red-500 bg-red-50";

        return (
          <div className="flex flex-col gap-1 select-none leading-none">
            <span className={`w-fit text-[10px] px-1.5 py-0.5 rounded font-semibold ${tagStyle}`}>
              {status.main}
            </span>
            {status.sub && (
              <span className="text-[10px] text-orange-500 font-medium scale-95 origin-left">
                {status.sub}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">下单时间</span>,
      dataIndex: "time",
      key: "time",
      width: 140,
      render: text => (
        <span className="text-gray-400 font-mono text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      dataIndex: "status",
      width: 130,
      render: status => {
        let actionText = "发货";
        if (status.main === "待付款") actionText = "取消订单";
        if (status.main === "待收货" || status.main === "已完成") actionText = "查看物流";
        if (status.main === "已完成") actionText = "再来一单";
        if (status.main === "售后中") actionText = "售后处理";

        return (
          <div className="flex items-center gap-2.5 text-xs select-none font-medium whitespace-nowrap">
            <span className="text-blue-500 hover:text-blue-600 cursor-pointer">详情</span>
            <span
              className={`${actionText === "取消订单" || actionText === "售后处理" ? "text-red-500 hover:text-red-600" : "text-blue-500 hover:text-blue-600"} cursor-pointer`}
            >
              {actionText}
            </span>
            <Dropdown
              menu={{
                items: [
                  { key: "1", label: "打印订单" },
                  { key: "2", label: "订单备注" },
                ],
              }}
              trigger={["click"]}
            >
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
                更多 <DownOutlined className="text-[9px]" />
              </span>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  // 3. 高度匹配设计图的多渠道复杂订单数据集
  const data = [
    {
      key: "1",
      order: { no: "2024052000001", channel: "官网商城" },
      user: {
        name: "李明",
        phone: "138****1234",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liming",
      },
      product: { name: "无线降噪耳机 Pro", thumb: "🎧", count: 1 },
      payment: { total: 899.0, shipping: 0.0 },
      status: { main: "待付款", sub: "剩余 23:59:50" },
      time: "2024-05-20 10:30:45",
    },
    {
      key: "2",
      order: { no: "2024052000002", channel: "微信小程序" },
      user: {
        name: "王小胖",
        phone: "156****5678",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoping",
      },
      product: { name: "智能手表 S2", thumb: "⌚", count: 1 },
      payment: { total: 699.0, shipping: 0.0 },
      status: { main: "待发货" },
      time: "2024-05-20 10:15:22",
    },
    {
      key: "3",
      order: { no: "2024052000003", channel: "抖音小店", isHot: true },
      user: {
        name: "张晓晓",
        phone: "188****9012",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangxiaoxiao",
      },
      product: { name: "运动蓝牙耳机", thumb: "🎛️", count: 2 },
      payment: { total: 358.0, shipping: 8.0 },
      status: { main: "待发货" },
      time: "2024-05-20 09:58:11",
    },
    {
      key: "4",
      order: { no: "2024052000004", channel: "APP" },
      user: {
        name: "刘洋",
        phone: "199****2468",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang",
      },
      product: { name: "便携充电宝 10000mAh", thumb: "🔋", count: 1 },
      payment: { total: 129.0, shipping: 0.0 },
      status: { main: "待收货", sub: "剩余 3 天" },
      time: "2024-05-19 18:22:33",
    },
    {
      key: "5",
      order: { no: "2024052000005", channel: "官网商城" },
      user: {
        name: "陈宇",
        phone: "177****1357",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chenyu",
      },
      product: { name: "机械键盘 K87", thumb: "⌨️", count: 1 },
      payment: { total: 499.0, shipping: 0.0 },
      status: { main: "待收货", sub: "剩余 2 天" },
      time: "2024-05-19 16:45:09",
    },
    {
      key: "6",
      order: { no: "2024052000006", channel: "拼多多" },
      user: {
        name: "赵六六",
        phone: "155****6789",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu",
      },
      product: { name: "无线鼠标 M3", thumb: "🖱️", count: 1 },
      payment: { total: 89.0, shipping: 0.0 },
      status: { main: "已完成" },
      time: "2024-05-18 14:32:18",
    },
    {
      key: "7",
      order: { no: "2024052000007", channel: "京东旗舰店" },
      user: {
        name: "钱多多",
        phone: "186****8642",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=qianduo",
      },
      product: { name: "智能音箱 Mini", thumb: "🔊", count: 1 },
      payment: { total: 299.0, shipping: 0.0 },
      status: { main: "已完成" },
      time: "2024-05-18 10:21:44",
    },
    {
      key: "8",
      order: { no: "2024052000008", channel: "淘宝店铺" },
      user: {
        name: "孙悟空",
        phone: "159****3579",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sunwukong",
      },
      product: { name: "手机支架折叠款", thumb: "📱", count: 1 },
      payment: { total: 39.9, shipping: 0.0 },
      status: { main: "售后中" },
      time: "2024-05-17 09:11:05",
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
            cellPaddingBlock: 11,
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
          首页 / 订单管理 / <span className="text-gray-900 font-medium">订单列表</span>
        </div>

        {/* 标题说明区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <FileTextOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">订单管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理所有订单信息，支持订单查询、筛选、导出及各类操作
            </p>
          </div>
        </div>

        {/* 顶部六大核心统计指标大盘 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded border border-gray-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-gray-400 block mb-1 font-medium">{card.title}</span>
                <span className="text-xl font-bold text-gray-900 block tracking-tight font-mono">
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
                className={`w-9 h-9 ${card.bg} rounded flex items-center justify-center text-base shrink-0`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 主工作区 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧订单明细表格舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 工具检索条 */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索订单号、用户、商品..."
                  className="h-8 text-xs w-56"
                />
                <Select
                  defaultValue="allStatus"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allStatus", label: "全部状态" }]}
                />
                <Select
                  defaultValue="allChannels"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allChannels", label: "全部渠道" }]}
                />
                <Select
                  defaultValue="orderTime"
                  className="h-8 text-xs w-28"
                  options={[{ value: "orderTime", label: "下单时间" }]}
                />
                <RangePicker
                  placeholder={["开始日期", "结束日期"]}
                  className="h-8 text-xs font-sans border-gray-200"
                  style={{ height: 32, width: 210 }}
                />

                <Button
                  icon={<ReloadOutlined />}
                  className="h-8 text-xs text-gray-500 bg-gray-50 px-3"
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

              {/* 横向二级过滤 Tab 状态页签 */}
              <div className="border-b border-gray-100 mb-4 select-none">
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  className="border-none mb-0 custom-order-tabs"
                  items={[
                    { key: "1", label: "全部订单 (25,892)" },
                    { key: "2", label: "待付款 (1,256)" },
                    { key: "3", label: "待发货 (3,568)" },
                    { key: "4", label: "待收货 (2,984)" },
                    { key: "5", label: "已完成 (17,856)" },
                    { key: "6", label: "售后中 (232)" },
                    { key: "7", label: "已关闭 (0)" },
                  ]}
                />
              </div>

              {/* 核心数据表格结构 */}
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

              {/* 尾部分页对齐 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-slate-400 font-medium">共 25,892 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={25892}
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

          {/* 右侧多维订单深度分析舱挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：订单概览与分布占比环状图 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-800 m-0">订单概览</h3>
                <span className="text-blue-500 text-xs hover:underline cursor-pointer">更多</span>
              </div>
              <div className="flex items-center justify-between gap-3 py-1">
                {/* 复杂层级多色嵌套环形指示器 */}
                <div className="relative w-20 h-20 rounded-full border-[10px] border-purple-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-amber-400 border-r-indigo-400 border-b-emerald-500 border-l-transparent -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">完成率</span>
                    <span className="text-xs font-extrabold text-gray-900 block font-mono">
                      68.9%
                    </span>
                  </div>
                </div>
                {/* 状态统计条目 */}
                <div className="flex-1 text-[11px] space-y-1.5">
                  {statusDistribution.map((item, idx) => (
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

              {/* 订单金额（近 7 天走势波形挂件） */}
              <div className="border-t border-gray-100 mt-4 pt-3">
                <span className="text-[11px] text-gray-400 block">订单金额 (近 7 天)</span>
                <span className="text-base font-bold text-gray-900 font-mono tracking-tight block mt-0.5">
                  ¥ 386,721.50
                </span>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                  <span>较上周</span>
                  <span className="text-emerald-500 font-semibold">↑ 8.6%</span>
                </div>
                {/* 轻量走势波形模拟 */}
                <div className="h-10 flex items-end justify-between gap-1 mt-2 px-1">
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[40%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[60%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[50%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[75%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[65%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[85%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-50 rounded-t-sm h-[95%]" />
                </div>
              </div>
            </div>

            {/* 看板二：高频中心快捷操作 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <SendOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量发货</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <ExportOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量导出</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <PrinterOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">打印订单</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <SettingOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">订单设置</span>
                </div>
              </div>
            </div>

            {/* 看板三：常用周期订单预热筛选器 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">常用筛选</h3>
              <div className="space-y-2.5 font-sans">
                <div className="flex justify-between items-center text-xs text-gray-600 hover:text-blue-500 cursor-pointer py-0.5 transition-colors">
                  <span className="font-medium">今日订单</span>
                  <span className="font-mono text-gray-400 font-semibold">1,256</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 hover:text-blue-500 cursor-pointer py-0.5 transition-colors">
                  <span className="font-medium">昨日订单</span>
                  <span className="font-mono text-gray-400 font-semibold">1,987</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 hover:text-blue-500 cursor-pointer py-0.5 transition-colors">
                  <span className="font-medium">近 7 天订单</span>
                  <span className="font-mono text-gray-400 font-semibold">12,548</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 hover:text-blue-500 cursor-pointer py-0.5 transition-colors">
                  <span className="font-medium">近 30 天订单</span>
                  <span className="font-mono text-gray-400 font-semibold">45,692</span>
                </div>
                <div className="border-t border-gray-100 mt-2.5 pt-2.5 flex items-center gap-1.5 text-blue-500 font-medium text-xs cursor-pointer hover:text-blue-600">
                  <FilterOutlined className="text-[11px]" />
                  <span>自定义筛选</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 极紧凑不换行骨架覆盖样式 */}
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
        .custom-order-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .custom-order-tabs .ant-tabs-tab {
          padding: 6px 4px !important;
          margin-right: 20px !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
