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
  Rate,
  Avatar,
} from "antd";
import {
  MessageOutlined,
  SearchOutlined,
  ReloadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  CheckSquareOutlined,
  SettingOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function ProductEvaluate() {
  const [activeTab, setActiveTab] = useState("1");

  // 1. 顶部 5 个评价核心大盘指标 (完美对齐 UI 数据)
  const statCards = [
    {
      title: "全部评价",
      value: "2,568",
      trend: "up",
      ratio: "8.6%",
      icon: "💬",
      bg: "bg-blue-50/50",
    },
    {
      title: "已审核",
      value: "2,156",
      trend: "up",
      ratio: "7.2%",
      icon: "✅",
      bg: "bg-emerald-50/50",
    },
    {
      title: "待审核",
      value: "412",
      trend: "down",
      ratio: "5.4%",
      icon: "⏳",
      bg: "bg-orange-50/50",
    },
    {
      title: "已回复",
      value: "1,892",
      trend: "up",
      ratio: "6.8%",
      icon: "↩️",
      bg: "bg-purple-50/50",
    },
    {
      title: "好评率",
      value: "96.3%",
      trend: "up",
      ratio: "1.2%",
      icon: "⭐",
      bg: "bg-amber-50/60",
    },
  ];

  // 右侧看板：评价来源真实占比数据
  const sourceStats = [
    { source: "商品详情页", count: 1632, percent: 63.6 },
    { source: "订单页", count: 568, percent: 22.1 },
    { source: "用户中心", count: 256, percent: 10.0 },
    { source: "其他", count: 112, percent: 4.3 },
  ];

  // 2. 复合数据表列配置
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评价信息</span>,
      dataIndex: "user",
      key: "userInfo",
      width: 180,
      render: user => (
        <div className="flex flex-col gap-1 py-0.5 select-none">
          <div className="flex items-center gap-2">
            <Avatar src={user.avatar} size={24} className="shrink-0 border border-gray-100" />
            <span className="font-semibold text-gray-800 text-[13px]">{user.name}</span>
            <span
              className={`text-[9px] px-1.5 py-px rounded font-bold scale-90 origin-left ${
                user.tag === "PLUS" ? "text-amber-700 bg-amber-100" : "text-blue-600 bg-blue-50"
              }`}
            >
              {user.tag}
            </span>
          </div>
          <span className="text-[11px] text-gray-400 font-mono tracking-tight">
            订单号: {user.orderNo}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">产品信息</span>,
      dataIndex: "product",
      key: "productInfo",
      width: 180,
      render: prod => (
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-lg shrink-0">
            {prod.thumb}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="text-xs font-medium text-gray-800 truncate" title={prod.name}>
              {prod.name}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">颜色: {prod.spec}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评分</span>,
      dataIndex: "rate",
      key: "rate",
      width: 100,
      render: score => (
        <Rate
          disabled
          defaultValue={score}
          className="text-xs text-amber-400 gap-px"
          style={{ fontSize: 11 }}
        />
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评价内容</span>,
      dataIndex: "content",
      key: "content",
      width: 260,
      render: content => (
        <div className="flex flex-col gap-1.5 py-0.5">
          <p className="m-0 text-xs text-gray-700 leading-relaxed font-medium break-all whitespace-normal">
            {content.text}
          </p>
          {content.imgs && (
            <div className="flex items-center gap-1.5 mt-0.5 select-none">
              {content.imgs.map((img, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gray-100 border border-gray-200/60 rounded flex items-center justify-center text-xs"
                >
                  {img}
                </div>
              ))}
              <span className="text-[10px] text-gray-400 font-medium bg-gray-50 border border-gray-100 px-1 rounded scale-90">
                共 {content.totalImg} 张
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => (
        <div className="flex flex-col gap-1 select-none">
          <span
            className={`w-fit text-[10px] px-1.5 py-0.5 rounded font-medium ${
              status.audit ? "text-emerald-600 bg-emerald-50" : "text-orange-500 bg-orange-50"
            }`}
          >
            {status.audit ? "已审核" : "待审核"}
          </span>
          {status.reply && (
            <span className="w-fit text-[10px] px-1.5 py-0.5 rounded font-medium text-slate-500 bg-slate-50 flex items-center gap-0.5">
              💬 已回复
            </span>
          )}
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">用户</span>,
      dataIndex: "userHandle",
      key: "userHandle",
      width: 110,
      render: text => (
        <div className="flex flex-col leading-none select-none">
          <span className="text-xs text-gray-700 font-medium">{text.name}</span>
          <span className="text-[10px] text-gray-400 font-mono mt-1">{text.phone}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">评价时间</span>,
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
      width: 100,
      render: () => (
        <div className="flex items-center gap-3 text-xs select-none whitespace-nowrap font-medium">
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
            详情
          </span>
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
            回复
          </span>
        </div>
      ),
    },
  ];

  // 3. 完美对应原图界面的评价明细数据集
  const data = [
    {
      key: "1",
      user: {
        name: "李*明",
        tag: "PLUS",
        orderNo: "OD20240520001",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liming",
      },
      product: { name: "降噪蓝牙耳机 Pro", spec: "黑色", thumb: "🎧" },
      rate: 5,
      content: {
        text: "音质很好，降噪效果超出预期，戴着也很舒服，续航也很给力！",
        imgs: ["🖼️", "🖼️"],
        totalImg: 3,
      },
      status: { audit: true, reply: true },
      userHandle: { name: "李*明", phone: "138****1234" },
      time: "2024-05-20 10:30:22",
    },
    {
      key: "2",
      user: {
        name: "张*华",
        tag: "普通会员",
        orderNo: "OD20240520002",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang",
      },
      product: { name: "智能手表 S2", spec: "银色", thumb: "⌚" },
      rate: 5,
      content: { text: "功能很全面，外观也很时尚，健康监测很准确，推荐购买！" },
      status: { audit: true, reply: true },
      userHandle: { name: "张*华", phone: "139****5678" },
      time: "2024-05-20 09:15:33",
    },
    {
      key: "3",
      user: {
        name: "王*强",
        tag: "普通会员",
        orderNo: "OD20240520003",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang",
      },
      product: { name: "便携充电宝 10000mAh", spec: "白色", thumb: "🔋" },
      rate: 4,
      content: { text: "充电速度快，容量也够用，就是稍微有点重。" },
      status: { audit: true, reply: true },
      userHandle: { name: "王*强", phone: "137****9012" },
      time: "2024-05-19 22:44:18",
    },
    {
      key: "4",
      user: {
        name: "刘*雨",
        tag: "普通会员",
        orderNo: "OD20240520004",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liu",
      },
      product: { name: "机械键盘 K87", spec: "黑色", thumb: "⌨️" },
      rate: 5,
      content: {
        text: "手感非常好，按键声音很清脆，打字游戏都很顺手！",
        imgs: ["🖼️"],
        totalImg: 2,
      },
      status: { audit: false, reply: false },
      userHandle: { name: "刘*雨", phone: "136****3456" },
      time: "2024-05-19 18:23:55",
    },
    {
      key: "5",
      user: {
        name: "陈*辉",
        tag: "普通会员",
        orderNo: "OD20240520005",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chen",
      },
      product: { name: "无线鼠标 M3", spec: "灰色", thumb: "🖱️" },
      rate: 3,
      content: { text: "鼠标连接稳定，手感还可以，但滚轮有点松动。" },
      status: { audit: false, reply: false },
      userHandle: { name: "陈*辉", phone: "135****7890" },
      time: "2024-05-19 16:10:44",
    },
    {
      key: "6",
      user: {
        name: "赵*文",
        tag: "普通会员",
        orderNo: "OD20240520006",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao",
      },
      product: { name: "护眼台灯", spec: "白色", thumb: "💡" },
      rate: 4,
      content: { text: "光线柔和不刺眼，亮度可调节，孩子写作业用很合适。" },
      status: { audit: true, reply: true },
      userHandle: { name: "赵*文", phone: "134****2345" },
      time: "2024-05-19 12:05:32",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 4, // 贯彻 WorkPro 精密极硬朗 4px 圆角
          colorBgContainer: "#ffffff",
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#555555",
            headerBorderRadius: 0,
            headerSplitColor: "transparent",
            cellPaddingInline: 14,
            cellPaddingBlock: 14,
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
          首页 / 产品管理 / <span className="text-gray-900 font-medium">评价管理</span>
        </div>

        {/* 标题说明区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <MessageOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">评价管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理产品评价内容，审核评价，回复用户评价，维护良好的用户体验
            </p>
          </div>
        </div>

        {/* 顶部五大核心指标大盘 */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded border border-gray-200/60 shadow-sm flex items-center justify-between col-span-1"
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

        {/* 主工作舱：双列横向排版 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧主要数据舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 二级联动状态过滤 Tab 页签 */}
              <div className="flex justify-between items-center border-b border-gray-100 mb-4 select-none flex-wrap gap-2">
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  className="border-none mb-0"
                  items={[
                    { key: "1", label: "全部评价" },
                    { key: "2", label: "待审核 (412)" },
                    { key: "3", label: "已审核 (2,156)" },
                    { key: "4", label: "已回复 (1,892)" },
                    { key: "5", label: "追评 (326)" },
                  ]}
                />
                <div className="flex items-center gap-2 pb-3">
                  <Button
                    icon={<CheckSquareOutlined className="text-xs" />}
                    className="h-7.5 text-xs text-gray-600 bg-gray-50/50"
                  >
                    批量审核
                  </Button>
                  <Button
                    icon={<DownloadOutlined className="text-xs" />}
                    className="h-7.5 text-xs text-gray-600 bg-gray-50/50"
                  >
                    导出
                  </Button>
                </div>
              </div>

              {/* 高级核心条件检索工具条 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索评价内容、用户、产品..."
                  className="h-8 text-xs col-span-1 md:col-span-1"
                />
                <Select
                  defaultValue="allProd"
                  className="h-8 text-xs w-full"
                  options={[{ value: "allProd", label: "全部产品" }]}
                />
                <Select
                  defaultValue="allRate"
                  className="h-8 text-xs w-full"
                  options={[{ value: "allRate", label: "全部评分" }]}
                />
                <Select
                  defaultValue="allStatus"
                  className="h-8 text-xs w-full"
                  options={[{ value: "allStatus", label: "全部状态" }]}
                />
                <RangePicker
                  placeholder={["开始日期", "结束日期"]}
                  className="h-8 text-xs w-full font-sans border-gray-200"
                  style={{ height: 32 }}
                />
              </div>

              {/* 复合表格载体 */}
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
                <span className="text-xs text-slate-400 font-medium">共 2,568 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={2568}
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
                      className="w-7 h-6 border border-slate-200 rounded text-center mx-1 text-slate-700 font-medium text-xs outline-none focus:border-blue-500"
                    />{" "}
                    页
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧精密统计侧看板挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：评分分布多级环状结构 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-4">评分分布</h3>
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="relative w-20 h-20 rounded-full border-[10px] border-amber-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-blue-500 border-r-indigo-400 border-b-transparent border-l-transparent -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">总体评分</span>
                    <span className="text-xs font-extrabold text-gray-900 block font-mono">
                      4.8
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-[11px] space-y-1.5 font-sans">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">⭐ 5星</span>
                    <span className="text-gray-700 font-mono font-medium shrink-0">
                      1,872 (73.0%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">⭐ 4星</span>
                    <span className="text-gray-700 font-mono font-medium shrink-0">
                      456 (17.8%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">⭐ 3星</span>
                    <span className="text-gray-700 font-mono font-medium shrink-0">152 (5.9%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">⭐ 2星</span>
                    <span className="text-gray-700 font-mono font-medium shrink-0">48 (1.9%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">⭐ 1星</span>
                    <span className="text-gray-700 font-mono font-medium shrink-0">40 (1.6%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 看板二：评价趋势 (近7天极简波形模拟) */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-gray-800 m-0">评价趋势 (近 7 天)</h3>
                <span className="text-[10px] text-gray-400 font-mono font-medium">
                  05-20: 402条
                </span>
              </div>
              <div className="h-20 flex items-end justify-between px-2 pt-4 relative">
                {/* 模拟轻量波形虚线与节点 */}
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-100"></div>
                <div
                  className="w-1.5 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors h-[40%]"
                  title="05-14"
                ></div>
                <div
                  className="w-1.5 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors h-[55%]"
                  title="05-15"
                ></div>
                <div
                  className="w-1.5 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors h-[45%]"
                  title="05-16"
                ></div>
                <div
                  className="w-1.5 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors h-[70%]"
                  title="05-17"
                ></div>
                <div
                  className="w-1.5 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors h-[60%]"
                  title="05-18"
                ></div>
                <div
                  className="w-1.5 bg-blue-500/20 rounded-t hover:bg-blue-500 transition-colors h-[80%]"
                  title="05-19"
                ></div>
                <div className="w-1.5 bg-blue-500 rounded-t h-[95%]" title="05-20"></div>
              </div>
              <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono px-1">
                <span>05-14</span>
                <span>05-17</span>
                <span>05-20</span>
              </div>
            </div>

            {/* 看板三：评价来源垂直柱状比例分布 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">评价来源分布</h3>
              <div className="space-y-2.5">
                {sourceStats.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between text-gray-600 mb-1 text-[11px]">
                      <span className="font-medium">{item.source}</span>
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

            {/* 看板四：底部方格快速入口 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <CheckCircleOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量审核</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    {/* <MessageSquareOutlined /> */}
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">批量回复</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <SettingOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">评价设置</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <WarningOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">屏蔽词管理</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 高度密织核心不折行防抖样式 */}
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
        .ant-tabs-nav::before {
          border-bottom: none !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
