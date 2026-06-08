import React from "react";
import { Button, Table, Switch, Space, Pagination, ConfigProvider } from "antd";
import {
  UsergroupAddOutlined,
  PlusOutlined,
  ImportOutlined,
  ExportOutlined,
  DeleteOutlined,
  SyncOutlined,
  SettingOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

const groupIconMap = {
  管理员: { color: "#1890ff", bg: "#e6f7ff", icon: "👤" },
  产品经理: { color: "#52c41a", bg: "#f6ffed", icon: "📦" },
  运营专员: { color: "#722ed1", bg: "#f9f0ff", icon: "📢" },
  数据分析师: { color: "#fa8c16", bg: "#fff7e6", icon: "📊" },
  客服专员: { color: "#13c2c2", bg: "#e6fffb", icon: "🎧" },
  普通用户: { color: "#8c8c8c", bg: "#fafafa", icon: "👥" },
  财务人员: { color: "#eb2f96", bg: "#fff0f6", icon: "💰" },
  技术支持: { color: "#fa541c", bg: "#fff2e8", icon: "🛠️" },
};

export default function UserSet() {
  const columns = [
    {
      title: "用户组名称",
      dataIndex: "groupName",
      key: "groupName",
      render: text => {
        const style = groupIconMap[text] || { color: "#1890ff", bg: "#e6f7ff", icon: "👥" };
        return (
          <Space size="middle">
            <div
              style={{ backgroundColor: style.bg, color: style.color }}
              className="w-7 h-7 rounded flex items-center justify-center text-sm font-semibold"
            >
              {style.icon}
            </div>
            <span className="text-gray-800 font-medium">{text}</span>
          </Space>
        );
      },
    },
    { title: "组描述", dataIndex: "description", key: "description", className: "text-gray-500" },
    {
      title: "用户数量",
      dataIndex: "userCount",
      key: "userCount",
      render: count => (
        <span className="text-blue-500 font-medium cursor-pointer hover:underline">{count}</span>
      ),
    },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: status => (
        <Space>
          <Switch defaultChecked={status === "启用"} size="small" />
          <span className={`text-xs ${status === "启用" ? "text-blue-500" : "text-gray-400"}`}>
            {status}
          </span>
        </Space>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" className="p-0">
            编辑
          </Button>
          <Button type="link" className="p-0 text-blue-500 hover:text-blue-400">
            权限配置
          </Button>
          {/* 修正点 1：使用 antd 的 danger 结合纯文本按钮，确保字色为纯正红色 */}
          <Button type="link" danger className="p-0 font-medium">
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      groupName: "管理员",
      description: "系统管理员，拥有所有权限",
      userCount: 12,
      createTime: "2024-05-01 10:00:00",
      status: "启用",
    },
    {
      key: "2",
      groupName: "产品经理",
      description: "负责产品管理和内容维护",
      userCount: 8,
      createTime: "2024-05-03 14:30:00",
      status: "启用",
    },
    {
      key: "3",
      groupName: "运营专员",
      description: "负责运营活动和用户管理",
      userCount: 15,
      createTime: "2024-05-05 09:15:00",
      status: "启用",
    },
    {
      key: "4",
      groupName: "数据分析师",
      description: "负责数据分析和报表查看",
      userCount: 6,
      createTime: "2024-05-07 16:45:00",
      status: "启用",
    },
    {
      key: "5",
      groupName: "客服专员",
      description: "负责客户服务和问题处理",
      userCount: 20,
      createTime: "2024-05-10 11:20:00",
      status: "启用",
    },
    {
      key: "6",
      groupName: "普通用户",
      description: "普通用户组，基础访问权限",
      userCount: 120,
      createTime: "2024-05-15 08:30:00",
      status: "禁用",
    },
    {
      key: "7",
      groupName: "财务人员",
      description: "负责财务相关数据管理",
      userCount: 4,
      createTime: "2024-05-18 13:10:00",
      status: "启用",
    },
    {
      key: "8",
      groupName: "技术支持",
      description: "负责系统维护和技术支持",
      userCount: 7,
      createTime: "2024-05-20 15:25:00",
      status: "启用",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          colorBgContainer: "#ffffff",
          colorError: "#ff4d4f", // 统一注入全局危险红（Antd 默认规范）
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#262626",
          },
        },
      }}
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-4 text-xs text-gray-400">
          用户管理 / <span className="text-gray-900">用户组</span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 text-xl shadow-sm">
            <UsergroupAddOutlined />
          </div>
          <div>
            <h2 className="m-0 text-xl font-semibold text-gray-900">用户组</h2>
            <p className="m-0 text-xs text-gray-400">管理系统中的用户组和权限配置</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <Space size="middle" className="flex-wrap">
              <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600">
                新建用户组
              </Button>
              <Button icon={<ImportOutlined />}>批量导入</Button>
              <Button icon={<ExportOutlined />}>批量导出</Button>
              {/* 修正点 2：去掉了冲突的 text-red-500，采用 antd 的 danger 属性，完美还原浅红底色+红字 */}
              <Button danger icon={<DeleteOutlined />}>
                批量删除
              </Button>
            </Space>
            <Space size="middle" className="text-gray-400">
              <Button type="text" icon={<SyncOutlined />} className="hover:text-gray-600" />
              <Button type="text" icon={<SettingOutlined />} className="hover:text-gray-600" />
              <Button type="text" icon={<SlidersOutlined />} className="hover:text-gray-600" />
            </Space>
          </div>

          <Table
            rowSelection={{ type: "checkbox" }}
            columns={columns}
            dataSource={data}
            pagination={false}
            className="w-full"
          />

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-400">共 8 条</span>
            <div className="flex items-center gap-2">
              <Pagination
                total={8}
                showSizeChanger
                defaultPageSize={10}
                defaultCurrent={1}
                pageSizeOptions={["10", "20", "50"]}
              />
              <span className="text-sm text-gray-400 ml-2">
                前往{" "}
                <input
                  type="text"
                  defaultValue="1"
                  className="w-9 h-8 border border-gray-200 rounded text-center mx-1 text-gray-800"
                />{" "}
                页
              </span>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
