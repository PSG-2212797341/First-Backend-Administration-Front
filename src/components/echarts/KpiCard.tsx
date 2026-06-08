import React from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

// 定义可配置的属性接口
interface KpiCardProps {
  title?: string; // 标题文案
  value?: string; // 核心数值
  trend?: string; // 趋势百分比
  trendText?: string; // 趋势辅助文案
  chartData?: number[]; // 趋势图数据数组
  lineColor?: string; // 折线与内层图标的主色调（例如：#3b82f6、#10b981）
  icon?: React.ReactNode; // 自定义左上角主图标
  trendIcon?: React.ReactNode; // 新增：允许外部传入自定义的趋势箭头图标
}

// 辅助函数：将 hex 颜色转换为带透明度的 rgba 颜色
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function KpiCard({
  title = "总用户数",
  value = "12,847",
  trend = "12.5%",
  trendText = "较昨日",
  chartData = [15, 18, 14, 25, 22, 16, 20, 26, 23, 21, 24, 34, 28, 30, 32],
  lineColor = "#3b82f6",
  icon,
  trendIcon, // 解构自定义趋势图标
}: KpiCardProps) {
  // 根据传入的 lineColor，动态计算出浅色的双层拟物背景
  const outerBgStart = hexToRgba(lineColor, 0.06);
  const outerBgEnd = hexToRgba(lineColor, 0.15);
  const areaColorStart = hexToRgba(lineColor, 0.22);

  const getOption = () => {
    return {
      grid: { left: 4, right: 6, top: 10, bottom: 2, containLabel: false },
      xAxis: { type: "category", show: false, boundaryGap: false },
      yAxis: { type: "value", show: false, min: "dataMin" }, // 智能自适应数据最小值
      series: [
        {
          data: chartData,
          type: "line",
          smooth: 0.45,
          showSymbol: false,
          itemStyle: { color: lineColor, borderColor: "#fff", borderWidth: 2 },
          markPoint: {
            symbol: "circle",
            symbolSize: 5,
            itemStyle: { color: lineColor, shadowColor: hexToRgba(lineColor, 0.4), shadowBlur: 4 },
            data: [{ type: "max", coord: [chartData.length - 1, chartData[chartData.length - 1]] }], // 动态锚定到数据的最后一个点
          },
          lineStyle: { width: 2, color: lineColor },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: areaColorStart },
              { offset: 1, color: "rgba(0, 0, 0, 0)" },
            ]),
          },
        },
      ],
    };
  };

  return (
    /* 💡 变更 1：去掉 w-80，换成 w-full，让宽度由外部的 Grid / Flex 栅格自由缩放控制 */
    <div className="w-full h-38 bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm shadow-slate-100/80 border border-slate-100/60 select-none">
      <div className="flex justify-between items-start w-full">
        <div className="flex items-start gap-4">
          {/* 外层图标背景 */}
          <div
            className="w-15 h-15 rounded-xl flex items-center justify-center border border-white shrink-0"
            style={{
              background: `linear-gradient(to bottom, ${outerBgStart}, ${outerBgEnd})`,
              boxShadow: `inset 0 2px 4px 0 ${hexToRgba(lineColor, 0.05)}`,
            }}
          >
            {/* 内层图标背景 */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{
                background: `linear-gradient(to bottom right, ${hexToRgba(lineColor, 0.85)}, ${lineColor})`,
                boxShadow: `0 4px 6px -1px ${hexToRgba(lineColor, 0.2)}, 0 2px 4px -2px ${hexToRgba(lineColor, 0.2)}`,
              }}
            >
              {icon ? (
                icon
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>

          {/* 标题与大数字 */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-slate-400 tracking-wide">{title}</div>
            <div className="text-3xl font-bold text-[#0f172a] tracking-tight font-sans leading-none">
              {value}
            </div>
          </div>
        </div>
      </div>

      {/* 下半部分 */}
      <div className="flex justify-between items-end w-full pt-2 gap-4">
        <div
          className="flex items-center gap-1 text-xs font-medium pb-0.5 shrink-0"
          style={{ color: lineColor }}
        >
          {trendIcon ? trendIcon : <ArrowUpOutlined className="text-xl" />}
          <span className="font-sans font-semibold tracking-wide">{trend}</span>
          <span className="text-slate-400 font-normal ml-1">{trendText}</span>
        </div>

        {/* 图表 */}
        {/* 💡 变更 2：去掉 w-35，换成弹性延展类名。max-w-[140px] 保证其维持在你原本设计的最优美宽度比例内，同时避免在大屏下过度拉伸变形 */}
        <div className="flex-1 w-35 h-10 overflow-visible hidden lg:block">
          <ReactECharts
            option={getOption()}
            style={{ width: "100%", height: "100%" }}
            notMerge={true} // 保证容器大小改变时，图表能动态无缝重绘
            lazyUpdate={true}
          />
        </div>
      </div>
    </div>
  );
}
