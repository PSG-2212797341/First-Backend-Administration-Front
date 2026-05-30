import { message } from "antd";
import ConfigurablePage from "@/components/configurable/Page";
import type { PageConfig } from "@/components/configurable/configurable.type";
import { generateTableData } from "@/mock/tableData";

// 模拟 API（实际项目中替换为真实 API）
const mockApi = {
  list: async () => {
    const data = generateTableData(5000);
    return { data, total: data.length };
  },
  create: async (data: Record<string, unknown>) => {
    console.log("创建:", data);
    message.success("创建成功");
  },
  update: async (data: Record<string, unknown>) => {
    console.log("更新:", data);
    message.success("更新成功");
  },
  delete: async (id: string) => {
    console.log("删除:", id);
    message.success("删除成功");
  },
};

// 页面配置
const pageConfig: PageConfig = {
  title: "数据列表",
  table: {
    rowKey: "id",
    scroll: { x: 1000, y: 500 },
    virtual: true,
    columns: [
      { title: "编号", dataIndex: "code", width: 150 },
      { title: "描述", dataIndex: "description", width: 300 },
      {
        title: "调用次数",
        dataIndex: "callCount",
        width: 150,
        render: (value: unknown) => (value as number).toLocaleString(),
      },
      { title: "更新时间", dataIndex: "updateTime", width: 180 },
    ],
  },
  search: {
    fields: [
      { name: "code", label: "编号", type: "input", placeholder: "请输入编号" },
      { name: "description", label: "描述", type: "input", placeholder: "请输入描述关键词" },
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
  rowActions: [
    { text: "配置", key: "config", onClick: () => message.info("配置") },
    { text: "订阅", key: "subscribe", onClick: () => message.info("订阅") },
  ],
  form: {
    title: "数据",
    width: 600,
    fields: [
      {
        name: "code",
        label: "编号",
        type: "input",
        required: true,
        placeholder: "请输入编号",
        span: 24,
      },
      {
        name: "description",
        label: "描述",
        type: "input",
        required: true,
        placeholder: "请输入描述",
        span: 24,
      },
      {
        name: "callCount",
        label: "调用次数",
        type: "input",
        placeholder: "请输入调用次数",
        span: 24,
      },
    ],
  },
  api: mockApi,
};

const StandardList = () => {
  return <ConfigurablePage config={pageConfig} />;
};

export default StandardList;
