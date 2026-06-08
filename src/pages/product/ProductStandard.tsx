import React from "react";
import { Input, Button, Table, Select, Pagination, ConfigProvider, Dropdown, Space } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  DownOutlined,
  FilterOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  OrderedListOutlined,
  DeploymentUnitOutlined,
  BgColorsOutlined,
  ExpandOutlined,
  BlockOutlined,
  TagOutlined,
} from "@ant-design/icons";

export default function ProductStandard() {
  // 1. 顶部 4 个规格核心度量数据 (完美对应 UI 稿)
  const statCards = [
    {
      title: "全部规格",
      value: "156",
      trend: "up",
      ratio: "6.1%",
      icon: "⚙️",
      bg: "bg-blue-50/50",
      text: "text-blue-500",
    },
    {
      title: "启用规格",
      value: "142",
      trend: "up",
      ratio: "5.8%",
      icon: "🟩",
      bg: "bg-emerald-50/50",
      text: "text-emerald-500",
    },
    {
      title: "停用规格",
      value: "14",
      trend: "down",
      ratio: "12.5%",
      icon: "⏸️",
      bg: "bg-orange-50/50",
      text: "text-orange-500",
    },
    {
      title: "规格值总数",
      value: "1,256",
      trend: "up",
      ratio: "8.3%",
      icon: "📊",
      bg: "bg-purple-50/50",
      text: "text-purple-500",
    },
  ];

  // 右侧看板：规格值数量统计区间数据
  const quantityStats = [
    { range: "0-10 个", count: 98, percent: 62.8 },
    { range: "11-20 个", count: 38, percent: 24.4 },
    { range: "21-30 个", count: 12, percent: 7.7 },
    { range: "30 个以上", count: 8, percent: 5.1 },
  ];

  // 2. 表格列配置 (贯彻干练微圆角与防换行)
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">规格名称</span>,
      dataIndex: "name",
      key: "specName",
      width: 180,
      render: (text, record) => (
        <div className="flex items-center gap-3 py-0.5 select-none">
          <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-xs shrink-0 font-medium text-slate-500 shadow-sm">
            {record.icon}
          </div>
          <span className="font-semibold text-gray-800 text-[13px]">{text}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">规格类型</span>,
      dataIndex: "type",
      key: "type",
      width: 120,
      render: type => (
        <span
          className={`text-[11px] px-2 py-0.5 rounded font-medium ${
            type === "单选"
              ? "text-blue-600 bg-blue-50 border border-blue-100/60"
              : "text-emerald-600 bg-emerald-50 border border-emerald-100/60"
          }`}
        >
          {type}
        </span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">规格值数量</span>,
      dataIndex: "valueCount",
      key: "valueCount",
      width: 110,
      render: text => <span className="text-gray-700 font-mono text-xs font-medium">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">状态</span>,
      dataIndex: "status",
      key: "status",
      width: 110,
      render: status => (
        <div className="flex items-center gap-1.5 select-none whitespace-nowrap text-xs">
          <span
            className={`w-1.5 h-1.5 rounded-full ${status ? "bg-emerald-500" : "bg-orange-400"}`}
          ></span>
          <span className={status ? "text-emerald-600 font-medium" : "text-orange-500 font-medium"}>
            {status ? "启用" : "停用"}
          </span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">排序</span>,
      dataIndex: "sort",
      key: "sort",
      width: 90,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">创建时间</span>,
      dataIndex: "createTime",
      key: "createTime",
      width: 160,
      render: text => <span className="text-gray-400 font-mono text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 160,
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
          <span className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors">
            删除
          </span>
        </div>
      ),
    },
  ];

  // 3. 完美对应规格管理界面的真实数据集
  const data = [
    {
      key: "1",
      name: "颜色",
      type: "单选",
      valueCount: 12,
      status: true,
      sort: 1,
      createTime: "2024-03-10 10:15:22",
      icon: "🎨",
    },
    {
      key: "2",
      name: "尺寸",
      type: "单选",
      valueCount: 8,
      status: true,
      sort: 2,
      createTime: "2024-03-10 10:16:33",
      icon: "📏",
    },
    {
      key: "3",
      name: "容量",
      type: "单选",
      valueCount: 6,
      status: true,
      sort: 3,
      createTime: "2024-03-10 10:17:45",
      icon: "📦",
    },
    {
      key: "4",
      name: "材质",
      type: "多选",
      valueCount: 9,
      status: true,
      sort: 4,
      createTime: "2024-03-11 09:20:11",
      icon: "🪵",
    },
    {
      key: "5",
      name: "型号",
      type: "单选",
      valueCount: 15,
      status: true,
      sort: 5,
      createTime: "2024-03-11 09:25:34",
      icon: "#️⃣",
    },
    {
      key: "6",
      name: "版本",
      type: "单选",
      valueCount: 5,
      status: false,
      sort: 6,
      createTime: "2024-03-11 09:30:55",
      icon: "📄",
    },
    {
      key: "7",
      name: "风格",
      type: "多选",
      valueCount: 7,
      status: true,
      sort: 7,
      createTime: "2024-03-12 11:05:22",
      icon: "👕",
    },
    {
      key: "8",
      name: "适用人群",
      type: "单选",
      valueCount: 4,
      status: false,
      sort: 8,
      createTime: "2024-03-12 11:15:33",
      icon: "👥",
    },
    {
      key: "9",
      name: "包装规格",
      type: "单选",
      valueCount: 6,
      status: true,
      sort: 9,
      createTime: "2024-03-12 11:20:44",
      icon: "🎁",
    },
    {
      key: "10",
      name: "季节",
      type: "多选",
      valueCount: 4,
      status: true,
      sort: 10,
      createTime: "2024-03-13 14:10:21",
      icon: "☀️",
    },
  ];

  const bulkItems = [
    { key: "1", label: "批量启用" },
    { key: "2", label: "批量禁用" },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 4, // 贯彻无感轻圆角，整体风格向高密紧凑看齐
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
          首页 / 产品管理 / <span className="text-gray-900 font-medium">规格管理</span>
        </div>

        {/* 标题说明区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <DeploymentUnitOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">规格管理</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              管理商品规格信息，支持添加、编辑、删除规格及规格值
            </p>
          </div>
        </div>

        {/* 顶部品盘大卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded border border-gray-200/60 shadow-sm flex items-center justify-between"
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

        {/* 主工作舱：双列黄金横排布局 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧主要大白底容器 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 核心筛选与工具链 */}
              <div className="flex flex-wrap justify-between items-center mb-4 gap-3 select-none">
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    className="bg-blue-600 h-8 text-xs font-medium"
                  >
                    新建规格
                  </Button>
                  <Dropdown menu={{ items: bulkItems }} trigger={["click"]}>
                    <Button className="h-8 text-xs text-gray-600 bg-gray-50/50">
                      <Space>
                        批量操作 <DownOutlined className="text-[9px]" />
                      </Space>
                    </Button>
                  </Dropdown>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <Select
                    defaultValue="allStatus"
                    className="w-28 h-8 text-xs"
                    options={[{ value: "allStatus", label: "全部状态" }]}
                  />
                  <Select
                    defaultValue="allTypes"
                    className="w-28 h-8 text-xs"
                    options={[{ value: "allTypes", label: "全部类型" }]}
                  />
                  <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="搜索规格名称"
                    className="w-48 h-8 text-xs bg-white"
                  />
                  <Button
                    icon={<SearchOutlined />}
                    className="h-8 w-8 flex items-center justify-center p-0 text-gray-500 bg-gray-50"
                  />
                  <Button
                    icon={<ReloadOutlined className="text-xs" />}
                    className="w-8 h-8 flex items-center justify-center p-0 text-gray-400"
                  />
                </div>
              </div>

              {/* 表格实体 */}
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

              {/* 紧凑底部分页流 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-slate-400 font-medium">共 156 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={156}
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

          {/* 右侧精密微调分析看板 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 看板一：规格类型分布（完美饼状渲染映射） */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-4">规格类型分布</h3>
              <div className="flex items-center justify-between gap-4 py-1">
                <div className="relative w-20 h-20 rounded-full border-[10px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[10px] border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent -m-[10px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">类型分布</span>
                    <span className="text-xs font-extrabold text-gray-900 block">156</span>
                  </div>
                </div>
                <div className="flex-1 text-[11px] space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      <span className="truncate">单选规格</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">112 (71.8%)</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span className="truncate">多选规格</span>
                    </div>
                    <span className="text-gray-700 font-medium shrink-0">44 (28.2%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 看板二：规格值数量横向柱状图比例分布 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">规格值数量统计</h3>
              <div className="space-y-2.5">
                {quantityStats.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between text-gray-600 mb-1 text-[11px]">
                      <span className="font-medium">{item.range}</span>
                      <span className="text-gray-400">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    {/* 微型极简条形比例块 */}
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

            {/* 看板三：底层方格快捷入口 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快速操作</h3>
              <div className="grid grid-cols-4 gap-1 text-center">
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs mx-auto">
                    <PlusOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">新建规格</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-emerald-50 rounded text-emerald-500 flex items-center justify-center text-xs mx-auto">
                    <CloudUploadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">规格导入</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 rounded text-indigo-500 flex items-center justify-center text-xs mx-auto">
                    <CloudDownloadOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">导出数据</span>
                </div>
                <div className="p-1 hover:bg-gray-50 rounded cursor-pointer group transition-colors">
                  <div className="w-8 h-8 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs mx-auto">
                    <OrderedListOutlined />
                  </div>
                  <span className="text-[9px] text-gray-600 block mt-1.5 truncate">规格排序</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 高度防折行覆盖补丁 */}
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
        .ant-select-selector {
          height: 32px !important;
          display: flex !important;
          align-items: center !important;
        }
      `}</style>
    </ConfigProvider>
  );
}
