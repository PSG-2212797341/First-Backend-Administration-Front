import { Form, Row, Col, Input, Select, Button, Space } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { SearchFieldConfig } from "./types";

interface Props {
  fields: SearchFieldConfig[];
  onSearch: (values: Record<string, unknown>) => void;
  onReset: () => void;
}

function ConfigurableSearch({ fields, onSearch, onReset }: Props) {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Form form={form} onFinish={onSearch} layout="horizontal" style={{ marginBottom: 16 }}>
      <Row gutter={[16, 16]}>
        {fields.map(field => (
          <Col xs={24} sm={12} md={8} lg={6} key={field.name}>
            <Form.Item
              name={field.name}
              label={field.label}
              labelAlign="right"
              style={{ marginBottom: 0 }}
            >
              {field.type === "select" ? (
                <Select
                  placeholder={field.placeholder || `请选择${field.label}`}
                  allowClear
                  options={field.options}
                />
              ) : (
                <Input
                  placeholder={field.placeholder || `请输入${field.label}`}
                  allowClear
                  prefix={field.type === "input" ? <SearchOutlined /> : undefined}
                />
              )}
            </Form.Item>
          </Col>
        ))}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              筛选
            </Button>
            <Button onClick={handleReset} icon={<ReloadOutlined />}>
              重置
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}

export default ConfigurableSearch;
