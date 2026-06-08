import { QuickActionsPanel } from "@/components/business";
import {
  BlockOutlined,
  DownOutlined,
  ExportOutlined,
  FormOutlined,
  RocketOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import ReactECharts from "echarts-for-react";
import { useState } from "react";

const ConvientAction: React.FC = () => {
  const trendOption = {
    color: ["#3b82f6", "#10b981", "#a855f7"], // 用户数(蓝)、订单数(绿)、营收(紫)
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.96)",
      borderRadius: 12,
      padding: [10, 14],
      borderColor: "#f3f4f6",
      shadowColor: "rgba(0, 0, 0, 0.05)",
      shadowBlur: 10,
      textStyle: { color: "#374151", fontSize: 12 },
    },
    legend: {
      data: ["用户数", "订单数", "营收（元）"],
      left: 0,
      top: 0,
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: "#9ca3af", fontSize: 12 },
    },
    grid: {
      left: "3%",
      right: "1%",
      top: "16%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["06-12", "06-14", "06-15", "06-15", "06-16", "06-18"],
      axisLine: { show: false }, // 隐藏底轴线
      axisTick: { show: false }, // 隐藏刻度线
      axisLabel: { color: "#9ca3af", fontSize: 12, margin: 12 },
    },
    yAxis: {
      type: "value",
      max: 20000,
      interval: 5000,
      axisLabel: {
        color: "#9ca3af",
        fontSize: 12,
        formatter: (val: number) => (val === 0 ? "0" : `${val / 1000}k`), // 1:1 还原大图中的 k 单位
      },
      splitLine: {
        lineStyle: {
          color: "#f3f4f6",
          type: "dashed", // 1:1 虚线背景网格
        },
      },
    },
    series: [
      {
        name: "用户数",
        type: "line",
        data: [10000, 14000, 13800, 15500, 14500, 14800],
        smooth: true,
        showSymbol: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 2.5 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#3b82f6" }, // 线条处：用自身颜色
              { offset: 1, color: "rgba(59, 130, 246, 0)" }, // 底部：同色透明
            ],
            global: false,
          },
          opacity: 0.05, // 整体透明度，让投影柔和
        },
      },
      {
        name: "订单数",
        type: "line",
        data: [5000, 7500, 7300, 8500, 7200, 8400],
        smooth: true,
        showSymbol: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 2.5 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#10b981" }, // 线条处：用自身颜色
              { offset: 1, color: "rgba(59, 130, 246, 0)" }, // 底部：同色透明
            ],
            global: false,
          },
          opacity: 0.05, // 整体透明度，让投影柔和
        },
      },
      {
        name: "营收（元）",
        type: "line",
        data: [2000, 4800, 3500, 4500, 3200, 4600],
        smooth: true,
        showSymbol: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 2.5 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#a855f7" }, // 线条处：用自身颜色
              { offset: 1, color: "rgba(59, 130, 246, 0)" }, // 底部：同色透明
            ],
            global: false,
          },
          opacity: 0.05, // 整体透明度，让投影柔和
        },
      },
    ],
  };
  // ================= 🚀 快捷操作静态定义 =================
  const quickActions = [
    { label: "添加用户", icon: <UserAddOutlined />, color: "bg-blue-50 text-blue-600" },
    { label: "创建订单", icon: <FormOutlined />, color: "bg-green-50 text-green-600" },
    { label: "发布内容", icon: <RocketOutlined />, color: "bg-purple-50 text-purple-600" },
    { label: "添加产品", icon: <BlockOutlined />, color: "bg-orange-50 text-orange-600" },
    { label: "系统设置", icon: <SettingOutlined />, color: "bg-indigo-50 text-indigo-600" },
    { label: "数据导出", icon: <ExportOutlined />, color: "bg-gray-50 text-gray-600" },
  ];

  // ================= ⚙️ Antd 下拉菜单筛选 =================
  const [timeRange, setTimeRange] = useState("7");

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* 📊 左侧：数据趋势折线图 */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between h-95">
          {/* 图表头部 */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 m-0 text-base">数据趋势</h3>

            {/* ⚡️ 精细定制的 Antd Select 选择器 */}
            <Select
              value={timeRange}
              onChange={value => setTimeRange(value)}
              variant="borderless" // 彻底干掉 antd 默认的多余边框和激活蓝线
              suffixIcon={<DownOutlined className="text-[10px] text-gray-400" />} // 1:1 还原灰色小箭头
              // 这一行 className 赋予了它完美的灰色轻背景、软圆角以及悬浮交互
              className="bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer h-7 flex items-center min-w-21.25"
              popupClassName="rounded-xl overflow-hidden shadow-md text-xs" // 下拉浮层同步圆角化
              options={[
                { value: "7", label: <span className="text-xs text-gray-600">近 7 天</span> },
                { value: "30", label: <span className="text-xs text-gray-600">近 30 天</span> },
                { value: "90", label: <span className="text-xs text-gray-600">近 90 天</span> },
              ]}
            />
          </div>

          {/* ECharts 趋势图主体 */}
          <div className="w-full flex-1 min-h-0">
            <ReactECharts
              option={trendOption}
              style={{ height: "100%", width: "100%" }}
              notMerge={true}
            />
          </div>
        </div>

        {/* ⚡️ 右侧：快捷操作网格 */}
        <QuickActionsPanel actions={quickActions} />
      </div>
    </>
  );
};

export default ConvientAction;
