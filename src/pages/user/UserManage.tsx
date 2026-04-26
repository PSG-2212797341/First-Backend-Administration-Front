import { message } from "antd";
import ConfigurablePage from "@/components/configurable/Page";
import type { PageConfig } from "@/components/configurable/types";

// 模拟 API 接口（实际项目中替换为真实 API）
const mockApi = {
  list: async (params: Record<string, unknown>) => {
    console.log("查询参数:", params);
    // 模拟返回数据
    return {
      data: [
        {
          id: 1,
          username: "admin",
          email: "admin@example.com",
          phone: "13800138000",
          status: "active",
          role: "管理员",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          username: "zhangsan",
          email: "zhangsan@example.com",
          phone: "13900139000",
          status: "active",
          role: "编辑者",
          createdAt: "2024-03-20",
        },
        {
          id: 3,
          username: "lisi",
          email: "lisi@example.com",
          phone: "13700137000",
          status: "inactive",
          role: "访客",
          createdAt: "2024-05-10",
        },
        {
          id: 4,
          username: "wangwu",
          email: "wangwu@example.com",
          phone: "13600136000",
          status: "active",
          role: "编辑者",
          createdAt: "2024-07-08",
        },
        {
          id: 5,
          username: "zhaoliu",
          email: "zhaoliu@example.com",
          phone: "13500135000",
          status: "inactive",
          role: "访客",
          createdAt: "2024-09-12",
        },
      ],
      total: 5,
    };
  },
  create: async (data: Record<string, unknown>) => {
    console.log("创建用户:", data);
    message.success("用户创建成功");
  },
  update: async (data: Record<string, unknown>) => {
    console.log("更新用户:", data);
    message.success("用户更新成功");
  },
  delete: async (id: string) => {
    console.log("删除用户:", id);
    message.success("用户删除成功");
  },
};

// 用户管理页面配置
const userPageConfig: PageConfig = {
  title: "用户管理",
  table: {
    rowKey: "id",
    columns: [
      { title: "ID", dataIndex: "id", width: 60, sortable: true },
      { title: "用户名", dataIndex: "username", width: 120 },
      { title: "邮箱", dataIndex: "email", width: 200 },
      { title: "手机号", dataIndex: "phone", width: 150 },
      {
        title: "状态",
        dataIndex: "status",
        width: 100,
        valueEnum: {
          active: { text: "启用", color: "green" },
          inactive: { text: "禁用", color: "red" },
        },
      },
      { title: "角色", dataIndex: "role", width: 100 },
      { title: "创建时间", dataIndex: "createdAt", width: 120 },
    ],
  },
  search: {
    fields: [
      { name: "username", label: "用户名", type: "input", placeholder: "请输入用户名" },
      {
        name: "status",
        label: "状态",
        type: "select",
        options: [
          { label: "全部", value: "" },
          { label: "启用", value: "active" },
          { label: "禁用", value: "inactive" },
        ],
      },
    ],
  },
  actions: [
    { text: "新增用户", key: "add", type: "primary", onClick: () => message.info("点击了新增") },
    {
      text: "批量删除",
      key: "batchDelete",
      type: "danger",
      confirm: "确定删除选中用户吗？",
      onClick: rows => message.info(`删除了 ${rows.length} 个用户`),
    },
    {
      text: "导出数据",
      key: "export",
      onClick: rows => message.info(`导出了 ${rows.length} 条数据`),
    },
  ],
  rowActions: [
    { text: "编辑", key: "edit", onClick: () => {} },
    { text: "删除", key: "delete", onClick: () => {} },
  ],
  form: {
    title: "用户",
    width: 600,
    fields: [
      {
        name: "username",
        label: "用户名",
        type: "input",
        required: true,
        placeholder: "请输入用户名",
        span: 24,
      },
      {
        name: "email",
        label: "邮箱",
        type: "input",
        required: true,
        placeholder: "请输入邮箱",
        span: 24,
      },
      { name: "phone", label: "手机号", type: "input", placeholder: "请输入手机号", span: 24 },
      {
        name: "status",
        label: "状态",
        type: "select",
        required: true,
        options: [
          { label: "启用", value: "active" },
          { label: "禁用", value: "inactive" },
        ],
        span: 24,
      },
    ],
  },
  api: mockApi,
};
