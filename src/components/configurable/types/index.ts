import type { DynamicField } from "@/components/dynamic-form/types";

/** 表格列配置 */
export interface ColumnConfig {
  title: string; // 列标题
  dataIndex?: string; // 数据字段（操作列可以没有 dataIndex）
  key?: string; // 唯一标识
  width?: number; // 列宽
  fixed?: "left" | "right"; // 固定列
  sortable?: boolean; // 是否可排序
  render?: (value: unknown, record: unknown) => React.ReactNode; // 自定义渲染
  valueEnum?: Record<string, { text: string; color?: string }>; // 值映射（如状态：0→禁用，1→启用）
}

/** 操作按钮配置 */
export interface ActionConfig {
  text: string; // 按钮文字
  key: string; // 操作标识
  type?: "primary" | "default" | "dashed" | "link" | "text" | "danger";
  permission?: string; // 需要的权限
  confirm?: string; // 确认文案（需要二次确认时）
  onClick: (selectedRows: unknown[]) => void;
}

/** 搜索字段配置 */
export interface SearchFieldConfig {
  name: string; // 字段名
  label: string; // 标签
  type: "input" | "select" | "date-range" | "number";
  placeholder?: string;
  options?: { label: string; value: unknown }[]; // select 的选项
}

/** 完整页面配置 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PageConfig<T = any> {
  // 页面标题
  title: string;

  // 表格配置
  table: {
    columns: ColumnConfig[];
    rowKey: string;
    scroll?: { x?: number; y?: number };
    virtual?: boolean; // 是否虚拟滚动
  };

  // 搜索配置
  search?: {
    fields: SearchFieldConfig[];
  };

  // 操作按钮配置（表格上方）
  actions?: ActionConfig[];

  // 行操作配置（表格每行后面的操作）
  rowActions?: ActionConfig[];

  // 弹窗表单配置（新增/编辑）
  form?: {
    title: string; // 弹窗标题
    fields: DynamicField[]; // 复用了你 DynamicForm 的字段类型
    width?: number;
  };

  // 数据接口
  api: {
    list: (params: Record<string, unknown>) => Promise<{ data: T[]; total: number }>;
    create?: (data: Record<string, unknown>) => Promise<void>;
    update?: (data: Record<string, unknown>) => Promise<void>;
    delete?: (id: string) => Promise<void>;
  };
}
