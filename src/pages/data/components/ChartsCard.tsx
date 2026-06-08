import ReactECharts from "echarts-for-react";

const ChartsCard = () => {
  // 1. 业务趋势（折线面积图）
  const getTrendOption = () => ({
    tooltip: { trigger: "axis" },
    legend: { data: ["本期", "上期"], right: 10, top: 0, icon: "circle" },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["05-14", "05-15", "05-16", "05-17", "05-18", "05-19", "05-20"],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#9ca3af" },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#f0f0f0" } },
      axisLabel: { color: "#9ca3af" },
    },
    series: [
      {
        name: "本期",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: "#3b82f6" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59, 130, 246, 0.2)" },
              { offset: 1, color: "rgba(59, 130, 246, 0)" },
            ],
          },
        },
        data: [18000, 22000, 30000, 28000, 25000, 32000, 31000],
      },
      {
        name: "上期",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 1.5, type: "dashed", color: "#d1d5db" },
        data: [12000, 15000, 18000, 24000, 21000, 19000, 23000],
      },
    ],
  });

  // 2. 业务分布（环形图）
  const getPieOption = () => ({
    tooltip: { trigger: "item" },
    title: {
      text: "{val|18,392}\n{label|订单总数}",
      top: "center",
      left: "center",
      textStyle: {
        rich: {
          val: { fontSize: 20, fontWeight: "bold", color: "#1f2937", padding: [0, 0, 4, 0] },
          label: { fontSize: 11, color: "#9ca3af" },
        },
      },
    },
    series: [
      {
        name: "订单来源",
        type: "pie",
        radius: ["55%", "70%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 7452, name: "电商业务", itemStyle: { color: "#3b82f6" } },
          { value: 5632, name: "企业服务", itemStyle: { color: "#10b981" } },
          { value: 2843, name: "内容付费", itemStyle: { color: "#f59e0b" } },
          { value: 1836, name: "会员订阅", itemStyle: { color: "#8b5cf6" } },
          { value: 629, name: "其他业务", itemStyle: { color: "#9ca3af" } },
        ],
      },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
      {/* 1. 业务趋势 (大屏下占 4 份中的 2 份) */}
      {/* 💡 替代 Row：使用 grid 布局，gap-5 刚好对应 20px 的间距 */}
      {/* 💡 替代 Col: xl:col-span-2 控制大屏占比；md:col-span-2 确保平板端它能独自占满一整行 */}
      <div className="md:col-span-2 xl:col-span-2 bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">
        <div className="mb-4">
          <span className="text-sm font-bold text-gray-800">业务趋势</span>
        </div>
        <div className="flex-1 w-full">
          <ReactECharts option={getTrendOption()} style={{ height: "260px" }} />
        </div>
      </div>

      {/* 2. 业务分布 (大屏下占 4 份中的 1 份) */}
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">
        <div className="mb-3">
          <span className="text-sm font-bold text-gray-800">业务分布</span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative">
            <ReactECharts option={getPieOption()} style={{ height: "180px" }} />
          </div>
          {/* 业务分布紧凑图例描述 */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs px-2 mt-2">
            {[
              { name: "电商业务", per: "40.5%", dot: "bg-blue-500" },
              { name: "企业服务", per: "30.6%", dot: "bg-emerald-500" },
              { name: "内容付费", per: "15.5%", dot: "bg-amber-500" },
              { name: "会员订阅", per: "10.0%", dot: "bg-purple-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`}></span>
                  {item.name}
                </span>
                <span className="text-gray-400 font-mono">{item.per}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 用户来源 (大屏下占 4 份中的 1 份) */}
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col">
        <div className="mb-4">
          <span className="text-sm font-bold text-gray-800">用户来源</span>
        </div>
        <div className="flex-1 space-y-3.5 pt-1 flex flex-col justify-center">
          {[
            { id: 1, name: "直接访问", ratio: "42.3%", w: "42.3%" },
            { id: 2, name: "搜索引擎", ratio: "28.7%", w: "28.7%" },
            { id: 3, name: "外部链接", ratio: "17.6%", w: "17.6%" },
            { id: 4, name: "社交媒体", ratio: "7.8%", w: "7.8%" },
            { id: 5, name: "其他渠道", ratio: "3.6%", w: "3.6%" },
          ].map(item => (
            <div key={item.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 w-20">
                <span className="w-4 h-4 bg-gray-100 text-gray-400 rounded flex items-center justify-center text-[10px] font-bold font-mono">
                  {item.id}
                </span>
                <span className="text-gray-600 font-medium">{item.name}</span>
              </div>
              <div className="flex-1 mx-3 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: item.w }} />
              </div>
              <span className="text-gray-500 font-semibold font-mono w-10 text-right">
                {item.ratio}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartsCard;
