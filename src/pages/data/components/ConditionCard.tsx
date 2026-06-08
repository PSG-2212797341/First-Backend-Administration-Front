import { Table, Tag, Timeline, type TableProps } from "antd";
import ReactECharts from "echarts-for-react";

const ConditionCard = () => {
  // 3. 系统负载（小折线图）
  const getLoadOption = () => ({
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
    xAxis: {
      type: "category",
      show: false,
      data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
    },
    yAxis: { type: "value", show: false },
    series: [
      {
        data: [30, 45, 35, 50, 38, 48, 42],
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: "#3b82f6" },
      },
    ],
  });

  // --- 区域分布列表数据 ---
  // 1. 完善的 DataType
  interface RegionDataType {
    key: string;
    region: string;
    count: string; // 看之前的截图，订单数带了逗号分隔符（如 8,742），所以这里用 string
  }
  const regionColumns: TableProps<RegionDataType>["columns"] = [
    { title: "地区", dataIndex: "region", key: "region" },
    {
      title: "订单数",
      dataIndex: "count",
      key: "count",
      align: "right",
      render: text => <span className="font-semibold">{text}</span>,
    },
  ];
  const regionData = [
    { key: "1", region: "华东地区", count: "8,742" },
    { key: "2", region: "华南地区", count: "4,562" },
    { key: "3", region: "华北地区", count: "2,843" },
    { key: "4", region: "西南地区", count: "1,523" },
    { key: "5", region: "其他地区", count: "722" },
  ];

  {
    /* 💡 替代外层 Row：在小屏/平板下是一列单卡纵向平铺，在 lg 屏（电脑端）横向平分 3 列 */
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ==================== 1. 左侧：系统运行状态 + 最新动态 ==================== */}
      {/* 💡 统一使用 Flex 纵向盒：gap-5 让内部的两个纯白容器自然保持 20px 间距 */}
      <div className="flex flex-col gap-5">
        {/* 系统运行状态 */}
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col">
          <div className="mb-4">
            <span className="text-sm font-bold text-gray-800">系统运行状态</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "网关状态", val: "正常", sub: "23 台在线", dot: "text-emerald-500" },
              { name: "数据库状态", val: "正常", sub: "响应 23ms", dot: "text-emerald-500" },
              { name: "存储使用率", val: "45%", sub: "已用 512G/1T", dot: "text-blue-500" },
              { name: "服务可用性", val: "92%", sub: "命中率稳定", dot: "text-purple-500" },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50/80 border border-gray-100/60 p-3 rounded-lg">
                <div className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`}></span>
                  {s.name}
                </div>
                <div className="text-base font-bold text-gray-800">{s.val}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 最新动态 */}
        <div className="bg-white rounded-xl shadow-md p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-gray-800">最新动态</span>
            <a className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer">查看更多</a>
          </div>
          {/* 保持 Antd 的时间轴节点组件畅快渲染 */}
          <div className="flex-1">
            <Timeline
              className="pt-2 text-xs"
              items={[
                {
                  children: (
                    <div className="flex justify-between">
                      <span>
                        新订单
                        <Tag color="blue" className="scale-90 mx-1 border-0">
                          订单
                        </Tag>
                        #ORD-001 已创建
                      </span>
                      <span className="text-gray-400 font-mono">10:30</span>
                    </div>
                  ),
                  color: "blue",
                },
                {
                  children: (
                    <div className="flex justify-between">
                      <span>
                        新用户
                        <Tag color="green" className="scale-90 mx-1 border-0">
                          用户
                        </Tag>
                        李四 完成注册
                      </span>
                      <span className="text-gray-400 font-mono">10:15</span>
                    </div>
                  ),
                  color: "green",
                },
                {
                  children: (
                    <div className="flex justify-between">
                      <span>
                        系统版本更新至
                        <Tag color="orange" className="scale-90 mx-1 border-0">
                          系统
                        </Tag>
                        v2.6.0
                      </span>
                      <span className="text-gray-400 font-mono">09:45</span>
                    </div>
                  ),
                  color: "orange",
                },
                {
                  children: (
                    <div className="flex justify-between">
                      <span className="text-gray-600">服务器负载高告警已恢复</span>
                      <span className="text-gray-400 font-mono">09:30</span>
                    </div>
                  ),
                  color: "gray",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ==================== 2. 中间：区域分布 ==================== */}
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">
        <div className="mb-4">
          <span className="text-sm font-bold text-gray-800">区域分布</span>
        </div>
        {/* 模拟地图展示槽 */}
        <div className="bg-blue-50/40 border border-dashed border-blue-100 rounded-lg h-36 flex items-center justify-center text-xs text-blue-400 mb-4 shrink-0">
          [ Mock: 地图数据热力分布投影区 ]
        </div>
        {/* 内容区域，利用 Table 组件自带的自适应扩展 */}
        <div className="flex-1 w-full overflow-hidden">
          <Table
            columns={regionColumns}
            dataSource={regionData}
            pagination={false}
            size="small"
            className="border-t border-gray-50 text-xs"
          />
        </div>
      </div>

      {/* ==================== 3. 右侧：系统资源使用 ==================== */}
      <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">
        <div className="mb-4">
          <span className="text-sm font-bold text-gray-800">系统资源使用</span>
        </div>

        {/* 仪表盘三环布局 */}
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          {[
            { name: "CPU 使用率", val: "23%", color: "text-emerald-500" },
            { name: "内存使用率", val: "45%", color: "text-blue-500" },
            { name: "磁盘使用率", val: "52%", color: "text-indigo-500" },
          ].map((dash, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-gray-100 flex items-center justify-center bg-white shadow-sm">
                <span className={`text-xs font-bold ${dash.color}`}>{dash.val}</span>
              </div>
              <span className="text-[11px] text-gray-500 mt-1.5">{dash.name}</span>
              <span className="text-[10px] text-emerald-400 font-medium">正常</span>
            </div>
          ))}
        </div>

        {/* 下半部分趋势图：纯 Tailwind 替代自带 border 的 Card Footer 结构 */}
        <div className="border-t border-gray-100/70 pt-4 mt-auto">
          <div className="text-xs font-bold text-gray-500 mb-2">系统负载状态趋势</div>
          <div className="h-24 w-full overflow-visible">
            <ReactECharts option={getLoadOption()} style={{ height: "100%", width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionCard;
