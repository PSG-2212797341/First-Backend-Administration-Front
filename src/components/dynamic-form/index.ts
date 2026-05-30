// src/components/dynamic-form/index.ts

// 🟢 1. 导出动态表单核心业务组件
export { default as DynamicForm } from "./DynamicForm";
export { default as FieldRenderer } from "./FieldRenderer";

// 🟢 2. 聚合导出底层所有的强类型核心契约（与你的 types.ts 精准互通）
export type {
  FieldType,
  FieldOption,
  FormValues,
  DynamicField,
  ButtonType,
  ButtonSize,
  ButtonConfig,
  DynamicFormConfig,
  DynamicFormRef,
} from "./types";
