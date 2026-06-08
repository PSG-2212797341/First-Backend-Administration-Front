import { KpiCard } from "@/components/echarts";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarCircleOutlined,
  EyeOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const DataCard = () => {
  // --- KPI 卡片配置 ---
  const kpiCardsData = [
    {
      title: "用户总数",
      value: "12,845",
      trend: "8.2%",
      trendText: "较昨日",
      lineColor: "#3b82f6", // 蓝色
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      trendIcon: <ArrowUpOutlined style={{ fontSize: "14px" }} />,
      chartData: [], // 可自定义你的迷你图走势
    },
    {
      title: "订单总数",
      value: "18,392",
      trend: "12.5%",
      trendText: "较昨日",
      lineColor: "#10b981", // 翠绿色 (emerald)
      icon: <ShoppingCartOutlined style={{ fontSize: "18px" }} />,
      trendIcon: <ArrowUpOutlined style={{ fontSize: "14px" }} />,
      chartData: [],
    },
    {
      title: "销售额 (元)",
      value: "¥ 2,834",
      trend: "15.3%",
      trendText: "较昨日",
      lineColor: "#f97316", // 橙色 (orange)
      icon: <DollarCircleOutlined style={{ fontSize: "18px" }} />,
      trendIcon: <ArrowUpOutlined style={{ fontSize: "14px" }} />,
      chartData: [],
    },
    {
      title: "活跃用户",
      value: "8,673",
      trend: "9.6%",
      trendText: "较昨日",
      lineColor: "#8b5cf6", // 紫色 (purple)
      icon: <LineChartOutlined style={{ fontSize: "18px" }} />,
      trendIcon: <ArrowUpOutlined style={{ fontSize: "14px" }} />,
      chartData: [],
    },
    {
      title: "系统访问量",
      value: "125,892",
      trend: "7.4%",
      trendText: "较昨日",
      lineColor: "#06b6d4", // 青色 (cyan)
      icon: <EyeOutlined style={{ fontSize: "18px" }} />,
      trendIcon: <ArrowUpOutlined style={{ fontSize: "14px" }} />,
      chartData: [],
    },
    {
      title: "异常事件",
      value: "342",
      trend: "3.1%",
      trendText: "较昨日",
      lineColor: "#f43f5e", // 玫瑰红 (rose)
      icon: <WarningOutlined style={{ fontSize: "18px" }} />,
      trendIcon: <ArrowDownOutlined style={{ fontSize: "14px" }} />, // 异常下降是好事情，用绿色或保持原组件底色
      chartData: [],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5 bg-slate-50 w-full">
      {kpiCardsData.map(card => (
        <KpiCard
          title={card.title}
          value={card.value}
          trend={card.trend}
          trendText={card.trendText}
          lineColor={card.lineColor}
          icon={card.icon}
          trendIcon={card.trendIcon}
          chartData={card.chartData}
        />
      ))}
    </div>
  );
};

export default DataCard;
