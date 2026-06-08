import ReactECharts from "echarts-for-react";
import { RightOutlined } from "@ant-design/icons";
import { List } from "antd";

const ImportantPipe: React.FC = () => {
  // ================= 🎨 业务分布环形图配置 =================
  const businessOption = {
    color: ["#3b82f6", "#f97316", "#a855f7", "#10b981", "#9ca3af"], // 对应原图配色
    title: {
      text: "总计\n\n12,487",
      left: "center",
      top: "center",
      textStyle: {
        rich: {
          // 这里利用 ECharts title 的 rich 属性控制中间两行字的大小与颜色
          total: { fontSize: 12, color: "#9ca3af", fontWeight: "normal", align: "center" },
          num: { fontSize: 18, color: "#1f2937", fontWeight: "bold", align: "center" },
        },
      },
      // 格式化中间文字的排版
      formatter: function () {
        return "{total|总计}\n{num|12,487}";
      },
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "80%"], // 控制内圈和外圈半径，形成高质感细环
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: { show: false }, // 隐藏自带的指向线标签，使用右侧纯手写原生UI对齐
        emphasis: { disabled: true }, // 禁用高亮放大，保持大图静态高级感
        data: [
          { value: 4320, name: "企业用户" },
          { value: 3284, name: "个人用户" },
          { value: 2123, name: "合作伙伴" },
          { value: 1892, name: "访客用户" },
          { value: 1228, name: "其他" },
        ],
      },
    ],
  };

  // ================= 🎨 订单状态环形图配置 =================
  const orderOption = {
    color: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"], // 绿、黄、蓝、红
    title: {
      text: "总计\n\n3,247",
      left: "center",
      top: "center",
      textStyle: {
        rich: {
          total: { fontSize: 12, color: "#9ca3af", fontWeight: "normal", align: "center" },
          num: { fontSize: 18, color: "#1f2937", fontWeight: "bold", align: "center" },
        },
      },
      formatter: function () {
        return "{total|总计}\n{num|3,247}";
      },
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { disabled: true },
        data: [
          { value: 1829, name: "已完成" },
          { value: 685, name: "待付款" },
          { value: 537, name: "处理中" },
          { value: 196, name: "已取消" },
        ],
      },
    ],
  };

  // ================= 📋 待办事项数据源 =================
  const todoData = [
    { color: "bg-red-500", text: "有 8 个用户待审核", time: "10 分钟前" },
    { color: "bg-blue-500", text: "有 5 个订单待处理", time: "30 分钟前" },
    { color: "bg-green-500", text: "有 3 条内容待发布", time: "1 小时前" },
    { color: "bg-orange-500", text: "有 12 条消息未读", time: "2 小时前" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* 🟢 卡片 1：业务分布 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col h-70">
          <h3 className="font-bold text-gray-800 m-0 text-base mb-2">业务分布</h3>
          <div className="flex items-center justify-between flex-1 min-h-0">
            {/* 左侧环形图 */}
            <div className="w-[45%] h-full">
              <ReactECharts
                option={businessOption}
                style={{ height: "100%", width: "100%" }}
                notMerge={true}
              />
            </div>
            {/* 右侧数据指标列 */}
            <div className="w-[55%] space-y-2.5 pl-2">
              {[
                { label: "企业用户", num: "4,320", percent: "33.6%", dot: "bg-blue-500" },
                { label: "个人用户", num: "3,284", percent: "25.6%", dot: "bg-orange-500" },
                { label: "合作伙伴", num: "2,123", percent: "16.5%", dot: "bg-purple-500" },
                { label: "访客用户", num: "1,892", percent: "14.7%", dot: "bg-green-500" },
                { label: "其他", num: "1,228", percent: "9.6%", dot: "bg-gray-400" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                    <span className="text-gray-500">{item.label}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="font-semibold text-gray-700">{item.num}</span>
                    <span className="text-gray-400">{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔵 卡片 2：订单状态 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col h-70">
          <h3 className="font-bold text-gray-800 m-0 text-base mb-2">订单状态</h3>
          <div className="flex items-center justify-between flex-1 min-h-0">
            {/* 左侧环形图 */}
            <div className="w-[45%] h-full">
              <ReactECharts
                option={orderOption}
                style={{ height: "100%", width: "100%" }}
                notMerge={true}
              />
            </div>
            {/* 右侧数据指标列 */}
            <div className="w-[55%] space-y-3 pl-2">
              {[
                { label: "已完成", num: "1,829", percent: "56.3%", dot: "bg-green-500" },
                { label: "待付款", num: "685", percent: "21.1%", dot: "bg-amber-500" },
                { label: "处理中", num: "537", percent: "16.5%", dot: "bg-blue-500" },
                { label: "已取消", num: "196", percent: "6.0%", dot: "bg-red-500" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                    <span className="text-gray-500">{item.label}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="font-semibold text-gray-700">{item.num}</span>
                    <span className="text-gray-400">{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔴 卡片 3：待办事项 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col h-70">
          <h3 className="font-bold text-gray-800 m-0 text-base mb-2">待办事项</h3>

          {/* 利用 Antd List 完美的底层结构进行渲染 */}
          <List
            dataSource={todoData}
            className="flex-1 flex flex-col justify-between"
            renderItem={item => (
              <List.Item className="border-b border-gray-50 hover:bg-gray-50 px-2 rounded-xl transition-colors cursor-pointer flex items-center justify-between group py-2.5">
                <div className="flex items-center space-x-3">
                  {/* 1:1 还原大图中的纯色小圆点 */}
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                  <span>{item.time}</span>
                  <RightOutlined className="text-[10px] text-gray-300 group-hover:text-gray-400 transition-colors" />
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ImportantPipe;
