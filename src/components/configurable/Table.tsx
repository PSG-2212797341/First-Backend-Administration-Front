import { useMemo } from "react";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { ColumnConfig } from "./configurable.type";

interface Props<T extends Record<string, unknown>> {
  columns: ColumnConfig<T>[];
  dataSource: T[];
  loading: boolean;
  rowKey: string;
  selectedRowKeys?: React.Key[];
  onSelectChange?: (keys: React.Key[]) => void;
  scroll?: { x?: number; y?: number };
  virtual?: boolean;
}

function ConfigurableTable<T extends Record<string, unknown>>({
  columns,
  dataSource,
  loading,
  rowKey,
  selectedRowKeys,
  onSelectChange,
  scroll,
  virtual,
}: Props<T>) {
  // 🟢 剿灭 any 2 & 3：显式声明 tableColumns 的类型为 AntD 官方的挂载类型，彻底干掉底部的 as any 强制断言
  const tableColumns = useMemo<TableProps<T>["columns"]>(() => {
    return columns.map(col => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key || col.dataIndex,
      width: col.width,
      fixed: col.fixed,
      sorter:
        col.sortable && col.dataIndex
          ? (a: T, b: T) => {
              const aVal = a[col.dataIndex!];
              const bVal = b[col.dataIndex!];
              if (typeof aVal === "number" && typeof bVal === "number") {
                return aVal - bVal;
              }
              return 0;
            }
          : undefined,
      // 🟢 value 使用 unknown，在内部转化为 String 渲染，达到顶级类型防线
      render: col.render
        ? (value: unknown, record: T) => col.render!(value, record)
        : col.valueEnum
          ? (value: unknown) => {
              const item = col.valueEnum![String(value)];
              return item ? <Tag color={item.color}>{item.text}</Tag> : String(value);
            }
          : undefined,
    }));
  }, [columns]);

  return (
    <Table<T>
      columns={tableColumns} // ❤️ 完美无缝融合！
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      rowSelection={
        onSelectChange
          ? {
              selectedRowKeys,
              onChange: onSelectChange,
              columnWidth: 40,
            }
          : undefined
      }
      scroll={scroll}
      virtual={virtual}
      pagination={false}
    />
  );
}

export default ConfigurableTable;
