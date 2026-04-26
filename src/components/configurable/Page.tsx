import { useState, useEffect, useCallback } from "react";
import { Card, Space, Button, Modal, Form, message } from "antd";
import { DynamicForm } from "@/components/dynamic-form";
import ConfigurableTable from "./Table";
import ConfigurableSearch from "./search";
import type { PageConfig, ColumnConfig } from "./types";

interface Props<T extends Record<string, unknown>> {
  config: PageConfig<T>;
}

function ConfigurablePage<T extends Record<string, unknown>>({ config }: Props<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, unknown>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 加载数据
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await config.api.list(searchParams);
      setData(result.data);
    } finally {
      setLoading(false);
    }
  }, [config.api, searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 处理弹窗提交
  const handleModalSubmit = async () => {
    const values = await form.validateFields();
    await config.api.create?.(values);
    setModalVisible(false);
    message.success("创建成功");
    fetchData();
  };

  // 获取选中行数据
  const getSelectedRows = useCallback(() => {
    return data.filter((_, i) =>
      selectedRowKeys.includes(data[i][config.table.rowKey] as React.Key)
    );
  }, [data, selectedRowKeys, config.table.rowKey]);

  // 构建操作列 - 根据 rowActions 配置动态渲染
  const actionColumn: ColumnConfig | null = config.rowActions?.length
    ? {
        title: "操作",
        key: "action",
        width: 200,
        render: (_: unknown, record: unknown) => {
          const row = record as T;
          return (
            <Space>
              {config.rowActions?.map(action => (
                <Button
                  key={action.key}
                  type="link"
                  danger={action.type === "danger"}
                  onClick={() => action.onClick([row])}
                >
                  {action.text}
                </Button>
              ))}
            </Space>
          );
        },
      }
    : null;

  // 判断是否为危险操作
  const isDangerAction = (type: string | undefined): boolean => {
    return type === "danger";
  };

  return (
    <Card title={config.title}>
      {/* 搜索区域 */}
      {config.search && (
        <ConfigurableSearch
          fields={config.search.fields}
          onSearch={values => {
            setSearchParams(values);
          }}
          onReset={() => {
            setSearchParams({});
          }}
        />
      )}

      {/* 操作按钮区域 */}
      <Space style={{ marginBottom: 16 }}>
        {config.actions?.map(action => (
          <Button
            key={action.key}
            type={
              isDangerAction(action.type)
                ? "primary"
                : (action.type as "primary" | "default" | "dashed" | "link" | "text") || "default"
            }
            danger={isDangerAction(action.type)}
            onClick={() => {
              if (action.confirm) {
                Modal.confirm({
                  title: action.confirm,
                  onOk: () => action.onClick(getSelectedRows()),
                });
              } else {
                action.onClick(getSelectedRows());
              }
            }}
          >
            {action.text}
          </Button>
        ))}
      </Space>

      {/* 表格区域 */}
      <ConfigurableTable
        columns={[...config.table.columns, ...(actionColumn ? [actionColumn] : [])]}
        dataSource={data}
        loading={loading}
        rowKey={config.table.rowKey}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedRowKeys}
        scroll={config.table.scroll}
        virtual={config.table.virtual}
      />

      {/* 弹窗表单 */}
      <Modal
        title={`新增${config.form?.title}`}
        open={modalVisible}
        onOk={handleModalSubmit}
        onCancel={() => setModalVisible(false)}
        width={config.form?.width || 600}
      >
        <DynamicForm fields={config.form?.fields || []} showButtons={false} />
      </Modal>
    </Card>
  );
}

export default ConfigurablePage;
