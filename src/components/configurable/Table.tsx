import { useMemo } from "react";
import { Table, Tag } from "antd";
import type { ColumnConfig } from "./types";

interface Props {
  columns: ColumnConfig[];
  dataSource: unknown[];
  loading: boolean;
  rowKey: string;
  selectedRowKeys?: React.Key[];
  onSelectChange?: (keys: React.Key[]) => void;
  scroll?: { x?: number; y?: number };
  virtual?: boolean;
}

function ConfigurableTable({
  columns,
  dataSource,
  loading,
  rowKey,
  selectedRowKeys,
  onSelectChange,
  scroll,
  virtual,
}: Props) {
  // 处理列配置
  const tableColumns = useMemo(() => {
    return columns.map(col => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key || col.dataIndex,
      width: col.width,
      fixed: col.fixed,
      sorter:
        col.sortable && col.dataIndex
          ? (a: Record<string, unknown>, b: Record<string, unknown>) => {
              const aVal = a[col.dataIndex!];
              const bVal = b[col.dataIndex!];
              if (typeof aVal === "number" && typeof bVal === "number") {
                return aVal - bVal;
              }
              return 0;
            }
          : undefined,
      render: col.render
        ? (value: unknown, record: unknown) => col.render!(value, record)
        : col.valueEnum
          ? (value: unknown) => {
              const item = col.valueEnum![String(value)];
              return item ? <Tag color={item.color}>{item.text}</Tag> : String(value);
            }
          : undefined,
    }));
  }, [columns]);

  return (
    <Table
      columns={tableColumns}
      dataSource={dataSource as Record<string, unknown>[]}
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
