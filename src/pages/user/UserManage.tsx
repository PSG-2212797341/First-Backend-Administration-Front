import React from "react";
import {
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Tag,
  Switch,
  Space,
  Avatar,
  Pagination,
  ConfigProvider,
} from "antd";
import {
  UserOutlined,
  SearchOutlined,
  ReloadOutlined,
  DownOutlined,
  PlusOutlined,
  ImportOutlined,
  ExportOutlined,
  DeleteOutlined,
  SyncOutlined,
  SettingOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

// 用户组标签颜色映射 (由于需要适配 Antd Tag 组件的属性，这里保持数据结构)
const roleColorMap = {
  管理员: { color: "#722ed1", bg: "#f9f0ff", border: "#d3adf7" },
  产品经理: { color: "#1890ff", bg: "#e6f7ff", border: "#91d5ff" },
  运营专员: { color: "#52c41a", bg: "#f6ffed", border: "#b7eb8f" },
  普通用户: { color: "#8c8c8c", bg: "#fafafa", border: "#d9d9d9" },
  客服专员: { color: "#fa8c16", bg: "#fff7e6", border: "#ffd591" },
  数据分析师: { color: "#13c2c2", bg: "#e6fffb", border: "#87e8de" },
  技术支持: { color: "#fa541c", bg: "#fff2e8", border: "#ffbb96" },
};

export default function UserManagementPage() {
  // 表格列定义
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (text: string, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span className="text-gray-800 font-medium">{text}</span>
        </Space>
      ),
    },
    { title: "姓名", dataIndex: "name", key: "name" },
    {
      title: "用户组",
      dataIndex: "role",
      key: "role",
      render: role => {
        const style = roleColorMap[role] || roleColorMap["普通用户"];
        return (
          <Tag
            style={{
              color: style.color,
              backgroundColor: style.bg,
              borderColor: style.border,
            }}
            className="rounded px-2 py-0.5 m-0"
          >
            {role}
          </Tag>
        );
      },
    },
    { title: "手机号", dataIndex: "phone", key: "phone" },
    { title: "邮箱", dataIndex: "email", key: "email" },
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
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" className="p-0">
            编辑
          </Button>
          <Button type="link" className="p-0 text-orange-500 hover:text-orange-400">
            重置密码
          </Button>
          <Button type="link" className="p-0 text-red-500 hover:text-red-400">
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 模拟表格数据
  const data = [
    {
      key: "1",
      username: "zhangsan",
      name: "张三",
      role: "管理员",
      phone: "138****8888",
      email: "zhangsan@workpro.com",
      status: "启用",
      createTime: "2024-06-18 10:30:00",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan",
    },
    {
      key: "2",
      username: "lisi",
      name: "李四",
      role: "产品经理",
      phone: "139****1234",
      email: "lisi@workpro.com",
      status: "启用",
      createTime: "2024-06-17 15:20:30",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisi",
    },
    {
      key: "3",
      username: "wangwu",
      name: "王五",
      role: "运营专员",
      phone: "137****5678",
      email: "wangwu@workpro.com",
      status: "启用",
      createTime: "2024-06-16 09:15:45",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu",
    },
    {
      key: "4",
      username: "zhaoliu",
      name: "赵六",
      role: "普通用户",
      phone: "136****3456",
      email: "zhaoliu@workpro.com",
      status: "禁用",
      createTime: "2024-06-15 11:30:20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhaoliu",
    },
    {
      key: "5",
      username: "sunqi",
      name: "孙七",
      role: "客服专员",
      phone: "135****7890",
      email: "sunqi@workpro.com",
      status: "启用",
      createTime: "2024-06-14 14:45:10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sunqi",
    },
    {
      key: "6",
      username: "zhouba",
      name: "周八",
      role: "数据分析师",
      phone: "134****2468",
      email: "zhouba@workpro.com",
      status: "禁用",
      createTime: "2024-06-13 16:20:50",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhouba",
    },
    {
      key: "7",
      username: "wulili",
      name: "吴丽丽",
      role: "普通用户",
      phone: "133****1357",
      email: "wulili@workpro.com",
      status: "启用",
      createTime: "2024-06-12 08:10:30",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wulili",
    },
    {
      key: "8",
      username: "chenhao",
      name: "陈浩",
      role: "技术支持",
      phone: "132****9753",
      email: "chenhao@workpro.com",
      status: "启用",
      createTime: "2024-06-11 17:25:40",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chenhao",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
          colorBgContainer: "#ffffff",
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#262626",
          },
        },
      }}
    >
      <div>
        {/* 面包屑导航 */}
        <div className="mb-4 text-xs text-gray-400">
          用户管理 / <span className="text-gray-900">用户列表</span>
        </div>

        {/* 页面标题区 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 text-xl">
            <UserOutlined />
          </div>
          <div>
            <h2 className="m-0 text-xl font-semibold text-gray-900">用户列表</h2>
            <p className="m-0 text-xs text-gray-400">管理系统中的所有用户账户信息</p>
          </div>
        </div>

        {/* 筛选卡片区 */}
        <div className="bg-white p-6 rounded-xl mb-5 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-4">
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">用户名</div>
              <Input placeholder="请输入用户名" className="w-full" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">姓名</div>
              <Input placeholder="请输入姓名" className="w-full" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">用户组</div>
              <Select
                placeholder="请选择用户组"
                className="w-full"
                options={Object.keys(roleColorMap).map(k => ({ value: k, label: k }))}
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">状态</div>
              <Select
                placeholder="请选择状态"
                className="w-full"
                options={[
                  { value: "1", label: "启用" },
                  { value: "0", label: "禁用" },
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <div className="mb-2 text-sm font-medium text-gray-700">创建时间</div>
              <RangePicker className="w-full" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">手机号</div>
              <Input placeholder="请输入手机号" className="w-full" />
            </div>
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">邮箱</div>
              <Input placeholder="请输入邮箱" className="w-full" />
            </div>
          </div>

          {/* 筛选操作按钮 */}
          <div className="mt-6 flex gap-3 justify-start items-center">
            <Button type="primary" icon={<SearchOutlined />} className="px-6">
              搜索
            </Button>
            <Button icon={<ReloadOutlined />}>重置</Button>
            <Button type="text" className="text-blue-500 text-sm flex items-center gap-1">
              展开 <DownOutlined className="text-[10px]" />
            </Button>
          </div>
        </div>

        {/* 表格数据卡片区 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          {/* 工具栏 */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <Space size="middle" className="flex-wrap">
              <Button type="primary" icon={<PlusOutlined />}>
                新增用户
              </Button>
              <Button icon={<ImportOutlined />}>批量导入</Button>
              <Button icon={<ExportOutlined />}>批量导出</Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                className="bg-red-50 hover:bg-red-100 border-red-200 text-red-500"
              >
                批量删除
              </Button>
            </Space>
            <Space size="middle" className="text-gray-400">
              <Button type="text" icon={<SyncOutlined />} className="hover:text-gray-600" />
              <Button type="text" icon={<SettingOutlined />} className="hover:text-gray-600" />
              <Button type="text" icon={<SlidersOutlined />} className="hover:text-gray-600" />
            </Space>
          </div>

          {/* 数据表格 */}
          <Table
            rowSelection={{ type: "checkbox" }}
            columns={columns}
            dataSource={data}
            pagination={false}
            className="w-full"
          />

          {/* 分页器 */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-400">共 56 条</span>
            <Pagination
              total={56}
              showSizeChanger
              defaultPageSize={10}
              defaultCurrent={1}
              pageSizeOptions={["10", "20", "50"]}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
