import React from "react";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { FormProps, FormInstance } from "antd";

export type LoginFieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export interface LoginFormProps {
  /** 表单提交处理函数 */
  onFinish: FormProps<LoginFieldType>["onFinish"];
  /** 表单提交失败处理函数 */
  onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"];
  /** 加载状态 */
  loading?: boolean;
  /** 切换到注册表单的函数 */
  onSwitchToRegister: () => void;
  /** 忘记密码处理函数 */
  onForgotPassword?: () => void;
  /** 表单实例（可选） */
  form?: FormInstance<LoginFieldType>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onFinish,
  onFinishFailed,
  loading = false,
  onSwitchToRegister,
  onForgotPassword,
  form,
}) => {
  const [loginForm] = Form.useForm();

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  return (
    <Form
      form={form || loginForm}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="large"
    >
      <Form.Item<LoginFieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="请输入用户名"
          className="rounded-lg"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item<LoginFieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="请输入密码"
          className="rounded-lg"
          disabled={loading}
        />
      </Form.Item>

      <div className="flex justify-between items-center mb-6">
        <Form.Item<LoginFieldType> name="remember" valuePropName="checked" noStyle>
          <Checkbox className="text-gray-600" disabled={loading}>
            记住我
          </Checkbox>
        </Form.Item>

        <a
          href="#"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
          onClick={handleForgotPassword}
        >
          忘记密码?
        </a>
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-12 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
          loading={loading}
          disabled={loading}
        >
          {loading ? "登录中..." : "登录"}
        </Button>
      </Form.Item>

      <Divider plain className="text-gray-400">
        或
      </Divider>

      <div className="text-center">
        <span className="text-gray-600">还没有账户? </span>
        <Button
          type="link"
          className="p-0 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          onClick={onSwitchToRegister}
          disabled={loading}
        >
          立即注册
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
