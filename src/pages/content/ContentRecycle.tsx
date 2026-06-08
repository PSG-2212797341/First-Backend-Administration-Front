import React, { useState } from "react";
import { Input, Button, Table, Select, DatePicker, Pagination, ConfigProvider, Avatar } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  DeleteFilled,
  UndoOutlined,
  FileTextOutlined,
  FolderOutlined,
  TagOutlined,
  MessageOutlined,
  ExclamationCircleOutlined,
  PieChartOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

export default function ContentRecycle() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 1. 顶部五大核心类目统计大盘
  const statCards = [
    {
      title: "全部条目",
      value: "368",
      trend: "up",
      ratio: "8.2%",
      icon: <FileTextOutlined />,
      bg: "bg-blue-50/50",
      color: "text-blue-500",
    },
    {
      title: "内容条目",
      value: "218",
      trend: "up",
      ratio: "7.6%",
      icon: <FileTextOutlined />,
      bg: "bg-emerald-50/50",
      color: "text-emerald-500",
    },
    {
      title: "栏目条目",
      value: "68",
      trend: "down",
      ratio: "2.1%",
      icon: <FolderOutlined />,
      bg: "bg-orange-50/50",
      color: "text-orange-500",
    },
    {
      title: "标签条目",
      value: "42",
      trend: "up",
      ratio: "3.4%",
      icon: <TagOutlined />,
      bg: "bg-indigo-50/50",
      color: "text-indigo-500",
    },
    {
      title: "评论条目",
      value: "40",
      trend: "down",
      ratio: "1.3%",
      icon: <MessageOutlined />,
      bg: "bg-cyan-50/50",
      color: "text-cyan-500",
    },
  ];

  // 右侧看板：数据统计占比
  const dataDistribution = [
    { name: "内容条目", count: 218, percent: "59.2%", color: "bg-emerald-400" },
    { name: "栏目条目", count: 68, percent: "18.5%", color: "bg-orange-400" },
    { name: "标签条目", count: 42, percent: "11.4%", color: "bg-indigo-400" },
    { name: "评论条目", count: 40, percent: "10.9%", color: "bg-cyan-400" },
  ];

  // 2. 混合型资产表格列定义
  const columns = [
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">标题 / 名称</span>,
      dataIndex: "asset",
      key: "asset",
      width: 280,
      render: asset => (
        <div className="flex items-center gap-2.5 py-0.5 select-none">
          {asset.thumb ? (
            <img
              src={asset.thumb}
              alt=""
              className="w-8 h-8 rounded object-cover border border-gray-100 shrink-0"
            />
          ) : (
            <div
              className={`w-8 h-8 rounded flex items-center justify-center text-sm shrink-0 border ${asset.iconBg} ${asset.iconColor}`}
            >
              {asset.icon}
            </div>
          )}
          <div className="min-w-0 leading-tight">
            <div className="text-xs text-gray-800 font-medium truncate max-w-[200px]">
              {asset.title}
            </div>
            <div className="text-[10px] text-gray-400 truncate max-w-[200px] mt-0.5">
              {asset.subTitle}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">类型</span>,
      dataIndex: "type",
      key: "type",
      width: 90,
      render: type => {
        let style = "text-blue-500 bg-blue-50";
        if (type === "栏目") style = "text-orange-500 bg-orange-50";
        if (type === "标签") style = "text-indigo-500 bg-indigo-50";
        if (type === "评论") style = "text-cyan-500 bg-cyan-50";
        return (
          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${style}`}>{type}</span>
        );
      },
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">内容类型</span>,
      dataIndex: "contentType",
      key: "contentType",
      width: 110,
      render: text => <span className="text-gray-600 text-xs">{text}</span>,
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">删除人</span>,
      dataIndex: "operator",
      key: "operator",
      width: 110,
      render: user => (
        <div className="flex items-center gap-2 select-none">
          <Avatar src={user.avatar} size={18} className="shrink-0 border border-gray-100" />
          <span className="text-xs text-gray-700 font-medium">{user.name}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">删除时间</span>,
      dataIndex: "deleteTime",
      key: "deleteTime",
      width: 150,
      render: text => (
        <span className="text-gray-400 font-mono text-xs whitespace-nowrap">{text}</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">剩余保留时间</span>,
      dataIndex: "remaining",
      key: "remaining",
      width: 110,
      render: days => (
        <span className="text-red-500 text-xs font-semibold font-sans">{days}天</span>
      ),
    },
    {
      title: <span className="text-gray-500 font-medium text-xs select-none">操作</span>,
      key: "action",
      width: 120,
      render: () => (
        <div className="flex items-center gap-3 text-xs font-medium select-none whitespace-nowrap">
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer">还原</span>
          <span className="text-red-500 hover:text-red-600 cursor-pointer">永久删除</span>
        </div>
      ),
    },
  ];

  // 3. 高度匹配设计图的回收站真实混合资产数据集
  const data = [
    {
      key: "1",
      asset: {
        title: "产品功能更新说明 2.0",
        subTitle: "全新版本功能升级与优化说明",
        thumb:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60",
      },
      type: "内容",
      contentType: "产品公告",
      operator: { name: "李明", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liming" },
      deleteTime: "2024-05-20 10:30:45",
      remaining: 9,
    },
    {
      key: "2",
      asset: {
        title: "解决方案",
        subTitle: "包含 3 个子栏目",
        icon: <FolderOutlined />,
        iconBg: "bg-orange-50 border-orange-100",
        iconColor: "text-orange-500",
      },
      type: "栏目",
      contentType: "栏目",
      operator: {
        name: "王小胖",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoping",
      },
      deleteTime: "2024-05-19 16:20:18",
      remaining: 8,
    },
    {
      key: "3",
      asset: {
        title: "旧版功能标签",
        subTitle: "包含 12 个内容",
        icon: <TagOutlined />,
        iconBg: "bg-indigo-50 border-indigo-100",
        iconColor: "text-indigo-500",
      },
      type: "标签",
      contentType: "系统标签",
      operator: { name: "张晓晓", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang" },
      deleteTime: "2024-05-19 11:15:32",
      remaining: 8,
    },
    {
      key: "4",
      asset: {
        title: "很期待这个功能上线！",
        subTitle: "评论于：产品功能更新说明 2.0",
        icon: <MessageOutlined />,
        iconBg: "bg-cyan-50 border-cyan-100",
        iconColor: "text-cyan-500",
      },
      type: "评论",
      contentType: "内容评论",
      operator: {
        name: "赵六六",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu",
      },
      deleteTime: "2024-05-18 15:45:21",
      remaining: 7,
    },
    {
      key: "5",
      asset: {
        title: "五一活动推广海报",
        subTitle: "活动推广素材设计稿",
        thumb:
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=80&auto=format&fit=crop&q=60",
      },
      type: "内容",
      contentType: "活动推广",
      operator: { name: "陈宇", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chenyu" },
      deleteTime: "2024-05-17 09:30:12",
      remaining: 6,
    },
    {
      key: "6",
      asset: {
        title: "客户案例 (旧版)",
        subTitle: "包含 5 个子栏目",
        icon: <FolderOutlined />,
        iconBg: "bg-orange-50 border-orange-100",
        iconColor: "text-orange-500",
      },
      type: "栏目",
      contentType: "栏目",
      operator: { name: "刘洋", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liuyang" },
      deleteTime: "2024-05-16 14:22:33",
      remaining: 5,
    },
    {
      key: "7",
      asset: {
        title: "合作伙伴标签",
        subTitle: "包含 8 个内容",
        icon: <TagOutlined />,
        iconBg: "bg-indigo-50 border-indigo-100",
        iconColor: "text-indigo-500",
      },
      type: "标签",
      contentType: "业务标签",
      operator: {
        name: "系统管理员",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      },
      deleteTime: "2024-05-15 10:10:08",
      remaining: 4,
    },
    {
      key: "8",
      asset: {
        title: "请问支持私有化部署吗？",
        subTitle: "评论于：产品介绍页面",
        icon: <MessageOutlined />,
        iconBg: "bg-cyan-50 border-cyan-100",
        iconColor: "text-cyan-500",
      },
      type: "评论",
      contentType: "内容评论",
      operator: { name: "李明", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liming" },
      deleteTime: "2024-05-14 16:40:55",
      remaining: 3,
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
          首页 / 内容管理 / <span className="text-gray-900 font-medium">回收站</span>
        </div>

        {/* 标题说明区 */}
        <div className="flex items-center gap-3 mb-5 select-none">
          <div className="w-9 h-9 bg-blue-50 rounded flex items-center justify-center text-blue-500 text-lg border border-blue-100/30">
            <DeleteOutlined />
          </div>
          <div>
            <h2 className="m-0 text-lg font-bold text-gray-900 tracking-tight">回收站</h2>
            <p className="m-0 text-[11px] text-gray-400 mt-0.5">
              回收站中保存已删除的内容，支持还原或永久删除，数据保留 30 天
            </p>
          </div>
        </div>

        {/* 顶部五大核心指标大盘 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-5 select-none">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded border border-gray-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] text-gray-400 block mb-0.5 font-medium truncate">
                  {card.title}
                </span>
                <span className="text-xl font-bold text-gray-900 block tracking-tight font-mono">
                  {card.value}
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-[9px]">
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
                className={`w-9 h-9 ${card.bg} ${card.color} rounded flex items-center justify-center text-base shrink-0`}
              >
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* 主工作空间 */}
        <div className="flex flex-col xl:flex-row gap-5">
          {/* 左侧工作数据舱 */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded border border-gray-200/60 p-4 shadow-sm">
              {/* 多维度工具筛选栏 */}
              <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
                <Input
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="搜索标题、名称或操作人..."
                  className="h-8 text-xs w-52"
                />
                <Select
                  defaultValue="allTypes"
                  className="h-8 text-xs w-24"
                  options={[{ value: "allTypes", label: "全部类型" }]}
                />
                <Select
                  defaultValue="allContentTypes"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allContentTypes", label: "全部内容类型" }]}
                />
                <Select
                  defaultValue="allDelTime"
                  className="h-8 text-xs w-28"
                  options={[{ value: "allDelTime", label: "全部删除时间" }]}
                />
                <RangePicker
                  placeholder={["开始日期", "结束日期"]}
                  className="h-8 text-xs font-sans border-gray-200"
                  style={{ height: 32, width: 210 }}
                />

                {/* 警示级操作按钮组 */}
                <Button
                  danger
                  className="h-8 text-xs font-medium border-red-200 bg-red-50/50 text-red-500 hover:bg-red-100 ml-auto px-3.5"
                >
                  批量删除
                </Button>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteFilled />}
                  className="h-8 text-xs font-medium bg-red-500 border-red-500 hover:bg-red-600 px-3.5"
                >
                  清空回收站
                </Button>
              </div>

              {/* 高密度核心内容表格 */}
              <div className="overflow-hidden rounded border border-gray-100/80">
                <Table
                  rowSelection={{
                    selectedRowKeys,
                    onChange: keys => setSelectedRowKeys(keys),
                  }}
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="w-full ant-table-custom"
                  scroll={{ x: "max-content" }}
                />
              </div>

              {/* 尾部对齐的分页管理器 */}
              <div className="mt-4 pt-1 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
                <span className="text-xs text-slate-400 font-medium">共 368 条</span>
                <div className="flex items-center gap-2">
                  <Pagination
                    total={368}
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
                      className="w-8 h-6 border border-slate-200 rounded text-center mx-1 text-slate-700 font-medium text-xs outline-none focus:border-blue-500"
                    />{" "}
                    页
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧规则与看板侧挂件 */}
          <div className="w-full xl:w-76 shrink-0 flex flex-col gap-5 select-none">
            {/* 挂件一：回收站说明规范清单 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <ExclamationCircleOutlined className="text-blue-500 text-sm" />
                <h3 className="text-xs font-bold text-gray-800 m-0">回收站说明</h3>
              </div>
              <ul className="text-[11px] text-gray-500 space-y-2 pl-4 list-disc leading-relaxed">
                <li>删除的内容会在回收站中保留 30 天</li>
                <li>超过保留期后系统将自动永久删除</li>
                <li>支持按类型、时间等条件筛选</li>
                <li>可批量还原或永久删除所选内容</li>
                <li className="text-amber-600 font-medium">
                  清空回收站将永久删除所有内容，且不可恢复
                </li>
              </ul>
              <div className="border-t border-gray-100 mt-4 pt-3 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span>⏱️ 数据保留期：</span>
                <span className="text-gray-700 font-mono font-bold bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  30 天
                </span>
              </div>
            </div>

            {/* 挂件二：回收资产占比环形图 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <PieChartOutlined className="text-blue-500 text-sm" />
                <h3 className="text-xs font-bold text-gray-800 m-0">数据统计</h3>
              </div>
              <div className="flex items-center justify-between gap-4 py-1">
                {/* 多彩占比环 */}
                <div className="relative w-18 h-18 rounded-full border-[8px] border-emerald-400 flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 rounded-full border-[8px] border-t-orange-400 border-r-indigo-400 border-b-cyan-400 -m-[8px]"></div>
                  <div className="text-center leading-none">
                    <span className="text-[9px] text-gray-400 block mb-0.5">总数</span>
                    <span className="text-xs font-extrabold text-gray-900 block font-mono">
                      368
                    </span>
                  </div>
                </div>
                {/* 比例名录 */}
                <div className="flex-1 text-[11px] space-y-1.5 font-sans">
                  {dataDistribution.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center gap-1.5 truncate">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                        <span className="text-gray-500 font-medium">{item.name}</span>
                      </span>
                      <span className="text-gray-700 font-mono font-medium shrink-0">
                        {item.count}{" "}
                        <span className="text-gray-400 font-normal text-[10px]">
                          ({item.percent})
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-2 flex justify-between items-center text-[11px]">
                <span className="text-gray-400 font-medium">共 计</span>
                <span className="font-mono font-bold text-gray-800 text-xs">368 条</span>
              </div>
            </div>

            {/* 挂件三：纵向快捷入口清单 */}
            <div className="bg-white p-4 rounded border border-gray-200/60 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 m-0 mb-3">快捷操作</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 p-2 bg-gray-50/50 hover:bg-gray-50 rounded border border-gray-100 cursor-pointer transition-colors group">
                  <div className="w-6 h-6 bg-blue-50 rounded text-blue-500 flex items-center justify-center text-xs">
                    <UndoOutlined />
                  </div>
                  <span className="text-xs text-gray-600 font-medium group-hover:text-blue-500 transition-colors">
                    批量还原选中项
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50/50 hover:bg-gray-50 rounded border border-gray-100 cursor-pointer transition-colors group">
                  <div className="w-6 h-6 bg-red-50 rounded text-red-500 flex items-center justify-center text-xs">
                    <DeleteOutlined />
                  </div>
                  <span className="text-xs text-gray-600 font-medium group-hover:text-red-500 transition-colors">
                    批量永久删除选中项
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50/50 hover:bg-gray-50 rounded border border-gray-100 cursor-pointer transition-colors group">
                  <div className="w-6 h-6 bg-amber-50 rounded text-amber-500 flex items-center justify-center text-xs">
                    <DeleteFilled />
                  </div>
                  <span className="text-xs text-gray-600 font-medium group-hover:text-amber-600 transition-colors">
                    清空回收站
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50/50 hover:bg-gray-50 rounded border border-gray-100 cursor-pointer transition-colors group">
                  <div className="w-6 h-6 bg-purple-50 rounded text-purple-500 flex items-center justify-center text-xs">
                    <ExportOutlined />
                  </div>
                  <span className="text-xs text-gray-600 font-medium group-hover:text-purple-500 transition-colors">
                    导出回收站记录
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 高密度表格防抖覆盖样式 */}
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
