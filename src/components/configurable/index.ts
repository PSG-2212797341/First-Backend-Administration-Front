// src/components/configurable/index.ts

// 🟢 1. 导出主页面组件
export { default as ConfigurablePage } from "./Page";

// 🟢 2. 导出子组件（如果外部业务需要单独消费 Table 或 Search 的话）
export { default as ConfigurableTable } from "./Table";
export { default as ConfigurableSearch } from "./Search";

// 🟢 3. 聚合导出所有的强类型契约（让外面的人直接从当前根目录就能拿到 PageConfig 们）
export type {
  PageConfig,
  ColumnConfig,
  ActionConfig,
  SearchFieldConfig,
} from "./configurable.type";
