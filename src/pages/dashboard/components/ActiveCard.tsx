import { KpiCard } from "@/components/echarts"; // 导入你写好的 KpiCard 组件
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export default function MetricsHeader() {
  // 💡 模拟四个卡片各自专属的 ECharts 趋势折线数据
  const userChartData = [15, 18, 14, 25, 22, 16, 20, 26, 23, 21, 24, 34, 28, 30, 32];
  const orderChartData = [10, 12, 15, 13, 18, 22, 20, 24, 28, 26, 30, 35, 32, 38, 40];
  const revenueChartData = [50, 55, 52, 60, 58, 65, 70, 68, 72, 78, 75, 82, 80, 85, 90];
  const pvChartData = [95, 92, 88, 85, 80, 78, 82, 75, 70, 74, 68, 65, 62, 58, 55]; // 下跌趋势数据

  return (
    /* 💡 外层使用自适应 Grid 布局：
      - 默认（手机端）一排 1 列 (grid-cols-1)
      - 中等屏幕（平板）一排 2 列 (md:grid-cols-2)
      - 超大屏幕（电脑）一排 4 列 (xl:grid-cols-4)
    */
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 bg-slate-50 w-full">
      {/* 🟦 卡片 1: 总用户数 (蓝色主题) */}
      <KpiCard
        title="总用户数"
        value="12,487"
        trend="12.5%"
        trendText="较昨日"
        lineColor="#3b82f6" // 蓝色折线与图标
        chartData={userChartData}
        icon={<span className="text-lg">👥</span>}
        trendIcon={<ArrowUpOutlined className="text-sm text-orange-500" />} // 还原橙色向上的箭头
      />

      {/* 🟩 卡片 2: 订单总数 (绿色主题) */}
      <KpiCard
        title="订单总数"
        value="3,247"
        trend="8.1%"
        trendText="较昨日"
        lineColor="#10b981" // 绿色折线与图标
        chartData={orderChartData}
        icon={<span className="text-lg">🛍️</span>}
        trendIcon={<ArrowUpOutlined className="text-sm text-green-500" />} // 绿色向上的箭头
      />

      {/* 🟪 卡片 3: 总营收 (紫色主题) */}
      <KpiCard
        title="总营收（元）"
        value="¥ 86,560"
        trend="15.3%"
        trendText="较昨日"
        lineColor="#8b5cf6" // 紫色折线，这里对应的 hex 会被组件自动处理成 rgba 背景
        chartData={revenueChartData}
        icon={<span className="text-lg">🪙</span>}
        trendIcon={<ArrowUpOutlined className="text-sm text-blue-600" />} // 蓝色向上的箭头
      />

      {/* 🟥 卡片 4: 访问量 (橙红色主题) */}
      <KpiCard
        title="访问量（PV）"
        value="32,586"
        trend="3.6%"
        trendText="较昨日"
        lineColor="#f97316" // 橙红色折线与图标
        chartData={pvChartData}
        icon={<span className="text-lg">📈</span>}
        trendIcon={<ArrowDownOutlined className="text-sm text-red-500" />} // 💡 换成红色的向下箭头
      />
    </div>
  );
}
