import React from "react";
import {
  Input,
  Button,
  Table,
  Switch,
  Pagination,
  ConfigProvider,
  Dropdown,
  Space,
  Progress,
} from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  BlockOutlined,
  GlobalOutlined,
  AppleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export default function ProductBrand() {
  // 1. 顶部 4 个品牌核心指标数据 (完美对应 UI 稿)
  const statCards = [
    {
      title: "全部品牌",
      value: "128",
      trend: "up",
      ratio: "5.6%",
      icon: "🏷️",
      bg: "bg-blue-50/50",
      text: "text-blue-500",
    },
    {
      title: "启用品牌",
      value: "112",
      trend: "up",
      ratio: "6.7%",
      icon: "🟩",
      bg: "bg-emerald-50/50",
      text: "text-emerald-500",
    },
    {
      title: "停用品牌",
      value: "16",
      trend: "down",
      ratio: "3.2%",
      icon: "⏸️",
      bg: "bg-orange-50/50",
      text: "text-orange-500",
    },
    {
      title: "新增品牌 (本月)",
      value: "8",
      trend: "up",
      ratio: "14.3%",
      icon: "✨",
      bg: "bg-purple-50/50",
      text: "text-purple-500",
    },
  ];

  // 右侧看板：品牌分布国家排行数据
  const brandDistributions = [
    { country: "中国", count: 56, percent: 43.8 },
    { country: "美国", count: 22, percent: 17.2 },
    { country: "日本", count: 12, percent: 9.4 },
    { country: "德国", count: 10, percent: 7.8 },
    { country: "韩国", count: 8, percent: 6.3 },
    { country: "其他", count: 20, percent: 15.5 },
  ];

  // 2. 表格列配置 (锁定非换行与硬朗微圆角)
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">品牌信息</span>,
      dataIndex: "name",
      key: "brandInfo",
      width: 220,
      render: (text, record) => (
        <div className="flex items-center gap-3 py-0.5 min-w-0">
          {/* 品牌精细 Logo 载体容器 */}
          <div className="w-9 h-9 bg-gray-50 rounded border border-gray-200/60 flex items-center justify-center text-base shrink-0 select-none shadow-sm font-bold text-gray-700">
            {record.logoPlaceholder}
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-semibold text-gray-900 text-[13px] truncate">{text}</div>
            <div className="text-[11px] text-gray-400 font-mono mt-0.5">{record.code}</div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">所属分类</span>,
      dataIndex: "category",
      key: "category",
      width: 140,
      render: text => (
        <span className="text-gray-700 font-medium text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">国家/地区</span>,
      dataIndex: "country",
      key: "country",
      width: 120,
      render: text => <span className="text-gray-600 text-xs whitespace-nowrap">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 110,
      render: status => (
        <div className="flex items-center gap-2 select-none whitespace-nowrap">
          <span
            className={`text-[11px] px-2 py-0.5 rounded font-medium ${status ? "text-emerald-600 bg-emerald-50 border border-emerald-100" : "text-rose-600 bg-rose-50 border border-rose-100"}`}
          >
            {status ? "启用" : "停用"}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">排序</span>,
      dataIndex: "sort",
      key: "sort",
      width: 80,
      render: text => (
        <span className="text-gray-500 font-mono text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">创建时间</span>,
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
      render: text => (
        <span className="text-gray-400 font-mono text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center gap-3 text-xs select-none whitespace-nowrap">
          <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors">
            编辑
          </span>
          <span
            className={`${record.status ? "text-orange-500 hover:text-orange-600" : "text-emerald-500 hover:text-emerald-600"} font-medium cursor-pointer transition-colors`}
          >
            {record.status ? "停用" : "启用"}
          </span>
          <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors flex items-center gap-0.5">
            更多 <DownOutlined className="text-[8px] scale-90" />
          </span>
        </div>
      ),
    },
  ];

  // 3. 完美还原真实图片中的品牌数据集
  const data = [
    {
      key: "1",
      name: "Apple (苹果)",
      code: "BRAND00001",
      category: "数码配件",
      country: "美国",
      status: true,
      sort: 1,
      createTime: "2024-03-15 10:23:11",
      logoPlaceholder: "🍎",
    },
    {
      key: "2",
      name: "Xiaomi (小米)",
      code: "BRAND00002",
      category: "智能设备",
      country: "中国",
      status: true,
      sort: 2,
      createTime: "2024-03-16 14:35:22",
      logoPlaceholder: "MI",
    },
    {
      key: "3",
      name: "Huawei (华为)",
      code: "BRAND00003",
      category: "智能设备",
      country: "中国",
      status: true,
      sort: 3,
      createTime: "2024-03-17 09:18:45",
      logoPlaceholder: "HW",
    },
    {
      key: "4",
      name: "Nike (耐克)",
      code: "BRAND00004",
      category: "运动户外",
      country: "美国",
      status: true,
      sort: 4,
      createTime: "2024-03-18 11:22:33",
      logoPlaceholder: "✔️",
    },
    {
      key: "5",
      name: "Adidas (阿迪达斯)",
      code: "BRAND00005",
      category: "运动户外",
      country: "德国",
      status: true,
      sort: 5,
      createTime: "2024-03-19 16:45:12",
      logoPlaceholder: "👟",
    },
    {
      key: "6",
      name: "Lenovo (联想)",
      code: "BRAND00006",
      category: "电脑办公",
      country: "中国",
      status: true,
      sort: 6,
      createTime: "2024-03-20 10:10:55",
      logoPlaceholder: "LN",
    },
    {
      key: "7",
      name: "Samsung (三星)",
      code: "BRAND00007",
      category: "数码配件",
      country: "韩国",
      status: true,
      sort: 7,
      createTime: "2024-03-21 13:08:23",
      logoPlaceholder: "SS",
    },
    {
      key: "8",
      name: "Philips (飞利浦)",
      code: "BRAND00008",
      category: "家居生活",
      country: "荷兰",
      status: false,
      sort: 8,
      createTime: "2024-03-22 15:30:40",
      logoPlaceholder: "💡",
    },
    {
      key: "9",
      name: "Sony (索尼)",
      code: "BRAND00009",
      category: "数码配件",
      country: "日本",
      status: true,
      sort: 9,
      createTime: "2024-03-23 09:40:30",
      logoPlaceholder: "SN",
    },
    {
      key: "10",
      name: "Haier (海尔)",
      code: "BRAND00010",
      category: "家用电器",
      country: "中国",
      status: false,
      sort: 10,
      createTime: "2024-03-24 17:55:18",
      logoPlaceholder: "HR",
    },
  ];

  const bulkItems = [
    { key: "1", label: "批量启用" },
    { key: "2", label: "批量停用" },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 4, // 贯彻轻量化设计：所有圆角统一锁定在干练的 4px
          colorBgContainer: "#ffffff",
          controlInteractiveSize: 14,
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#555555",
            headerBorderRadius: 0,
            headerSplitColor: "transparent",
            cellPaddingInline: 16,
            cellPaddingBlock: 12,
            rowHoverBg: "#f9fbfd",
          },
        },
      }}
    >
      <div className="p-6 bg-[#f4f7f9] min-h-screen font-sans antialiased text-gray-800">
        {/* 面包屑 */}
        <div className="mb-4 text-xs text-gray-400 select-none tracking-wide">
          首页 / 产品管理 / <span className="text-gray-900 font-medium">品牌管理</span>
        </div>

        {/* 页面主标题区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <GlobalOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">品牌管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理平台品牌信息，支持添加、编辑、启用/禁用品牌
            </p>
          </div>
        </div>

        {/* 顶部四大度量大盘 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded border border-gray-100/80 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-gray-400 block mb-1 font-medium">{card.title}</span>
                <span className="text-xl font-bold text-gray-900 block tracking-tight">
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
                className={`w-9 h-9 ${card.bg} rounded flex items-center justify-center text-base`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 左右黄金排版布局 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧主要控制面板：全面贯彻一体化白底大工作舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 工具条流 */}
              <div className="flex justify-between items-center mb-4 gap-3 select-none">
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="bg-blue-600 h-8 text-xs font-medium"
                  >
                    新增品牌
                  </Button>
                  <Dropdown menu={{ items: bulkItems }} trigger={["click"]}>
                    <Button className="h-8 text-xs text-gray-600 bg-gray-50/50">
                      <Space>
                        批量操作 <DownOutlined className="text-[9px]" />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="搜索品牌名称或首字母"
                    className="w-52 sm:w-60 h-8 text-xs bg-white"
                  />
                  <Button
                    icon={<FilterOutlined className="text-xs text-gray-500" />}
                    className="h-8 text-xs px-3 bg-gray-50/50"
                  >
                    筛选
                  </Button>
                  <Button
                    icon={<ReloadOutlined className="text-xs" />}
                    className="w-8 h-8 flex items-center justify-center p-0 text-gray-400"
                  />
                </div>
              </div>

              {/* 数据表主战场 */}
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

              {/* 紧凑底部分页 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-gray-400 font-medium">共 128 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={128}
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
                      className="w-7 h-6 border border-gray-200 rounded text-center mx-1 text-gray-700 font-medium text-xs outline-none focus:border-blue-500"
                    />{" "}
                    页
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧精密看板栏挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：分类饼图数据分布 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-4">品牌概览</h3>
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="relative w-20 h-20 rounded-full border-[10px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-blue-500 border-r-indigo-500 border-b-transparent border-l-transparent -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">品牌总计</span>
                    <span className="text-xs font-extrabold text-gray-900 block">128</span>
                  </div>
                </div>
                <div className="flex-1 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="truncate">数码配件</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">42 (32.8%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span className="truncate">智能设备</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">28 (21.9%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
                      <span className="truncate">运动户外</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">18 (14.1%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
                      <span className="truncate">其他</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">40 (31.2%)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs">
                <span className="text-gray-400">品牌趋势 (近 7 天)</span>
                <span className="text-emerald-500 font-bold">新增品牌 5 个 ↑ 25%</span>
              </div>
            </div>

            {/* 看板二：垂直区域进度条分布 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">品牌分布 (按国家/地区)</h3>
              <div className="space-y-2.5">
                {brandDistributions.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between text-gray-600 mb-1 text-[11px]">
                      <span className="font-medium">{item.country}</span>
                      <span className="text-gray-400">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    {/* 精细横向微型进度条 */}
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

            {/* 看板三：微型格子快捷操作 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <PlusOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">新增品牌</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <CloudUploadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">
                    批量导入品牌
                  </span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <CloudDownloadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">
                    导出品牌数据
                  </span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <BlockOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">品牌分类</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 补充：全局样式微调抗换行 */}
      <style>{`
        .ant-table-custom .ant-table-thead > tr > th {
          font-size: 12px !important;
          border-bottom: 1px solid #efeef2 !important;
          white-space: nowrap !important;
        }
        .ant-table-custom .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f8f8fa !important;
          white-space: nowrap !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
