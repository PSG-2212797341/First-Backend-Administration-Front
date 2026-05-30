import { useState, useEffect, useCallback } from "react";
import { Card, Space, Button, Modal, Form, message, type ButtonProps } from "antd";
import { DynamicForm } from "@/components/dynamic-form";
import ConfigurableTable from "./Table";
import ConfigurableSearch from "./Search";
import type { PageConfig, ColumnConfig } from "./configurable.type";

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

  const handleModalSubmit = async () => {
    const values = await form.validateFields();
    await config.api.create?.(values);
    setModalVisible(false);
    message.success("创建成功");
    fetchData();
  };

  const getSelectedRows = useCallback(() => {
    return data.filter(item => selectedRowKeys.includes(item[config.table.rowKey] as React.Key));
  }, [data, selectedRowKeys, config.table.rowKey]);

  const actionColumn: ColumnConfig<T> | null = config.rowActions?.length
    ? {
        title: "操作",
        key: "action",
        width: 200,
        render: (_, record) => (
          <Space>
            {config.rowActions?.map(action => (
              <Button
                key={action.key}
                type="link"
                danger={action.type === "danger"}
                onClick={() => action.onClick([record])}
              >
                {action.text}
              </Button>
            ))}
          </Space>
        ),
      }
    : null;

  const isDangerAction = (type: string | undefined): boolean => type === "danger";

  // 🟢 解决 any 4：定义一个类型守卫函数，将自定义的 'danger' 安全抹平映射为 AntD 官方合法的 ButtonType
  const getButtonType = (type: string | undefined): ButtonProps["type"] => {
    if (!type || type === "danger") return "default";
    return type as ButtonProps["type"];
  };

  return (
    <Card title={config.title}>
      {config.search && (
        <ConfigurableSearch
          fields={config.search.fields}
          onSearch={setSearchParams}
          onReset={() => setSearchParams({})}
        />
      )}

      <Space style={{ marginBottom: 16 }}>
        {config.actions?.map(action => (
          <Button
            key={action.key}
            type={isDangerAction(action.type) ? "primary" : getButtonType(action.type)} // ✨ 纯净安全的按钮类型流转
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
