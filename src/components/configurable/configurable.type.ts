import type { DynamicField } from "@/components/dynamic-form/types";

/** 表格列配置 */
export interface ColumnConfig<T extends Record<string, unknown> = Record<string, unknown>> {
  title: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  fixed?: "left" | "right";
  sortable?: boolean;
  // 🟢 剿灭 any 1：value 如果不知道类型，用最高的安全界限 unknown 替代
  render?: (value: unknown, record: T) => React.ReactNode;
  valueEnum?: Record<string, { text: string; color?: string }>;
}

/** 操作按钮配置 */
export interface ActionConfig<T extends Record<string, unknown> = Record<string, unknown>> {
  text: string;
  key: string;
  type?: "primary" | "default" | "dashed" | "link" | "text" | "danger";
  permission?: string;
  confirm?: string;
  onClick: (selectedRows: T[]) => void;
}

/** 搜索字段配置 */
export interface SearchFieldConfig {
  name: string;
  label: string;
  type: "input" | "select" | "date-range" | "number";
  placeholder?: string;
  options?: { label: string; value: unknown }[];
}

/** 完整页面配置 */
export interface PageConfig<T extends Record<string, unknown> = Record<string, unknown>> {
  title: string;
  table: {
    columns: ColumnConfig<T>[];
    rowKey: string;
    scroll?: { x?: number; y?: number };
    virtual?: boolean;
  };
  search?: {
    fields: SearchFieldConfig[];
  };
  actions?: ActionConfig<T>[];
  rowActions?: ActionConfig<T>[];
  form?: {
    title: string;
    fields: DynamicField[];
    width?: number;
  };
  api: {
    list: (params: Record<string, unknown>) => Promise<{ data: T[]; total: number }>;
    create?: (data: Record<string, unknown>) => Promise<void>;
    update?: (data: Record<string, unknown>) => Promise<void>;
    delete?: (id: string) => Promise<void>;
  };
}
