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
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  FileTextOutlined,
  DownOutlined,
  ContainerOutlined,
  ThunderboltOutlined,
  DownloadOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DiffOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function OrderBill() {
  const [activeTab, setActiveTab] = useState("1");

  // 1. 顶部六大核心统计指标大盘
  const statCards = [
    {
      title: "开票申请(本月)",
      value: "1,328",
      trend: "up",
      ratio: "10.2%",
      icon: "🧾",
      bg: "bg-blue-50/50",
    },
    {
      title: "待开票",
      value: "218",
      trend: "down",
      ratio: "5.6%",
      icon: "⏳",
      bg: "bg-amber-50/50",
    },
    {
      title: "开票中",
      value: "156",
      trend: "up",
      ratio: "8.7%",
      icon: "⚙️",
      bg: "bg-indigo-50/50",
    },
    {
      title: "已开票",
      value: "1,028",
      trend: "up",
      ratio: "12.4%",
      icon: "✅",
      bg: "bg-emerald-50/50",
    },
    { title: "开票失败", value: "24", trend: "up", ratio: "20.0%", icon: "❌", bg: "bg-red-50/50" },
    {
      title: "已作废",
      value: "46",
      trend: "down",
      ratio: "8.0%",
      icon: "🗑️",
      bg: "bg-purple-50/50",
    },
  ];

  // 右侧看板：发票数据状态占比分布
  const invoiceStatusDistribution = [
    { name: "已开票", count: "1,028", percent: "77.4%", color: "bg-emerald-400" },
    { name: "待开票", count: "218", percent: "16.4%", color: "bg-amber-400" },
    { name: "开票中", count: "156", percent: "11.7%", color: "bg-indigo-400" },
    { name: "开票失败", count: "24", percent: "1.8%", color: "bg-red-400" },
    { name: "已作废", count: "46", percent: "3.5%", color: "bg-purple-400" },
  ];

  // 2. 发票高密度表格列定义
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">发票信息</span>,
      dataIndex: "invoice",
      key: "invoice",
      width: 170,
      render: item => (
        <div className="flex flex-col gap-0.5 leading-tight py-0.5 font-mono select-none">
          <span
            className={`text-xs ${item.no === "--" ? "text-gray-400" : "text-gray-800 font-medium"}`}
          >
            发票号: {item.no}
          </span>
          <span className="text-[10px] text-gray-400">申请单号: {item.applyNo}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">订单信息</span>,
      dataIndex: "order",
      key: "order",
      width: 160,
      render: item => (
        <div className="flex flex-col gap-0.5 leading-tight font-mono select-none">
          <span className="text-xs text-gray-600">订单号: {item.no}</span>
          <span className="text-[10px] text-gray-400">来源: {item.channel}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">购方信息</span>,
      dataIndex: "buyer",
      key: "buyer",
      width: 200,
      render: buyer => (
        <div className="flex flex-col gap-0.5 leading-tight select-none">
          <span className="text-xs text-gray-700 font-medium truncate max-w-[180px]">
            {buyer.name}
          </span>
          <span className="text-[10px] text-gray-400 font-mono">
            {buyer.taxId ? `纳税人识别号: ${buyer.taxId}` : `身份证号: ${buyer.idCard}`}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">发票类型</span>,
      dataIndex: "type",
      key: "type",
      width: 120,
      render: text => <span className="text-gray-600 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">金额 (含税)</span>,
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: val => (
        <span className="text-xs font-bold text-gray-800 font-sans">¥ {val.toFixed(2)}</span>
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
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => {
        let style = "text-emerald-600 bg-emerald-50";
        if (status === "待开票") style = "text-amber-500 bg-amber-50";
        if (status === "开票中") style = "text-blue-500 bg-blue-50";
        if (status === "开票失败") style = "text-red-500 bg-red-50";
        if (status === "已作废") style = "text-gray-400 bg-gray-50";

        return (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${style}`}>{status}</span>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      dataIndex: "status",
      key: "action",
      width: 140,
      render: status => {
        const moreMenu = {
          items: [
            { key: "1", label: "开票详情" },
            { key: "2", label: "发送至邮箱" },
          ],
        };

        if (status === "已开票") {
          return (
            <div className="flex items-center gap-2.5 text-xs font-medium select-none whitespace-nowrap">
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer">查看</span>
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer">下载</span>
              <Dropdown menu={moreMenu} trigger={["click"]}>
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
                  更多 <DownOutlined className="text-[9px]" />
                </span>
              </Dropdown>
            </div>
          );
        }
        if (status === "待开票") {
          return (
            <div className="flex items-center gap-2.5 text-xs font-medium select-none whitespace-nowrap">
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer">编辑</span>
              <span className="text-red-500 hover:text-red-600 cursor-pointer">取消</span>
              <Dropdown menu={moreMenu} trigger={["click"]}>
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
                  更多 <DownOutlined className="text-[9px]" />
                </span>
              </Dropdown>
            </div>
          );
        }
        if (status === "开票中" || status === "已作废") {
          return (
            <div className="flex items-center gap-2.5 text-xs font-medium select-none whitespace-nowrap">
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer">查看</span>
              <Dropdown menu={moreMenu} trigger={["click"]}>
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
                  更多 <DownOutlined className="text-[9px]" />
                </span>
              </Dropdown>
            </div>
          );
        }
        if (status === "开票失败") {
          return (
            <div className="flex items-center gap-2.5 text-xs font-medium select-none whitespace-nowrap">
              <span className="text-red-500 hover:text-red-600 cursor-pointer">查看原因</span>
              <span className="text-blue-500 hover:text-blue-600 cursor-pointer">重新申请</span>
              <Dropdown menu={moreMenu} trigger={["click"]}>
                <span className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
                  更多 <DownOutlined className="text-[9px]" />
                </span>
              </Dropdown>
            </div>
          );
        }
      },
    },
  ];

  // 3. 高度匹配设计图的真实表格发票数据源
  const data = [
    {
      key: "1",
      invoice: { no: "FP202405200001", applyNo: "AP2024052000001" },
      order: { no: "2024052000001", channel: "APP" },
      buyer: { name: "北京科技有限公司", taxId: "91110108MA01..." },
      type: "增值税专用发票",
      amount: 699.0,
      time: "2024-05-20 10:30:45",
      status: "已开票",
    },
    {
      key: "2",
      invoice: { no: "FP202405200002", applyNo: "AP2024052000002" },
      order: { no: "2024052000002", channel: "小程序" },
      buyer: { name: "个人 (李明)", idCard: "11010119900101****" },
      type: "电子普通发票",
      amount: 358.0,
      time: "2024-05-20 10:15:22",
      status: "待开票",
    },
    {
      key: "3",
      invoice: { no: "--", applyNo: "AP2024052000003" },
      order: { no: "2024052000003", channel: "官网" },
      buyer: { name: "上海贸易有限公司", taxId: "91310115MA01..." },
      type: "增值税专用发票",
      amount: 899.0,
      time: "2024-05-20 09:58:11",
      status: "开票中",
    },
    {
      key: "4",
      invoice: { no: "FP202405190004", applyNo: "AP2024051900004" },
      order: { no: "2024051900004", channel: "APP" },
      buyer: { name: "广州科技有限公司", taxId: "91440101MA01..." },
      type: "增值税专用发票",
      amount: 129.0,
      time: "2024-05-19 18:22:33",
      status: "已开票",
    },
    {
      key: "5",
      invoice: { no: "--", applyNo: "AP202405190005" },
      order: { no: "202405190005", channel: "小程序" },
      buyer: { name: "个人 (王小胖)", idCard: "11010119950505****" },
      type: "电子普通发票",
      amount: 499.0,
      time: "2024-05-19 16:45:09",
      status: "开票失败",
    },
    {
      key: "6",
      invoice: { no: "FP202405180006", applyNo: "AP2024051800006" },
      order: { no: "2024051800006", channel: "京东旗舰店" },
      buyer: { name: "深圳电子科技有限公司", taxId: "91440300MA01..." },
      type: "增值税专用发票",
      amount: 299.0,
      time: "2024-05-18 14:32:18",
      status: "已开票",
    },
    {
      key: "7",
      invoice: { no: "FP202405180007", applyNo: "AP2024051800007" },
      order: { no: "2024051800007", channel: "天猫店铺" },
      buyer: { name: "个人 (钱多多)", idCard: "11010119921010****" },
      type: "电子普通发票",
      amount: 89.0,
      time: "2024-05-18 10:21:44",
      status: "已作废",
    },
    {
      key: "8",
      invoice: { no: "FP202405170008", applyNo: "AP2024051700008" },
      order: { no: "2024051700008", channel: "拼多多" },
      buyer: { name: "成都贸易有限公司", taxId: "91510107MA01..." },
      type: "增值税专用发票",
      amount: 39.9,
      time: "2024-05-17 09:11:05",
      status: "已开票",
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
          首页 / 订单管理 / <span className="text-gray-900 font-medium">发票管理</span>
        </div>

        {/* 标题区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <ContainerOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">发票管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理开票申请、电子发票开具、发票状态跟踪与管理
            </p>
          </div>
        </div>

        {/* 顶部六大发票指标卡大盘 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
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
          {/* 左侧发票核心数据工作舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 多维高级筛查工具链 */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索发票案号、订单号、申请人..."
                  className="h-8 text-xs w-56"
                />
                <Select
                  defaultValue="allStatus"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allStatus", label: "全部状态" }]}
                />
                <Select
                  defaultValue="allInvoiceType"
                  className="h-8 text-xs w-32"
                  options={[{ value: "allInvoiceType", label: "全部发票类型" }]}
                />
                <Select
                  defaultValue="allBuyerType"
                  className="h-8 text-xs w-32"
                  options={[{ value: "allBuyerType", label: "全部抬头类型" }]}
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

              {/* 二级状态联动 Tab 横向切片 */}
              <div className="border-b border-gray-100 mb-4 select-none">
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  className="border-none mb-0 custom-invoice-tabs"
                  items={[
                    { key: "1", label: "全部 (1,328)" },
                    { key: "2", label: "待开票 (218)" },
                    { key: "3", label: "开票中 (156)" },
                    { key: "4", label: "已开票 (1,028)" },
                    { key: "5", label: "开票失败 (24)" },
                    { key: "6", label: "已作废 (46)" },
                  ]}
                />
              </div>

              {/* 发票高密度明细核心表格 */}
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
                <span className="text-xs text-slate-400 font-medium">共 1,328 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={1328}
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

          {/* 右侧数据看板监控侧挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：发票数据状态分布概览 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-800 m-0">发票数据概览</h3>
                <span className="text-blue-500 text-xs hover:underline cursor-pointer">
                  更多 ＞
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 py-1">
                {/* 发票分布多色嵌套环形指示 */}
                <div className="relative w-20 h-20 rounded-full border-[10px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-amber-400 border-r-indigo-400 border-b-purple-400 border-l-red-400 -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">成功率</span>
                    <span className="text-xs font-extrabold text-gray-900 block font-mono">
                      77.4%
                    </span>
                  </div>
                </div>
                {/* 指标明细列表 */}
                <div className="flex-1 text-[11px] space-y-1.5 font-sans">
                  {invoiceStatusDistribution.map((item, idx) => (
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

              {/* 发票近 7 天开票金额微型趋势图 */}
              <div className="border-t border-gray-100 mt-4 pt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-gray-400">开票金额统计 (近 7 天)</span>
                </div>
                <div className="text-base font-bold text-gray-900 font-mono tracking-tight block">
                  ¥ 86,578.20
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                  <span>较上周</span>
                  <span className="text-emerald-500 font-semibold">↑ 15.6%</span>
                </div>
                {/* 蓝灰色渐进走势波形柱条 */}
                <div className="h-10 flex items-end justify-between gap-1 mt-2 px-1">
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[25%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[45%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[35%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[70%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[50%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-500/10 hover:bg-blue-500/30 transition-colors h-[85%] rounded-t-sm" />
                  <div className="flex-1 bg-blue-50 rounded-t-sm h-[95%]" />
                </div>
              </div>
            </div>

            {/* 看板二：发票主要类型所占比例条形分布 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">发票类型分布</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-gray-600 mb-1 text-[11px]">
                    <span className="font-medium">增值税专用发票</span>
                    <span className="text-gray-400 font-mono">896 (67.5%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "67.5%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-gray-600 mb-1 text-[11px]">
                    <span className="font-medium">电子普通发票</span>
                    <span className="text-gray-400 font-mono">432 (32.5%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "32.5%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 看板三：底部快捷矩阵控制 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <ThunderboltOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">申请开票</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <SafetyCertificateOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量开票</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <DownloadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量下载</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <SettingOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">发票作废</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 高度密致紧凑排版覆盖骨架 */}
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
        .custom-invoice-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .custom-invoice-tabs .ant-tabs-tab {
          padding: 6px 2px !important;
          margin-right: 18px !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
