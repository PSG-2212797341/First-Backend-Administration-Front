import React from "react";
import {
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Switch,
  Space,
  Pagination,
  ConfigProvider,
} from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  AppstoreAddOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SyncOutlined,
  SettingOutlined,
  SlidersOutlined,
  ImportOutlined,
  DeleteOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function ProductListPage() {
  // 顶部 5 个指标卡片
  const statCards = [
    {
      title: "全部产品",
      value: "1,268",
      trend: "up",
      ratio: "6.8%",
      icon: "📄",
      bg: "bg-blue-50",
      text: "text-blue-500",
    },
    {
      title: "上架中",
      value: "892",
      trend: "up",
      ratio: "8.2%",
      icon: "🟩",
      bg: "bg-emerald-50",
      text: "text-emerald-500",
    },
    {
      title: "已下架",
      value: "176",
      trend: "down",
      ratio: "2.1%",
      icon: "🟧",
      bg: "bg-orange-50",
      text: "text-orange-500",
    },
    {
      title: "库存预警",
      value: "48",
      trend: "up",
      ratio: "12.5%",
      icon: "🟥",
      bg: "bg-rose-50",
      text: "text-rose-500",
    },
    {
      title: "销量总数 (本月)",
      value: "12,568",
      trend: "up",
      ratio: "9.4%",
      icon: "🟦",
      bg: "bg-sky-50",
      text: "text-sky-500",
    },
  ];

  // 右侧分类数据
  const categoryStats = [
    { name: "数码配件", count: 356, percent: "28.1%", color: "bg-cyan-400" },
    { name: "智能设备", count: 198, percent: "15.6%", color: "bg-blue-500" },
    { name: "电脑外设", count: 287, percent: "22.6%", color: "bg-indigo-500" },
    { name: "家居生活", count: 215, percent: "17.0%", color: "bg-purple-400" },
    { name: "箱包", count: 142, percent: "11.2%", color: "bg-orange-400" },
    { name: "其他", count: 70, percent: "5.5%", color: "bg-gray-400" },
  ];

  // 右侧库存预警
  const stockAlerts = [
    {
      name: "机械键盘 K87",
      value: "25",
      label: "库存不足",
      color: "text-red-500 bg-red-50 border-red-100",
    },
    {
      name: "便携充电宝 10000mAh",
      value: "库存 68",
      label: "库存预警",
      color: "text-orange-500 bg-orange-50 border-orange-100",
    },
    {
      name: "无线鼠标 M3",
      value: "库存 89",
      label: "库存预警",
      color: "text-orange-500 bg-orange-50 border-orange-100",
    },
    {
      name: "智能手表 S2",
      value: "库存 156",
      label: "库存预警",
      color: "text-orange-500 bg-orange-50 border-orange-100",
    },
  ];

  const renderSortHeader = title => (
    <div className="flex items-center gap-1.5 cursor-pointer group select-none whitespace-nowrap">
      <span className="text-gray-500 font-medium text-xs group-hover:text-gray-800 transition-colors">
        {title}
      </span>
      <div className="flex flex-col text-[8px] leading-[0] text-gray-300 scale-90">
        <CaretUpOutlined className="group-hover:text-blue-500 transition-colors" />
        <CaretDownOutlined className="mt-[2px] group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
  );

  // 严格执行防换行规范的列配置
  const columns = [
    {
      title: renderSortHeader("产品信息"),
      dataIndex: "title",
      key: "productInfo",
      width: 240, // 设定基础宽度，超出自动省略
      render: (text, record) => (
        <div className="flex items-center gap-3 py-0.5 min-w-0">
          <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center text-lg border border-gray-100/80 shadow-sm shrink-0 select-none">
            {record.imgPlaceholder}
          </div>
          {/* 通过 min-w-0 和 truncate 锁定文本绝不换行，超出显示 ... */}
          <div className="min-w-0 leading-tight flex-1">
            <div
              className="font-semibold text-gray-800 text-[13px] truncate hover:text-blue-500 cursor-pointer"
              title={text}
            >
              {text}
            </div>
            <div className="text-[11px] text-gray-400 mt-1 whitespace-nowrap truncate">
              创建时间：{record.createTime}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">SKU/条码</span>,
      dataIndex: "sku",
      key: "sku",
      width: 140,
      render: (sku, record) => (
        <div className="text-xs leading-tight min-w-0">
          <div
            className="text-blue-500 font-medium hover:underline cursor-pointer truncate"
            title={sku}
          >
            {sku}
          </div>
          <div
            className="text-gray-400 mt-1 font-normal tracking-wide truncate"
            title={record.barcode}
          >
            {record.barcode}
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">分类/品牌</span>,
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (cat, record) => (
        <div className="text-xs leading-tight min-w-0">
          <div className="text-gray-700 font-medium truncate" title={cat}>
            {cat}
          </div>
          <div className="text-gray-400 mt-1 truncate" title={record.brand}>
            {record.brand}
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">价格</span>,
      dataIndex: "price",
      key: "price",
      width: 110,
      render: (price, record) => (
        <div className="text-xs leading-tight min-w-0">
          <div className="text-gray-900 font-bold whitespace-nowrap">￥{price}</div>
          <div className="text-gray-400 mt-1 whitespace-nowrap truncate">成本：￥{record.cost}</div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">库存</span>,
      dataIndex: "stock",
      key: "stock",
      width: 110,
      render: (stock, record) => {
        let tagClass = "text-emerald-500 bg-emerald-50/60 border-emerald-100";
        if (record.stockStatus === "库存预警")
          tagClass = "text-orange-500 bg-orange-50/60 border-orange-100";
        if (record.stockStatus === "库存不足" || record.stockStatus === "已缺货")
          tagClass = "text-red-500 bg-red-50/60 border-red-100";
        return (
          <div className="text-xs leading-tight">
            <div className="text-gray-800 font-bold mb-1.5 whitespace-nowrap">{stock}</div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${tagClass}`}
            >
              {record.stockStatus}
            </span>
          </div>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 100,
      render: status => {
        const isActive = status === "上架中";
        return (
          <div className="flex items-center gap-2 select-none whitespace-nowrap">
            <Switch defaultChecked={isActive} size="small" className="bg-gray-200 shrink-0" />
            <span
              className={`text-xs font-semibold ${isActive ? "text-blue-500" : "text-gray-400"}`}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">销量</span>,
      dataIndex: "sales",
      key: "sales",
      width: 80,
      render: sales => (
        <span className="font-bold text-gray-700 text-xs whitespace-nowrap">{sales}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs whitespace-nowrap">操作</span>,
      key: "action",
      width: 130, // 核心改动：固定操作列宽度，给予绝对充足的横向空间
      render: () => (
        /* 使用 whitespace-nowrap 锁死！无论是何种屏幕尺寸，该行内的文字绝不允许折行 */
        <div className="flex items-center gap-3 text-xs select-none whitespace-nowrap">
          <span className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer transition-colors">
            编辑
          </span>
          <span className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer transition-colors">
            复制
          </span>
          <span className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer transition-colors flex items-center gap-0.5">
            更多 <CaretDownOutlined className="text-[8px] scale-90" />
          </span>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "降噪蓝牙耳机 Pro 2026最新至尊无敌降噪旗舰版",
      createTime: "2024-04-20 10:30",
      sku: "SKU10001-LONG-STRING-NAME",
      barcode: "6941234567890",
      category: "数码配件",
      brand: "SoundCore",
      price: "699.00",
      cost: "499.00",
      stock: "328",
      stockStatus: "充足",
      status: "上架中",
      sales: "1,256",
      imgPlaceholder: "🎧",
    },
    {
      key: "2",
      title: "智能手表 S2",
      createTime: "2024-04-18 14:22",
      sku: "SKU10002",
      barcode: "6941234567891",
      category: "智能设备",
      brand: "WatchPro",
      price: "899.00",
      cost: "599.00",
      stock: "156",
      stockStatus: "充足",
      status: "上架中",
      sales: "896",
      imgPlaceholder: "⌚",
    },
    {
      key: "3",
      title: "便携充电宝 10000mAh",
      createTime: "2024-04-16 09:15",
      sku: "SKU10003",
      barcode: "6941234567892",
      category: "数码配件",
      brand: "Baseus",
      price: "129.00",
      cost: "79.00",
      stock: "68",
      stockStatus: "库存预警",
      status: "上架中",
      sales: "2,368",
      imgPlaceholder: "🔋",
    },
    {
      key: "4",
      title: "机械键盘 K87 复古红轴全键无冲有线机械键盘",
      createTime: "2024-04-15 16:40",
      sku: "SKU10004",
      barcode: "6941234567893",
      category: "电脑外设",
      brand: "Logitech",
      price: "499.00",
      cost: "299.00",
      stock: "25",
      stockStatus: "库存不足",
      status: "上架中",
      sales: "589",
      imgPlaceholder: "⌨️",
    },
    {
      key: "5",
      title: "商务双肩包",
      createTime: "2024-04-12 11:20",
      sku: "SKU10005",
      barcode: "6941234567894",
      category: "箱包",
      brand: "Samsonite",
      price: "299.00",
      cost: "159.00",
      stock: "0",
      stockStatus: "已缺货",
      status: "已下架",
      sales: "312",
      imgPlaceholder: "🎒",
    },
    {
      key: "6",
      title: "护眼台灯",
      createTime: "2024-04-10 13:05",
      sku: "SKU10006",
      barcode: "6941234567895",
      category: "家居生活",
      brand: "Philips",
      price: "199.00",
      cost: "109.00",
      stock: "132",
      stockStatus: "充足",
      status: "上架中",
      sales: "845",
      imgPlaceholder: "💡",
    },
    {
      key: "7",
      title: "Type-C 数据线 1m 编织耐磨快充线",
      createTime: "2024-04-09 10:10",
      sku: "SKU10007",
      barcode: "6941234567896",
      category: "数码配件",
      brand: "Anker",
      price: "39.90",
      cost: "19.90",
      stock: "520",
      stockStatus: "充足",
      status: "上架中",
      sales: "3,125",
      imgPlaceholder: "🔌",
    },
    {
      key: "8",
      title: "无线鼠标 M3",
      createTime: "2024-04-08 15:30",
      sku: "SKU10008",
      barcode: "6941234567897",
      category: "电脑外设",
      brand: "Logitech",
      price: "89.00",
      cost: "49.00",
      stock: "89",
      stockStatus: "充足",
      status: "上架中",
      sales: "1,124",
      imgPlaceholder: "🖱️",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 12,
          colorBgContainer: "#ffffff",
          controlInteractiveSize: 14,
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#555555",
            headerBorderRadius: 0,
            headerSplitColor: "transparent",
            cellPaddingInline: 14,
            cellPaddingBlock: 12,
            rowHoverBg: "#fcfcfc",
          },
        },
      }}
    >
      <div className="p-6 bg-[#f8fafc] min-h-screen font-sans antialiased">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none">
          首页 / 产品管理 / <span className="text-gray-900 font-medium">产品列表</span>
        </div>

        {/* 页面主标题 */}
        <div className="flex items-center gap-4 mb-6 select-none">
          <div className="w-10 h-10 bg-blue-50/80 rounded-xl flex items-center justify-center text-blue-500 text-xl shadow-sm border border-blue-100/50">
            <AppstoreOutlined />
          </div>
          <div>
            <h2 className="m-0 text-xl font-bold text-gray-900 tracking-tight">产品管理</h2>
            <p className="m-0 text-xs text-gray-400 mt-0.5">
              管理平台所有产品信息，支持产品新增、编辑、上下架、库存管理等操作
            </p>
          </div>
        </div>

        {/* 顶部统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-xs text-gray-400 block mb-1 font-medium">{card.title}</span>
                <span className="text-2xl font-bold text-gray-900 block tracking-tight">
                  {card.value}
                </span>
                <div className="flex items-center gap-1 mt-1 text-[11px]">
                  <span className="text-gray-400">较昨日</span>
                  <span
                    className={
                      card.trend === "up"
                        ? "text-emerald-500 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {card.trend === "up" ? (
                      <ArrowUpOutlined className="scale-90" />
                    ) : (
                      <ArrowDownOutlined className="scale-90" />
                    )}{" "}
                    {card.ratio}
                  </span>
                </div>
              </div>
              <div
                className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center text-lg`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 主区布局 */}
        <div className="flex flex-col xl:flex-row gap-6">
          {/* 左侧主要表格卡片 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_2px_8px_-2px_rgba(0,0,0,0.02)] border border-gray-100/80 p-5">
              {/* 内嵌一体化紧凑筛选栏 */}
              <div className="flex flex-wrap items-center gap-2.5 pb-4 mb-3">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索产品名称、SKU、条形码"
                  className="w-full sm:w-56 text-xs h-8"
                />
                <Select placeholder="全部分类" className="w-28 h-8 text-xs" allowClear />
                <Select placeholder="全部品牌" className="w-28 h-8 text-xs" allowClear />
                <Select placeholder="全部状态" className="w-28 h-8 text-xs" allowClear />
                <Select placeholder="库存状态" className="w-28 h-8 text-xs" allowClear />
                <RangePicker placeholder={["开始日期", "结束日期"]} className="w-48 h-8 text-xs" />
                <Button icon={<ReloadOutlined className="text-xs" />} className="h-8 text-xs px-3">
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="bg-blue-600 ml-auto h-8 text-xs font-medium"
                >
                  新增产品
                </Button>
              </div>

              {/* 数据表主体 - 容器开启 x 轴滚动，以防在低分辨率屏下强行挤压 */}
              <div className="overflow-hidden rounded-lg border border-gray-100/70">
                <Table
                  rowSelection={{ type: "checkbox" }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="w-full ant-table-custom"
                  scroll={{ x: "max-content" }} // 开启横向自适应滚动，确保防换行生效
                />
              </div>

              {/* 分页器底座 */}
              <div className="mt-4 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-gray-400 font-medium">共 1,268 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={1268}
                    defaultCurrent={1}
                    defaultPageSize={10}
                    size="small"
                    showSizeChanger
                  />
                  <span className="text-xs text-gray-400 ml-1">
                    跳至{" "}
                    <input
                      type="text"
                      defaultValue="1"
                      className="w-8 h-6 border border-gray-200 rounded text-center mx-1 text-gray-700 font-medium text-xs outline-none focus:border-blue-500"
                    />{" "}
                    页
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧边栏看板 */}
          <div className="w-full xl:w-80 shrink-0 flex flex-col gap-6 select-none">
            {/* 产品概览环形图 */}
            <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-bold text-gray-800 m-0">产品概览</h3>
                <span className="text-blue-500 text-xs font-medium cursor-pointer hover:underline">
                  更多 &gt;
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="relative w-24 h-24 rounded-full border-[12px] border-cyan-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[12px] border-t-blue-500 border-r-indigo-500 border-b-transparent border-l-transparent -m-[12px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[10px] text-gray-400 block mb-1">总产品数</span>
                    <span className="text-sm font-extrabold text-gray-900 block">1,268</span>
                  </div>
                </div>
                <div className="flex-1 text-[11px] space-y-1.5">
                  {categoryStats.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-gray-500">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.color} shrink-0`}></span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className="text-gray-700 font-semibold shrink-0">
                        {item.count} ({item.percent})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">本月新增产品</span>
                  <span className="text-base font-bold text-gray-800 block mt-0.5">126 条</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-500 font-semibold block">
                    <ArrowUpOutlined /> +15.4%
                  </span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">较上月同比</span>
                </div>
              </div>
            </div>

            {/* 库存预警列表 */}
            <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[13px] font-bold text-gray-800 m-0">库存预警</h3>
                <span className="text-blue-500 text-xs font-medium cursor-pointer hover:underline">
                  更多 &gt;
                </span>
              </div>
              <div className="space-y-2.5">
                {stockAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2.5 bg-gray-50/70 rounded-lg border border-gray-100 text-xs"
                  >
                    <div className="min-w-0 pr-2 leading-tight">
                      <div className="font-semibold text-gray-700 truncate">{alert.name}</div>
                      <div className="text-[11px] text-gray-400 mt-1">{alert.value}</div>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 font-semibold ${alert.color}`}
                    >
                      {alert.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 快捷操作常用宫格 */}
            <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
              <h3 className="text-[13px] font-bold text-gray-800 m-0 mb-4">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1.5 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors">
                  <div className="w-9 h-9 bg-blue-50/60 rounded-xl text-blue-500 flex items-center justify-center text-base mx-auto group-hover:scale-105 transition-transform">
                    <AppstoreAddOutlined />
                  </div>
                  <span className="text-[10px] text-gray-600 block mt-1.5 truncate font-medium">
                    新增产品
                  </span>
                </div>
                <div className="p-1.5 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors">
                  <div className="w-9 h-9 bg-indigo-50/60 rounded-xl text-indigo-500 flex items-center justify-center text-base mx-auto group-hover:scale-105 transition-transform">
                    <ImportOutlined />
                  </div>
                  <span className="text-[10px] text-gray-600 block mt-1.5 truncate font-medium">
                    产品导入
                  </span>
                </div>
                <div className="p-1.5 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors">
                  <div className="w-9 h-9 bg-purple-50/60 rounded-xl text-purple-500 flex items-center justify-center text-base mx-auto group-hover:scale-105 transition-transform">
                    <SlidersOutlined />
                  </div>
                  <span className="text-[10px] text-gray-600 block mt-1.5 truncate font-medium">
                    批量操作
                  </span>
                </div>
                <div className="p-1.5 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors">
                  <div className="w-9 h-9 bg-rose-50/60 rounded-xl text-rose-500 flex items-center justify-center text-base mx-auto group-hover:scale-105 transition-transform">
                    <DeleteOutlined />
                  </div>
                  <span className="text-[10px] text-gray-600 block mt-1.5 truncate font-medium">
                    回收站
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 精细化覆盖：剔除 Antd 底层可能导致的文字换行隐患 */}
      <style>{`
        .ant-table-custom .ant-table-thead > tr > th {
          font-size: 12px !important;
          border-bottom: 1px solid #f0f0f0 !important;
          white-space: nowrap !important; /* 表头也锁死不换行 */
        }
        .ant-table-custom .ant-table-tbody > tr > td {
          border-bottom: 1px solid #fbfbfb !important;
          white-space: nowrap !important; /* 单元格底层彻底锁死不换行 */
        }
      `}</style>
    </ConfigProvider>
  );
}
