import React from "react";
import { Input, Button, Table, Select, Pagination, ConfigProvider, Space, Dropdown } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  DownOutlined,
  DashboardOutlined,
  CalendarOutlined,
  AlertOutlined,
  WarningOutlined,
  SwapOutlined,
  CheckSquareOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";

export default function ProductStock() {
  // 1. 顶部五大核心大盘指标数据
  const statCards = [
    {
      title: "库存商品数",
      value: "1,256",
      trend: "up",
      ratio: "5.2%",
      icon: "📦",
      bg: "bg-blue-50/50",
    },
    {
      title: "总库存数量",
      value: "58,642",
      trend: "up",
      ratio: "3.6%",
      icon: "🗄️",
      bg: "bg-emerald-50/50",
    },
    {
      title: "低库存预警",
      value: "86",
      trend: "down",
      ratio: "8.5%",
      icon: "⚠️",
      bg: "bg-orange-50/50",
    },
    { title: "缺货商品", value: "23", trend: "up", ratio: "4.5%", icon: "🚨", bg: "bg-red-50/50" },
    {
      title: "库存总价值",
      value: "¥ 1,256,800",
      trend: "up",
      ratio: "6.3%",
      icon: "💰",
      bg: "bg-purple-50/50",
    },
  ];

  // 2. 紧凑型高密度表格列定义
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">商品信息</span>,
      dataIndex: "product",
      key: "product",
      width: 180,
      render: prod => (
        <div className="flex items-center gap-2.5 py-0.5 select-none">
          <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-lg shrink-0">
            {prod.thumb}
          </div>
          <span className="font-semibold text-gray-800 text-[13px] truncate">{prod.name}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">SKU/条码</span>,
      dataIndex: "skuCode",
      key: "skuCode",
      width: 160,
      render: sku => (
        <div className="flex flex-col leading-tight font-mono select-none">
          <span className="text-xs text-gray-700 font-medium">{sku.code}</span>
          <span className="text-[10px] text-gray-400 mt-0.5">{sku.barcode}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">分类</span>,
      dataIndex: "category",
      key: "category",
      width: 100,
      render: text => <span className="text-gray-600 text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">规格</span>,
      dataIndex: "spec",
      key: "spec",
      width: 120,
      render: text => <span className="text-gray-400 text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">库存数量</span>,
      dataIndex: "stockNum",
      key: "stockNum",
      width: 100,
      render: text => (
        <span className="text-gray-800 font-mono text-xs font-bold">{text.toLocaleString()}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">可用库存</span>,
      dataIndex: "availableNum",
      key: "availableNum",
      width: 100,
      render: text => (
        <span className="text-gray-600 font-mono text-xs font-semibold">
          {text.toLocaleString()}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">预警值</span>,
      dataIndex: "alertNum",
      key: "alertNum",
      width: 90,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">库存状态</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => {
        let styles = "text-emerald-600";
        let dot = "bg-emerald-500";
        if (status === "低库存") {
          styles = "text-orange-500";
          dot = "bg-orange-400";
        }
        if (status === "缺货") {
          styles = "text-red-500";
          dot = "bg-red-500";
        }
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium select-none">
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
            <span className={styles}>{status}</span>
          </div>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">最后更新</span>,
      dataIndex: "updateTime",
      key: "updateTime",
      width: 140,
      render: text => (
        <span className="text-gray-400 font-mono text-[11px] whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 110,
      render: () => (
        <div className="flex items-center gap-3 text-xs select-none whitespace-nowrap font-medium">
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors">
            编辑
          </span>
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "库存盘点" },
                { key: "2", label: "出入库明细" },
              ],
            }}
            trigger={["click"]}
          >
            <span className="text-blue-500 hover:text-blue-600 cursor-pointer flex items-center gap-0.5">
              更多 <DownOutlined className="text-[9px]" />
            </span>
          </Dropdown>
        </div>
      ),
    },
  ];

  // 3. 完美对应设计图的真实高保真库存数据
  const data = [
    {
      key: "1",
      product: { name: "智能手表 S2", thumb: "⌚" },
      skuCode: { code: "SW-S2-BLACK", barcode: "6971234567890" },
      category: "智能设备",
      spec: "黑色 / 42mm",
      stockNum: 1256,
      availableNum: 1156,
      alertNum: 300,
      status: "正常",
      updateTime: "2024-05-20 10:30:22",
    },
    {
      key: "2",
      product: { name: "无线耳机 Pro", thumb: "🎧" },
      skuCode: { code: "EAR-PRO-WHITE", barcode: "6971234567891" },
      category: "数码配件",
      spec: "白色",
      stockNum: 856,
      availableNum: 756,
      alertNum: 200,
      status: "正常",
      updateTime: "2024-05-20 09:15:33",
    },
    {
      key: "3",
      product: { name: "便携充电宝 10000mAh", thumb: "🔋" },
      skuCode: { code: "PB-10000-WHITE", barcode: "6971234567892" },
      category: "电源设备",
      spec: "白色",
      stockNum: 128,
      availableNum: 88,
      alertNum: 100,
      status: "低库存",
      updateTime: "2024-05-19 22:44:18",
    },
    {
      key: "4",
      product: { name: "机械键盘 K87", thumb: "⌨️" },
      skuCode: { code: "KB-K87-BLUE", barcode: "6971234567893" },
      category: "电脑办公",
      spec: "蓝色轴",
      stockNum: 45,
      availableNum: 15,
      alertNum: 50,
      status: "低库存",
      updateTime: "2024-05-19 18:23:55",
    },
    {
      key: "5",
      product: { name: "蓝牙音箱 Mini", thumb: "🔊" },
      skuCode: { code: "SP-MINI-BLACK", barcode: "6971234567894" },
      category: "影音娱乐",
      spec: "黑色",
      stockNum: 0,
      availableNum: 0,
      alertNum: 30,
      status: "缺货",
      updateTime: "2024-05-19 16:10:44",
    },
    {
      key: "6",
      product: { name: "手机支架 桌面款", thumb: "📱" },
      skuCode: { code: "HS-DESK-SILVER", barcode: "6971234567895" },
      category: "手机配件",
      spec: "银色",
      stockNum: 321,
      availableNum: 301,
      alertNum: 80,
      status: "正常",
      updateTime: "2024-05-19 12:05:32",
    },
    {
      key: "7",
      product: { name: "数据线 Type-C", thumb: "🔌" },
      skuCode: { code: "CB-TC-100", barcode: "6971234567896" },
      category: "数码配件",
      spec: "1m / 白色",
      stockNum: 2156,
      availableNum: 2056,
      alertNum: 500,
      status: "正常",
      updateTime: "2024-05-18 11:20:30",
    },
    {
      key: "8",
      product: { name: "运动手环 6", thumb: "🏃" },
      skuCode: { code: "BW-6-BLACK", barcode: "6971234567897" },
      category: "智能设备",
      spec: "黑色",
      stockNum: 68,
      availableNum: 18,
      alertNum: 40,
      status: "低库存",
      updateTime: "2024-05-18 10:05:21",
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
        },
      }}
    >
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans antialiased text-gray-800">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none tracking-wide">
          首页 / 产品管理 / <span className="text-gray-900 font-medium">库存管理</span>
        </div>

        {/* 标题区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <DashboardOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">库存管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理产品库存，实时监控库存数量，设置库存预警，避免缺货或积压
            </p>
          </div>
        </div>

        {/* 顶部五大统计指标大盘 */}
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

        {/* 主工作舱 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧主要表格舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 高阶组合多项条件筛查条 */}
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索商品名称、SKU、条形..."
                  className="h-8 text-xs w-52 bg-white"
                />
                <Select
                  defaultValue="allCat"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allCat", label: "全部分类" }]}
                />
                <Select
                  defaultValue="allBrand"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allBrand", label: "全部品牌" }]}
                />
                <Select
                  defaultValue="allStatus"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allStatus", label: "全部状态" }]}
                />
                <Select
                  defaultValue="stockStatus"
                  className="h-8 text-xs w-28"
                  options={[{ value: "stockStatus", label: "库存状态" }]}
                />

                {/* 极简自定义范围数值输入流 */}
                <div className="flex items-center bg-white border border-gray-200 rounded h-8 px-2 text-xs gap-1">
                  <input
                    type="text"
                    placeholder="最小库存"
                    className="w-14 outline-none text-center text-gray-700 bg-transparent"
                  />
                  <span className="text-gray-300">~</span>
                  <input
                    type="text"
                    placeholder="最大库存"
                    className="w-14 outline-none text-center text-gray-700 bg-transparent"
                  />
                  <CalendarOutlined className="text-gray-400 ml-1" />
                </div>

                <Button
                  icon={<ReloadOutlined />}
                  className="h-8 w-8 flex items-center justify-center p-0 text-gray-500 bg-gray-50 ml-auto"
                />
                <Button
                  type="primary"
                  icon={<ExportOutlined />}
                  className="h-8 text-xs bg-blue-600 font-medium"
                >
                  导出
                </Button>
              </div>

              {/* 数据表载体 */}
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

              {/* 尾部分页流 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-slate-400 font-medium">共 1,256 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={1256}
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

          {/* 右侧垂直分析监控侧舱挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：库存状态分布圆环 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-4">库存状态分布</h3>
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="relative w-20 h-20 rounded-full border-[10px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-orange-400 border-r-red-400 border-b-transparent border-l-transparent -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">总体状态</span>
                    <span className="text-xs font-extrabold text-gray-900 block font-mono">
                      健康
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-[11px] space-y-1.5 font-sans">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">🟢 正常</span>
                    <span className="text-gray-700 font-mono font-medium">1,032 (81.8%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">🟡 低库存</span>
                    <span className="text-gray-700 font-mono font-medium">86 (6.8%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">🔴 缺货</span>
                    <span className="text-gray-700 font-mono font-medium">23 (1.8%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="flex items-center gap-1">⚫ 未启用</span>
                    <span className="text-gray-700 font-mono font-medium">115 (9.1%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 看板二：波形拟态库存走势 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-gray-800 m-0">库存趋势 (近 7 天)</h3>
                <span className="text-[10px] text-gray-400 font-mono font-medium">
                  05-20: 58,642
                </span>
              </div>
              <div className="h-20 flex items-end justify-between px-2 pt-4 relative">
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-100"></div>
                <div className="w-1.5 bg-blue-500/20 rounded-t h-[60%]"></div>
                <div className="w-1.5 bg-blue-500/20 rounded-t h-[50%]"></div>
                <div className="w-1.5 bg-blue-500/20 rounded-t h-[55%]"></div>
                <div className="w-1.5 bg-blue-500/20 rounded-t h-[45%]"></div>
                <div className="w-1.5 bg-blue-500/20 rounded-t h-[70%]"></div>
                <div className="w-1.5 bg-blue-500/20 rounded-t h-[65%]"></div>
                <div className="w-1.5 bg-blue-500 rounded-t h-[85%]"></div>
              </div>
              <div className="flex justify-between text-[9px] text-gray-400 mt-2 font-mono px-1">
                <span>05-14</span>
                <span>05-17</span>
                <span>05-20</span>
              </div>
            </div>

            {/* 看板三：库存预警快速核查挂件 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">库存预警</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center border border-orange-100 bg-orange-50/20 px-3 py-2 rounded cursor-pointer hover:bg-orange-50/50 transition-colors text-xs">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <AlertOutlined className="text-orange-500" /> 低库存商品
                  </span>
                  <span className="font-mono font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100">
                    86 ＞
                  </span>
                </div>
                <div className="flex justify-between items-center border border-red-100 bg-red-50/20 px-3 py-2 rounded cursor-pointer hover:bg-red-50/50 transition-colors text-xs">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <WarningOutlined className="text-red-500" /> 缺货商品
                  </span>
                  <span className="font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                    23 ＞
                  </span>
                </div>
              </div>
            </div>

            {/* 看板四：底部方格快速入口 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <SwapOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">库存调拨</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <CheckSquareOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">库存盘点</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <CloudUploadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">库存导入</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <CloudDownloadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">库存导出</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 极紧凑全局排版覆盖样式 */}
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
      `}</style>
    </ConfigProvider>
  );
}
