import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { FormProps, FormInstance } from "antd";

export type RegisterFieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: boolean;
};

export interface RegisterFormProps {
  /** 表单提交处理函数 */
  onFinish: FormProps<RegisterFieldType>["onFinish"];
  /** 表单提交失败处理函数 */
  onFinishFailed: FormProps<RegisterFieldType>["onFinishFailed"];
  /** 加载状态 */
  loading?: boolean;
  /** 切换到登录表单的函数 */
  onSwitchToLogin: () => void;
  /** 表单实例（可选） */
  form?: FormInstance<RegisterFieldType>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onFinish,
  onFinishFailed,
  loading = false,
  onSwitchToLogin,
  form,
}) => {
  const [registerForm] = Form.useForm();

  return (
    <Form
      form={form || registerForm}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="medium"
    >
      <Form.Item<RegisterFieldType>
        label="用户名"
        name="username"
        rules={[
          { required: true, message: "请输入用户名!" },
          { min: 3, message: "用户名至少3个字符" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="请输入用户名"
          className="rounded-lg"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label="密码"
        name="password"
        rules={[
          { required: true, message: "请输入密码!" },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: "密码最少8位并且必须包含至少一个大写字母、一个小写字母和一个数字",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="请输入密码"
          className="rounded-lg"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        label="确认密码"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请确认密码!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入的密码不一致!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="请再次输入密码"
          className="rounded-lg"
          disabled={loading}
        />
      </Form.Item>

      <Form.Item<RegisterFieldType>
        name="agreeTerms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("请同意服务条款")),
          },
        ]}
      >
        <Checkbox className="text-gray-600" disabled={loading}>
          我已阅读并同意
          <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">
            服务条款
          </a>
          和
          <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">
            隐私政策
          </a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full h-12 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
          loading={loading}
          disabled={loading}
        >
          {loading ? "注册中..." : "注册"}
        </Button>
      </Form.Item>

      <div className="text-center">
        <span className="text-gray-600">已有账户? </span>
        <Button
          type="link"
          className="p-0 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          onClick={onSwitchToLogin}
          disabled={loading}
        >
          立即登录
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
